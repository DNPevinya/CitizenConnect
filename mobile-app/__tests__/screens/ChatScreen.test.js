import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChatScreen from '../../src/screens/ChatScreen';


// Fake Dependencies (Mocks)
// We don't want to test React Navigation or Expo Icons here, 
// so we replace them with simple dummy views.

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Trick to easily find icons later: give them a testID based on their name
  return { Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} /> };
});

describe('ChatScreen', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clean up before each test so they don't mess with each other
  });

  it('renders the initial automated messages right away', () => {
    const { getByText } = render(<ChatScreen onBack={mockOnBack} complaintId="SL-123" />);

    // Check if the header caught the props correctly
    expect(getByText('Tracking SL-123')).toBeTruthy();

    // Check if the bot's welcome messages are showing
    expect(getByText('Ayubowan! We have received your report regarding the pothole.')).toBeTruthy();
    expect(getByText('A technical team is scheduled for inspection tomorrow morning.')).toBeTruthy();
  });

  it('lets the user type and send a new message', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<ChatScreen onBack={mockOnBack} />);

    const inputField = getByPlaceholderText('Write your message...');

    // Give the screen a split second to finish mounting
    await waitFor(() => expect(inputField).toBeTruthy());

    // Simulate the user typing on their keyboard
    fireEvent.changeText(inputField, 'Thank you for the update.');
    expect(inputField.props.value).toBe('Thank you for the update.');

    // Find our send button and tap it
    const sendIcon = getByTestId('icon-send');
    fireEvent.press(sendIcon);

    // Wait for the UI to update and check if the new bubble appeared at the bottom
    await waitFor(() => {
      expect(getByText('Thank you for the update.')).toBeTruthy();
      expect(getByText('Just now')).toBeTruthy();
    });
  });

  it('blocks the user from sending empty ghosts messages', () => {
    const { getByTestId, queryAllByText } = render(<ChatScreen onBack={mockOnBack} />);

    // Count how many messages say "Just now" before we do anything
    const initialCount = queryAllByText('Just now').length;

    // Try to hit send without typing
    const sendIcon = getByTestId('icon-send');
    fireEvent.press(sendIcon);

    // Make sure the count didn't go up
    expect(queryAllByText('Just now').length).toBe(initialCount);
  });

  it('fires the back navigation prop when the back arrow is tapped', () => {
    const { getByTestId } = render(<ChatScreen onBack={mockOnBack} />);

    // Tap the back arrow
    const backIcon = getByTestId('icon-chevron-back');
    fireEvent.press(backIcon);

    // Prove the component told the parent navigator to go back
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});