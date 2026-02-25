import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ 
  onNavigateToEdit, 
  onNavigateToHelp, 
  onNavigateToFAQ, 
  onNavigateToTerms, 
  onNavigateToPrivacy, 
  onLogout 
}) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header themed with Absolute Zero brand color */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          {/* Main Name in BLACK */}
          <Text style={styles.userName}>Nilasi Pevinya</Text>
          {/* Detail text in Battery Charged Blue */}
          <Text style={styles.userDetails}>nilasi.p@email.com</Text>
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT MANAGEMENT</Text>
        <MenuOption icon="person-outline" label="Edit Profile" onPress={onNavigateToEdit} />

        <Text style={styles.sectionLabel}>SUPPORT & LEGAL</Text>
        <MenuOption icon="help-circle-outline" label="Help & Instructions" onPress={onNavigateToHelp} />
        <MenuOption icon="chatbubbles-outline" label="FAQ" onPress={onNavigateToFAQ} />
        
        {/* User Terms added before Privacy Policy */}
        <MenuOption icon="document-text-outline" label="User Terms" onPress={onNavigateToTerms} />
        
        <MenuOption icon="shield-checkmark-outline" label="Privacy Policy" onPress={onNavigateToPrivacy} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Branding Footer */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>Urban Public Services Management System</Text>
          <Text style={styles.versionText}>VERSION 1.0 • SRI LANKA GOV</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MenuOption = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color="#0160C9" /> 
    </View>
    {/* Label in BLACK */}
    <Text style={styles.menuLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0041C7' }, // Absolute Zero
  scrollContent: { padding: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E2E8F0', marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#000000' }, // BLACK
  userDetails: { fontSize: 14, color: '#1CA3DE' }, // Battery Charged Blue
  sectionLabel: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#0D85D8', // Blue Cola
    letterSpacing: 1, 
    marginBottom: 15, 
    marginTop: 20 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  menuIconContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 10, 
    backgroundColor: 'rgba(58, 203, 232, 0.15)', // Picton Blue tint
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  menuLabel: { 
    flex: 1, 
    fontSize: 16, 
    color: '#000000', // BLACK
    fontWeight: '500' 
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#FEF2F2', 
    padding: 16, 
    borderRadius: 16, 
    marginTop: 20 
  },
  logoutText: { marginLeft: 10, color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
  footerInfo: { marginTop: 40, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#94A3B8', marginBottom: 4 },
  versionText: { fontSize: 10, color: '#CBD5E1', fontWeight: 'bold' }
});