import React, { useState } from 'react';

// --- Screen Imports ---
import LoadingScreen from '../src/screens/LoadingScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import HomeScreen from '../src/screens/HomeScreen';
import ViewComplaintsScreen from '../src/screens/ViewComplaintsScreen';
import ComplaintDetailsScreen from '../src/screens/ComplaintDetailsScreen';
import ChatScreen from '../src/screens/ChatScreen';
import SubmitComplaintScreen from '../src/screens/SubmitComplaintScreen';
import NotificationScreen from '../src/screens/NotificationScreen';

// --- Profile & Legal Screens ---
import ProfileScreen from '../src/screens/ProfileScreen';
import EditProfileScreen from '../src/screens/EditProfileScreen';
import HelpScreen from '../src/screens/HelpScreen';
import FAQScreen from '../src/screens/FAQScreen';
import TermsScreen from '../src/screens/TermsScreen';
import PrivacyScreen from '../src/screens/PrivacyScreen';

// --- Layout Component ---
import MainLayout from '../src/components/MainLayout';

export default function Index() {
  // Navigation State Management
  const [currentStep, setCurrentStep] = useState<string>('loading');

  // --- 1. FULL SCREEN OVERLAYS (No Bottom Navigation) ---
  
  // App Onboarding & Auth
  if (currentStep === 'loading') return <LoadingScreen onFinish={() => setCurrentStep('welcome')} />;
  if (currentStep === 'welcome') return <WelcomeScreen onGetStarted={() => setCurrentStep('login')} />;
  
  if (currentStep === 'login') {
    return (
      <LoginScreen 
        onLoginSuccess={() => setCurrentStep('dashboard')} 
        onCreateAccount={() => setCurrentStep('signup')} 
      />
    );
  }

  // FIXED: Added NavigateToTerms and NavigateToPrivacy to match your SignupScreen.js
  if (currentStep === 'signup') {
    return (
      <SignupScreen 
        onBackToLogin={() => setCurrentStep('login')} 
        onNavigateToTerms={() => setCurrentStep('terms_page')}
        onNavigateToPrivacy={() => setCurrentStep('privacy_page')}
      />
    );
  }

  // Support, Legal & Settings
  if (currentStep === 'edit_profile') return <EditProfileScreen onBack={() => setCurrentStep('profile')} />;
  if (currentStep === 'help_page') return <HelpScreen onBack={() => setCurrentStep('profile')} />;
  if (currentStep === 'faq_page') return <FAQScreen onBack={() => setCurrentStep('profile')} />;
  
  // FIXED: Back button logic should lead to 'signup' if they are coming from registration
  if (currentStep === 'terms_page') return <TermsScreen onBack={() => setCurrentStep('signup')} />;
  if (currentStep === 'privacy_page') return <PrivacyScreen onBack={() => setCurrentStep('signup')} />;

  // Functional Specialized Screens
  if (currentStep === 'submit_complaint') return <SubmitComplaintScreen onBack={() => setCurrentStep('dashboard')} />;
  if (currentStep === 'chat_page') {
    return <ChatScreen onBack={() => setCurrentStep('complaint_details')} complaintId="#SL-8923" />;
  }
  if (currentStep === 'complaint_details') {
    return (
      <ComplaintDetailsScreen 
        onBack={() => setCurrentStep('view_complaints')} 
        onNavigateToChat={() => setCurrentStep('chat_page')} 
      />
    );
  }

  // --- 2. MAIN APP FLOW (With Persistent Bottom Tabs) ---
  const authenticatedTabs = ['dashboard', 'view_complaints', 'notifications', 'profile'];

  if (authenticatedTabs.includes(currentStep)) {
    return (
      <MainLayout 
        currentTab={currentStep} 
        onTabPress={(tab: string) => setCurrentStep(tab)}
      >
        {/* Home / Dashboard */}
        {currentStep === 'dashboard' && (
          <HomeScreen 
            onNavigateToSubmit={() => setCurrentStep('submit_complaint')}
            onNavigateToView={() => setCurrentStep('view_complaints')}
            onNavigateToDetails={() => setCurrentStep('complaint_details')}
            onNavigateToNotifications={() => setCurrentStep('notifications')}
          />
        )}
        
        {/* List of User Complaints */}
        {currentStep === 'view_complaints' && (
          <ViewComplaintsScreen 
            onNavigateToDetails={() => setCurrentStep('complaint_details')} 
          />
        )}

        {/* System Notifications */}
        {currentStep === 'notifications' && (
          <NotificationScreen onBack={() => setCurrentStep('dashboard')} />
        )}

        {/* User Profile & Management */}
        {currentStep === 'profile' && (
          <ProfileScreen 
            onNavigateToEdit={() => setCurrentStep('edit_profile')}
            onNavigateToHelp={() => setCurrentStep('help_page')}
            onNavigateToFAQ={() => setCurrentStep('faq_page')}
            onNavigateToTerms={() => setCurrentStep('terms_page')}
            onNavigateToPrivacy={() => setCurrentStep('privacy_page')}
            onLogout={() => setCurrentStep('login')}
          />
        )}
      </MainLayout>
    );
  }

  return null;
}