import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with True Blue Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#0160C9" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Terms</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: February 2026</Text>

        <TermSection 
          title="1. Acceptance of Terms" 
          body="By creating an account or using CitizenConnect, you agree to be bound by these terms. This platform is intended for legitimate public service feedback only." 
        />

        <TermSection 
          title="2. User Responsibility" 
          body="Users are responsible for providing accurate information. Submitting false reports or misleading data intentionally may lead to account suspension." 
        />

        <TermSection 
          title="3. Reporting Conduct" 
          body="Reports must not contain offensive language, harassment, or personal attacks against government officers. Attachments must be relevant to the issue reported." 
        />

        <TermSection 
          title="4. Service Availability" 
          body="While we strive for 24/7 availability, the Urban Public Services system may undergo maintenance. Resolution times are estimates and not guarantees." 
        />

        <TermSection 
          title="5. Account Security" 
          body="You are responsible for maintaining the confidentiality of your password. Notify support immediately if you suspect unauthorized access." 
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Urban Public Services Sri Lanka</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TermSection = ({ title, body }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9' 
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { color: '#0160C9', fontSize: 16, marginLeft: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000000' }, // BLACK
  content: { padding: 25 },
  lastUpdated: { fontSize: 12, color: '#1CA3DE', marginBottom: 25 }, // Battery Charged Blue
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000000', marginBottom: 10 }, // BLACK
  sectionBody: { fontSize: 14, color: '#000000', lineHeight: 22 }, // BLACK
  footer: { 
    marginTop: 20, 
    paddingBottom: 40, 
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9', 
    paddingTop: 20 
  },
  footerText: { fontSize: 12, color: '#94A3B8', textAlign: 'center' }
});