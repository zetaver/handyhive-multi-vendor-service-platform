import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Home, Wrench, Clock, Shield, Star, ArrowRight, Users, MapPin } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920', // Cleaning
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1920', // Appliance Repair
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920', // Salon
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&q=80&w=1920', // Fitness/Yoga
  'https://images.unsplash.com/photo-1544948016-b1848a8a4392?auto=format&fit=crop&q=80&w=1920'  // Painting
];

export function LandingPage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onLoginClick={() => navigate('/login')} 
        onSignupClick={() => navigate('/signup')} 
        onServicesClick={() => navigate('/services')}
        onHowItWorksClick={() => navigate('/how-it-works')}
        onCategoriesClick={() => navigate('/categories')}
        onAboutClick={() => navigate('/about')}
      />

      {/* Hero Section */}
      <section className="relative pt-20 h-[600px] flex items-center justify-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{ 
                backgroundImage: `url(${src})`,
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Your Trusted Partner for
              <span className="text-indigo-400"> Professional Services</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-200 mb-10">
              Connect with verified service providers for all your home maintenance, repairs, 
              and professional service needs. Quality service, guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Find a Service
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the landing page content... */}
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose HandyHive?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium service platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Shield}
              title="Verified Providers"
              description="All service providers are thoroughly vetted and verified for your safety"
            />
            <FeatureCard
              icon={Clock}
              title="Quick Response"
              description="Get connected with service providers within minutes"
            />
            <FeatureCard
              icon={Star}
              title="Quality Service"
              description="Rated and reviewed by our community for assured quality"
            />
            <FeatureCard
              icon={Users}
              title="24/7 Support"
              description="Our customer support team is always here to help you"
            />
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-xl text-gray-600">Discover our most requested services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              id="1"
              title="Home Cleaning"
              description="Professional home cleaning services for a spotless living space"
              price="From 20$/hour"
              image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400"
            />
            <ServiceCard
              id="2"
              title="Appliance Repair"
              description="Expert repair services for all home appliances"
              price="From 25$/visit"
              image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400"
            />
            <ServiceCard
              id="3"
              title="Salon at Home"
              description="Professional beauty services in the comfort of your home"
              price="From 45$/session"
              image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400"
            />
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/services')}
              className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Choose a Service"
              description="Browse through our wide range of professional services"
            />
            <StepCard
              number="2"
              title="Book Appointment"
              description="Select your preferred time slot and book instantly"
            />
            <StepCard
              number="3"
              title="Get it Done"
              description="Sit back and relax while our professionals handle it"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HandyHive</h3>
              <p className="text-gray-400">Your trusted partner for professional services</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Home Cleaning</li>
                <li>Appliance Repair</li>
                <li>Beauty Services</li>
                <li>Professional Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Partner with Us</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@HandyHive.com</li>
                <li>+91 1234567890</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 HandyHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ServiceCard({ id, title, description, price, image }: {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/services/${id}`)}
    >
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-medium">{price}</span>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={e => { e.stopPropagation(); navigate(`/services/${id}`); }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}