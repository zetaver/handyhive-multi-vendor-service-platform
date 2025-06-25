export type ServiceCategory = 
  | 'Home Cleaning'
  | 'Appliance Repair'
  | 'Plumbing'
  | 'Electrical'
  | 'Painting'
  | 'Carpentry'
  | 'Beauty & Spa'
  | 'Professional Services';

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  provider: ServiceProvider;
  location: {
    lat: number;
    lng: number;
  };
}

export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  completedJobs: number;
  specialties: string[];
}

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: {
    lat: number;
    lng: number;
  };
  status: 'open' | 'in-progress' | 'completed';
  customer: {
    id: string;
    name: string;
    avatar: string;
  };
}

export type UserRole = 'customer' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}