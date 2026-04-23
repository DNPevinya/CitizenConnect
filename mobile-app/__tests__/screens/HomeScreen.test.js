import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fake Dependencies (Mocks)
// We isolate the HomeScreen by replacing external UI libraries,
// native navigation hooks, and translation files with simple dummies.

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Auto-generate testIDs based on the icon name so we can tap them in tests
  return {
    Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} />,
    MaterialCommunityIcons: (props) => <View testID={`icon-${props.name}`} {...props} />,
  };
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  // The FAB (Floating Action Button) for the chatbot uses this gradient
  return { LinearGradient: (props) => <View testID="linear-gradient" {...props} /> };
});

// React Navigation's `useFocusEffect` can crash test environments if not mocked carefully.
// We intercept it and immediately run its callback inside a standard useEffect so the screen loads normally.
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    useFocusEffect: jest.fn((callback) => {
      React.useEffect(() => {
        callback();
      }, []);
    }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('en')),
}));

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

// Provide hardcoded English strings so the UI renders predictably regardless of async storage state
jest.mock('../../src/translations', () => ({
  translations: {
    en: {
      greeting: 'Ayubowan,', summary: 'My Activity Summary', total: 'TOTAL REPORTS',
      active: 'ACTIVE WORK', resolved: 'RESOLVED', services: 'OUR SERVICES',
      help_today: 'How can we help today?', help_sub: 'Submit new civic requests or track your existing reports.',
      report_issue: 'Report an Issue / Request Service', report_sub: 'File civic complaints or request infrastructure maintenance.',
      track_req: 'Track My Requests', track_sub: 'Check the status and updates of your previous submissions.',
      recent: 'Recent Updates', see_all: 'See all', no_activity: 'No recent activity found.'
    }
  }
}));

// The actual Chatbot modal is complex, so we replace it with a simple text label that tells us if it's open or closed
jest.mock('../../src/components/ChatbotModal', () => {
  const { View, Text } = require('react-native');
  return (props) => <View testID="chatbot-modal"><Text>{props.visible ? 'Chatbot Open' : 'Chatbot Closed'}</Text></View>;
});

jest.mock('../../src/components/NationalBadge', () => {
  const { View } = require('react-native');
  return () => <View testID="national-badge" />;
});

describe('HomeScreen Component', () => {
  const mockProps = {
    userFirstName: 'John',
    userId: '123',
    onNavigateToSubmit: jest.fn(),
    onNavigateToView: jest.fn(),
    onNavigateToDetails: jest.fn(),
    onNavigateToNotifications: jest.fn(),
  };

  beforeEach(() => {
    // Start with a clean slate for every test
    jest.clearAllMocks();
    
    // Smart Router: The HomeScreen fires two different API calls when it boots up.
    // We use a custom function to look at the URL and return the correct dummy data for each request.
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/complaints/user/')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            success: true,
            data: [
              { id: '1', status: 'IN PROGRESS', created_at: '2026-04-20', title: 'Road', category: 'Road' },
              { id: '2', status: 'RESOLVED', created_at: '2026-04-19', title: 'Streetlight', category: 'Electrical' },
              { id: '3', status: 'IN PROGRESS', created_at: '2026-04-18', title: 'Water Leak', category: 'Water' }
            ]
          })
        });
      }
      if (url.includes('/api/auth/notifications/')) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: [] })
        });
      }
      // Fallback just in case
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
  });

  it('renders the personalized greeting and branding on load', async () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    
    // Always wait for the async fetch to finish before asserting, otherwise the test runner will complain about unhandled state updates
    await waitFor(() => expect(getByText('3')).toBeTruthy());
    
    expect(getByText('Ayubowan, John')).toBeTruthy();
    expect(getByText('UrbanSync')).toBeTruthy();
  });

  it('calculates and displays the correct summary statistics based on the API data', async () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    
    await waitFor(() => {
      // It should calculate 3 total, 2 active, and 1 resolved based on our mock data array
      expect(getByText('3')).toBeTruthy(); 
      expect(getByText('2')).toBeTruthy(); 
      expect(getByText('1')).toBeTruthy(); 
      
      // The recent activity list should render the title of the first item
      expect(getByText('Road')).toBeTruthy(); 
    });
  });

  it('successfully fires the notification fetch request alongside the complaint fetch', async () => {
    // Override the global mock just for this test to prove the notification endpoint is hit
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/complaints/user/')) {
        return Promise.resolve({ json: () => Promise.resolve({ success: true, data: [] }) });
      }
      if (url.includes('/api/auth/notifications/')) {
        return Promise.resolve({ json: () => Promise.resolve({ success: true, data: [{ is_read: 0 }] }) });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });

    render(<HomeScreen {...mockProps} />);
    
    // Verify both network requests went out
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  it('navigates to the correct screens when the primary action buttons are tapped', async () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    await waitFor(() => expect(getByText('3')).toBeTruthy());

    // Tap "Report an Issue"
    fireEvent.press(getByText('Report an Issue / Request Service'));
    expect(mockProps.onNavigateToSubmit).toHaveBeenCalledTimes(1);

    // Tap "Track My Requests"
    fireEvent.press(getByText('Track My Requests'));
    expect(mockProps.onNavigateToView).toHaveBeenCalledTimes(1);
  });

  it('toggles the AI Chatbot modal when the floating action button is tapped', async () => {
    const { getByTestId, getByText } = render(<HomeScreen {...mockProps} />);
    await waitFor(() => expect(getByText('3')).toBeTruthy());

    // Make sure it starts closed
    expect(getByText('Chatbot Closed')).toBeTruthy();

    // Tap the gradient wrapper that acts as the FAB
    const fab = getByTestId('linear-gradient');
    fireEvent.press(fab);
    
    // Wait for state to update and verify our dummy modal says it's open
    await waitFor(() => expect(getByText('Chatbot Open')).toBeTruthy());
  });

  it('navigates to the details view with the correct ID when a recent activity item is tapped', async () => {
    const { getByText } = render(<HomeScreen {...mockProps} />);
    
    // Wait for the recent activity list to populate
    await waitFor(() => expect(getByText('Road')).toBeTruthy());

    // Tap the specific complaint card
    fireEvent.press(getByText('Road'));
    
    // Verify it told the router to go to the Details screen with ID '1'
    expect(mockProps.onNavigateToDetails).toHaveBeenCalledWith('1');
  });
});