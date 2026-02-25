import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>Last Updated: February 2026</Text>

        <PolicySection 
          title="1. Data Collection" 
          body="We collect your name, phone number, and location data specifically to facilitate the reporting and tracking of public service complaints." 
        />

        <PolicySection 
          title="2. GPS & Location" 
          body="Your GPS coordinates are only captured at the moment of complaint submission to ensure the issue is routed to the correct Municipal Council." 
        />

        <PolicySection 
          title="3. Information Sharing" 
          body="Your data is shared exclusively with relevant government authorities and assigned field officers. We never sell your data to third parties." 
        />

        <PolicySection 
          title="4. Data Security" 
          body="All communication between your device and our servers is encrypted using Industry Standard SSL/TLS protocols." 
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>By using CitizenConnect, you agree to these terms.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PolicySection = ({ title, body }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { color: '#007AFF', fontSize: 16, marginLeft: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  content: { padding: 25 },
  lastUpdated: { fontSize: 12, color: '#94A3B8', marginBottom: 25 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  sectionBody: { fontSize: 14, color: '#475569', lineHeight: 22 },
  footer: { marginTop: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 20 },
  footerText: { fontSize: 13, color: '#94A3B8', textAlign: 'center', fontStyle: 'italic' }
});