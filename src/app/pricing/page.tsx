"use client";
import React from 'react';
import { usePackages } from '@/hooks/usePackages';
import CardPricing from '@/components/pricing/CardPricing';

const PricingPage = () => {
    const { packages, isLoading, error, fetchPackages } = usePackages({ activeOnly: true });

    if (isLoading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">All Pricing Plans</h1>
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">All Pricing Plans</h1>
                    </div>
                    <div className="text-center py-20">
                        <div className="text-red-500 mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 mb-4">Failed to load pricing plans</p>
                        <p className="text-gray-500 text-sm mb-6">{error}</p>
                        <button onClick={fetchPackages} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">Try Again</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Getting Start</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">All Pricing Plans</h1>
                    <p className="text-gray-600">{packages.length} total</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((p) => (
                        <CardPricing key={p._id} data={p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPage;


