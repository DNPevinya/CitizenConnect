import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ onLoginSuccess, onCreateAccount }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="account-balance" size={50} color="#3A49F9" />
          </View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Log in to report a complaint or provide feedback to Sri Lanka Urban Public Services.
          </Text>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Email or Phone Number</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="e.g. 071 234 5678"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.rememberRow}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Keep me logged in</Text>
          </TouchableOpacity>

          {/* Gradient Login Button */}
          <TouchableOpacity onPress={onLoginSuccess}>
            <LinearGradient 
              colors={['#9C2CF3', '#3A49F9']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.orText}>OR LOGIN WITH</Text>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="person-circle-outline" size={40} color="#333" />
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.noAccountText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onCreateAccount}>
              <Text style={styles.signupLink}>Create an Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.securityRow}>
            <MaterialIcons name="security" size={14} color="#888" />
            <Text style={styles.securityText}>SECURE ENCRYPTED CONNECTION</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 15,
  },
  forgotText: {
    fontSize: 14,
    color: '#3A49F9',
    fontWeight: '600',
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 10,
  },
  rememberText: {
    fontSize: 14,
    color: '#64748B',
  },
  button: {
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#3A49F9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  orText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 15,
  },
  socialIcon: {
    marginBottom: 30,
  },
  signupRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  noAccountText: {
    color: '#64748B',
    fontSize: 14,
  },
  signupLink: {
    color: '#3A49F9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: 'bold',
    marginLeft: 5,
    letterSpacing: 0.5,
  },
});