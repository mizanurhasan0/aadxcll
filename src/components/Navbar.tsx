import React from 'react';

const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-8 py-4 bg-white text-gray-800 shadow-sm fixed top-0 z-50">
    <div className="font-bold text-xl">
      <img src="/logo.png" alt="Logo" className="h-8" />
    </div>
    <ul className="flex gap-8 text-base font-medium">
      <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
      <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
      <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
      <li><a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a></li>
      <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
      <li><a href="#blogs" className="hover:text-blue-600 transition-colors">Blogs</a></li>
      <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
    </ul>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
      Start Project
    </button>
  </nav>
);

export default Navbar;
