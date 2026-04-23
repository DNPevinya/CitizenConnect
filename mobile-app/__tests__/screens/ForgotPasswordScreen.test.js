import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../src/screens/ForgotPasswordScreen';

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

jest.mock('../../src/config', () => ({
  BASE_URL: 'http://mock-server.com',
}));

// Mock the Firebase specific imports
jest.mock('expo-firebase-recaptcha', () => {
  const { View } = require('react-native');
  return { FirebaseRecaptchaVerifierModal: () => <View testID="mock-recaptcha" /> };
});

jest.mock('firebase/auth', () => {
  return {
    PhoneAuthProvider: jest.fn().mockImplementation(() => ({
      verifyPhoneNumber: jest.fn().mockResolvedValue('mock-verification-id'),
    })),
    signInWithCredential: jest.fn().mockResolvedValue({ user: { uid: '123' } }),
  };
});

// Since the PhoneAuthProvider static method is used in handleVerifyOTP
require('firebase/auth').PhoneAuthProvider.credential = jest.fn().mockReturnValue('mock-credential');

jest.mock('../../src/firebaseConfig', () => ({
  auth: { app: { options: {} } }
}));

global.fetch = jest.fn();
global.alert = jest.fn();

describe('ForgotPasswordScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnResetSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- STEP 1: EMAIL ENTRY ---
  it('handles the email input step and successfully requests an OTP', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ phone: '+94771234567' }),
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <ForgotPasswordScreen onBack={mockOnBack} onResetSuccess={mockOnResetSuccess} />
    );

    // Initial state check
    expect(getByText('Reset Password')).toBeTruthy();

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'user@urbansync.com');

    // Click Continue
    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      // Verifies backend was hit to initialize reset
      expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/forgot-password-init', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@urbansync.com' }),
      }));
      // Verifies UI transition to OTP step
      expect(queryByText('Enter OTP')).toBeTruthy();
    });
  });

  // --- ERROR HANDLING ---
  it('alerts the user if the email is empty', () => {
    const { getByText } = render(
      <ForgotPasswordScreen onBack={mockOnBack} onResetSuccess={mockOnResetSuccess} />
    );

    fireEvent.press(getByText('Continue'));

    expect(global.alert).toHaveBeenCalledWith("Please enter your email.");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('navigates back when the back button is pressed', () => {
    const { getByTestId } = render(<ForgotPasswordScreen onBack={mockOnBack} />);

    const backIcon = getByTestId('icon-chevron-back');
    fireEvent.press(backIcon.parent);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});