import React from 'react';

const SecondHero = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center">
        <div className="w-96 h-96 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-6xl">💼</span>
        </div>
      </div>
      <div className="text-left">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Best & Reliable<br />
          <span className="text-blue-600">Creative IT.</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. ol Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
            Contact us
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
            Projects
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default SecondHero;
