import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen({ onBack }) {
  const [name, setName] = useState('Nilasi Pevinya');
  const [phone, setPhone] = useState('+94 77 123 4567');
  const [district, setDistrict] = useState('Colombo');
  const [division, setDivision] = useState('Bambalapitiya');
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#0160C9" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBtn}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Labels are blue, but input content is BLACK */}
        <EditableField label="FULL NAME" icon="person-outline" value={name} onChange={setName} />
        <EditableField label="PHONE NUMBER" icon="call-outline" value={phone} onChange={setPhone} keyboardType="phone-pad" />
        
        <Text style={styles.label}>DISTRICT</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={styles.selectorText}>{district}</Text>
          <Ionicons name="chevron-down" size={20} color="#0D85D8" />
        </TouchableOpacity>

        <Text style={styles.label}>DIVISION/AREA</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={styles.selectorText}>{division}</Text>
          <Ionicons name="chevron-down" size={20} color="#0D85D8" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>CHANGE PASSWORD</Text>
        
        <PasswordField 
          label="CURRENT PASSWORD" 
          value={oldPassword} 
          onChange={setOldPassword} 
          visible={showPass.old} 
          onToggle={() => setShowPass({...showPass, old: !showPass.old})} 
        />

        <PasswordField 
          label="NEW PASSWORD" 
          value={newPassword} 
          onChange={setNewPassword} 
          visible={showPass.new} 
          onToggle={() => setShowPass({...showPass, new: !showPass.new})} 
        />

        <PasswordField 
          label="CONFIRM NEW PASSWORD" 
          value={confirmPassword} 
          onChange={setConfirmPassword} 
          visible={showPass.confirm} 
          onToggle={() => setShowPass({...showPass, confirm: !showPass.confirm})} 
        />

        <TouchableOpacity style={styles.updateBtn} onPress={onBack}>
          <Text style={styles.updateBtnText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const EditableField = ({ label, icon, value, onChange, keyboardType }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#1CA3DE" style={styles.inputIcon} />
      <TextInput style={styles.input} value={value} onChangeText={onChange} keyboardType={keyboardType} />
    </View>
  </View>
);

const PasswordField = ({ label, value, onChange, visible, onToggle }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Ionicons name="lock-closed-outline" size={20} color="#1CA3DE" style={styles.inputIcon} />
      <TextInput style={styles.input} value={value} onChangeText={onChange} secureTextEntry={!visible} placeholder="••••••••" placeholderTextColor="#94A3B8" />
      <TouchableOpacity onPress={onToggle}>
        <Ionicons name={visible ? "eye-off-outline" : "eye-outline"} size={20} color="#64748B" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backBtn: { flexDirection: 'row', alignItems: 'center', width: 60 },
  backText: { color: '#0160C9', fontSize: 16, marginLeft: 5 }, // True Blue
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#0041C7' }, // Absolute Zero
  content: { padding: 25 },
  imageSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F1F5F9' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0D85D8', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  label: { fontSize: 11, fontWeight: 'bold', color: '#0D85D8', marginBottom: 8, marginTop: 15 }, // Blue Cola
  sectionHeader: { fontSize: 13, fontWeight: 'bold', color: '#0041C7', marginTop: 20, marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#3ACBE8', paddingHorizontal: 15, height: 50 }, // Picton Blue border
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: '#000000' }, // BLACK TEXT
  selector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#3ACBE8', paddingHorizontal: 15, height: 50 },
  selectorText: { fontSize: 15, color: '#000000' }, // BLACK TEXT
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 20 },
  updateBtn: { backgroundColor: '#0041C7', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 40 }, // Absolute Zero
  updateBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});