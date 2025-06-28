import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Home, Wrench, Heart, Zap, PaintBucket } from 'lucide-react';
import { Footer } from '../components/Footer';

const categories = [
  { name: 'Home Cleaning', icon: Home, description: 'Keep your home sparkling clean with our professional cleaning services.' },
  { name: 'Repairs', icon: Wrench, description: 'Expert repairs for plumbing, electrical, and appliance issues.' },
  { name: 'Beauty & Spa', icon: Heart, description: 'Pamper yourself with our in-home salon and spa treatments.' },
  { name: 'Professional Services', icon: Zap, description: 'Connect with skilled professionals for a variety of specialized services.' },
  { name: 'Painting', icon: PaintBucket, description: 'Transform your space with our expert interior and exterior painting services.' },
];

export function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Service Categories</h1>
            <p className="mt-4 text-lg text-gray-600">Explore our wide range of services to find what you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CategoryCard({ icon: Icon, name, description }: {
  icon: React.ElementType;
  name: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="h-10 w-10 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 