'use client'
import { Server, TvMinimalPlay, Globe, Search, ThumbsUp, Video, NotebookPen, FileImage, ShoppingCart } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    icon: <TvMinimalPlay className='w-[70px] h-[70px] text-success' />,
    title: 'Full Stack Digital Marketing',
    desc: 'Digital marketing service empowers small, medium & large businesses to compete with larger enterprises. We help you to separate your voice from hauling competitors.'
  },
  {
    number: '02',
    icon: <Globe className='w-[70px] h-[70px] text-success' />,
    title: 'Web Development',
    desc: 'Every business needs a user-friendly website. We create in-demand design websites which will provide our clients to achieve customer trust, growth & business required needs.'
  },
  {
    number: '03',
    icon: <Search className='w-[70px] h-[70px] text-success' />,
    title: 'Search Engine Optimization-',
    desc: 'SEO is an effective way to get incredible results & generate high organic traffic to your website. Complete SEO service helping your business to secure Google\'s first page.'
  },
  {
    number: '04',
    icon: <ThumbsUp className='w-[70px] h-[70px] text-success' />,
    title: 'Social Media Marketing',
    desc: 'Digital marketing service empowers small, medium & large businesses to compete with larger enterprises. We help you to separate your voice from hauling competitors.'
  },
  {
    number: '05',
    icon: <Video className='w-[70px] h-[70px] text-success' />,
    title: 'Video Production',
    desc: '91% of businesses use high-quality video production services like script, edit, shoot, produce & distribute video for increased engagement & build trust with target customer.'
  },
  {
    number: '06',
    icon: <NotebookPen className='w-[70px] h-[70px] text-success' />,
    title: 'Content Writing-',
    desc: 'Content is always king for marketing. There are no options to represent any business with content marketing. It is the best way to attract customers of relevant conten.'
  },
  {
    number: '07',
    icon: <Server className='w-[70px] h-[70px] text-success' />,
    title: 'Server Side Tracking',
    desc: 'Server-side tracking collects website data on a dedicated server instead of the user\'s browser, bypassing adblockers & tracking prevention for accurate & uninterrupted data capture.'
  },
  {
    number: '08',
    icon: <FileImage className='w-[70px] h-[70px] text-success' />,
    title: 'Graphic Design',
    desc: 'Graphic design services promote your brand with stunning visuals, logos, and marketing materials. Enhance your identity & captivate your audience with creative designs'
  },
  {
    number: '09',
    icon: <ShoppingCart className='w-[70px] h-[70px] text-success' />,
    title: 'E-Commerce Marketing',
    desc: 'Its increased sales, online store visibility, convert web visitors into customers & also successful marketing strategy have become a pivotal part of revenue growth.'
  },
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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
              key={idx}
              className={`text-center p-8 border-2 border-green-200 text-gray-700 bg-gradient-to-r group hover:from-green-900 hover:to-green-800 rounded-xl hover:shadow-lg transition-all duration-700 transform ${animatedCards.includes(idx)
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-12 opacity-0 scale-95'
                }`}
              style={{
                transitionDelay: `${idx * 100}ms`
              }}
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
                {service.desc}
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
