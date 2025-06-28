import React from 'react';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export function ProviderEarnings() {
  const earnings = {
    total: '$45,670',
    thisMonth: '$12,450',
    pending: '$3,200',
    completed: '$42,470'
  };

  const recentTransactions = [
    {
      id: '1',
      service: 'Plumbing Repair',
      customer: 'Rahul Sharma',
      amount: '$1,200',
      status: 'completed',
      date: '2024-03-10'
    },
    {
      id: '2',
      service: 'Pipe Fitting',
      customer: 'Priya Singh',
      amount: '$800',
      status: 'pending',
      date: '2024-03-09'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="mt-1 text-sm text-gray-500">Track your earnings and payments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                  <dd className="text-lg font-semibold text-gray-900">{earnings.total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">This Month</dt>
                  <dd className="text-lg font-semibold text-gray-900">{earnings.thisMonth}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-lg font-semibold text-gray-900">{earnings.pending}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                  <dd className="text-lg font-semibold text-gray-900">{earnings.completed}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-5 w-5 mr-2" />
            Download Report
          </button>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.service}</p>
                        <p className="text-sm text-gray-500">
                          Customer: {transaction.customer}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center">
                    <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
                    <span className={`ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}