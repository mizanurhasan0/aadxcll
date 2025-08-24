'use client'
import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { number: 150, label: 'Project Completed', icon: '🤝' },
  { number: 229, label: 'Satisfied Clients', icon: '😊' },
  { number: 99, label: 'Expert Teams', icon: '👥' },
  { number: 4, label: 'Win Awards', icon: '🏆' }
];

const FunFacts = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newCounts = stats.map((stat) => {
        const target = stat.number;
        const current = Math.floor(target * progress);
        return current;
      });

      setCounts(newCounts);

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(stats.map(stat => stat.number));
      }
    }, stepDuration);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-semibold mb-4">Care Study</p>
          <h2 className="text-4xl font-bold mb-6">Fun Facts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 shadow-lg">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-5xl font-bold mb-3 text-emerald-400">
                {counts[idx]}+
              </div>
              <h3 className="text-lg font-medium text-gray-300">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
