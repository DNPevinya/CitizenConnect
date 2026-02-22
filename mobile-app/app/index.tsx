import React, { useState } from 'react';
import { View, Text } from 'react-native';
import LoadingScreen from '../src/screens/LoadingScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import HomeScreen from '../src/screens/HomeScreen';
import NotificationScreen from '../src/screens/NotificationScreen';
import SubmitComplaintScreen from '../src/screens/SubmitComplaintScreen';
import MainLayout from '../src/components/MainLayout';

export default function Index() {
  // Navigation State
  const [currentStep, setCurrentStep] = useState('loading');

  // Define which screens should display the persistent Bottom Tab Bar
  const authenticatedTabs = ['dashboard', 'view_complaints', 'notifications', 'profile'];

  // --- 1. AUTHENTICATED FLOW (With Bottom Tabs) ---
  if (authenticatedTabs.includes(currentStep)) {
    return (
      <MainLayout 
        currentTab={currentStep} 
        onTabPress={(tab : string) => setCurrentStep(tab)}
      >
        {currentStep === 'dashboard' && (
          <HomeScreen 
            onNavigateToNotifications={() => setCurrentStep('notifications')}
            onNavigateToSubmit={() => setCurrentStep('submit_complaint')}
            onNavigateToView={() => setCurrentStep('view_complaints')}
          />
        )}
        
        {currentStep === 'notifications' && (
          <NotificationScreen onBack={() => setCurrentStep('dashboard')} />
        )}

        {/* Placeholder screens for your other tabs */}
        {currentStep === 'view_complaints' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your Complaints History List</Text>
          </View>
        )}

        {currentStep === 'profile' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User Profile & Settings</Text>
          </View>
        )}
      </MainLayout>
    );
  }

  // --- 2. FULL SCREEN FLOW (No Tabs) ---

  // Loading Screen
  if (currentStep === 'loading') {
    return <LoadingScreen onFinish={() => setCurrentStep('welcome')} />;
  }

  // Welcome/Onboarding
  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setCurrentStep('login')} />;
  }

  // Login Screen
  if (currentStep === 'login') {
    return (
      <LoginScreen 
        onCreateAccount={() => setCurrentStep('signup')} 
        onLoginSuccess={() => setCurrentStep('dashboard')} 
      />
    );
  }

  // Registration Screen (Based on image_3bc162.png)
  if (currentStep === 'signup') {
    return <SignupScreen onBackToLogin={() => setCurrentStep('login')} />;
  }

  // Submit Complaint Screen (Based on image_3d12ff.png)
  // We hide tabs here to give the form more vertical space
  if (currentStep === 'submit_complaint') {
    return (
      <SubmitComplaintScreen 
        onBack={() => setCurrentStep('dashboard')} 
      />
    );
  }

  return null;
}