import React, { useState } from 'react';
import { Bell, Users, ShoppingBag, AlertCircle, Check, Search, Filter } from 'lucide-react';

export function AdminNotifications() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: '1',
      type: 'user',
      title: 'New Service Provider Registration',
      message: 'Rajesh Kumar has registered as a service provider',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'service',
      title: 'New Service Added',
      message: 'A new plumbing service has been added in Noida sector 62',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'report',
      title: 'New User Report',
      message: 'A customer has reported an issue with a service provider',
      time: '2 hours ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-6 w-6 text-blue-500" />;
      case 'service':
        return <ShoppingBag className="h-6 w-6 text-green-500" />;
      case 'report':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
  };

  const filteredNotifications = selectedType === 'all'
    ? notifications
    : notifications.filter(notification => notification.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">Manage system notifications and alerts</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="user">Users</option>
                <option value="service">Services</option>
                <option value="report">Reports</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Notifications</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Mark all as read
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      !notification.read ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">{notification.time}</span>
                      {notification.read && (
                        <Check className="ml-2 h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className={`mt-1 text-sm ${
                    !notification.read ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {notification.message}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                {!notification.read && (
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Mark as read
                  </button>
                )}
                <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}