import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ onNavigateToSubmit, onNavigateToView, onNavigateToNotifications }) {
  const [stats] = useState({ total: 12, pending: 4, resolved: 8 });
  const [activities] = useState([
    { id: 1, title: 'Waste Management', desc: 'Complaint #CMB-4920 resolved.', time: '2H AGO', color: '#28C76F', icon: 'check-circle-outline' },
    { id: 2, title: 'Street Light Repair', desc: 'Assigned to Urban Dept.', time: 'YESTERDAY', color: '#FF9F43', icon: 'alert-circle-outline' },
  ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Ayubowan Nilasi,</Text>
          <Text style={styles.headerTitle}>Home Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn} onPress={onNavigateToNotifications}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatCard label="TOTAL" value={stats.total} color="#3A49F9" />
          <StatCard label="PENDING" value={stats.pending} color="#FF9F43" />
          <StatCard label="RESOLVED" value={stats.resolved} color="#28C76F" />
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onNavigateToSubmit}>
          <LinearGradient colors={['#9C2CF3', '#3A49F9']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.primaryAction}>
            <View style={styles.actionIconContainer}><Ionicons name="add-circle-outline" size={24} color="#fff" /></View>
            <Text style={styles.primaryActionText}>Submit New Complaint</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.7} onPress={onNavigateToView}>
          <View style={[styles.actionIconContainer, { backgroundColor: '#E0E7FF' }]}><Ionicons name="list-outline" size={24} color="#3A49F9" /></View>
          <Text style={styles.secondaryActionText}>View My Complaints</Text>
          <Ionicons name="chevron-forward" size={20} color="#64748B" />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity><Text style={styles.seeAllLink}>See all</Text></TouchableOpacity>
        </View>
        
        {activities.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}

        <Text style={styles.sectionTitle}>Nearby Services</Text>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={{ latitude: 6.9271, longitude: 79.8612, latitudeDelta: 0.05, longitudeDelta: 0.05 }}><Marker coordinate={{ latitude: 6.9271, longitude: 79.8612 }} /></MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const StatCard = ({ label, value, color }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </View>
);

const ActivityItem = ({ title, desc, time, icon, iconColor }) => (
  <View style={styles.activityCard}>
    <View style={[styles.activityIconCircle, { backgroundColor: iconColor + '20' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
    </View>
    <View style={styles.activityInfo}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDesc}>{desc}</Text>
    </View>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 10 },
  greetingText: { fontSize: 13, color: '#64748B' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  notificationBtn: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  notificationDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statCard: { width: '31%', backgroundColor: '#fff', padding: 15, borderRadius: 18, elevation: 2 },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: '#94A3B8', marginBottom: 5 },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginTop: 25, marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAllLink: { color: '#3A49F9', fontWeight: 'bold', marginTop: 10 },
  primaryAction: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 18, elevation: 4 },
  secondaryAction: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 18, backgroundColor: '#fff', marginTop: 12, elevation: 2 },
  actionIconContainer: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  primaryActionText: { flex: 1, color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryActionText: { flex: 1, color: '#1E293B', fontSize: 16, fontWeight: '600' },
  activityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 18, marginTop: 12 },
  activityIconCircle: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  activityDesc: { fontSize: 12, color: '#64748B' },
  activityTime: { fontSize: 10, color: '#94A3B8', fontWeight: 'bold' },
  mapContainer: { height: 200, borderRadius: 20, overflow: 'hidden', marginTop: 5, borderWidth: 1, borderColor: '#E2E8F0' },
  map: { width: '100%', height: '100%' },
});