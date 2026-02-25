import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewComplaintsScreen() {
  const [filter, setFilter] = useState('All');

  // Mock data matching your project requirements
  const complaints = [
    {
      id: '#SL-8821',
      title: 'Road Repair',
      status: 'PENDING',
      date: 'Oct 24, 2023',
      desc: '"Large pothole forming near the main junction causing traffic..." ',
      color: '#FF9F43',
      image: 'https://via.placeholder.com/100' // Replace with real asset later
    },
    {
      id: '#SL-8750',
      title: 'Waste Management',
      status: 'RESOLVED',
      date: 'Oct 20, 2023',
      desc: '"Garbage collection has been missed for 3 consecutive days..." ',
      color: '#28C76F',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: '#SL-8642',
      title: 'Street Lighting',
      status: 'IN PROGRESS',
      date: 'Oct 18, 2023',
      desc: '"Three lamps are out between Ward Place and Flower Road..." ',
      color: '#007AFF',
      progress: 0.6, // 60% completion for the progress bar
      image: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Search & Filter Icons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={22} color="#007AFF" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="filter" size={22} color="#007AFF" /></TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
          {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setFilter(tab)}
              style={[styles.filterTab, filter === tab && styles.filterTabActive]}
            >
              <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {complaints.map((item) => (
          <View key={item.id} style={styles.complaintCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.complaintId}>{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: item.color + '15' }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.complaintTitle}>{item.title}</Text>

            <View style={styles.bodyRow}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.details}>
                <Text style={styles.descText} numberOfLines={2}>{item.desc}</Text>
                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
            </View>

            {/* Progress Bar for "In Progress" items */}
            {item.status === 'IN PROGRESS' && (
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
              </View>
            )}

            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>
                {item.status === 'RESOLVED' ? 'View Outcome' : item.status === 'IN PROGRESS' ? 'Track Live Status' : 'View Tracking Details'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#1E293B" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Floating Action Button for New Complaint */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 15 },
  filterBar: { paddingHorizontal: 20, paddingBottom: 15 },
  filterTab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  filterTabActive: { backgroundColor: '#0056D2', borderColor: '#0056D2' },
  filterText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  listContent: { padding: 20, paddingBottom: 100 },
  complaintCard: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 15, elevation: 2, shadowOpacity: 0.05 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  complaintId: { fontSize: 12, fontWeight: 'bold', color: '#007AFF' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  complaintTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  bodyRow: { flexDirection: 'row', marginBottom: 15 },
  thumb: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#F1F5F9' },
  details: { flex: 1, marginLeft: 15 },
  descText: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dateText: { fontSize: 11, color: '#94A3B8', marginLeft: 5 },
  progressContainer: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginBottom: 15, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#007AFF' },
  actionBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12 },
  actionBtnText: { fontSize: 13, fontWeight: '600', color: '#1E293B', marginRight: 5 },
  fab: { position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: '#0056D2', justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#0056D2', shadowOpacity: 0.4, shadowRadius: 10 }
});