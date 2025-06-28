import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onServicesClick?: () => void;
  onHowItWorksClick?: () => void;
  onCategoriesClick?: () => void;
  onAboutClick?: () => void;
  pageType?: 'landing' | 'standard';
}

export function Navbar({ onLoginClick, onSignupClick, onServicesClick, onHowItWorksClick, onCategoriesClick, onAboutClick, pageType = 'landing' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (pageType === 'standard') {
      setIsScrolled(true);
    }
    
    const handleScroll = () => {
      if (pageType === 'landing') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageType]);

  const navLinkColor = isScrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-white hover:text-indigo-200';
  const logoColor = isScrolled ? 'text-indigo-600' : 'text-white';
  const loginButtonColor = isScrolled ? 'text-indigo-600 hover:text-indigo-700' : 'text-white hover:text-indigo-200';
  const mobileMenuIconColor = isScrolled ? 'text-gray-600' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => navigate('/')} className="focus:outline-none">
              <h1 className={`text-2xl font-bold transition-colors ${logoColor}`}>HandyHive</h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={onServicesClick} className={`transition-colors ${navLinkColor}`}>Services</button>
            <button onClick={onHowItWorksClick} className={`transition-colors ${navLinkColor}`}>How it Works</button>
            <div className="relative group">
              <button onClick={onCategoriesClick} className={`flex items-center space-x-1 transition-colors ${navLinkColor}`}>
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <CategoryLink href="/categories#cleaning">Home Cleaning</CategoryLink>
                <CategoryLink href="/categories#repairs">Repairs</CategoryLink>
                <CategoryLink href="/categories#beauty">Beauty & Spa</CategoryLink>
                <CategoryLink href="/categories#professional">Professional</CategoryLink>
              </div>
            </div>
            <button onClick={onAboutClick} className={`transition-colors ${navLinkColor}`}>About Us</button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className={`px-4 py-2 transition-colors ${loginButtonColor}`}
            >
              Login
            </button>
            <button 
              onClick={onSignupClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-md transition-colors ${mobileMenuIconColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-md shadow-lg">
            <div className="flex flex-col space-y-4 p-2">
              <MobileNavLink onClick={onServicesClick}>Services</MobileNavLink>
              <MobileNavLink onClick={onHowItWorksClick}>How it Works</MobileNavLink>
              <MobileNavLink onClick={onCategoriesClick}>Categories</MobileNavLink>
              <MobileNavLink onClick={onAboutClick}>About Us</MobileNavLink>
              <div className="pt-4 space-y-3">
                <button 
                  onClick={onLoginClick}
                  className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={onSignupClick}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function CategoryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
    if (href) {
        return (
            <a href={href} className="block px-4 py-2 text-base text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
                {children}
            </a>
        );
    }
    return (
        <button onClick={onClick} className="w-full text-left block px-4 py-2 text-base text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">
            {children}
        </button>
    );
}