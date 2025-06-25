import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Wrench, Scissors, Briefcase, Plus, ChevronRight, Search } from 'lucide-react';

const categories = [
  { icon: Home, name: 'Home Cleaning' },
  { icon: Wrench, name: 'Repairs' },
  { icon: Scissors, name: 'Beauty & Spa' },
  { icon: Briefcase, name: 'Professional' },
];

export function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                </li>
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <li>
                  <a href="#" className="text-indigo-600 font-medium">Dashboard</a>
                </li>
              </ol>
            </nav>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Welcome Back, Amit</h1>
            <p className="mt-1 text-gray-500">Here's what's happening with your requests</p>
          </div>

          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={() => navigate('/dashboard/requests')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Post New Service
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200"
              placeholder="Search services..."
            />
          </div>
        </div>
      </div>

      {/* Quick Access Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors duration-200">
              <category.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Active Requests */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Active Requests</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            <RequestCard
              title="Bathroom Renovation"
              status="3 bids received"
              time="Posted 2 days ago"
            />
            <RequestCard
              title="Weekly House Cleaning"
              status="1 bid received"
              time="Posted 1 day ago"
            />
          </div>
        </div>
      </div>

      {/* Recommended Services */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Professional Plumbing"
            provider="Rajesh Kumar"
            rating={4.8}
            jobs={124}
            price="₹500/hr"
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
          />
          <ServiceCard
            title="House Cleaning"
            provider="Priya Singh"
            rating={4.6}
            jobs={89}
            price="₹300/hr"
            avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
          />
          <ServiceCard
            title="Electrician Services"
            provider="Amit Patel"
            rating={4.9}
            jobs={156}
            price="₹400/hr"
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
          />
        </div>
      </div>
    </div>
  );
}

function RequestCard({ title, status, time }: {
  title: string;
  status: string;
  time: string;
}) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{time} • {status}</p>
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
          View Bids
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ title, provider, rating, jobs, price, avatar }: {
  title: string;
  provider: string;
  rating: number;
  jobs: number;
  price: string;
  avatar: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">Professional Service</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {price}
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={avatar}
              alt={provider}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{provider}</p>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">{rating} ★</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{jobs} jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}