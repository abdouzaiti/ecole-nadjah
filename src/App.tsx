/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import SplashScreen from './SplashScreen';
import { motion, AnimatePresence } from 'motion/react';
import { ChatBot } from './components/ChatBot';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BlueBackground } from './components/layout/BlueBackground';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

function AppRoutes() {
  const { i18n } = useTranslation();
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Lock scroll when splash is showing
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [i18n.language, showSplash]);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />
      ) : (
        <motion.div 
          key="main-app" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="min-h-screen bg-white flex flex-col relative overflow-x-hidden"
        >
          <BlueBackground />
          <Navbar />
          <ErrorBoundary componentName="ChatBot" fallback={null}>
            <ChatBot />
          </ErrorBoundary>
          <main className="flex-grow pt-20">
            <ErrorBoundary componentName="Main Content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                
                <Route 
                  path="/dashboard/admin/*" 
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
            </ErrorBoundary>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
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

