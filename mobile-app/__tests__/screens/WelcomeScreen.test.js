import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../src/screens/WelcomeScreen';

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
    MaterialIcons: (props) => <View testID={`icon-${props.name}`} {...props} /> 
  };
});

jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return { LinearGradient: (props) => <View testID="mock-gradient" {...props} /> };
});

describe('WelcomeScreen', () => {
  const mockOnGetStarted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the branding elements and title correctly', () => {
    const { getByText, getByTestId } = render(<WelcomeScreen onGetStarted={mockOnGetStarted} />);

    // Verify text elements
    expect(getByText('UrbanSync')).toBeTruthy();
    expect(getByText('Report Public Issues Easily and Transparently')).toBeTruthy();
    expect(getByText('AN INITIATIVE FOR A BETTER SRI LANKA')).toBeTruthy();

    // Verify gradient and icon elements are rendered
    expect(getByTestId('mock-gradient')).toBeTruthy();
    expect(getByTestId('icon-shield-checkmark')).toBeTruthy();
  });

  it('triggers the onGetStarted callback when the button is pressed', () => {
    const { getByText } = render(<WelcomeScreen onGetStarted={mockOnGetStarted} />);

    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);

    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });
});