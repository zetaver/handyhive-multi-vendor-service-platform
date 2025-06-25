import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, MapPin, Clock } from 'lucide-react';
import { LocationInput } from './LocationInput';
import type { UserRole } from '../types/auth';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  required?: boolean;
}

interface AuthFormProps {
  type: 'login' | 'signup';
  role?: UserRole;
  onSubmit: (data: any) => void;
  error?: string;
  isLoading?: boolean;
}

const serviceCategories = [
  'Home Cleaning',
  'Appliance Repair',
  'Plumbing',
  'Electrical',
  'Painting',
  'Carpentry',
  'Beauty & Spa',
  'Professional Services',
];

export function AuthForm({ type, role, onSubmit, error, isLoading }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    fullName: '',
    phone: '',
    businessName: '',
    ownerName: '',
    serviceCategory: '',
    address: '',
    location: {
      address: '',
      coordinates: [0, 0] as [number, number]
    },
    licenseNumber: '',
    description: '',
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleLocationSelect = (location: { address: string; coordinates: [number, number] }) => {
    setFormData(prev => ({
      ...prev,
      location,
      address: location.address
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const loginFields: FormField[] = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', icon: Mail },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: Lock },
  ];

  const customerFields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', icon: User },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', icon: Mail },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: Lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', icon: Lock },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', icon: Phone },
  ];

  const providerFields: FormField[] = [
    { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Enter your business name', icon: Building2 },
    { name: 'ownerName', label: 'Owner Name', type: 'text', placeholder: 'Enter owner\'s full name', icon: User },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter business email', icon: Mail },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', icon: Lock },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', icon: Lock },
    { name: 'phone', label: 'Business Phone', type: 'tel', placeholder: 'Enter business phone', icon: Phone },
    { name: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter business license number', icon: Building2 },
  ];

  const fields = type === 'login' ? loginFields : (role === 'provider' ? providerFields : customerFields);

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <field.icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={field.name}
                name={field.name}
                type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                required={field.required !== false}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData] as string}
                onChange={handleChange}
                disabled={isLoading}
              />
              {field.type === 'password' && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {type === 'signup' && role === 'provider' && (
          <>
            <div>
              <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
                Service Category
              </label>
              <select
                id="serviceCategory"
                name="serviceCategory"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={formData.serviceCategory}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a category</option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="mt-1">
                <LocationInput
                  onLocationSelect={handleLocationSelect}
                  defaultValue={formData.address}
                  required={true}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Service Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe your services..."
                value={formData.description}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Working Hours</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="workingHoursStart" className="block text-xs text-gray-500">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="workingHoursStart"
                    name="workingHours.start"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.workingHours.start}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="workingHoursEnd" className="block text-xs text-gray-500">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="workingHoursEnd"
                    name="workingHours.end"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.workingHours.end}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {type === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
        )}

        {type === 'signup' && (
          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
              I accept the{' '}
              <Link to="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                terms and conditions
              </Link>
            </label>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              type === 'login' ? 'Sign in' : 'Create account'
            )}
          </button>
        </div>
      </form>

      {type === 'signup' && (
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}