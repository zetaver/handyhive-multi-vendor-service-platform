import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate dashboard if user doesn't have permission
    const dashboardPath = user.role === 'admin' 
      ? '/dashboard/admin'
      : user.role === 'provider'
      ? '/dashboard/provider'
      : '/dashboard/customer';
    
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}