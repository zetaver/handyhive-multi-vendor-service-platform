import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit2, Trash2, Plus, Star } from 'lucide-react';

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services = [
    {
      id: 1,
      name: 'Home Cleaning',
      category: 'Cleaning',
      providers: 45,
      activeBookings: 12,
      rating: 4.8,
      status: 'active',
    },
    {
      id: 2,
      name: 'Plumbing Services',
      category: 'Repairs',
      providers: 32,
      activeBookings: 8,
      rating: 4.6,
      status: 'active',
    },
    {
      id: 3,
      name: 'Electrical Repairs',
      category: 'Repairs',
      providers: 28,
      activeBookings: 15,
      rating: 4.7,
      status: 'active',
    },
    {
      id: 4,
      name: 'Beauty Services',
      category: 'Beauty & Spa',
      providers: 56,
      activeBookings: 23,
      rating: 4.9,
      status: 'inactive',
    },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and monitor available services</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Services</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">156</div>
          <div className="mt-2 text-sm text-green-600">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Active Providers</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">892</div>
          <div className="mt-2 text-sm text-green-600">↑ 8% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Bookings</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">2,345</div>
          <div className="mt-2 text-sm text-green-600">↑ 23% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Average Rating</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">4.8</div>
          <div className="mt-2 text-sm text-green-600">↑ 0.2 from last month</div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 max-w-md">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search services..."
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
            <option value="Cleaning">Cleaning</option>
            <option value="Repairs">Repairs</option>
            <option value="Beauty & Spa">Beauty & Spa</option>
          </select>

          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Plus className="h-5 w-5 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Providers
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Bookings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.providers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.activeBookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}