import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export function ProviderReviews() {
  const reviews = [
    {
      id: '1',
      customer: {
        name: 'Rahul Sharma',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
      },
      service: 'Plumbing Repair',
      rating: 5,
      comment: 'Excellent service! Very professional and completed the work quickly.',
      date: '2024-03-10',
      helpful: 12,
      replied: true
    },
    {
      id: '2',
      customer: {
        name: 'Priya Singh',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
      },
      service: 'Pipe Fitting',
      rating: 4,
      comment: 'Good service, but took a bit longer than expected.',
      date: '2024-03-09',
      helpful: 8,
      replied: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and respond to your customer reviews</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Average Rating</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">4.8</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Total Reviews</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">156</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ThumbsUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Positive Reviews</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">92%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Response Rate</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">98%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reviews</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={review.customer.image}
                    alt={review.customer.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{review.customer.name}</h4>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                  <div className="mt-2 text-sm text-gray-500">{review.service}</div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.helpful} Helpful
                    </button>
                    {!review.replied && (
                      <button className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}