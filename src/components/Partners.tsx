'use client'
import React, { useRef } from 'react';

const Partners = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const newScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
                    <div className="flex-1 mb-8 lg:mb-0">
                        <p className="text-emerald-400 font-semibold mb-4 underline underline-offset-8">
                            Satisfied Client
                        </p>
                        <h2 className="text-4xl font-bold text-white mb-6">Our Partner</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white transition-colors"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    <div className="w-px h-32 bg-emerald-400 hidden lg:block"></div>

                    <div className="flex-1">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {[
                                { name: 'www.egenslab.com', logo: '/projects/partner-1.png' },
                                { name: 'my life', logo: '/projects/partner-2.png' },
                                { name: 'abc.com', logo: '/projects/partner-3.png' },
                                { name: '@tuenti', logo: '/projects/partner-4.png' },
                                { name: 'ariete', logo: '/projects/partner-5.png' }
                            ].map((partner, idx) => (
                                <div key={idx} className="flex-shrink-0">
                                    <div className="bg-gray-800 rounded-xl p-6 w-48 h-32 flex items-center justify-center border border-gray-700 shadow-lg">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
