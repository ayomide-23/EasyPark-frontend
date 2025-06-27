import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Layouts
import UserLayout from './templates/UserLayout';
import AdminLayout from './templates/AdminLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SlotGrid from './pages/SlotGrid';
import Reservations from './pages/Reservations';
import Payment from './pages/Payment'
import Notifications from './pages/Notification';
import AdminDashboard from './pages/AdminDashboard';

// Components
import ProtectedRoute from './components/protectedroute';

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*USER routes with layout */}
        <Route
          element={
            <ProtectedRoute role="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/slotgrid" element={<SlotGrid />} />
          <Route path="/reservations" element={<Reservations/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/notifications" element={<Notifications/>} />
        </Route>

        {/*ADMIN routes with layout */}
        <Route
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admindashboard" element={<AdminDashboard />} />
          {/* Add more admin routes here if needed */}
        </Route>

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
