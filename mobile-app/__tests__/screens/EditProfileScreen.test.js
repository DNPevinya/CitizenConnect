import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import EditProfileScreen from '../../src/screens/EditProfileScreen';

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

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: (props) => <View testID="mock-gradient" {...props} /> };
});

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ canceled: true }),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

global.fetch = jest.fn();

describe('EditProfileScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnUpdateSuccess = jest.fn();
  
  const mockInitialData = {
    name: 'Jane Doe',
    phone: '771234567',
    email: 'jane@example.com',
    district: 'Colombo',
    division: 'Borella',
    profilePicture: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders initial data correctly into inputs', () => {
    const { getByDisplayValue, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} onBack={mockOnBack} onUpdateSuccess={mockOnUpdateSuccess} />
    );
    
    // Checks that the form is pre-filled
    expect(getByDisplayValue('Jane Doe')).toBeTruthy();
    expect(getByDisplayValue('771234567')).toBeTruthy();
    expect(getByText('Colombo')).toBeTruthy(); 
  });

  it('alerts if user tries to set new password without entering current password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} />
    );

    // Enter a new password but leave the old password blank
    fireEvent.changeText(getByPlaceholderText('New password (min 8 chars)'), 'newSecurePass123');
    
    fireEvent.press(getByText('Save Changes'));

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

    fireEvent.changeText(getByPlaceholderText('Required to change password'), 'oldpass123');
    fireEvent.changeText(getByPlaceholderText('New password (min 8 chars)'), 'newSecurePass123');
    fireEvent.changeText(getByPlaceholderText('Confirm new password'), 'differentPass456');
    
    fireEvent.press(getByText('Save Changes'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "New passwords do not match!");
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('submits valid data successfully and triggers success callbacks', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, profilePicture: '/new-pic.jpg' }),
    });

    const { getByDisplayValue, getByText } = render(
      <EditProfileScreen initialData={mockInitialData} onBack={mockOnBack} onUpdateSuccess={mockOnUpdateSuccess} />
    );

    // Change the name
    const nameInput = getByDisplayValue('Jane Doe');
    fireEvent.changeText(nameInput, 'Jane Smith');

    // Submit the form
    fireEvent.press(getByText('Save Changes'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      
      // Verify Success Alert
      expect(Alert.alert).toHaveBeenCalledWith("Success", "Profile updated successfully!");
      
      // Verify the success callback was fired with the updated name
      expect(mockOnUpdateSuccess).toHaveBeenCalledWith(
        'Jane Smith', '771234567', 'Colombo', 'Borella', '/new-pic.jpg'
      );
      
      // Verify it navigates back
      expect(mockOnBack).toHaveBeenCalled();
    });
  });
});