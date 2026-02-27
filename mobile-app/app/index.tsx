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

// Define the shape of user data for TypeScript
interface UserData {
  name: string;
  email: string;
  phone: string;
  district: string;
  division: string;
  profilePicture: string | null; // Added profilePicture to the interface
}

export default function Index() {
  // Navigation State Management
  const [currentStep, setCurrentStep] = useState<string>('loading');
  
  // --- USER DATA STATE (The "Bridge") ---
  const [userName, setUserName] = useState<string>('Citizen');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');      
  const [userDistrict, setUserDistrict] = useState<string>(''); 
  const [userDivision, setUserDivision] = useState<string>(''); 
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null); // Added state for Image

  // Object to pass to Profile and Edit screens easily
  const currentUserData: UserData = {
    name: userName,
    email: userEmail,
    phone: userPhone,
    district: userDistrict,
    division: userDivision,
    profilePicture: userProfilePicture, // Added to the bridge object
  };

  // --- 1. FULL SCREEN OVERLAYS (No Bottom Navigation) ---
  
  if (currentStep === 'loading') return <LoadingScreen onFinish={() => setCurrentStep('welcome')} />;
  if (currentStep === 'welcome') return <WelcomeScreen onGetStarted={() => setCurrentStep('login')} />;
  
  if (currentStep === 'login') {
    return (
      <LoginScreen 
        onLoginSuccess={(name: string, email: string, phone: string, district: string, division: string, profilePic: string | null) => {
          setUserName(name || 'Citizen');
          setUserEmail(email || '');
          setUserPhone(phone || '');
          setUserDistrict(district || '');
          setUserDivision(division || '');
          setUserProfilePicture(profilePic || null); // Capture pic on login
          setCurrentStep('dashboard');
        }} 
        onCreateAccount={() => setCurrentStep('signup')} 
      />
    );
  }

  if (currentStep === 'signup') {
    return (
      <SignupScreen 
        onBackToLogin={() => setCurrentStep('login')} 
        onNavigateToTerms={() => setCurrentStep('terms_page')}
        onNavigateToPrivacy={() => setCurrentStep('privacy_page')}
        onSignupSuccess={(name: string, email: string, phone: string, district: string, division: string) => {
          setUserName(name);
          setUserEmail(email);
          setUserPhone(phone);
          setUserDistrict(district);
          setUserDivision(division);
          setUserProfilePicture(null); // Fresh signup has no pic yet
          setCurrentStep('dashboard');
        }}
      />
    );
  }

  // Edit Profile Screen
  if (currentStep === 'edit_profile') {
    return (
      <EditProfileScreen 
      onBack={() => setCurrentStep('profile')} 
      initialData={currentUserData} 
      // ADD TYPES HERE: (param: type)
      onUpdateSuccess={(
        newName: string, 
        newPhone: string, 
        newDistrict: string, 
        newDivision: string, 
        newProfilePic: string | null
      ) => {
        setUserName(newName);
        setUserPhone(newPhone);
        setUserDistrict(newDistrict);
        setUserDivision(newDivision);
        setUserProfilePicture(newProfilePic);
      }}
      />
    );
  }

  // Legal & Support
  if (currentStep === 'help_page') return <HelpScreen onBack={() => setCurrentStep('profile')} />;
  if (currentStep === 'faq_page') return <FAQScreen onBack={() => setCurrentStep('profile')} />;
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
            userFirstName={userName ? userName.split(' ')[0] : 'Citizen'}
            onNavigateToSubmit={() => setCurrentStep('submit_complaint')}
            onNavigateToView={() => setCurrentStep('view_complaints')}
            onNavigateToDetails={() => setCurrentStep('complaint_details')}
            onNavigateToNotifications={() => setCurrentStep('notifications')}
          />
        )}
        
        {currentStep === 'view_complaints' && (
          <ViewComplaintsScreen onNavigateToDetails={() => setCurrentStep('complaint_details')} />
        )}

        {currentStep === 'notifications' && (
          <NotificationScreen onBack={() => setCurrentStep('dashboard')} />
        )}

        {/* User Profile & Management */}
        {currentStep === 'profile' && (
          <ProfileScreen 
            userName={userName}
            userEmail={userEmail}
            initialData={currentUserData} 
            onNavigateToEdit={() => setCurrentStep('edit_profile')}
            onNavigateToHelp={() => setCurrentStep('help_page')}
            onNavigateToFAQ={() => setCurrentStep('faq_page')}
            onNavigateToTerms={() => setCurrentStep('terms_page')}
            onNavigateToPrivacy={() => setCurrentStep('privacy_page')}
            onLogout={() => {
              setUserName('Citizen'); 
              setUserEmail('');
              setUserPhone('');
              setUserDistrict('');
              setUserDivision('');
              setUserProfilePicture(null); // Clear pic on logout
              setCurrentStep('login');
            }}
          />
        )}
      </MainLayout>
    );
  }

  return null;
}