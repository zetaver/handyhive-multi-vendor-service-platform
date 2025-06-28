import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Clock, Star, MapPin, ArrowLeft, ChevronLeft, ChevronRight, UserCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// This should match the services array in ServicesPage
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

// Mock gallery images for each service (could be extended per service)
const galleryImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
];

// Mock provider profile
const providerProfiles: { [key: string]: { name: string; avatar: string; rating: number; location: string; verified: boolean } } = {
  'CleanPro Services': {
    name: 'CleanPro Services',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    location: 'Noida',
    verified: true,
  },
  'FixIt Masters': {
    name: 'FixIt Masters',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.8,
    location: 'Delhi',
    verified: true,
  },
  'Glamour at Home': {
    name: 'Glamour at Home',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.9,
    location: 'Gurgaon',
    verified: true,
  },
  'AquaFix Solutions': {
    name: 'AquaFix Solutions',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 4.7,
    location: 'Noida',
    verified: true,
  },
  'PowerPro Electricians': {
    name: 'PowerPro Electricians',
    avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
    rating: 4.8,
    location: 'Delhi',
    verified: true,
  },
  'ColorCraft Painters': {
    name: 'ColorCraft Painters',
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    rating: 4.6,
    location: 'Gurgaon',
    verified: true,
  },
};

// Mock reviews
const reviews = [
  {
    user: 'Amit Sharma',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    comment: 'Excellent service! Very professional and thorough. Highly recommended.',
    date: '2024-05-01',
  },
  {
    user: 'Priya Singh',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    rating: 4,
    comment: 'Good experience overall. Arrived on time and did a great job.',
    date: '2024-04-20',
  },
  {
    user: 'Rahul Verma',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    rating: 5,
    comment: 'Very satisfied with the service. Will book again!',
    date: '2024-03-15',
  },
];

// Mock FAQs
const faqs = [
  {
    question: 'What is included in the service?',
    answer: 'The service includes all standard cleaning tasks, use of eco-friendly products, and a satisfaction guarantee.'
  },
  {
    question: 'How do I reschedule my booking?',
    answer: 'You can reschedule your booking from your dashboard or by contacting our support team.'
  },
];

export function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);
  const provider = service ? providerProfiles[service.provider] : null;
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-3xl font-bold text-gray-700 mb-4">Service Not Found</div>
        <button onClick={() => navigate('/services')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Back to Services</button>
      </div>
    );
  }

  // Related services (same category, excluding current)
  const relatedServices = services.filter(s => s.category === service.category && s.id !== service.id);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        onLoginClick={() => navigate('/login')} 
        onSignupClick={() => navigate('/signup')} 
        onServicesClick={() => navigate('/services')}
        onHowItWorksClick={() => navigate('/how-it-works')}
        onCategoriesClick={() => navigate('/categories')}
        onAboutClick={() => navigate('/about')}
        pageType="standard"
      />
      {/* Gallery Slider */}
      <div className="relative h-72 md:h-96 flex items-center justify-center bg-black">
        <img src={galleryImages[galleryIndex]} alt="Service gallery" className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/80 via-indigo-800/60 to-purple-800/60 z-10" />
        <div className="relative z-20 w-full max-w-3xl mx-auto px-6 flex flex-col md:flex-row md:items-end md:justify-between pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">{service.title}</h1>
            <div className="flex items-center space-x-3 mb-2 flex-wrap">
              {service.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-1">
                  <Shield className="h-3 w-3 mr-1" /> Verified
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 mb-1">
                <Clock className="h-3 w-3 mr-1" /> {service.responseTime}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 mb-1">
                <Star className="h-3 w-3 mr-1" /> {service.rating} ({service.reviews})
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                <MapPin className="h-3 w-3 mr-1" /> {service.location}
              </span>
              {/* Example tag */}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 mb-1">
                <CheckCircle className="h-3 w-3 mr-1" /> 24/7 Available
              </span>
            </div>
            <div className="text-indigo-100 text-base font-medium mb-1">Provider: <span className="text-white font-semibold">{service.provider}</span></div>
            <div className="text-indigo-200 text-sm">Category: {service.category}</div>
          </div>
        </div>
        {/* Gallery Controls */}
        <button onClick={() => setGalleryIndex((galleryIndex - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-indigo-700 rounded-full p-2 shadow transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={() => setGalleryIndex((galleryIndex + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-indigo-700 rounded-full p-2 shadow transition-colors">
          <ChevronRight className="h-6 w-6" />
        </button>
        <button onClick={() => navigate('/services')} className="absolute top-4 left-4 bg-white/80 hover:bg-white text-indigo-700 rounded-full p-2 shadow transition-colors md:hidden z-30">
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
      {/* Main Card */}
      <div className="max-w-3xl mx-auto -mt-16 md:-mt-24 z-30 relative mb-12">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12">
          {/* Provider Profile */}
          {provider && (
            <div className="flex items-center mb-6">
              <img src={provider.avatar} alt={provider.name} className="w-14 h-14 rounded-full border-2 border-indigo-500 mr-4" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-indigo-900">{provider.name}</span>
                  {provider.verified && <Shield className="h-4 w-4 text-green-500" />}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" /> {provider.location}
                  <Star className="h-4 w-4 text-yellow-400 ml-4 mr-1" /> {provider.rating}
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold bg-white/90 text-indigo-700 border border-indigo-100 shadow">
              {service.price}
            </span>
          </div>
          <div className="mb-6 text-gray-700 text-lg">
            <span className="font-semibold">Description:</span> {service.description}
          </div>
          {/* Book Now Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button onClick={() => setShowBooking(true)} className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-bold text-lg shadow-lg">
              Book Now
            </button>
            <button onClick={() => navigate('/services')} className="flex-1 px-6 py-4 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-bold text-lg">
              Back to Services
            </button>
          </div>
          {/* Booking Modal */}
          {showBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md relative">
                <button onClick={() => setShowBooking(false)} className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600">
                  ×
                </button>
                <h3 className="text-xl font-bold mb-4 text-indigo-700">Book {service.title}</h3>
                <label className="block mb-2 text-sm font-medium">Select Date</label>
                <input type="date" className="w-full mb-4 p-2 border rounded" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
                <label className="block mb-2 text-sm font-medium">Select Time</label>
                <input type="time" className="w-full mb-4 p-2 border rounded" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} />
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">Confirm Booking</button>
              </div>
            </div>
          )}
          {/* Reviews Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center"><Star className="h-6 w-6 text-yellow-400 mr-2" /> Customer Reviews</h3>
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                  <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.user}</span>
                      <span className="flex items-center text-yellow-500 text-sm">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400" />)}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                    </div>
                    <div className="text-gray-700 mt-1">{review.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* FAQs Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center"><HelpCircle className="h-6 w-6 text-indigo-400 mr-2" /> FAQs</h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-1">Q: {faq.question}</div>
                  <div className="text-gray-700">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="max-w-7xl mx-auto mb-16 px-4">
          <h3 className="text-2xl font-bold text-indigo-800 mb-6">Related Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedServices.map(rs => (
              <div key={rs.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/services/${rs.id}`)}>
                <img src={rs.image} alt={rs.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{rs.title}</h4>
                  <div className="text-sm text-gray-600 mb-2">{rs.provider}</div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" /> {rs.rating}
                    <span className="ml-2">{rs.price}</span>
                  </div>
                  <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full" onClick={e => { e.stopPropagation(); navigate(`/services/${rs.id}`); }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
} 