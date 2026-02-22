import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoadingScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#9C2CF3', '#3A49F9']} style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="account-balance" size={70} color="#fff" />
        </View>
        <Text style={styles.logoText}>CitizenConnect</Text>
      </View>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.loadingText}>Initializing System...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 14,
    letterSpacing: 1,
    opacity: 0.8,
  },
});