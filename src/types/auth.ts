export type UserRole = 'admin' | 'provider' | 'customer';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CustomerSignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  profilePicture?: File;
  acceptTerms: boolean;
}

export interface ProviderSignupData {
  businessName: string;
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  serviceCategory: string;
  address: string;
  licenseNumber: string;
  logo?: File;
  description: string;
  workingHours: {
    start: string;
    end: string;
  };
  acceptTerms: boolean;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Mock user data for testing
export const MOCK_USERS = [
  {
    email: 'admin@example.com',
    password: 'Admin123!',
    role: 'admin' as UserRole,
    name: 'Admin User',
    id: '1',
  },
  {
    email: 'provider@example.com',
    password: 'Provider123!',
    role: 'provider' as UserRole,
    name: 'Service Provider',
    id: '2',
  },
  {
    email: 'customer@example.com',
    password: 'Customer123!',
    role: 'customer' as UserRole,
    name: 'Customer User',
    id: '3',
  },
] as const;