import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, ShoppingBag, MessageSquare, User,
  LogOut
} from 'lucide-react';

export function CustomerLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/dashboard/customer', label: 'Home', icon: Home },
    { path: '/dashboard/bookings', label: 'Bookings', icon: ShoppingBag },
    { path: '/dashboard/requests', label: 'Requests', icon: MessageSquare },
    { path: '/dashboard/settings', label: 'Profile', icon: User, badge: 3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center">
          <h1 className="text-xl font-bold text-indigo-600">KaamKonnect</h1>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-indigo-600">KaamKonnect</h1>
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 ${
                    isActive(item.path)
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-16 md:pt-20 pb-16 md:pb-0">
        <Outlet />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 relative ${
                isActive(item.path)
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
              {item.badge && (
                <span className="absolute top-0 right-1/4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}