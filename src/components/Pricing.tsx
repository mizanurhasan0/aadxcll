"use client";
import React, { useState, useEffect } from 'react';

interface Package {
  _id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  popular: boolean;
  features: string[];
  description: string;
  order: number;
  active: boolean;
  createdAt: string;
}

const Pricing = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/packages');

      if (!response.ok) {
        throw new Error(`Failed to fetch packages: ${response.status}`);
      }

      const data = await response.json();
      setPackages(data);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch packages');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plan</h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-3 text-gray-600">Loading pricing plans...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plan</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Failed to load pricing plans</p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={fetchPackages}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Pricing Plan</h2>
          </div>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No pricing plans found</p>
            <p className="text-gray-500 text-sm">Check back later for our pricing options!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plan</h2>
          <p className="text-gray-600 mb-6">
            {packages.length === 0
              ? 'Creating amazing plans...'
              : `${packages.length} flexible plan${packages.length !== 1 ? 's' : ''} to choose from`
            }
          </p>
          <button
            onClick={fetchPackages}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            title="Refresh pricing plans"
          >
            <svg
              className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((packageData) => (
            <div key={packageData._id} className={`relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${packageData.popular ? 'border-2 border-green-600' : ''}`}>
              {packageData.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{packageData.name}</h3>
                <p className="text-gray-600 mb-4">{packageData.subtitle}</p>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  {packageData.currency} {packageData.price}
                </div>
                {packageData.description && (
                  <p className="text-gray-500 text-sm mb-4">{packageData.description}</p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {packageData.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors font-semibold">
                PAY NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
