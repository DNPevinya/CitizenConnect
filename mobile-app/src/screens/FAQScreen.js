import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FAQScreen({ onBack }) {
  // Frequently Asked Questions Content
  const faqs = [
    {
      question: "How long does it take to fix a reported issue?",
      answer: "Most minor repairs like street lighting or waste collection are addressed within 48 hours. Major repairs like road paving typically take 5-10 working days."
    },
    {
      question: "Will my identity be visible to the public?",
      answer: "No. Your personal details are only visible to the assigned government officer handling your case. Other citizens cannot see who submitted a specific complaint."
    },
    {
      question: "Can I report issues in other districts?",
      answer: "Yes. Our system uses GPS to automatically route your complaint to the correct local authority, regardless of where you are currently registered."
    },
    {
      question: "How do I know if my complaint is actually being worked on?",
      answer: "You can check the 'Status Timeline' in your complaint details. You will receive a notification every time an officer updates the status to 'In Progress' or 'Resolved'."
    },
    {
      question: "What if the authority provides an unsatisfactory resolution?",
      answer: "You can use the 'Chat with Authority' feature to request further clarification or reopen the discussion if the work was not completed properly."
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subTitle}>Frequently Asked Questions</Text>
        
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqCard}>
            <View style={styles.questionRow}>
              <Ionicons name="help-circle" size={20} color="#007AFF" />
              <Text style={styles.questionText}>{item.question}</Text>
            </View>
            <View style={styles.answerRow}>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still have questions?</Text>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>Contact Support</Text>
          </TouchableOpacity>
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
  subTitle: { fontSize: 14, fontWeight: 'bold', color: '#94A3B8', letterSpacing: 1, marginBottom: 20 },
  faqCard: { 
    backgroundColor: '#F8FAFC', 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  questionRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  questionText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginLeft: 10, 
    flex: 1 
  },
  answerRow: { 
    paddingLeft: 30, 
    borderLeftWidth: 2, 
    borderLeftColor: '#007AFF', 
    marginLeft: 9 
  },
  answerText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  contactSection: { marginTop: 30, alignItems: 'center', paddingBottom: 40 },
  contactTitle: { fontSize: 16, color: '#64748B', marginBottom: 15 },
  contactBtn: { 
    backgroundColor: '#0056D2', 
    paddingHorizontal: 30, 
    paddingVertical: 12, 
    borderRadius: 25 
  },
  contactBtnText: { color: '#fff', fontWeight: 'bold' }
});