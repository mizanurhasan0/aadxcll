import React from 'react';

const About = () => (
  <section id="about" className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="mb-6">
          <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Get To Know</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          We Do Design, Code & Develop Software Finally Launch.
        </h3>
        <p className="text-gray-600 mb-8">
          Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Class onlin aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ex. the Donec lacinia placerat felis non aliquam.
        </p>
        <div className="bg-gradient-to-br from-emerald-200/60 to-emerald-400/40 p-[1px] rounded-2xl">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold">&lt;/&gt;</span>
                <span className="text-base font-semibold text-gray-900">The CodeGrammer</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">#1</span>
            </div>
            <div className="mt-5">
              <p className="text-2xl md:text-3xl font-semibold leading-snug text-gray-900">
                Best Creative IT Agency And Solutions
                <br />
                <span className="text-emerald-500">Since 2005.</span>
              </p>
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
