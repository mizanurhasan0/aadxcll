import React from 'react';

const Contact = () => (
  <section id="contact" className="py-20 bg-blue-600 text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="mb-12">
        <p className="text-blue-200 font-semibold mb-4">Get In Touch</p>
        <h2 className="text-4xl font-bold mb-6">
          Subscribe Our<br />
          <span className="text-yellow-400">Newsletter</span>
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Integer purus odio, placerat nec ande rhoncus in, ullamcorper nec dolor. on aptent taciti sociosqu.
        </p>
      </div>
      
      <div className="flex justify-center mb-12">
        <div className="flex max-w-md w-full">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none"
          />
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-full font-semibold hover:bg-yellow-500 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
