import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingScreen({ onFinish }) {
  // --- Animation Setup ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Start the fade and scale animations at the same time
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // 1 second fade in
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5, // Adds a slight, elegant bounce
        useNativeDriver: true,
      })
    ]).start();

    // Move to the next screen after 2.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0041C7', '#0D85D8']} style={styles.container}>
      
      {/* The Animated Wrapper */}
      <Animated.View style={[
        styles.logoContainer, 
        { 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }] 
        }
      ]}>
        
        {/* White circle to frame your logo perfectly */}
        <View style={styles.iconCircle}>
          <Image 
            source={require('../../assets/images/smartlogo.png')} 
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Updated to the new project name */}
        <Text style={styles.logoText}>SmartNagara</Text>
      </Animated.View>
      
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" style={{ marginBottom: 15 }} />
        <Text style={styles.loadingText}>Initializing System...</Text>
      </Animated.View>

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
    marginBottom: 50,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70, // Makes it a perfect circle
    backgroundColor: '#ffffff', // Solid white to contrast the blue gradient
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, // Adds a nice drop shadow on Android
    overflow: 'hidden', // Keeps the image inside the circle
  },
  logoImage: {
    width: '75%', 
    height: '75%',
  },
  logoText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 2,
    opacity: 0.9,
    fontWeight: '600',
  },
});