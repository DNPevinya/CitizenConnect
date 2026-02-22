import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

export default function SubmitComplaintScreen({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('Infrastructure');

  const categories = [
    { id: '1', label: 'Infrastructure', icon: 'office-building' },
    { id: '2', label: 'Electricity Services', icon: 'flash' },
    { id: '3', label: 'Sanitation', icon: 'delete' },
    { id: '4', label: 'Public Works', icon: 'hammer-wrench' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Complaint</Text>
        <View style={{ width: 60 }} /> {/* Spacer for centering title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Category Selection */}
        <Text style={styles.label}>SELECT CATEGORY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.categoryCard, selectedCategory === cat.label && styles.categoryCardActive]}
              onPress={() => setSelectedCategory(cat.label)}
            >
              <MaterialCommunityIcons 
                name={cat.icon} 
                size={28} 
                color={selectedCategory === cat.label ? '#fff' : '#007AFF'} 
              />
              <Text style={[styles.categoryLabel, selectedCategory === cat.label && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Complaint Type Picker */}
        <Text style={styles.label}>COMPLAINT TYPE</Text>
        <TouchableOpacity style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Broken road / Pothole</Text>
          <Ionicons name="chevron-down" size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Description Input */}
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput 
          style={styles.textArea} 
          placeholder="Describe the issue in detail. Include specific landmarks if possible..." 
          multiline 
          numberOfLines={5}
        />

        {/* Photo Upload Section */}
        <Text style={styles.label}>ADD PHOTOS</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={styles.addPhotoBox}>
            <Ionicons name="camera-outline" size={30} color="#94A3B8" />
            <Text style={styles.addPhotoLabel}>Add Photo</Text>
          </TouchableOpacity>
          
          {/* Mockup of an uploaded photo */}
          <View style={styles.photoPreview}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.imageThumb} />
            <TouchableOpacity style={styles.removePhoto}>
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.emptyPhotoBox} />
        </View>
        <Text style={styles.helperText}>You can upload up to 3 photos of the issue.</Text>

        {/* Location Section */}
        <Text style={styles.label}>LOCATION</Text>
        <View style={styles.locationContainer}>
          <View style={styles.locationInfo}>
            <Ionicons name="location" size={20} color="#007AFF" />
            <Text style={styles.locationText}>Current Location captured</Text>
            <TouchableOpacity><Ionicons name="refresh" size={18} color="#94A3B8" /></TouchableOpacity>
          </View>
          <Text style={styles.coordsText}>Colombo, Sri Lanka (6.9271° N, 79.8612° E)</Text>
          
          <View style={styles.miniMapContainer}>
            <MapView 
              style={styles.miniMap}
              initialRegion={{
                latitude: 6.9271,
                longitude: 79.8612,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
            >
              <Marker coordinate={{ latitude: 6.9271, longitude: 79.8612 }} />
            </MapView>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Complaint</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: '#007AFF', fontSize: 16, marginLeft: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  scrollContent: { padding: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginTop: 20, marginBottom: 10 },
  categoryContainer: { flexDirection: 'row' },
  categoryCard: { width: 100, height: 100, borderRadius: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12, elevation: 2, shadowOpacity: 0.05 },
  categoryCardActive: { backgroundColor: '#0056D2', borderColor: '#0056D2' },
  categoryLabel: { fontSize: 10, marginTop: 8, color: '#1E293B', textAlign: 'center' },
  categoryLabelActive: { color: '#fff', fontWeight: 'bold' },
  pickerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  pickerText: { fontSize: 15, color: '#1E293B' },
  textArea: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 15, fontSize: 15, color: '#1E293B', textAlignVertical: 'top', borderWidth: 1, borderColor: '#F1F5F9' },
  photoRow: { flexDirection: 'row', marginTop: 5 },
  addPhotoBox: { width: 90, height: 90, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  addPhotoLabel: { fontSize: 10, color: '#94A3B8', marginTop: 5 },
  photoPreview: { width: 90, height: 90, borderRadius: 12, marginLeft: 12, position: 'relative' },
  imageThumb: { width: '100%', height: '100%', borderRadius: 12 },
  removePhoto: { position: 'absolute', top: -5, right: -5, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  emptyPhotoBox: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#F8FAFC', marginLeft: 12 },
  helperText: { fontSize: 11, color: '#94A3B8', marginTop: 8 },
  locationContainer: { backgroundColor: '#E0F2FE', borderRadius: 15, padding: 15 },
  locationInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  locationText: { flex: 1, fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  coordsText: { fontSize: 11, color: '#0369A1', marginLeft: 28, marginTop: 2 },
  miniMapContainer: { height: 120, borderRadius: 12, overflow: 'hidden', marginTop: 15 },
  miniMap: { width: '100%', height: '100%' },
  submitButton: { backgroundColor: '#0056D2', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 30, marginBottom: 20, elevation: 4 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});