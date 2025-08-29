"use client";
import React from 'react';
import { usePackages } from '@/hooks/usePackages';
import CardPricing from '@/components/pricing/components/CardPricing';
import HeaderPricing from '@/components/pricing/components/HeaderPricing';
import NotFound from '@/components/shared/NotFound';
import EmptyData from '@/components/shared/EmptyData';

const PricingPage = () => {
    const { packages, isLoading, error, fetchPackages } = usePackages({ activeOnly: true });

    if (isLoading) {
        return (
            <HeaderPricing>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                    <span className="ml-3 text-gray-600">Loading pricing plans...</span>
                </div>
            </HeaderPricing>
        );
    }

    if (error) {
        return (
            <HeaderPricing>
                <NotFound error={error} onRetry={fetchPackages} />
            </HeaderPricing>
        );
    }

    return (
        <HeaderPricing>
            {packages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((p) => (
                        <CardPricing key={p._id} data={p} />
                    ))}
                </div>
            ) : (
                <EmptyData message="No pricing plans found" />
            )}
        </HeaderPricing>
    );
};

export default PricingPage;


