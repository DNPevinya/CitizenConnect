import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViewComplaintsScreen({ onNavigateToDetails }) {
  const [filter, setFilter] = useState('All');
  
  // Data reflects your project statuses
  const complaints = [
    { 
        id: '#SL-8821', 
        title: 'Road Repair', 
        status: 'PENDING', 
        date: 'Oct 24, 2025', 
        desc: 'Large pothole forming near the main junction causing traffic...', 
        color: '#FF9F43', // Warning Orange for Pending
        image: 'https://via.placeholder.com/150' 
    },
    { 
        id: '#SL-8750', 
        title: 'Waste Management', 
        status: 'RESOLVED', 
        date: 'Oct 20, 2025', 
        desc: 'Garbage collection has been missed for 3 consecutive days...', 
        color: '#28C76F', // Success Green for Resolved
        image: 'https://via.placeholder.com/150' 
    },
    { 
        id: '#SL-8642', 
        title: 'Street Lighting', 
        status: 'IN PROGRESS', 
        date: 'Oct 18, 2025', 
        desc: 'Three lamps are out between Ward Place and Flower Road...', 
        color: '#0160C9', // True Blue for active work
        progress: 0.6, 
        image: 'https://via.placeholder.com/150' 
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Section themed with Absolute Zero */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="search" size={22} color="#0041C7" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="filter" size={22} color="#0041C7" /></TouchableOpacity>
        </View>
      </View>

      {/* Status Filter Tabs using Absolute Zero */}
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

      {/* Complaints List Section */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {complaints.map((item) => (
          <View key={item.id} style={styles.complaintCard}>
            {/* ID and Status Badge themed with True Blue */}
            <View style={styles.cardHeader}>
              <Text style={styles.complaintId}>{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: item.color + '15' }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.complaintTitle}>{item.title}</Text>
            
            {/* Card Body with Thumbnail Image */}
            <View style={styles.cardBody}>
              <Image source={{ uri: item.image }} style={styles.thumbImage} />
              <View style={styles.textContainer}>
                <Text style={styles.descText} numberOfLines={3}>{item.desc}</Text>
                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
            </View>
            
            {/* Progress Bar themed with Blue Cola */}
            {item.status === 'IN PROGRESS' && (
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '60%' }]} />
              </View>
            )}

            {/* Unified View Details Button with Picton Blue tint */}
            <TouchableOpacity style={styles.viewDetailsBtn} onPress={onNavigateToDetails}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Ionicons name="chevron-forward" size={14} color="#0041C7" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  filterTab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#3ACBE8' }, // Picton Blue border
  filterTabActive: { backgroundColor: '#0041C7', borderColor: '#0041C7' }, // Absolute Zero
  filterText: { fontSize: 13, color: '#0D85D8', fontWeight: '500' }, // Blue Cola
  filterTextActive: { color: '#fff' },
  listContent: { padding: 20, paddingBottom: 60 },
  complaintCard: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 15, elevation: 2, shadowOpacity: 0.05, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  complaintId: { fontSize: 12, fontWeight: 'bold', color: '#0160C9' }, // True Blue
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold' },
  complaintTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  cardBody: { flexDirection: 'row', marginBottom: 15 },
  thumbImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#3ACBE8' },
  textContainer: { flex: 1, marginLeft: 15 },
  descText: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dateText: { fontSize: 11, color: '#94A3B8', marginLeft: 5 },
  progressContainer: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginBottom: 15, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#0D85D8' }, // Blue Cola
  viewDetailsBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(58, 203, 232, 0.1)', padding: 12, borderRadius: 12 }, // Tinted Picton Blue
  viewDetailsText: { fontSize: 13, color: '#0041C7', fontWeight: 'bold', marginRight: 5 } // Absolute Zero
});