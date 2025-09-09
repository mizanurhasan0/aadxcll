"use client";
import React from 'react';
import Link from 'next/link';
import { usePackages } from '@/hooks/usePackages';
import CardPricing from '@/components/pricing/components/CardPricing';
import HeaderPricing from './components/HeaderPricing';
import NotFound from '../shared/NotFound';
import EmptyData from '../shared/EmptyData';

const Pricing = () => {
  const { visiblePackages, packages, isLoading, error, fetchPackages, hasMore } = usePackages({ limit: 3, activeOnly: true });

  if (isLoading) {
    return <HeaderPricing>
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-text-muted">Loading pricing plans...</span>
      </div>
    </HeaderPricing>
  }

  if (error) {
    return <HeaderPricing>
      <NotFound error={error} onRetry={fetchPackages} message="Failed to load pricing plans" />
    </HeaderPricing >
  }

  if (packages.length === 0) return null;

  return (
    <HeaderPricing>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visiblePackages.map((p) => (
          <CardPricing key={p._id} data={p} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 text-center">
          <Link href="/pricing" className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-text-muted rounded-lg transition-colors">See more</Link>
        </div>
      )}
    </HeaderPricing>
  );
};

export default Pricing;
