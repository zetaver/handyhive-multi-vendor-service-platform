import React from 'react';
import { Bell, CheckCircle, AlertCircle, Calendar, MessageSquare } from 'lucide-react';

export function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your cleaning service booking has been confirmed for tomorrow at 10:00 AM',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'new_bid',
      title: 'New Bid Received',
      message: 'You have received a new bid for your plumbing service request',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'service_completed',
      title: 'Service Completed',
      message: 'Your electrical repair service has been marked as completed',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Upcoming Service Reminder',
      message: 'Your house cleaning service is scheduled for tomorrow',
      time: '3 hours ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return CheckCircle;
      case 'new_bid':
        return MessageSquare;
      case 'service_completed':
        return CheckCircle;
      case 'reminder':
        return Calendar;
      default:
        return Bell;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500">Stay updated with your service activities</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Notifications</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            Mark all as read
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon className={`h-6 w-6 ${
                      !notification.read ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        !notification.read ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </p>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                    <p className={`mt-1 text-sm ${
                      !notification.read ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}