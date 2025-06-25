import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, MessageSquare, Plus, X } from 'lucide-react';
import { getUserRole } from '../../utils/auth';

interface ServiceRequestFormData {
  title: string;
  description: string;
  budget: string;
  location: string;
  category: string;
}

export function ServiceRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ServiceRequestFormData>({
    title: '',
    description: '',
    budget: '',
    location: '',
    category: '',
  });
  const userRole = getUserRole();

  const requests = [
    {
      id: '1',
      title: 'Need a Professional Plumber',
      description: 'Looking for a plumber to fix a leaking pipe in the bathroom.',
      budget: '₹500-1000',
      location: 'Sector 62, Noida',
      postedTime: '2 hours ago',
      status: 'open',
      bids: 3,
    },
    {
      id: '2',
      title: 'House Deep Cleaning',
      description: '3BHK apartment needs thorough cleaning including windows and balcony.',
      budget: '₹2000-3000',
      location: 'Sector 18, Noida',
      postedTime: '5 hours ago',
      status: 'in-progress',
      bids: 5,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement service request submission
    console.log('Service request submitted:', formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      budget: '',
      location: '',
      category: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <p className="mt-1 text-sm text-gray-500">Track and manage your service requests</p>
      </div>

      {userRole === 'customer' && (
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Request
          </button>
        </div>
      )}

      <div className="space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === 'open' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {request.status === 'open' ? 'Open' : 'In Progress'}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{request.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-500">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>{request.budget}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{request.postedTime}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>{request.bids} bids received</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">
                  View Details
                </button>
                {userRole === 'provider' ? (
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Place Bid
                  </button>
                ) : (
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Bids
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Service Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Create Service Request</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Request Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., Need a Professional Plumber"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Service Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Select a category</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="carpentry">Carpentry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Describe your service needs in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget Range (₹)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g., 500-1000"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  >
                    Create Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}