'use client'
import React, { useRef, useState, useEffect } from 'react';

const Partners = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const partners = [
        { name: 'my life', logo: '/brands/partner1.png' },
        { name: 'abc.com', logo: '/brands/partner2.jpeg' },
        { name: '@tuenti', logo: '/brands/partner3.jpeg' },
        { name: 'ariete', logo: '/brands/partner4.jpeg' },
        { name: 'my life', logo: '/brands/partner5.jpeg' },
        { name: 'abc.com', logo: '/brands/partner6.jpeg' }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;

            let newScroll;
            if (direction === 'left') {
                newScroll = Math.max(0, currentScroll - scrollAmount);
            } else {
                newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
            }

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }
    };

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);

            return () => {
                container.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, []);

    return (
        <section className="py-12 md:py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-emerald-400 font-semibold mb-3 md:mb-4 underline underline-offset-8 text-sm md:text-base">
                        Satisfied Client
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                        Our Partners
                    </h2>
                </div>

                {/* Navigation Controls - Mobile */}
                <div className="flex justify-center mb-6 md:hidden">
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 ${canScrollLeft
                                ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Scroll left"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 ${canScrollRight
                                ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-label="Scroll right"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex items-start justify-between space-x-8">
                    {/* Left Section with Controls */}
                    <div className="flex-shrink-0">
                        <div className="flex gap-3 mb-8">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 ${canScrollLeft
                                    ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                aria-label="Scroll left"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 ${canScrollRight
                                    ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    }`}
                                aria-label="Scroll right"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Vertical Divider */}
                        <div className="w-px h-32 bg-emerald-400"></div>
                    </div>

                    {/* Partners Grid */}
                    <div className="flex-1 overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {partners.map((partner, idx) => (
                                <div key={idx} className="flex-shrink-0">
                                    <div className="bg-gray-800 rounded-xl p-4 md:p-6 w-40 md:w-48 h-24 md:h-32 flex items-center justify-center border border-gray-700 shadow-lg hover:border-emerald-400/50 transition-all duration-300 group">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                    <div className="overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {partners.map((partner, idx) => (
                                <div key={idx} className="flex-shrink-0">
                                    <div className="bg-gray-800 rounded-xl p-4 w-32 h-20 flex items-center justify-center border border-gray-700 shadow-lg hover:border-emerald-400/50 transition-all duration-300 group">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Mobile */}
                <div className="flex justify-center mt-6 lg:hidden">
                    <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, idx) => (
                            <div
                                key={idx}
                                className="w-2 h-2 rounded-full bg-gray-600"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
