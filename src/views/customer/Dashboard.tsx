import React, { useState } from 'react';
import { 
  Home, Wrench, Scissors, Briefcase, Search,
  Star, MapPin, Clock, Calendar, MessageSquare
} from 'lucide-react';

const categories = [
  { icon: Home, name: 'Home Cleaning', description: 'Professional cleaning services' },
  { icon: Wrench, name: 'Repairs', description: 'Fix what\'s broken' },
  { icon: Scissors, name: 'Beauty & Spa', description: 'Look your best' },
  { icon: Briefcase, name: 'Professional', description: 'Expert services' },
];

const quickStats = [
  { label: 'Active Requests', value: '2' },
  { label: 'Completed Services', value: '8' },
  { label: 'Total Spent', value: '$12,450' },
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-semibold text-indigo-600">A</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Welcome back, Amit!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              What services can we help you with today?
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg leading-6 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                placeholder="Search for any service..."
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <span className="text-sm text-gray-400">Press Enter to search</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-5 bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition duration-200"
                >
                  <dt className="text-sm font-medium text-gray-500">{stat.label}</dt>
                  <dd className="mt-2 text-3xl font-semibold text-indigo-600">{stat.value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                      <category.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Requests */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Active Requests</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View All
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <RequestCard
              title="Bathroom Deep Cleaning"
              description="Complete bathroom cleaning including tiles and grout"
              status="3 bids received"
              price="$1,000 - $1,500"
              location="Sector 62, Noida"
              time="Posted 2 hours ago"
              dueDate="Tomorrow, 10:00 AM"
            />
            <RequestCard
              title="AC Repair Service"
              description="Air conditioner not cooling properly, need urgent repair"
              status="5 bids received"
              price="$500 - $800"
              location="Sector 18, Noida"
              time="Posted 5 hours ago"
              dueDate="Today, 4:00 PM"
            />
          </div>
        </div>

        {/* Recommended Services */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Browse All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              name="Rajesh Kumar"
              title="Professional Plumber"
              rating={4.8}
              reviews={156}
              price="$400/hr"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
              distance="2.5 km away"
              availability="Available Today"
            />
            <ServiceCard
              name="Priya Singh"
              title="House Cleaning Expert"
              rating={4.9}
              reviews={203}
              price="$300/hr"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              distance="3.1 km away"
              availability="Available Tomorrow"
            />
            <ServiceCard
              name="Amit Patel"
              title="Electrician"
              rating={4.7}
              reviews={128}
              price="$450/hr"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
              distance="1.8 km away"
              availability="Available Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestCard({ 
  title, 
  description,
  status, 
  price,
  location,
  time,
  dueDate
}: {
  title: string;
  description: string;
  status: string;
  price: string;
  location: string;
  time: string;
  dueDate: string;
}) {
  return (
    <div className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {time}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {dueDate}
            </div>
          </div>
        </div>
        <div className="ml-6 flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">{price}</span>
          <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
          Edit Request
        </button>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View Bids
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ 
  name,
  title,
  rating,
  reviews,
  price,
  image,
  distance,
  availability
}: {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  distance: string;
  availability: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={image}
            alt={name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">{name}</h3>
            <p className="text-sm text-gray-500">{title}</p>
            <div className="mt-1 flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">{rating}</span>
              <span className="mx-1 text-gray-500">·</span>
              <span className="text-sm text-gray-500">{reviews} reviews</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              {price}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {distance}
          </div>
          <span className="text-indigo-600 font-medium">{availability}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}