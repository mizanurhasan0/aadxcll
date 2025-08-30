"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Projects" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blogs", label: "All Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 transform-gpu transition-all duration-300 ease-in-out
      ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}
      ${pathname === '/' && !isScrolled
          ? 'bg-transparent py-5'
          : 'bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 shadow-md py-3'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/projects/logolight.png"
                alt="Logo"
                className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'
                  }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-success transition-colors duration-200 text-base font-medium"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <Link
                  href="/dashboard"
                  className="text-white hover:text-success transition-colors duration-200 text-base font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            <button
              onClick={() => user ? handleLogout() : router.push('/auth')}
              className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-all duration-500 group"
            >
              <span className="relative z-10">{user ? "Logout" : "Login"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-transparent to-blue-400/30 transform translate-x-full translate-y-[-50%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-success hover:bg-white/10 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-success hover:bg-white/10 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-success hover:bg-white/10 transition-colors duration-200"
            >
              Dashboard
            </Link>
          )}

          {/* Mobile Auth Button */}
          <div className="pt-4 pb-3 border-t border-white/10">
            <button
              onClick={() => user ? handleLogout() : router.push('/auth')}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-success hover:bg-white/10 transition-colors duration-200"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
