import React from 'react';
import { MapPin, Star } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{service.category}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ${service.price}/hr
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm line-clamp-2">{service.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={service.provider.avatar}
              alt={service.provider.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{service.provider.name}</p>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{service.provider.rating}</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{service.provider.completedJobs} jobs</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="ml-1 text-sm">2.5 km</span>
          </div>
        </div>
      </div>
    </div>
  );
}