import React from 'react';
import { Clock, DollarSign, ThumbsUp, Users } from 'lucide-react';

export function ProviderDashboard() {
  const stats = [
    { name: 'Active Jobs', value: '3', icon: Clock },
    { name: 'Total Earnings', value: '₹15,000', icon: DollarSign },
    { name: 'Completed Jobs', value: '45', icon: ThumbsUp },
    { name: 'Total Customers', value: '32', icon: Users },
  ];

  const activeJobs = [
    {
      id: '1',
      customer: 'Rahul Sharma',
      service: 'Plumbing Repair',
      status: 'In Progress',
      address: '123 Main St, Delhi',
      time: '2:30 PM Today',
    },
    {
      id: '2',
      customer: 'Priya Patel',
      service: 'Pipe Fitting',
      status: 'Scheduled',
      address: '456 Park Road, Delhi',
      time: '11:00 AM Tomorrow',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor your service performance</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Active Jobs</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {activeJobs.map((job) => (
              <li key={job.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-indigo-600">{job.service}</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Customer: {job.customer} • {job.address}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Scheduled: {job.time}
                    </p>
                  </div>
                  <div className="ml-6 flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'In Progress' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {job.status}
                    </span>
                    <button className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}