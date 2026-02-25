import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComplaintDetailsScreen({ onBack, onNavigateToChat }) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const complaint = {
    id: '#SL-8923',
    district: 'COLOMBO DISTRICT',
    title: 'Pothole on Galle Road',
    location: 'Bambalapitiya Junction, Colombo 04',
    status: 'IN PROGRESS',
    description: "Large pothole near the main junction. It's causing traffic congestion and is dangerous for motorcyclists at night.",
    authority: 'Colombo Municipal Council'
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header themed with Absolute Zero */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#0041C7" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerId}>Complaint {complaint.id}</Text>
          <Text style={styles.headerDistrict}>{complaint.district}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="#0160C9" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Badge using Picton Blue tint */}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{complaint.status}</Text>
        </View>
        <Text style={styles.mainTitle}>{complaint.title}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#0D85D8" />
          <Text style={styles.locationText}>{complaint.location}</Text>
        </View>

        {/* Main Image View */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.mainImage} />
          <TouchableOpacity style={styles.viewPhotoBtn}>
            <Ionicons name="search" size={14} color="#fff" />
            <Text style={styles.viewPhotoText}>VIEW PHOTO</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>DESCRIPTION</Text>
        <Text style={styles.descriptionText}>{complaint.description}</Text>

        {/* Assigned Authority Box themed with True Blue */}
        <View style={styles.authorityBox}>
          <View style={styles.authorityIconCircle}>
            <MaterialCommunityIcons name="office-building" size={24} color="#fff" />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.authLabel}>ASSIGNED AUTHORITY</Text>
            <Text style={styles.authName}>{complaint.authority}</Text>
          </View>
        </View>

        {/* Status Timeline using Absolute Zero */}
        <Text style={styles.sectionLabel}>STATUS TIMELINE</Text>
        <TimelineItem title="Complaint Submitted" date="Oct 24, 2025" done />
        <TimelineItem title="Assigned to Road Maintenance" date="Oct 24, 2025" done />
        <TimelineItem title="Work In Progress" date="Oct 25, 2025" done active />
        <TimelineItem title="Resolved" date="Pending completion" done={false} last />
      </ScrollView>

      {/* Action Dropdown themed with Battery Charged Blue */}
      {isMenuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
            <Text style={[styles.menuText, { color: '#EF4444' }]}>Cancel Complaint</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={20} color="#1CA3DE" />
            <Text style={styles.menuText}>Report a Delay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Persistent Footer themed with Absolute Zero */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatBtn} onPress={onNavigateToChat}>
          <Ionicons name="chatbubbles" size={20} color="#fff" />
          <Text style={styles.chatBtnText}>Chat with Authority</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.moreBtn} 
          onPress={() => setMenuVisible(!isMenuVisible)}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#0041C7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const TimelineItem = ({ title, date, done, last, active }) => (
  <View style={styles.tlRow}>
    <View style={styles.tlLeft}>
      <View style={[styles.tlDot, { backgroundColor: done ? '#0041C7' : '#E2E8F0' }]}>
        {done && <Ionicons name="checkmark" size={12} color="#fff" />}
      </View>
      {!last && <View style={styles.tlLine} />}
    </View>
    <View style={styles.tlRight}>
      <Text style={[styles.tlTitle, active && { color: '#0160C9' }]}>{title}</Text>
      <Text style={styles.tlDate}>{date}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitleContainer: { alignItems: 'center' },
  headerId: { fontSize: 14, fontWeight: 'bold', color: '#0041C7' },
  headerDistrict: { fontSize: 10, color: '#0D85D8', letterSpacing: 1 },
  scrollContent: { padding: 25, paddingBottom: 120 },
  statusBadge: { backgroundColor: 'rgba(58, 203, 232, 0.15)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  statusText: { color: '#0160C9', fontSize: 10, fontWeight: 'bold' },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  locationText: { color: '#64748B', fontSize: 13, marginLeft: 5 },
  imageContainer: { borderRadius: 15, overflow: 'hidden', marginBottom: 25, borderWidth: 1, borderColor: '#3ACBE8' },
  mainImage: { width: '100%', height: 200, backgroundColor: '#F1F5F9' },
  viewPhotoBtn: { position: 'absolute', bottom: 15, right: 15, backgroundColor: 'rgba(0,65,199,0.7)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  viewPhotoText: { color: '#fff', fontSize: 10, fontWeight: 'bold', marginLeft: 5 },
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#0160C9', letterSpacing: 1, marginBottom: 15, marginTop: 10 },
  descriptionText: { fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 25 },
  authorityBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(58, 203, 232, 0.1)', padding: 20, borderRadius: 15, marginBottom: 30 },
  authorityIconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0160C9', justifyContent: 'center', alignItems: 'center' },
  authLabel: { fontSize: 10, fontWeight: 'bold', color: '#0160C9' },
  authName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  tlRow: { flexDirection: 'row' },
  tlLeft: { alignItems: 'center', width: 30 },
  tlDot: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  tlLine: { width: 2, flex: 1, backgroundColor: '#3ACBE8', marginTop: -2, marginBottom: -2 },
  tlRight: { marginLeft: 15, paddingBottom: 25 },
  tlTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  tlDate: { fontSize: 12, color: '#94A3B8' },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F1F5F9', backgroundColor: '#fff', paddingBottom: 35 },
  chatBtn: { flex: 1, backgroundColor: '#0041C7', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 55 },
  chatBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  moreBtn: { width: 55, height: 55, backgroundColor: 'rgba(58, 203, 232, 0.1)', borderRadius: 12, marginLeft: 15, justifyContent: 'center', alignItems: 'center' },
  dropdown: { position: 'absolute', bottom: 100, right: 20, backgroundColor: '#fff', borderRadius: 12, elevation: 5, width: 200, borderWidth: 1, borderColor: '#3ACBE8', overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  menuText: { marginLeft: 10, fontWeight: '500', color: '#1E293B' },
  menuDivider: { height: 1, backgroundColor: '#F1F5F9' }
});