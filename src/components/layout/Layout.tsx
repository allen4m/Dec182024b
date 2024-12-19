import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="group relative overflow-hidden"
                aria-label="Home"
                onClick={closeMenu}
              >
                <img
                  src="https://cdn.prod.website-files.com/673d04a68c435af83c59b97a/67520579b527ce80e7018409_1Admission%20Horizontal%20v6b.svg"
                  alt="1Admission"
                  className="h-10 w-auto transform transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/'
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                GPA Calculator
                {location.pathname === '/' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                )}
              </Link>
              <Link
                to="/blog"
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname.startsWith('/blog')
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                University
                {location.pathname.startsWith('/blog') && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                )}
              </Link>
              <Link
                to="/login"
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === '/login'
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Login
                {location.pathname === '/login' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">
                  {isMenuOpen ? 'Close main menu' : 'Open main menu'}
                </span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } border-t border-gray-200`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block px-4 py-3 text-base font-medium ${
                location.pathname === '/'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              GPA Calculator
            </Link>
            <Link
              to="/blog"
              onClick={closeMenu}
              className={`block px-4 py-3 text-base font-medium ${
                location.pathname.startsWith('/blog')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              University
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className={`block px-4 py-3 text-base font-medium ${
                location.pathname === '/login'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}