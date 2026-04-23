const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');

// Grab the actual route logic we want to test
const authRoutes = require('../src/routes/authRoutes'); 

// Intercept database calls so we don't accidentally write garbage data 
// to our real MySQL database every time we run the test suite.
jest.mock('../src/db', () => ({ 
    query: jest.fn()
}));
const db = require('../src/db');

// Spin up a fake Express app in memory so we can fire HTTP requests 
// at our router without needing to start up a real web server.
const app = express();
app.use(express.json()); 
app.use('/api/auth', authRoutes);

describe('Auth API Routes', () => {

    beforeEach(() => {
        // Wipe the slate clean before every test so database mock returns don't bleed over
        jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        
        it('should successfully register a new citizen (Happy Path - 201)', async () => {
            // 1. Pretend the database checked for the email and found nothing (it's available)
            db.query.mockResolvedValueOnce([[]]); 
            // 2. Pretend the insert into the 'users' table succeeded and gave us an ID of 10
            db.query.mockResolvedValueOnce([{ insertId: 10 }]); 
            // 3. Pretend the insert into the 'citizens' table also succeeded
            db.query.mockResolvedValueOnce([{}]); 

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    fullName: 'John Doe',
                    phone: '0771234567',
                    email: 'citizen@urbansync.com',
                    district: 'Colombo',
                    division: 'Colombo 1',
                    password: 'securepassword123'
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Citizen registered successfully!');
            
            // Prove our API actually tried to run all 3 required database queries
            expect(db.query).toHaveBeenCalledTimes(3); 
        });

        it('should fail if email is already registered (Sad Path - 400)', async () => {
            // Pretend the database found an existing user when checking the email
            db.query.mockResolvedValueOnce([[{ user_id: 1, email: 'citizen@urbansync.com' }]]);

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    fullName: 'Duplicate User',
                    phone: '0779999999',
                    email: 'citizen@urbansync.com',
                    password: 'password123'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('This email is already registered.');
            
            // Prove the code stopped early and didn't attempt to run the INSERT queries
            expect(db.query).toHaveBeenCalledTimes(1); 
        });
    });

    describe('POST /api/auth/login', () => {
        
        it('should login a citizen and trigger 2FA OTP flow (Happy Path - 200)', async () => {
            // Pretend we found the user in the database and their password matches
            db.query.mockResolvedValueOnce([[{ 
                user_id: 1, 
                email: 'citizen@urbansync.com', 
                role: 'citizen', 
                password: 'plainTextPassword123' // Testing the plain-text fallback logic
            }]]);
            
            // Pretend we successfully fetched their extended profile details
            db.query.mockResolvedValueOnce([[{ 
                fullName: 'John Doe', 
                phone: '0771234567', 
                district: 'Colombo', 
                division: 'Col 1' 
            }]]);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'citizen@urbansync.com',
                    password: 'plainTextPassword123'
                });

            // Even though it asks for an OTP, the initial credential check was a success (200)
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('2FA_REQUIRED');
            
            // Verify our backend regex correctly formatted the local phone number for Firebase
            expect(response.body.phone).toBe('+94771234567'); 
        });

        it('should fail with invalid email or password (Sad Path - 401)', async () => {
            // Pretend the database returned an empty array (User not found)
            db.query.mockResolvedValueOnce([[]]);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'wrong@email.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid email or password.');
        });

        it('should successfully login an officer bypassing 2FA (Happy Path - 200)', async () => {
            // Pretend we found an Officer in the users table
            db.query.mockResolvedValueOnce([[{ 
                user_id: 99, 
                email: 'officer@urbansync.com', 
                role: 'officer', 
                password: 'officerPassword123' 
            }]]);
            
            // Pretend we successfully joined and fetched their specific department details
            db.query.mockResolvedValueOnce([[{ 
                full_name: 'Inspector Gadget', 
                authority_id: 5, 
                status: 'Active',
                authority_name: 'RDA',
                dept_type: 'Roads'
            }]]);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'officer@urbansync.com',
                    password: 'officerPassword123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful!');
            
            // Ensure the payload correctly attaches the officer's department info
            expect(response.body.user.role).toBe('officer');
            expect(response.body.user.authorityName).toBe('RDA');
        });
    });

    describe('POST /api/auth/forgot-password-init', () => {
        
        it('should successfully initiate forgot password for a citizen (Happy Path - 200)', async () => {
            // Pretend we verified the email belongs to a valid citizen
            db.query.mockResolvedValueOnce([[{ user_id: 1, role: 'citizen' }]]);
            // Pretend we fetched their associated phone number to send the SMS
            db.query.mockResolvedValueOnce([[{ phone: '0779998888' }]]);

            const response = await request(app)
                .post('/api/auth/forgot-password-init')
                .send({ email: 'citizen@urbansync.com' });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.phone).toBe('+94779998888'); // Verifies Regex formatting again
        });

        it('should return 404 if no citizen account is found (Sad Path - 404)', async () => {
            // Pretend the user lookup failed
            db.query.mockResolvedValueOnce([[]]);

            const response = await request(app)
                .post('/api/auth/forgot-password-init')
                .send({ email: 'nobody@nowhere.com' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No citizen account found with this email.');
        });
    });

    describe('Admin Officer Management', () => {
        
        it('GET /api/auth/admin/officers-list should return list of officers (Happy Path - 200)', async () => {
            // Mock the database returning an array containing one officer
            db.query.mockResolvedValueOnce([[{ 
                user_id: 2, 
                email: 'officer1@test.com',
                full_name: 'Jane Smith',
                employee_id_code: 'EMP-RDA-001'
            }]]);

            const response = await request(app).get('/api/auth/admin/officers-list');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].full_name).toBe('Jane Smith');
        });

        it('POST /api/auth/admin/add-officer should create a new officer (Happy Path - 201)', async () => {
            // 1. Email check returns empty (email is available)
            db.query.mockResolvedValueOnce([[]]);
            // 2. Insert into users table returns a fake ID of 50
            db.query.mockResolvedValueOnce([{ insertId: 50 }]);
            // 3. Insert into officers table succeeds
            db.query.mockResolvedValueOnce([{}]);

            const response = await request(app)
                .post('/api/auth/admin/add-officer')
                .send({
                    full_name: 'New Officer',
                    email: 'newofficer@urbansync.com',
                    authority_id: 2,
                    employee_id_code: 'EMP-WTR-002'
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Officer added!');
            
            // Prove the API automatically generated a secure temporary password for the new officer
            expect(response.body.tempPassword).toBeDefined(); 
        });

        it('DELETE /api/auth/admin/delete-officer/:userId should delete an officer (Happy Path - 200)', async () => {
            // 1. Pretend the delete from the 'officers' table succeeded
            db.query.mockResolvedValueOnce([{}]);
            // 2. Pretend the delete from the 'users' table succeeded
            db.query.mockResolvedValueOnce([{}]);

            const response = await request(app).delete('/api/auth/admin/delete-officer/50');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Officer deleted.');
            
            // Ensure both the user record and the officer profile were cleaned up
            expect(db.query).toHaveBeenCalledTimes(2); 
        });
    });
});