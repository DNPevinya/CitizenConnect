import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChatScreen from '../../src/screens/ChatScreen';

// ==========================================
// MOCKS
// ==========================================
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Automatically applies a testID to every icon based on its name
  return { Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} /> };
});

describe('ChatScreen', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial automated messages correctly', () => {
    const { getByText } = render(<ChatScreen onBack={mockOnBack} complaintId="SL-123" />);

    // Verify header text
    expect(getByText('Tracking SL-123')).toBeTruthy();

    // Verify initial simulated AI messages
    expect(getByText('Ayubowan! We have received your report regarding the pothole.')).toBeTruthy();
    expect(getByText('A technical team is scheduled for inspection tomorrow morning.')).toBeTruthy();
  });

  it('adds a new message to the list when the user types and sends', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<ChatScreen onBack={mockOnBack} />);

    const inputField = getByPlaceholderText('Write your message...');

    // Wait for the component to settle
    await waitFor(() => expect(inputField).toBeTruthy());

    // Type a message
    fireEvent.changeText(inputField, 'Thank you for the update.');
    expect(inputField.props.value).toBe('Thank you for the update.');

    // Find the send icon by its testID and press it
    const sendIcon = getByTestId('icon-send');
    fireEvent.press(sendIcon);

    // Verify the new message appears in the list
    await waitFor(() => {
      expect(getByText('Thank you for the update.')).toBeTruthy();
      expect(getByText('Just now')).toBeTruthy();
    });
  });

  it('does not send an empty message', () => {
    const { getByTestId, queryAllByText } = render(<ChatScreen onBack={mockOnBack} />);

    // Count initial "Just now" messages (should be 0)
    const initialCount = queryAllByText('Just now').length;

    // Press send without typing anything
    const sendIcon = getByTestId('icon-send');
    fireEvent.press(sendIcon);

    // Verify no new messages were added
    expect(queryAllByText('Just now').length).toBe(initialCount);
  });

  it('navigates back when the back button is pressed', () => {
    const { getByTestId } = render(<ChatScreen onBack={mockOnBack} />);

    // Find the back icon and press it
    const backIcon = getByTestId('icon-chevron-back');
    fireEvent.press(backIcon);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});