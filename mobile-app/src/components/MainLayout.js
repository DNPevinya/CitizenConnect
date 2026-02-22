import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MainLayout({ children, currentTab, onTabPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>

      <View style={styles.tabBar}>
        <TabItem icon="home" label="Home" active={currentTab === 'dashboard'} onPress={() => onTabPress('dashboard')} />
        <TabItem icon="list" label="Complaints" active={currentTab === 'view_complaints'} onPress={() => onTabPress('view_complaints')} />
        <TabItem icon="notifications" label="Alerts" active={currentTab === 'notifications'} onPress={() => onTabPress('notifications')} />
        <TabItem icon="person" label="Profile" active={currentTab === 'profile'} onPress={() => onTabPress('profile')} />
      </View>
    </View>
  );
}

const TabItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <Ionicons name={active ? icon : `${icon}-outline`} size={24} color={active ? '#3A49F9' : '#94A3B8'} />
    <Text style={[styles.tabLabel, { color: active ? '#3A49F9' : '#94A3B8' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: { height: 85, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingBottom: 20 },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 4, fontWeight: '600' }
});