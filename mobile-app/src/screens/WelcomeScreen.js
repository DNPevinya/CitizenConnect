import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <LinearGradient colors={['#9C2CF3', '#3A49F9']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          
          {/* Top Section */}
          <View style={styles.topSection}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="account-balance" size={60} color="#fff" />
            </View>
            <Text style={styles.title}>CitizenConnect</Text>
            <Text style={styles.description}>
              Report Public Issues Easily and Transparently
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.infoBox}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#3A49F9" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Your feedback helps build a better Sri Lanka. Direct connection to urban authorities.
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={onGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#3A49F9" />
            </TouchableOpacity>

            {/* Smaller Footer Text */}
            <Text style={styles.footerText}>AN INITIATIVE FOR A BETTER SRI LANKA</Text>
          </View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 40, 
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 26,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, 
    width: '100%',
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: '#2c3e50',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 18,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#3A49F9',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 10, // Made smaller
    letterSpacing: 1.5,
    marginTop: 35,
    opacity: 0.7,
    fontWeight: '600',
    textAlign: 'center',
  },
});