import React from 'react';
import { Users, ShoppingBag, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

export function Analytics() {
  const metrics = [
    {
      name: 'Total Revenue',
      value: '₹1,235,340',
      change: '+12.3%',
      trend: 'up',
      period: 'vs last month',
    },
    {
      name: 'Active Users',
      value: '12,345',
      change: '+8.2%',
      trend: 'up',
      period: 'vs last month',
    },
    {
      name: 'Completed Services',
      value: '3,456',
      change: '+23.1%',
      trend: 'up',
      period: 'vs last month',
    },
    {
      name: 'Average Rating',
      value: '4.8',
      change: '-0.2',
      trend: 'down',
      period: 'vs last month',
    },
  ];

  const topServices = [
    { name: 'Home Cleaning', bookings: '234', revenue: '₹45,670', growth: '+15%' },
    { name: 'Plumbing', bookings: '189', revenue: '₹38,900', growth: '+12%' },
    { name: 'Electrical', bookings: '156', revenue: '₹32,450', growth: '+8%' },
    { name: 'Beauty & Spa', bookings: '145', revenue: '₹29,800', growth: '+5%' },
  ];

  const topLocations = [
    { name: 'Delhi NCR', users: '2,345', providers: '456', revenue: '₹4,56,780' },
    { name: 'Mumbai', users: '2,123', providers: '389', revenue: '₹3,89,560' },
    { name: 'Bangalore', users: '1,890', providers: '345', revenue: '₹3,45,670' },
    { name: 'Hyderabad', users: '1,567', providers: '289', revenue: '₹2,89,450' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor key metrics and performance indicators</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">{metric.name}</div>
            <div className="mt-2 flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
              <span className={`ml-2 flex items-baseline text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{metric.period}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Services */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Services</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.name} className="flex items-center">
                  <div className="flex-shrink-0 w-8 text-sm font-medium text-gray-500">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{service.bookings} bookings</span>
                      <span className="mx-2">•</span>
                      <span>{service.revenue}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {service.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Locations</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div key={location.name} className="flex items-center">
                  <div className="flex-shrink-0 w-8 text-sm font-medium text-gray-500">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{location.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{location.users} users</span>
                      <span className="mx-2">•</span>
                      <span>{location.providers} providers</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm font-medium text-gray-900">{location.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-900">
                          New provider registration spike
                          <span className="ml-2 text-sm text-gray-500">2 hours ago</span>
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>15 new service providers registered in the last hour</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="relative pb-8">
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-900">
                          Booking milestone reached
                          <span className="ml-2 text-sm text-gray-500">5 hours ago</span>
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Crossed 1000 bookings for the day</p>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="relative">
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-900">
                          Revenue update
                          <span className="ml-2 text-sm text-gray-500">8 hours ago</span>
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Daily revenue target exceeded by 15%</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}