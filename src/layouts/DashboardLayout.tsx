import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Bell, MessageSquare, 
  User, LogOut, Menu, X, Users, Settings as SettingsIcon,
  AlertCircle, TrendingUp
} from 'lucide-react';
import { getUserRole, clearAuthUser } from '../utils/auth';
import type { UserRole } from '../types/auth';

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getUserRole();

  const getNavLinks = (role: UserRole) => {
    const commonLinks = [
      { path: '/dashboard/notifications', label: 'Notifications', icon: Bell },
      { path: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
    ];

    switch (role) {
      case 'admin':
        return [
          { path: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/dashboard/admin/users', label: 'Users', icon: Users },
          { path: '/dashboard/admin/services', label: 'Services', icon: ShoppingBag },
          { path: '/dashboard/admin/reports', label: 'Reports', icon: AlertCircle },
          { path: '/dashboard/admin/analytics', label: 'Analytics', icon: TrendingUp },
          ...commonLinks
        ];
      case 'provider':
        return [
          { path: '/dashboard/provider', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/dashboard/bookings', label: 'My Bookings', icon: ShoppingBag },
          { path: '/dashboard/requests', label: 'Service Requests', icon: MessageSquare },
          ...commonLinks
        ];
      case 'customer':
        return [
          { path: '/dashboard/customer', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/dashboard/bookings', label: 'My Bookings', icon: ShoppingBag },
          { path: '/dashboard/requests', label: 'Service Requests', icon: MessageSquare },
          ...commonLinks
        ];
      default:
        return commonLinks;
    }
  };

  const sidebarLinks = userRole ? getNavLinks(userRole) : [];

  const handleLogout = () => {
    clearAuthUser();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* User Profile Section */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold capitalize">{userRole} Dashboard</h2>
                  <p className="text-sm text-indigo-200 capitalize">{userRole}</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {sidebarLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon className={`h-5 w-5 mr-3 ${
                    isActive(link.path) ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  {link.label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">KaamKonnect</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}