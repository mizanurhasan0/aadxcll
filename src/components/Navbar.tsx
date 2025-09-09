"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  // const themeContext = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Safely access theme, defaulting to 'light' if not available
  // const theme = themeContext?.theme || 'light';

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
    { href: "/pricing", label: "Packages" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Don't render until mounted
  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`w-full fixed top-0 z-50 transform-gpu transition-all duration-300 ease-in-out 
       ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}
       ${pathname === '/dashboard' ? 'hidden' : ''}
       ${pathname === '/' && !isScrolled
          ? 'py-5 bg-bg-navbar backdrop-blur-none'
          : 'py-3 shadow-md bg-bg-navbar-scrolled backdrop-blur-md'
        } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/Aadxcel-logo.png"
                alt="Logo"
                className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'
                  }`}
                width={150}
                height={100}
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
                  className={`relative transition-colors duration-200 text-base font-medium ${isActiveLink(link.href)
                    ? 'text-primary font-semibold'
                    : 'text-text-inverse hover:text-primary'
                    }`}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              ))}
              {user && (
                <Link
                  href="/dashboard"
                  className={`relative transition-colors duration-200 text-base font-medium ${pathname === '/dashboard'
                    ? 'text-primary font-semibold'
                    : 'text-text-inverse hover:text-primary'
                    }`}
                >
                  Dashboard
                  {pathname === '/dashboard' && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Button & Theme Toggle */}
          <div className={`${user ? 'flex md:flex' : 'hidden'}  items-center space-x-4`}>
            {/* <ThemeToggle /> */}
            <button
              onClick={() => user ? handleLogout() : router.push('/auth')}
              className="relative overflow-hidden px-6 py-2 rounded-md transition-all duration-500 group text-text-inverse border-border border bg-btn-secondary cursor-pointer"
            >
              <span className="relative z-10">{user ? "Logout" : "Login"}</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-btn-secondary-hover"
              ></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-white/10 transition-colors duration-200"
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden '
        }`}>
        <div
          className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm border-t transition-all duration-300 bg-bg-navbar-scrolled border-border"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink(link.href)
                ? 'text-primary font-semibold bg-primary/10 border-l-4 border-primary'
                : 'text-text-inverse hover:text-primary hover:bg-white/10'
                }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${pathname === '/dashboard'
                ? 'text-primary font-semibold bg-primary/10 border-l-4 border-primary'
                : 'text-text-inverse hover:text-primary hover:bg-white/10'
                }`}
            >
              Dashboard
            </Link>
          )}

          {/* Mobile Auth Button & Theme Toggle */}
          <div className="pt-4 pb-3 border-t flex items-center justify-between">
            <button
              onClick={() => user ? handleLogout() : router.push('/auth')}
              className="px-3 py-2 rounded-md text-base font-medium hover:text-primary hover:bg-white/10 transition-colors duration-200 text-text-inverse"
            >
              {user ? "Logout" : "Login"}
            </button>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
