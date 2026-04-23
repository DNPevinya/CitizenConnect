import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import EditProfileScreen from '../../src/screens/EditProfileScreen';

// Fake out the UI components and external libraries so they don't break the test renderer
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Trick to easily find icons later: give them a testID based on their name
  return { Ionicons: (props) => <View testID={`icon-${props.name}`} {...props} /> };
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: (props) => <View testID="mock-gradient" {...props} /> };
});

// Pretend the user granted camera roll permissions but canceled the picker to keep tests simple
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true }),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

// Intercept API calls so we don't accidentally hit the real server
global.fetch = jest.fn();

describe('EditProfileScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnUpdateSuccess = jest.fn();
  
  // Some dummy user data to pre-fill the form
  const mockInitialData = {
    name: 'Jane Doe',
    phone: '771234567',
    email: 'jane@example.com',
    district: 'Colombo',
    division: 'Borella',
    profilePicture: null
  };

  beforeEach(() => {
    // Start fresh before every test so they don't mess with each other
    jest.clearAllMocks();
    // Spy on the Alert popup so we can check if it fires without actually freezing the test runner
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders initial data correctly into inputs', () => {
    const { getByDisplayValue, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} onBack={mockOnBack} onUpdateSuccess={mockOnUpdateSuccess} />
    );
    
    // Check that the form fields actually populated with our dummy data on load
    expect(getByDisplayValue('Jane Doe')).toBeTruthy();
    expect(getByDisplayValue('771234567')).toBeTruthy();
    expect(getByText('Colombo')).toBeTruthy(); 
  });

  it('alerts if user tries to set new password without entering current password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} />
    );

    // Try to sneak in a new password without providing the old one
    fireEvent.changeText(getByPlaceholderText('New password (min 8 chars)'), 'newSecurePass123');
    
    // Hit the save button
    fireEvent.press(getByText('Save Changes'));

    // Make sure the app blocked the API call and yelled at the user
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Security Required", 
        "Please enter your current password to set a new one."
      );
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('alerts if new passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} />
    );

    // Fill out the passwords but make the confirmation one slightly different
    fireEvent.changeText(getByPlaceholderText('Required to change password'), 'oldpass123');
    fireEvent.changeText(getByPlaceholderText('New password (min 8 chars)'), 'newSecurePass123');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), 'differentPass456');
    
    fireEvent.press(getByText('Save Changes'));

    // Verify the validation caught the mismatch before hitting the backend
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "New passwords do not match!");
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('submits valid data successfully and triggers success callbacks', async () => {
    // Pretend the server said "all good" and returned a new profile picture path
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, profilePicture: '/new-pic.jpg' }),
    });

    const { getByDisplayValue, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} onBack={mockOnBack} onUpdateSuccess={mockOnUpdateSuccess} />
    );

    // Update a field to prove we are submitting new data
    const nameInput = getByDisplayValue('Jane Doe');
    fireEvent.changeText(nameInput, 'Jane Smith');

    // Hit the save button
    fireEvent.press(getByText('Save Changes'));

    // Wait for the dust to settle and verify all the success dominoes fell correctly
    await waitFor(() => {
      // 1. The API was actually called
      expect(global.fetch).toHaveBeenCalled();
      
      // 2. The success popup appeared
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Profile updated successfully!");
      
      // 3. The parent component was given the new updated info
      expect(mockOnUpdateSuccess).toHaveBeenCalledWith(
        'Jane Smith', '771234567', 'Colombo', 'Borella', '/new-pic.jpg'
      );
      
      // 4. The user was told to navigate back
      expect(mockOnBack).toHaveBeenCalled();
    });
  });
});