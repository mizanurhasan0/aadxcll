import React from 'react';

const stats = [
  { number: '0', label: 'Project Completed' },
  { number: '0', label: 'Satisfied Clients' },
  { number: '0', label: 'Expert Teams' },
  { number: '0', label: 'Win Awards' }
];

const FunFacts = () => (
  <section className="py-20 bg-blue-600 text-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-blue-200 font-semibold mb-4">Care Study</p>
        <h2 className="text-4xl font-bold mb-6">Fun Facts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-5xl font-bold mb-2">{stat.number} +</div>
            <h3 className="text-xl font-semibold">{stat.label}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FunFacts;
