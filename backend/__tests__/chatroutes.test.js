const request = require('supertest');
const express = require('express');

// The Hoisting Trick:
// Because our route instantiates `new OpenAI()` inside the endpoint itself, we can't easily intercept it normally.
// By defining this mock function out here and naming it specifically starting with "mock", 
// Jest will pull this variable to the absolute top of the file during execution, allowing both our test suite 
// and the mocked OpenAI module below to share the exact same fake function reference!
const mockCreate = jest.fn();

// Deep fake the OpenAI SDK so we don't rack up API charges during automated testing.
jest.mock('openai', () => {
    return {
        OpenAI: jest.fn().mockImplementation(() => {
            return {
                chat: {
                    completions: {
                        create: mockCreate
                    }
                }
            };
        })
    };
});

// Import the actual chat router
const chatRoutes = require('../src/routes/chatroutes'); 

// Spin up a fake Express app in memory to test the routes without a real server
const app = express();
app.use(express.json());
app.use('/api/chat', chatRoutes);

describe('Chat API Routes', () => {

    beforeEach(() => {
        // Reset our fake OpenAI function before every test so previous responses don't bleed over
        jest.clearAllMocks();
    });

    describe('POST /api/chat/ask', () => {
        
        it('should return a successful AI response (Happy Path - 200)', async () => {
            // Tell our shared fake OpenAI function exactly what to reply with when the route calls it
            mockCreate.mockResolvedValueOnce({
                choices: [
                    { message: { content: "To submit a report, go to the Home screen and tap 'Report an Issue'." } }
                ]
            });

            const response = await request(app)
                .post('/api/chat/ask')
                .send({ message: 'How do I submit a report?' });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            
            // Verify our route successfully extracted the text from the deep OpenAI response object
            expect(response.body.reply).toBe("To submit a report, go to the Home screen and tap 'Report an Issue'.");
            
            // Prove that we actually triggered the simulated OpenAI call
            expect(mockCreate).toHaveBeenCalledTimes(1);
        });

        it('should return a 400 error if the message is empty (Sad Path - 400)', async () => {
            const response = await request(app)
                .post('/api/chat/ask')
                .send({ message: '' }); 

            // Verify our validation caught the empty string
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Message is required.');
            
            // Prove we didn't waste API calls on bad requests
            expect(mockCreate).not.toHaveBeenCalled();
        });

        it('should handle OpenAI API failures gracefully (Sad Path - 500)', async () => {
            // Simulate the OpenAI servers being down or timing out
            mockCreate.mockRejectedValueOnce(new Error('OpenAI API timeout'));

            const response = await request(app)
                .post('/api/chat/ask')
                .send({ message: 'Hello?' });

            // Verify our route caught the error and returned a safe fallback message to the user
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('The UrbanSync AI is currently unavailable.');
        });
    });
});