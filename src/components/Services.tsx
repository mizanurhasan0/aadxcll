'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { services } from '@/services/serviceService';
import {
  TvMinimalPlay,
  Globe,
  Search,
  ThumbsUp,
  Video,
  NotebookPen,
  Server,
  FileImage,
  ShoppingCart
} from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const themeContext = useTheme();

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

  // Function to render icon based on icon name
  const renderIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'TvMinimalPlay': <TvMinimalPlay className="w-[70px] h-[70px] text-primary" />,
      'Globe': <Globe className="w-[70px] h-[70px] text-primary" />,
      'Search': <Search className="w-[70px] h-[70px] text-primary" />,
      'ThumbsUp': <ThumbsUp className="w-[70px] h-[70px] text-primary" />,
      'Video': <Video className="w-[70px] h-[70px] text-primary" />,
      'NotebookPen': <NotebookPen className="w-[70px] h-[70px] text-primary" />,
      'Server': <Server className="w-[70px] h-[70px] text-primary" />,
      'FileImage': <FileImage className="w-[70px] h-[70px] text-primary" />,
      'ShoppingCart': <ShoppingCart className="w-[70px] h-[70px] text-primary" />,
    };

    return iconMap[iconName] || <div className="w-[70px] h-[70px] bg-gray-300 rounded"></div>;
  };



  return (
    <section ref={sectionRef} id="services" className="py-20 transition-all duration-300 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <p className="font-semibold mb-4 underline underline-offset-8 transition-colors duration-300 text-primary">Our Solutions</p>
          <h2 className="text-4xl font-bold mb-6 duration-300 text-text">Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`text-center px-8 p-4 border-2 rounded-xl hover:shadow-lg transition-all duration-700 transform cursor-pointer bg-bg-card border-primary text-text ${animatedCards.includes(idx)
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
                  {renderIcon(service.icon)}
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
                <button className="font-semibold hover:underline group-hover:text-white transition-colors duration-300 text-primary">
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
