import React from 'react';
import { StyleSheet, Text, View, FlatPath, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationScreen({ onBack }) {
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: 'Complaint Resolved',
      message: 'Your complaint #CMB-4920 (Waste Management) has been marked as resolved.',
      time: '2 hours ago',
      type: 'success',
      icon: 'check-circle',
    },
    {
      id: 2,
      title: 'Engineer Assigned',
      message: 'An officer from the Urban Development Dept has been assigned to your request.',
      time: 'Yesterday',
      type: 'info',
      icon: 'account-hard-hat',
    },
    {
      id: 3,
      title: 'New Comment',
      message: 'The Road Authority added a comment to your report: "Work will start on Monday."',
      time: '2 days ago',
      type: 'comment',
      icon: 'message-text-outline',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient colors={['#9C2CF3', '#3A49F9']} style={styles.header}>
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.listContent}>
        {notifications.map((item) => (
          <TouchableOpacity key={item.id} style={styles.notificationCard}>
            <View style={[styles.iconContainer, styles[item.type + 'Icon']]}>
              <MaterialCommunityIcons name={item.icon} size={24} color={styles[item.type + 'Color'].color} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
              </View>
              <Text style={styles.notifMessage} numberOfLines={2}>
                {item.message}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  markReadText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
  listContent: { padding: 20 },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconContainer: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  notifTime: { fontSize: 11, color: '#94A3B8' },
  notifMessage: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  
  // Dynamic Icon Colors
  successIcon: { backgroundColor: '#E8F9F1' },
  successColor: { color: '#28C76F' },
  infoIcon: { backgroundColor: '#E0E7FF' },
  infoColor: { color: '#3A49F9' },
  commentIcon: { backgroundColor: '#FFF7ED' },
  commentColor: { color: '#FF9F43' },
});