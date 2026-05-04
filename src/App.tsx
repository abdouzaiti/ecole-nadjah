/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import LiveClassPage from './pages/LiveClassPage';
import ReplaysPage from './pages/ReplaysPage';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/teacher" 
            element={
              <ProtectedRoute role="TEACHER">
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/student" 
            element={
              <ProtectedRoute role="STUDENT">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/live/:id" 
            element={
              <ProtectedRoute>
                <LiveClassPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/replays" 
            element={
              <ProtectedRoute>
                <ReplaysPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

