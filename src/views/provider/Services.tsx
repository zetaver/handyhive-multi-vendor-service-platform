import React, { useState } from 'react';
import { Plus, Search, Filter, Star, MapPin, Edit2, Trash2 } from 'lucide-react';

export function ProviderServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: '1',
      title: 'Professional Plumbing',
      category: 'Plumbing',
      description: 'Expert plumbing services for residential and commercial properties',
      price: '$500/hr',
      rating: 4.8,
      totalBookings: 156,
      status: 'active',
      area: 'Noida',
      radius: '10 km'
    },
    {
      id: '2',
      title: 'Electrical Repairs',
      category: 'Electrical',
      description: 'Complete electrical repair and maintenance services',
      price: '$600/hr',
      rating: 4.7,
      totalBookings: 123,
      status: 'active',
      area: 'Delhi',
      radius: '15 km'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your service listings</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-5 w-5 mr-2" />
              Add New Service
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {services.map((service) => (
            <li key={service.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {service.price}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                  <div className="mt-2 flex items-center space-x-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                      <span className="mx-1 text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{service.totalBookings} bookings</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-5 w-5 mr-1" />
                      {service.area} ({service.radius})
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}