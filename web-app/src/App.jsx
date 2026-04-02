import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminComplaints from './pages/AdminComplaints'; 
import AdminAuthorities from './pages/AdminAuthorities';

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
      </Routes>
    </Router>
  );
}