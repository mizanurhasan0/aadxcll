'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
                        Satisfied partners
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                        Our Partners
                    </h2>
                </div>

                {/* Partners Container with Unified Layout */}
                <div className="relative">
                    {/* Partners Grid */}
                    <div className="overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {partners.map((partner, idx) => (
                                <div key={idx} className="flex-shrink-0">
                                    <div className="bg-gray-800 rounded-xl p-4 md:p-6 w-32 md:w-40 lg:w-48 h-20 md:h-24 lg:h-32 flex items-center justify-center border border-gray-700 shadow-lg hover:border-emerald-400/50 transition-all duration-300 group">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-profile.svg';
                                                target.alt = 'Placeholder Profile';
                                            }}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons - Bottom Right */}
                    <div className="flex justify-end mt-6">
                        <div className="flex gap-3">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg ${canScrollLeft
                                    ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600 cursor-pointer'
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
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg ${canScrollRight
                                    ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600 cursor-pointer'
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
                </div>

            </div>
        </section>
    );
};

export default Partners;
