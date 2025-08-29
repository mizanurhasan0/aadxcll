"use client";
import React from 'react';
import { PackageItem } from '@/services/packageService';

interface CardPricingProps {
    data: PackageItem;
}

const CardPricing: React.FC<CardPricingProps> = ({ data }) => {
    return (
        <div className={`relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${data.popular ? 'border-2 border-green-600' : ''}`}>
            {data.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                </div>
            )}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.name}</h3>
                <p className="text-gray-600 mb-4">{data.subtitle}</p>
                <div className="text-4xl font-bold text-green-600 mb-4">
                    {data.currency} {data.price}
                </div>
                {data.description && (
                    <p className="text-gray-500 text-sm mb-4">{data.description}</p>
                )}
            </div>
            <ul className="space-y-3 mb-8">
                {data.features.map((feature, featureIdx) => (
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
    );
};

export default CardPricing;


