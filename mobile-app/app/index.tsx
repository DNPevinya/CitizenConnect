import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingScreen from '../src/screens/LoadingScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import HomeScreen from '../src/screens/HomeScreen';
import NotificationScreen from '../src/screens/NotificationScreen';
import SubmitComplaintScreen from '../src/screens/SubmitComplaintScreen';
import ViewComplaintsScreen from '../src/screens/ViewComplaintsScreen';
import MainLayout from '../src/components/MainLayout';

export default function Index() {
  // Define navigation state with string type
  const [currentStep, setCurrentStep] = useState<string>('loading');

  // Define screens that should display the Bottom Tab Bar
  const authenticatedTabs = ['dashboard', 'view_complaints', 'notifications', 'profile'];

  // --- 1. AUTHENTICATED FLOW (With Bottom Tabs) ---
  if (authenticatedTabs.includes(currentStep)) {
    return (
      <MainLayout 
        currentTab={currentStep} 
        onTabPress={(tab: string) => setCurrentStep(tab)}
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

        {currentStep === 'view_complaints' && (
          <ViewComplaintsScreen />
        )}

        {currentStep === 'profile' && (
          <View style={styles.placeholderCenter}>
            <Text style={styles.placeholderText}>User Profile & Settings</Text>
          </View>
        )}
      </MainLayout>
    );
  }

  // --- 2. FULL SCREEN FLOW (No Tabs) ---
  if (currentStep === 'loading') {
    return <LoadingScreen onFinish={() => setCurrentStep('welcome')} />;
  }

  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={() => setCurrentStep('login')} />;
  }

  if (currentStep === 'login') {
    return (
      <LoginScreen 
        onCreateAccount={() => setCurrentStep('signup')} 
        onLoginSuccess={() => setCurrentStep('dashboard')} 
      />
    );
  }

  if (currentStep === 'signup') {
    return <SignupScreen onBackToLogin={() => setCurrentStep('login')} />;
  }

  if (currentStep === 'submit_complaint') {
    return (
      <SubmitComplaintScreen 
        onBack={() => setCurrentStep('dashboard')} 
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  placeholderCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC'
  },
  placeholderText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500'
  }
});