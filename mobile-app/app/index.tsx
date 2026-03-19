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

interface UserData {
  name: string;
  email: string;
  phone: string;
  district: string;
  division: string;
  profilePicture: string | null; 
}

export default function Index() {
  const [currentStep, setCurrentStep] = useState<string>('loading');
  
  // --- NAVIGATION MEMORY ---
  // This remembers the screen we were on before entering Terms/Privacy
  const [prevStep, setPrevStep] = useState<string>('');

  // --- USER DATA STATE ---
  const [userName, setUserName] = useState<string>('Citizen');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');      
  const [userDistrict, setUserDistrict] = useState<string>(''); 
  const [userDivision, setUserDivision] = useState<string>(''); 
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);

  // --- SIGNUP DATA MEMORY ---
  const [signupData, setSignupData] = useState({
    fullName: '', phone: '', email: '', district: '', division: '', password: ''
  });
  const [signupAgreed, setSignupAgreed] = useState<boolean>(false);

  const currentUserData: UserData = {
    name: userName, email: userEmail, phone: userPhone, district: userDistrict, division: userDivision, profilePicture: userProfilePicture, 
  };

  // --- 1. FULL SCREEN OVERLAYS ---
  if (currentStep === 'loading') return <LoadingScreen onFinish={() => setCurrentStep('welcome')} />;
  if (currentStep === 'welcome') return <WelcomeScreen onGetStarted={() => setCurrentStep('login')} />;
  
  if (currentStep === 'login') {
    return (
      <LoginScreen 
        onLoginSuccess={(name: string, email: string, phone: string, district: string, division: string, profilePic: string | null) => {
          setUserName(name || 'Citizen'); setUserEmail(email || ''); setUserPhone(phone || '');
          setUserDistrict(district || ''); setUserDivision(division || ''); setUserProfilePicture(profilePic || null);
          setCurrentStep('dashboard');
        }} 
        onCreateAccount={() => setCurrentStep('signup')} 
      />
    );
  }

  if (currentStep === 'signup') {
    return (
      <SignupScreen 
        formData={signupData}
        setFormData={setSignupData}
        isAgreed={signupAgreed}
        setIsAgreed={setSignupAgreed}
        onBackToLogin={() => setCurrentStep('login')} 
        // Save 'signup' as the previous step
        onNavigateToTerms={() => { setPrevStep('signup'); setCurrentStep('terms_page'); }}
        onNavigateToPrivacy={() => { setPrevStep('signup'); setCurrentStep('privacy_page'); }}
        onSignupSuccess={(name: string, email: string, phone: string, district: string, division: string) => {
          setUserName(name); setUserEmail(email); setUserPhone(phone);
          setUserDistrict(district); setUserDivision(division); setUserProfilePicture(null);
          setSignupData({ fullName: '', phone: '', email: '', district: '', division: '', password: '' });
          setSignupAgreed(false);
          setCurrentStep('dashboard');
        }}
      />
    );
  }

  if (currentStep === 'edit_profile') {
    return (
      <EditProfileScreen 
        onBack={() => setCurrentStep('profile')} 
        initialData={currentUserData} 
        onUpdateSuccess={(newName: string, newPhone: string, newDistrict: string, newDivision: string, newProfilePic: string | null) => {
          setUserName(newName); setUserPhone(newPhone); setUserDistrict(newDistrict);
          setUserDivision(newDivision); setUserProfilePicture(newProfilePic);
        }}
      />
    );
  }

  // Legal & Support - Now dynamically returns to the previous step
  if (currentStep === 'help_page') return <HelpScreen onBack={() => setCurrentStep('profile')} />;
  if (currentStep === 'faq_page') return <FAQScreen onBack={() => setCurrentStep('profile')} />;
  
  if (currentStep === 'terms_page') return <TermsScreen onBack={() => setCurrentStep(prevStep || 'signup')} />;
  if (currentStep === 'privacy_page') return <PrivacyScreen onBack={() => setCurrentStep(prevStep || 'signup')} />;

  // Functional Specialized Screens
  if (currentStep === 'submit_complaint') return <SubmitComplaintScreen onBack={() => setCurrentStep('dashboard')} />;
  if (currentStep === 'chat_page') return <ChatScreen onBack={() => setCurrentStep('complaint_details')} complaintId="#SL-8923" />;
  if (currentStep === 'complaint_details') {
    return (
      <ComplaintDetailsScreen 
        onBack={() => setCurrentStep('view_complaints')} 
        onNavigateToChat={() => setCurrentStep('chat_page')} 
      />
    );
  }

  // --- 2. MAIN APP FLOW ---
  const authenticatedTabs = ['dashboard', 'view_complaints', 'notifications', 'profile'];

  if (authenticatedTabs.includes(currentStep)) {
    return (
      <MainLayout currentTab={currentStep} onTabPress={(tab: string) => setCurrentStep(tab)}>
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

        {currentStep === 'profile' && (
          <ProfileScreen 
            userName={userName}
            userEmail={userEmail}
            initialData={currentUserData} 
            onNavigateToEdit={() => setCurrentStep('edit_profile')}
            onNavigateToHelp={() => setCurrentStep('help_page')}
            onNavigateToFAQ={() => setCurrentStep('faq_page')}
            // Save 'profile' as the previous step
            onNavigateToTerms={() => { setPrevStep('profile'); setCurrentStep('terms_page'); }}
            onNavigateToPrivacy={() => { setPrevStep('profile'); setCurrentStep('privacy_page'); }}
            onLogout={() => {
              setUserName('Citizen'); setUserEmail(''); setUserPhone('');
              setUserDistrict(''); setUserDivision(''); setUserProfilePicture(null);
              setCurrentStep('login');
            }}
          />
        )}
      </MainLayout>
    );
  }

  return null;
}