import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Building, Target, Users, Heart, Shield, Star } from 'lucide-react';
import { Footer } from '../components/Footer';

export function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <Navbar 
        onLoginClick={() => navigate('/login')} 
        onSignupClick={() => navigate('/signup')} 
        onServicesClick={() => navigate('/services')}
        onHowItWorksClick={() => navigate('/how-it-works')}
        onCategoriesClick={() => navigate('/categories')}
        onAboutClick={() => navigate('/about')}
        pageType="standard"
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">About HandyHive</h1>
            <p className="mt-4 text-xl text-indigo-200 max-w-3xl mx-auto">
              We are dedicated to connecting you with trusted, skilled professionals for all your home service needs.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our mission is to simplify the process of finding reliable service providers, making home maintenance easy, transparent, and safe for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
              <p className="mt-4 text-lg text-gray-600">The principles that guide us.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard 
                icon={Heart}
                title="Customer First"
                description="We prioritize your satisfaction and safety above all else."
              />
              <ValueCard 
                icon={Shield}
                title="Trust & Safety"
                description="We ensure all our service providers are verified and reliable."
              />
              <ValueCard 
                icon={Star}
                title="Quality Commitment"
                description="We are committed to delivering high-quality services every time."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md text-center">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 