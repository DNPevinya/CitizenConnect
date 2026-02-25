import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How to Use</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>Follow these simple steps to report and track public service issues in your area.</Text>

        {/* Step 1: Reporting */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="add-circle" size={24} color="#007AFF" />
            </View>
            <Text style={styles.stepTitle}>1. Submit a Complaint</Text>
          </View>
          <Text style={styles.stepDesc}>
            Go to the Dashboard and tap the "Submit New Complaint" button. 
            Choose a category (like Road Repair or Waste Management), provide a 
            clear description, and attach a photo for verification.
          </Text>
        </View>

        {/* Step 2: Location */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="location" size={24} color="#D97706" />
            </View>
            <Text style={styles.stepTitle}>2. Automatic Tagging</Text>
          </View>
          <Text style={styles.stepDesc}>
            The system will automatically detect your GPS location to ensure 
            the complaint is sent to the correct local authority or Municipal Council.
          </Text>
        </View>

        {/* Step 3: Tracking */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <MaterialCommunityIcons name="timeline-clock" size={24} color="#16A34A" />
            </View>
            <Text style={styles.stepTitle}>3. Track Progress</Text>
          </View>
          <Text style={styles.stepDesc}>
            Check the "My Complaints" section to view the status timeline. 
            You will see when your complaint is Assigned, In Progress, or Resolved.
          </Text>
        </View>

        {/* Step 4: Communication */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="chatbubbles" size={24} color="#9333EA" />
            </View>
            <Text style={styles.stepTitle}>4. Chat with Authority</Text>
          </View>
          <Text style={styles.stepDesc}>
            If the officers need more information, they will message you. 
            Open the complaint details and tap "Chat with Authority" to reply.
          </Text>
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.footerNote}>Need more help?</Text>
          <Text style={styles.footerSub}>Check our FAQ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  backText: { color: '#007AFF', fontSize: 16, marginLeft: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  content: { padding: 25 },
  intro: { fontSize: 15, color: '#64748B', lineHeight: 22, marginBottom: 30 },
  stepCard: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' },
  stepTitle: { fontSize: 17, fontWeight: 'bold', color: '#1E293B', marginLeft: 15 },
  stepDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  footerInfo: { marginTop: 20, alignItems: 'center', paddingBottom: 40 },
  footerNote: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  footerSub: { fontSize: 14, color: '#94A3B8', marginTop: 5 }
});