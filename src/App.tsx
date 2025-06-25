import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './views/auth/Login';
import { Signup } from './views/auth/Signup';
import { Dashboard as AdminDashboard } from './views/admin/Dashboard';
import { Users } from './views/admin/Users';
import { Services } from './views/admin/Services';
import { Reports } from './views/admin/Reports';
import { Analytics } from './views/admin/Analytics';
import { AdminNotifications } from './views/admin/Notifications';
import { AdminSettings } from './views/admin/Settings';
import { Dashboard as ProviderDashboard } from './views/provider/Dashboard';
import { Dashboard as CustomerDashboard } from './views/customer/Dashboard';
import { LandingPage } from './views/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { CustomerLayout } from './layouts/CustomerLayout';
import { ProviderLayout } from './layouts/ProviderLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Bookings } from './views/dashboard/Bookings';
import { ServiceRequests } from './views/dashboard/ServiceRequests';
import { Notifications } from './views/dashboard/Notifications';
import { Settings } from './views/dashboard/Settings';
import { ProviderServices } from './views/provider/Services';
import { ProviderEarnings } from './views/provider/Earnings';
import { ProviderReviews } from './views/provider/Reviews';
import { AdminLogin } from './views/admin/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Customer Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerLayout />
            </ProtectedRoute>
          }>
            <Route path="customer" element={<CustomerDashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="requests" element={<ServiceRequests />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route index element={<Navigate to="customer" replace />} />
          </Route>

          {/* Provider Dashboard Routes */}
          <Route path="/dashboard/provider" element={
            <ProtectedRoute allowedRoles={['provider']}>
              <ProviderLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ProviderDashboard />} />
            <Route path="services" element={<ProviderServices />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="earnings" element={<ProviderEarnings />} />
            <Route path="reviews" element={<ProviderReviews />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="services" element={<Services />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/" element={<LandingPage />} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;