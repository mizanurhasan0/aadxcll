'use client';
import React from 'react';

const testimonials = [
  {
    name: 'Martha Maldonado',
    position: 'Executive Chairman',
    testimonial: 'Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. ani aptent taciti sociosqu ad litora torquent per conubia nostra, per sonic himenaeos. Praesent nec neque at dolor venenatis consectetur europ Donec lacinia placerat felis non aliquam.'
  },
  {
    name: 'Kelly Smith',
    position: 'CEO',
    testimonial: 'Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. ani aptent taciti sociosqu ad litora torquent per conubia nostra, per sonic himenaeos. Praesent nec neque at dolor venenatis consectetur europ Donec lacinia placerat felis non aliquam.'
  }
];

const Testimonials = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-semibold mb-4">Testimonial</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Client Say About Us</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-gray-600 mb-6 italic">"{testimonial.testimonial}"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
