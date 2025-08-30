"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { services } from '@/services/serviceService';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Services from '@/components/Services';

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

    return (<div className='mb-20'>
        <Services />
    </div>)
};

export default ServicesPage;