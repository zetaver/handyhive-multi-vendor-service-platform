import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export function Navbar({ onLoginClick, onSignupClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-600">KaamKonnect</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <CategoryLink href="#cleaning">Home Cleaning</CategoryLink>
                <CategoryLink href="#repairs">Repairs</CategoryLink>
                <CategoryLink href="#beauty">Beauty & Spa</CategoryLink>
                <CategoryLink href="#professional">Professional</CategoryLink>
              </div>
            </div>
            <NavLink href="#about">About Us</NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-700 transition-colors"
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
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#services">Services</MobileNavLink>
              <MobileNavLink href="#how-it-works">How it Works</MobileNavLink>
              <MobileNavLink href="#categories">Categories</MobileNavLink>
              <MobileNavLink href="#about">About Us</MobileNavLink>
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

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="text-gray-600 hover:text-indigo-600 transition-colors"
    >
      {children}
    </a>
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

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href}
      className="block px-4 py-2 text-base text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md"
    >
      {children}
    </a>
  );
}