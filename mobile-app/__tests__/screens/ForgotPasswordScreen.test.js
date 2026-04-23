import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../src/screens/ForgotPasswordScreen';

// ---------------------------------------------------------
// Fake Dependencies (Mocks)
// This screen uses Firebase for phone verification. We absolutely DO NOT
// want to trigger real SMS messages during a test, so we have to fake
// out a bunch of Firebase's internal mechanics here.
// ---------------------------------------------------------
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

// Fake the invisible reCAPTCHA so the test doesn't hang waiting for browser verification
jest.mock('expo-firebase-recaptcha', () => {
  const { View } = require('react-native');
  return { FirebaseRecaptchaVerifierModal: () => <View testID="mock-recaptcha" /> };
});

// Deep fake of Firebase Auth to pretend we successfully requested and received an SMS code
jest.mock('firebase/auth', () => {
  return {
    PhoneAuthProvider: jest.fn().mockImplementation(() => ({
      verifyPhoneNumber: jest.fn().mockResolvedValue('mock-verification-id'),
    })),
    signInWithCredential: jest.fn().mockResolvedValue({ user: { uid: '123' } }),
  };
});

// Firebase requires a static method call here, so we manually intercept it
require('firebase/auth').PhoneAuthProvider.credential = jest.fn().mockReturnValue('mock-credential');

// Provide a dummy config so Firebase doesn't crash on boot
jest.mock('../../src/firebaseConfig', () => ({
  auth: { app: { options: {} } }
}));

// Intercept network calls and native alerts
global.fetch = jest.fn();
global.alert = jest.fn();

describe('ForgotPasswordScreen', () => {
  const mockOnBack = jest.fn();
  const mockOnResetSuccess = jest.fn();

  beforeEach(() => {
    // Wipe the slate clean before every test
    jest.clearAllMocks();
  });

  it('allows the user to enter their email and successfully moves to the OTP step', async () => {
    // Pretend the backend successfully found the email and returned a masked phone number
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ phone: '+94771234567' }),
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <ForgotPasswordScreen onBack={mockOnBack} onResetSuccess={mockOnResetSuccess} />
    );

    // Make sure we are starting on step 1
    expect(getByText('Reset Password')).toBeTruthy();

    // Type in a test email
    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'user@urbansync.com');

    // Smash the continue button
    fireEvent.press(getByText('Continue'));

    // Wait for the simulated network request to finish and the UI to update
    await waitFor(() => {
      // 1. Did it actually ask the backend to start the reset process?
      expect(global.fetch).toHaveBeenCalledWith('http://mock-server.com/api/auth/forgot-password-init', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@urbansync.com' }),
      }));
      
      // 2. Did the screen successfully transition to asking for the code?
      expect(queryByText('Enter OTP')).toBeTruthy();
    });
  });

  it('stops the user and shows an alert if they try to proceed with a blank email', () => {
    const { getByText } = render(
      <ForgotPasswordScreen onBack={mockOnBack} onResetSuccess={mockOnResetSuccess} />
    );

    // Try to proceed without typing anything
    fireEvent.press(getByText('Continue'));

    // Verify it threw an error and blocked the API call
    expect(global.alert).toHaveBeenCalledWith("Please enter your email.");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('triggers the back navigation callback when the back arrow is tapped', () => {
    const { getByTestId } = render(<ForgotPasswordScreen onBack={mockOnBack} />);

    // Find the back arrow and tap it
    const backIcon = getByTestId('icon-chevron-back');
    fireEvent.press(backIcon.parent);

    // Prove it told the router to go back
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});