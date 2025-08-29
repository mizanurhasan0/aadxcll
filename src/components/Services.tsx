'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { services } from '@/services/serviceService';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate cards with staggered delay
            services.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => [...prev, index]);
              }, index * 150); // 150ms delay between each card
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <p className="text-success font-semibold mb-4 underline underline-offset-8">Our Solutions</p>
          <h2 className="text-4xl font-bold mb-6 text-gray-700">Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`text-center p-8 border-2 border-green-200 text-gray-700 bg-gradient-to-r group hover:from-green-900 hover:to-green-800 rounded-xl hover:shadow-lg transition-all duration-700 transform cursor-pointer ${animatedCards.includes(idx)
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-12 opacity-0 scale-95'
                }`}
              style={{
                transitionDelay: `${idx * 100}ms`
              }}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className='flex justify-between items-center'>
                <div className={`transition-all duration-700 transform ${animatedCards.includes(idx) ? 'rotate-0 scale-100' : 'rotate-12 scale-75'
                  }`}>
                  {service.icon}
                </div>
                <div className={`text-transparent text-outline text-5xl font-bold opacity-25 transition-all duration-700 transform ${animatedCards.includes(idx) ? 'scale-100 opacity-25' : 'scale-50 opacity-0'
                  }`}>
                  {service.number}
                </div>
              </div>
              <h3 className={`text-2xl font-medium text-left group-hover:text-white transition-all duration-500 transform ${animatedCards.includes(idx) ? 'translate-x-0' : 'translate-x-4'
                }`}>
                {service.title}
              </h3>
              <p className={`mb-6 text-left text-base font-normal leading-7 group-hover:text-white transition-all duration-700 transform ${animatedCards.includes(idx) ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}>
                {service.shortDesc}
              </p>
              <div className={`flex justify-end items-center transition-all duration-700 transform ${animatedCards.includes(idx) ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                <button className="text-green-600 font-semibold hover:underline group-hover:text-white transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
