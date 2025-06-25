import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthForm } from '../../components/AuthForm';
import type { UserRole, CustomerSignupData, ProviderSignupData } from '../../types/auth';
import { customerSignupSchema, providerSignupSchema } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';

export function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CustomerSignupData | ProviderSignupData) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const schema = role === 'provider' ? providerSignupSchema : customerSignupSchema;
      const validatedData = schema.parse(data);

      // Register user
      await register({ ...validatedData, role });

      // Navigate to dashboard
      navigate('/dashboard');
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

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose your account type
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select how you want to use KaamKonnect
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-4">
              <button
                onClick={() => setRole('customer')}
                className="relative w-full flex flex-col items-center justify-center py-6 px-4 border-2 border-indigo-600 rounded-lg shadow-sm text-lg font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <span className="block text-xl mb-2">👤</span>
                <span>I need services</span>
                <span className="text-sm font-normal mt-1 text-gray-500">Sign up as a Customer</span>
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <button
                onClick={() => setRole('provider')}
                className="relative w-full flex flex-col items-center justify-center py-6 px-4 border-2 border-indigo-600 rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <span className="block text-xl mb-2">💼</span>
                <span>I provide services</span>
                <span className="text-sm font-normal mt-1 text-indigo-100">Sign up as a Service Provider</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {role === 'provider' ? 'Service Provider Registration' : 'Customer Registration'}
            </h1>
            <p className="mt-2 text-gray-600">
              {role === 'provider' 
                ? 'Start offering your services on KaamKonnect'
                : 'Join KaamKonnect to find trusted service providers'
              }
            </p>
            <button
              onClick={() => setRole(undefined)}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Change account type
            </button>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AuthForm 
              type="signup" 
              role={role} 
              onSubmit={handleSubmit} 
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}