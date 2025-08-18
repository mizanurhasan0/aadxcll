"use client";
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 flex items-center justify-between px-8 text-white transform-gpu transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 shadow-md py-3'
          : 'bg-transparent py-5'
      } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}
    >
      <div className="font-bold text-xl">
        <img
          src="/logo.png"
          alt="Logo"
          className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
        />
      </div>
      <ul className="flex gap-8 text-base font-medium text-white [&>*:hover]:text-success">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#contact" className="hover:text-success transition-colors">Contact Us</a></li>
      </ul>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
        Start Project
      </button>
    </nav>
  );
};

export default Navbar;
