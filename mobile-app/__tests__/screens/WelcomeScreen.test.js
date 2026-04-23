import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../src/screens/WelcomeScreen';

// Fake Dependencies 

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  // Auto-generate testIDs based on the icon name so we can verify they rendered
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
    // Start fresh for every test
    jest.clearAllMocks();
  });

  it('renders the branding elements and title correctly', () => {
    const { getByText, getByTestId } = render(<WelcomeScreen onGetStarted={mockOnGetStarted} />);

    // Verify the core branding text is visible to the user
    expect(getByText('UrbanSync')).toBeTruthy();
    expect(getByText('Report Public Issues Easily and Transparently')).toBeTruthy();
    expect(getByText('AN INITIATIVE FOR A BETTER SRI LANKA')).toBeTruthy();

    // Verify the visual flair (gradient background and shield icon) loaded properly
    expect(getByTestId('mock-gradient')).toBeTruthy();
    expect(getByTestId('icon-shield-checkmark')).toBeTruthy();
  });

  it('triggers the onGetStarted callback when the button is pressed', () => {
    const { getByText } = render(<WelcomeScreen onGetStarted={mockOnGetStarted} />);

    // Find the primary call-to-action button and tap it
    const getStartedButton = getByText('Get Started');
    fireEvent.press(getStartedButton);

    // Prove it told the app router to transition away from the onboarding screen
    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });
});