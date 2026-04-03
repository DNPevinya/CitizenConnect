import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminComplaints from './pages/AdminComplaints'; 
import AdminAuthorities from './pages/AdminAuthorities';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminAnalytics from './pages/AdminAnalytics';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/complaints" element={<AdminComplaints />} />
        <Route path="/authorities" element={<AdminAuthorities />} />
        <Route path="/users" element={<AdminUserManagement />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}