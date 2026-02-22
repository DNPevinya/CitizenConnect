import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SignupScreen({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    district: '',
    division: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="account-balance" size={40} color="#3A49F9" />
            </View>
            <Text style={styles.title}>Create New Account</Text>
            <Text style={styles.subtitle}>Join the urban service feedback system to improve our city.</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Sunil Perera" onChangeText={(val) => setFormData({...formData, fullName: val})} />
            </View>

            <Text style={styles.label}>PHONE NUMBER</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+94</Text>
              <TextInput style={styles.input} placeholder="77 123 4567" keyboardType="phone-pad" />
            </View>

            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" />
            </View>

            <Text style={styles.label}>DISTRICT</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.placeholderText}>Select your district</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </View>

            <Text style={styles.label}>DIVISION/AREA</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.placeholderText}>Select your division</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </View>

            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Create a strong password" secureTextEntry />
              <Ionicons name="eye-off-outline" size={20} color="#666" />
            </View>
            <Text style={styles.helperText}>Must be at least 8 characters long</Text>

            <TouchableOpacity style={styles.checkboxRow}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxText}>I agree to the <Text style={styles.link}>User Terms of Service</Text> and <Text style={styles.link}>Data Protection Policy</Text>.</Text>
            </TouchableOpacity>

            {/* Gradient Button */}
            <TouchableOpacity>
              <LinearGradient colors={['#9C2CF3', '#3A49F9']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already a member? </Text>
              <TouchableOpacity onPress={onBackToLogin}>
                <Text style={styles.loginLink}>Sign In Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 25 },
  header: { alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 70, height: 70, borderRadius: 18, backgroundColor: '#E0E7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  subtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', paddingHorizontal: 20 },
  form: { marginTop: 10 },
  label: { fontSize: 11, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 15, height: 50 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1E293B' },
  countryCode: { fontSize: 15, color: '#64748B', fontWeight: 'bold', marginRight: 10, borderRightWidth: 1, borderRightColor: '#E2E8F0', paddingRight: 10 },
  placeholderText: { flex: 1, color: '#94A3B8', fontSize: 15 },
  helperText: { fontSize: 11, color: '#94A3B8', marginTop: 5 },
  checkboxRow: { flexDirection: 'row', marginTop: 20, marginBottom: 25 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#CBD5E1', marginRight: 10 },
  checkboxText: { flex: 1, fontSize: 12, color: '#64748B' },
  link: { color: '#3A49F9', fontWeight: 'bold' },
  button: { height: 55, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 20 },
  footerText: { color: '#64748B' },
  loginLink: { color: '#3A49F9', fontWeight: 'bold' }
});