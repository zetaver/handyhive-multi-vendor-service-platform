import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { AuthForm } from '../../components/AuthForm';
import type { LoginFormData } from '../../types/auth';
import { loginSchema } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);

      // Validate the form data
      const validatedData = loginSchema.parse(data);

      // Login user
      await login(validatedData.email, validatedData.password);

      // Get the redirect path from location state or default to dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
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