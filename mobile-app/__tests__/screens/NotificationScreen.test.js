import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationScreen from '../../src/screens/NotificationScreen';

// Fake Dependencies (Mocks)
// We isolate the NotificationScreen by replacing UI wrappers, icons, and local storage.

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Auto-generate testIDs based on the icon name so we can programmatically tap them in tests
  return { 
    Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} />,
    MaterialCommunityIcons: (props) => <View testID={`icon-${props.name}`} {...props} /> 
  };
});

// Pretend we have a logged-in user with ID 99 sitting in local storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(JSON.stringify({ id: 99 })),
}));

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

// Intercept all network requests to avoid hitting a real database during tests
global.fetch = jest.fn();

// Dummy Data
// Simulating various notification states (resolved, in progress, general update) and read/unread status
const mockNotifications = [
  { notification_id: 1, message: 'Your complaint was RESOLVED.', created_at: '2026-04-20T10:00:00Z', is_read: 0 }, // Unread
  { notification_id: 2, message: 'Report is IN PROGRESS.', created_at: '2026-04-21T10:00:00Z', is_read: 1 }, // Read
  { notification_id: 3, message: 'General system update.', created_at: '2026-04-22T10:00:00Z', is_read: 1 }  // Read
];

describe('NotificationScreen', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    // Wipe the slate clean before every test
    jest.clearAllMocks();
  });

  it('fetches notifications on mount and categorizes them correctly', async () => {
    // Give the component our dummy data when it asks the server
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockNotifications }),
    });

    const { getByText } = render(<NotificationScreen onBack={mockOnBack} />);

    // Check that the component checked local storage for the current logged-in user
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('user');
    });

    // Make sure it asked the backend for user 99's notifications
    expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/notifications/99');

    // Ensure our frontend logic successfully translates raw backend strings into nice UI titles
    await waitFor(() => {
      // Checking the logic that triggers off the word "RESOLVED"
      expect(getByText('Complaint Resolved')).toBeTruthy(); 
      expect(getByText('Your complaint was RESOLVED.')).toBeTruthy();

      // Checking the logic that triggers off the phrase "IN PROGRESS"
      expect(getByText('Work In Progress')).toBeTruthy(); 
      expect(getByText('Report is IN PROGRESS.')).toBeTruthy();

      // Checking the fallback logic for unrecognized strings
      expect(getByText('System Update')).toBeTruthy(); 
    });
  });

  it('displays empty state when there are no notifications', async () => {
    // Simulate an empty inbox response from the server
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] }),
    });

    const { getByText } = render(<NotificationScreen onBack={mockOnBack} />);

    // Check that the fallback text renders
    await waitFor(() => {
      expect(getByText('You have no new notifications.')).toBeTruthy();
    });
  });

  it('triggers the API when "Mark All As Read" is pressed and updates UI', async () => {
    // 1. Pretend the server gave us a list of notifications on initial load
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockNotifications }),
    });

    const { getByTestId } = render(<NotificationScreen onBack={mockOnBack} />);

    // Wait for the list to finish rendering
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // 2. Pretend the server successfully accepted our 'mark as read' command
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    // Find the double-checkmark icon in the header and tap it
    const markReadIcon = getByTestId('icon-checkmark-done-outline');
    fireEvent.press(markReadIcon.parent);

    // Verify it sent a PATCH request to the correct endpoint
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/notifications/read-all/99', expect.objectContaining({
        method: 'PATCH'
      }));
    });
  });

  it('navigates back when the back button is pressed', () => {
    const { getByTestId } = render(<NotificationScreen onBack={mockOnBack} />);

    // Tap the back arrow
    const backIcon = getByTestId('icon-arrow-back');
    fireEvent.press(backIcon.parent);

    // Prove it told the router to exit the screen
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});