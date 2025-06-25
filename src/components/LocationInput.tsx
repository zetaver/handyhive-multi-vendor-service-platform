import React, { useEffect, useRef, useState } from 'react';
import { MapPin, LocateFixed } from 'lucide-react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

interface LocationInputProps {
  onLocationSelect: (location: { address: string; coordinates: [number, number] }) => void;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

export function LocationInput({ onLocationSelect, defaultValue = '', required = false, disabled = false }: LocationInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'in' }, // Restrict to India
    },
    defaultValue,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    setShowSuggestions(false);

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onLocationSelect({
        address,
        coordinates: [lng, lat]
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyANknUQVh3DDInGVZxKpCF413Itn74fyK0`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setValue(address, false);
              onLocationSelect({
                address,
                coordinates: [longitude, latitude]
              });
            }
          } catch (error) {
            console.error('Error getting location:', error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
          alert('Error getting your location. Please enter it manually.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="relative">
      <div className="relative flex rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setShowSuggestions(true);
          }}
          disabled={!ready || disabled}
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your location"
          required={required}
        />
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLoading || disabled}
          className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600" />
          ) : (
            <LocateFixed className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {status === 'OK' && showSuggestions && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 text-gray-900"
              >
                {description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}