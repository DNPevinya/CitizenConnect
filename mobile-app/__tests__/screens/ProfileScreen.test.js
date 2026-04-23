import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from '../../src/screens/ProfileScreen';

// ==========================================
// MOCKS
// ==========================================
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return { Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} /> };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue('en'),
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  // Immediately trigger the focus effect callback to simulate screen load
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
    jest.clearAllMocks();
  });

  it('renders user information and initials correctly', async () => {
    const { getByText } = render(<ProfileScreen {...mockProps} />);
    
    await waitFor(() => {
      expect(getByText('Jane Doe')).toBeTruthy();
      expect(getByText('jane@example.com')).toBeTruthy();
      expect(getByText('Colombo')).toBeTruthy();
      expect(getByText('JD')).toBeTruthy(); // Checks the getInitials logic
    });
  });

  it('loads saved language from AsyncStorage and allows toggling', async () => {
    const { getByText } = render(<ProfileScreen {...mockProps} />);
    
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('userLanguage');
    });

    // Toggle to Sinhala
    const sinhalaBtn = getByText('සිංහල');
    fireEvent.press(sinhalaBtn);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('userLanguage', 'si');
    });
  });

  it('triggers navigation callbacks when menu options are clicked', () => {
    const { getByText, getAllByText } = render(<ProfileScreen {...mockProps} />);
    
    // Test Edit Profile Button (Using getAllByText because it appears in the menu)
    // We target the menu item specifically.
    fireEvent.press(getByText(/Edit Profile Details/i));
    expect(mockProps.onNavigateToEdit).toHaveBeenCalled();

    // Test Legal/Support Buttons
    // CHANGED: "Help & Support" to "Help & Instructions" to match component output
    fireEvent.press(getByText(/Help & Instructions/i));
    expect(mockProps.onNavigateToHelp).toHaveBeenCalled();

    fireEvent.press(getByText(/Sign Out/i));
    expect(mockProps.onLogout).toHaveBeenCalled();
  });
});