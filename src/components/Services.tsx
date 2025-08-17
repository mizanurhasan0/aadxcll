import React from 'react';

const services = [
  {
    number: '01',
    title: 'Web Design',
    desc: 'Integer purus odio, placerat nec rhoncu in, ullamcorper nec dolor.'
  },
  {
    number: '02',
    title: 'UI/UX Design',
    desc: 'Integer purus odio, placerat nec rhoncu in, ullamcorper nec dolor.'
  },
  {
    number: '03',
    title: 'Software Development',
    desc: 'Integer purus odio, placerat nec rhoncu in, ullamcorper nec dolor.'
  }
];

const Services = () => (
  <section id="services" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-semibold mb-4">Our Solutions</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Services</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-2xl font-bold mb-4">{service.number}</div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.desc}</p>
            <button className="text-blue-600 font-semibold hover:underline">Read More</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
