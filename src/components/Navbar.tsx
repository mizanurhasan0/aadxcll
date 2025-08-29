"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
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
      className={`w-full fixed top-0 z-50 flex items-center justify-between px-8 text-white transform-gpu transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 shadow-md py-3'
        : 'bg-transparent py-5'
        } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}
    >
      <div className="font-bold text-xl">
        <img
          src="/projects/logolight.png"
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
        <li><a href="/blogs" className="hover:text-success transition-colors">All Blogs</a></li>
        <li><a href="#contact" className="hover:text-success transition-colors">Contact Us</a></li>
        {user ? (
          <li><a href="/dashboard" className="hover:text-success transition-colors">Dashboard</a></li>
        ) : " "}
      </ul>
      <button onClick={() => user ? logout() : router.push('/auth')} className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all duration-500 group">
        <span className="relative z-10">{user ? "Logout" : "Login"}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-transparent to-blue-400/30 transform translate-x-full translate-y-[-50%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
      </button>
    </nav>
  );
};

export default Navbar;
