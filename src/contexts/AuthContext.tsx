import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { MOCK_USERS } from '../types/auth';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      // Check mock users first
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        // Use mock authentication
        const { password: _, ...userWithoutPassword } = mockUser;
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return;
      }

      // Fallback to API authentication
      const { token, user } = await authAPI.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid email or password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    try {
      setError(null);
      setLoading(true);
      
      // For demo purposes, create a mock user
      const newUser = {
        id: Date.now().toString(),
        email: data.email,
        role: data.role,
        name: data.fullName || data.ownerName || data.businessName,
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    try {
      setError(null);
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}