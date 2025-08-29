"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { services } from '@/services/serviceService';
import { Search, Filter, ArrowRight } from 'lucide-react';

const ServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'marketing', 'development', 'design', 'content', 'analytics'];

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'all' ||
                service.title.toLowerCase().includes(selectedCategory.toLowerCase());

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our comprehensive range of digital solutions designed to help your business grow and succeed in the digital world.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
                        >
                            {/* Service Icon and Number */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-green-600 group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <span className="text-4xl font-bold text-gray-200 opacity-50">
                                        {service.number}
                                    </span>
                                </div>

                                {/* Service Title */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Service Description */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {service.shortDesc}
                                </p>

                                {/* Features Preview */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.slice(0, 3).map((feature, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                        {service.features.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                +{service.features.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-6 pb-6">
                                <Link
                                    href={`/services/${service.id}`}
                                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-300 group-hover:bg-green-700"
                                >
                                    Learn More
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
                        <p className="text-gray-500">
                            Try adjusting your search terms or category filter.
                        </p>
                    </div>
                )}

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                    >
                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;