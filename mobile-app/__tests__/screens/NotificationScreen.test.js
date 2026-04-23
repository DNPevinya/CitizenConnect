import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationScreen from '../../src/screens/NotificationScreen';

// ==========================================
// MOCKS
// ==========================================
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return { 
    Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} />,
    MaterialCommunityIcons: (props) => <View testID={`icon-${props.name}`} {...props} /> 
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(JSON.stringify({ id: 99 })),
}));

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

global.fetch = jest.fn();

// ==========================================
// MOCK DATA
// ==========================================
const mockNotifications = [
  { notification_id: 1, message: 'Your complaint was RESOLVED.', created_at: '2026-04-20T10:00:00Z', is_read: 0 },
  { notification_id: 2, message: 'Report is IN PROGRESS.', created_at: '2026-04-21T10:00:00Z', is_read: 1 },
  { notification_id: 3, message: 'General system update.', created_at: '2026-04-22T10:00:00Z', is_read: 1 }
];

describe('NotificationScreen', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches notifications on mount and categorizes them correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockNotifications }),
    });

    const { getByText } = render(<NotificationScreen onBack={mockOnBack} />);

    // Verify it called AsyncStorage to get the user ID
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('user');
    });

    // Verify it called the API with the correct ID
    expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/notifications/99');

    // Verify categorization logic based on the message string
    await waitFor(() => {
      expect(getByText('Complaint Resolved')).toBeTruthy(); // Rendered because of "RESOLVED"
      expect(getByText('Your complaint was RESOLVED.')).toBeTruthy();

      expect(getByText('Work In Progress')).toBeTruthy(); // Rendered because of "IN PROGRESS"
      expect(getByText('Report is IN PROGRESS.')).toBeTruthy();

      expect(getByText('System Update')).toBeTruthy(); // Rendered as default fallback
    });
  });

  it('displays empty state when there are no notifications', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] }),
    });

    const { getByText } = render(<NotificationScreen onBack={mockOnBack} />);

    await waitFor(() => {
      expect(getByText('You have no new notifications.')).toBeTruthy();
    });
  });

  it('triggers the API when "Mark All As Read" is pressed and updates UI', async () => {
    // 1. Mock initial load
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockNotifications }),
    });

    const { getByTestId } = render(<NotificationScreen onBack={mockOnBack} />);

    // Wait for the data to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // 2. Mock the PATCH request for marking as read
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    // Press the mark all as read button
    const markReadIcon = getByTestId('icon-checkmark-done-outline');
    fireEvent.press(markReadIcon.parent);

    // Verify the second API call was made to the correct endpoint
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/notifications/read-all/99', expect.objectContaining({
        method: 'PATCH'
      }));
    });
  });

  it('navigates back when the back button is pressed', () => {
    const { getByTestId } = render(<NotificationScreen onBack={mockOnBack} />);

    const backIcon = getByTestId('icon-arrow-back');
    fireEvent.press(backIcon.parent);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});