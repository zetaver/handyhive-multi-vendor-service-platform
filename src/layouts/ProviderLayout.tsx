import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Bell, Settings,
  LogOut, DollarSign, Star, Briefcase
} from 'lucide-react';

export function ProviderLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/dashboard/provider', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/provider/services', label: 'My Services', icon: Briefcase },
    { path: '/dashboard/provider/bookings', label: 'Bookings', icon: ShoppingBag },
    { path: '/dashboard/provider/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/dashboard/provider/reviews', label: 'Reviews', icon: Star },
    { path: '/dashboard/provider/notifications', label: 'Notifications', icon: Bell },
    { path: '/dashboard/provider/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-indigo-600">HandyHive</h1>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive(item.path)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${
                    isActive(item.path) ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="px-2">
              <button
                onClick={handleLogout}
                className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg w-full"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">HandyHive</h1>
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6 md:py-8">
            <div className="mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive(item.path)
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}