import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Web Design</a></li>
            <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Software Development</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Recent Projects</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Art Deco Cocktails</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Low Poly Base Mesh</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Creative Agency</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Desktop Mockup</a></li>
            <li><a href="#" className="hover:text-white transition-colors">E-Shop Ecommerce</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mobile Crypto Wallet</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Contacts</h3>
          <div className="space-y-2 text-gray-300">
            <p>88012454784</p>
            <p>test@gmail.com</p>
            <p>Your Address, Your City-12345, Your State, Your Country</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          © 2021. All rights reserved by <span className="font-bold text-white">The CodeGrammer</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
