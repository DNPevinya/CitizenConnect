import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../../src/screens/ProfileScreen';

// Fake Dependencies (Mocks)
// We need to mock out navigation hooks, UI wrappers, icons, and local storage 
// so the component can render in isolation without crashing the test runner.

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Auto-generate testIDs based on the icon name so we can find them later
  return { Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} /> };
});

// Intercept local storage calls so we can pretend to load and save language preferences
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue('en'),
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  // Force the useFocusEffect to run immediately so we can test the screen as if it just gained focus
  useFocusEffect: jest.fn((callback) => callback()),
}));

jest.mock('../../src/components/NationalBadge', () => {
  const { View } = require('react-native');
  return () => <View testID="mock-national-badge" />;
});

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

describe('ProfileScreen', () => {
  // A dummy set of user data and navigation functions to pass into the screen
  const mockProps = {
    userName: 'Jane Doe',
    userEmail: 'jane@example.com',
    initialData: { district: 'Colombo' },
    onNavigateToEdit: jest.fn(),
    onNavigateToHelp: jest.fn(),
    onNavigateToFAQ: jest.fn(),
    onNavigateToTerms: jest.fn(),
    onNavigateToPrivacy: jest.fn(),
    onLogout: jest.fn(),
  };

  beforeEach(() => {
    // Wipe the slate clean before every test so they don't interfere with each other
    jest.clearAllMocks();
  });

  it('renders user information and initials correctly', async () => {
    const { getByText } = render(<ProfileScreen {...mockProps} />);
    
    // Wait for the component to settle and verify the basic user info rendered
    await waitFor(() => {
      expect(getByText('Jane Doe')).toBeTruthy();
      expect(getByText('jane@example.com')).toBeTruthy();
      expect(getByText('Colombo')).toBeTruthy();
      
      // Check that the initials generator correctly grabbed 'JD' from 'Jane Doe'
      expect(getByText('JD')).toBeTruthy(); 
    });
  });

  it('loads saved language from AsyncStorage and allows toggling', async () => {
    const { getByText } = render(<ProfileScreen {...mockProps} />);
    
    // Verify the component asked AsyncStorage for the saved language on boot
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userLanguage');
    });

    // Tap the Sinhala language button
    const sinhalaBtn = getByText('සිංහල');
    fireEvent.press(sinhalaBtn);

    // Ensure it saved the new preference back to local storage
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userLanguage', 'si');
    });
  });

  it('triggers navigation callbacks when menu options are clicked', () => {
    const { getByText } = render(<ProfileScreen {...mockProps} />);
    
    // Tap the 'Edit Profile Details' menu option and check if it told the router to navigate
    fireEvent.press(getByText(/Edit Profile Details/i));
    expect(mockProps.onNavigateToEdit).toHaveBeenCalled();

    // Tap the Help & Instructions button
    fireEvent.press(getByText(/Help & Instructions/i));
    expect(mockProps.onNavigateToHelp).toHaveBeenCalled();

    // Tap Sign Out
    fireEvent.press(getByText(/Sign Out/i));
    expect(mockProps.onLogout).toHaveBeenCalled();
  });
});