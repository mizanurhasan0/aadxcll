import React from 'react';

const About = () => (
  <section id="about" className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="mb-6">
          <p className="text-blue-600 font-semibold mb-4">Get To Know</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          We Do Design, Code & Develop Software Finally Launch.
        </h3>
        <p className="text-gray-600 mb-8">
          Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Class onlin aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ex. the Donec lacinia placerat felis non aliquam.
        </p>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-blue-600 mr-4">#1</span>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">
                Best Creative IT Agency And Solutions Since 2005.
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-96 h-96 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-6xl">🚀</span>
        </div>
      </div>
    </div>
  </section>
);

export default About;
