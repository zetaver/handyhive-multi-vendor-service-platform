import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Clock, Shield, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function ServicesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    'All Categories',
    'Home Cleaning',
    'Appliance Repair',
    'Plumbing',
    'Electrical',
    'Painting',
    'Carpentry',
    'Beauty & Spa',
    'Professional Services'
  ];

  const services = [
    {
      id: '1',
      title: 'Professional Home Cleaning',
      provider: 'CleanPro Services',
      rating: 4.9,
      reviews: 245,
      price: '20$/hour',
      location: 'Noida',
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
      category: 'Home Cleaning',
      verified: true,
      responseTime: '< 30 min',
      description: 'Deep cleaning, regular maintenance, eco-friendly products'
    },
    {
      id: '2',
      title: 'Expert Appliance Repair',
      provider: 'FixIt Masters',
      rating: 4.8,
      reviews: 189,
      price: '25$/visit',
      location: 'Delhi',
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
      category: 'Appliance Repair',
      verified: true,
      responseTime: '< 1 hour',
      description: 'All appliances, genuine parts, 6-month warranty'
    },
    {
      id: '3',
      title: 'Premium Beauty Services',
      provider: 'Glamour at Home',
      rating: 4.9,
      reviews: 312,
      price: '$599/session',
      location: 'Gurgaon',
      distance: '4.1 km',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400',
      category: 'Beauty & Spa',
      verified: true,
      responseTime: '< 2 hours',
      description: 'Facial, massage, hair care, nail art, makeup'
    },
    {
      id: '4',
      title: 'Professional Plumbing',
      provider: 'AquaFix Solutions',
      rating: 4.7,
      reviews: 156,
      price: '$450/hour',
      location: 'Noida',
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
      category: 'Plumbing',
      verified: true,
      responseTime: '< 45 min',
      description: 'Pipe repair, installation, emergency services'
    },
    {
      id: '5',
      title: 'Electrical Services',
      provider: 'PowerPro Electricians',
      rating: 4.8,
      reviews: 203,
      price: '$500/hour',
      location: 'Delhi',
      distance: '2.9 km',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=400',
      category: 'Electrical',
      verified: true,
      responseTime: '< 1 hour',
      description: 'Wiring, fixtures, safety inspections, repairs'
    },
    {
      id: '6',
      title: 'Interior Painting',
      provider: 'ColorCraft Painters',
      rating: 4.6,
      reviews: 134,
      price: '$25/sq ft',
      location: 'Gurgaon',
      distance: '5.2 km',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400',
      category: 'Painting',
      verified: true,
      responseTime: '< 3 hours',
      description: 'Interior/exterior, texture, wallpaper, consultation'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || service.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onLoginClick={() => navigate('/login')} 
        onSignupClick={() => navigate('/signup')} 
        onServicesClick={() => navigate('/services')}
        onHowItWorksClick={() => navigate('/how-it-works')}
        onCategoriesClick={() => navigate('/categories')}
        onAboutClick={() => navigate('/about')}
        pageType="standard"
      />
      
      {/* Header */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Find Professional Services</h1>
            <p className="text-xl text-indigo-100 mb-8">Connect with verified experts for all your needs</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-0 rounded-xl text-lg bg-white shadow-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Search for services..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-indigo-700 mb-6">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === 'All Categories' ? 'all' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                >
                  <option value="all">All Locations</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Under $300</option>
                  <option value="mid">$300 - $500</option>
                  <option value="premium">Above $500</option>
                </select>
              </div>

              {/* Quick Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Quick Filters</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Verified Providers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Available Today</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Top Rated</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-indigo-700">
                {filteredServices.length} Services Found
              </h2>
              <select className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50">
                <option>Sort by Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Distance: Near to Far</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-indigo-200 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ServiceCard({ service }: { service: any }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          {service.verified && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </span>
          )}
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            <Clock className="h-3 w-3 mr-1" />
            {service.responseTime}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-indigo-700 border border-indigo-100">
            {service.price}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.provider}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">{service.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({service.reviews})</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {service.distance}
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => navigate(`/services/${service.id}`)} className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
            View Details
          </button>
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}