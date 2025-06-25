import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthForm } from '../../components/AuthForm';
import type { LoginFormData } from '../../types/auth';
import { loginSchema } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const validatedData = loginSchema.parse(data);
      await login(validatedData.email, validatedData.password);
      // Check if user is admin
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.role !== 'admin') {
        setError('Access denied: Not an admin account.');
        return;
      }
      navigate('/dashboard/admin', { replace: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-16 pb-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-gray-600">Sign in to your admin account</p>
        </div>
        <AuthForm 
          type="login" 
          onSubmit={handleSubmit} 
          error={error} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
} 