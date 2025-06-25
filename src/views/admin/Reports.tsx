import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';

export function Reports() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const reports = [
    {
      id: 1,
      title: 'Service Quality Issue',
      type: 'quality',
      status: 'pending',
      priority: 'high',
      reportedBy: 'Rahul Sharma',
      reportedDate: '2024-03-10',
      description: 'Provider did not complete the service as per requirements',
    },
    {
      id: 2,
      title: 'Payment Dispute',
      type: 'payment',
      status: 'resolved',
      priority: 'medium',
      reportedBy: 'Priya Singh',
      reportedDate: '2024-03-09',
      description: 'Incorrect amount charged for the service',
    },
    {
      id: 3,
      title: 'Inappropriate Behavior',
      type: 'behavior',
      status: 'investigating',
      priority: 'high',
      reportedBy: 'Amit Kumar',
      reportedDate: '2024-03-08',
      description: 'Unprofessional conduct by service provider',
    },
  ];

  const filteredReports = selectedStatus === 'all'
    ? reports
    : reports.filter(report => report.status === selectedStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'investigating':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor and manage user reports and complaints</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Reports</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">124</div>
          <div className="mt-2 text-sm text-red-600">↑ 8% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">23</div>
          <div className="mt-2 text-sm text-yellow-600">5 high priority</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Investigating</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">45</div>
          <div className="mt-2 text-sm text-blue-600">12 in progress</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Resolved</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">56</div>
          <div className="mt-2 text-sm text-green-600">↑ 12% resolution rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 max-w-md">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search reports..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500">{report.description}</div>
                    <div className="text-sm text-gray-500">By: {report.reportedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                      <span className="mr-1.5">{getStatusIcon(report.status)}</span>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.reportedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}