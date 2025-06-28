import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Phone, User, Star, 
  Filter, Search, ChevronDown, MessageSquare, 
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  serviceName: string;
  provider: {
    name: string;
    image: string;
    rating: number;
    totalBookings: number;
  };
  date: string;
  time: string;
  status: BookingStatus;
  location: string;
  phone: string;
  price: string;
  paymentStatus: 'paid' | 'pending';
}

export function Bookings() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bookings: Booking[] = [
    {
      id: '1',
      serviceName: 'Deep Home Cleaning',
      provider: {
        name: 'Priya Singh',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        rating: 4.8,
        totalBookings: 145,
      },
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'upcoming',
      location: 'Sector 62, Noida',
      phone: '+91 98765 43210',
      price: '$1,200',
      paymentStatus: 'paid',
    },
    {
      id: '2',
      serviceName: 'Plumbing Repair',
      provider: {
        name: 'Rajesh Kumar',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        rating: 4.6,
        totalBookings: 98,
      },
      date: '2024-03-14',
      time: '2:30 PM',
      status: 'ongoing',
      location: 'Sector 18, Noida',
      phone: '+91 98765 43211',
      price: '$800',
      paymentStatus: 'pending',
    },
    {
      id: '3',
      serviceName: 'Electrical Work',
      provider: {
        name: 'Amit Patel',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        rating: 4.7,
        totalBookings: 167,
      },
      date: '2024-03-13',
      time: '11:00 AM',
      status: 'completed',
      location: 'Sector 15, Noida',
      phone: '+91 98765 43212',
      price: '$1,500',
      paymentStatus: 'paid',
    },
  ];

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'ongoing':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'ongoing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
    }
  };

  const filteredBookings = selectedStatus === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your service bookings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Bookings" value="12" trend="+3 this month" />
          <StatCard label="Upcoming" value="3" trend="Next 7 days" />
          <StatCard label="Completed" value="8" trend="This month" />
          <StatCard label="Amount Spent" value="$12,450" trend="+15% vs last month" />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                  >
                    <option value="all">All Bookings</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
              <div className="relative flex-1 max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.provider.image}
                      alt={booking.provider.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{booking.serviceName}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{booking.provider.name}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{booking.provider.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{booking.provider.totalBookings} bookings</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-semibold text-gray-900">{booking.price}</span>
                    <span className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-2 capitalize">{booking.status}</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{booking.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    {booking.paymentStatus === 'pending' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-100">
                        Payment Pending
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Provider
                    </button>
                    {booking.status === 'upcoming' && (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </button>
                    )}
                    {booking.status === 'completed' && !booking.paymentStatus && (
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
          {trend}
        </p>
      </div>
    </div>
  );
}