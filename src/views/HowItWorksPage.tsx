import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Search, Calendar, CheckSquare } from 'lucide-react';
import { Footer } from '../components/Footer';

export function HowItWorksPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold">How HandyHive Works</h1>
            <p className="mt-4 text-xl text-indigo-200 max-w-3xl mx-auto">
              Getting reliable home services is as easy as 1, 2, 3.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              <Step 
                icon={Search}
                number="1"
                title="Find Your Service"
                description="Browse our wide range of categories or search for the specific service you need. Compare providers based on reviews, ratings, and price."
              />
              <Step 
                icon={Calendar}
                number="2"
                title="Book and Schedule"
                description="Choose a service provider that fits your needs and book a time that works for you. Our scheduling system is flexible and easy to use."
                reverse
              />
              <Step 
                icon={CheckSquare}
                number="3"
                title="Get the Job Done"
                description="Your chosen provider will arrive on time and complete the job to your satisfaction. Payments are handled securely through our platform after the work is done."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Step({ icon: Icon, number, title, description, reverse = false }: {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
  reverse?: boolean;
}) {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{`Step ${number}`}</h3>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-4 text-lg text-gray-600">{description}</p>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-48 h-48 bg-indigo-100 rounded-full flex items-center justify-center">
          <Icon className="h-24 w-24 text-indigo-600" />
        </div>
      </div>
    </div>
  );
} 