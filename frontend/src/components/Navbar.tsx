'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="flex md:order-2 space-x-3">
          <Link href="/login">
            <button type="button" className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg mr-3 md:mr-0 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md font-medium">
              Login
            </button>
          </Link>
          <Link href="/demo-login">
            <button type="button" className="bg-transparent border-2 border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-50 dark:hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center hidden md:block transition-all duration-300 hover:shadow-md">
              Demo
            </button>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-green-600 transition-all duration-300 hover:scale-110"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5" aria-hidden="true" />
            ) : (
              <FaBars className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <div
          className={`${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'} absolute md:relative top-16 md:top-0 left-0 w-full md:block md:w-auto transition-all duration-300 ease-in-out transform z-20 md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 shadow-lg md:shadow-none">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-green-600 dark:text-green-400 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:hover:text-green-300 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Chatbot
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/community-forum" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Community Forum
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/disease-detection" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Disease Detection
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/market-prices" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Market Prices
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/weather-alerts" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Weather Alerts
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li>
              <Link href="/knowledge-base" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200 relative group">
                Knowledge Base
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-full transition-all duration-300 md:block hidden"></span>
              </Link>
            </li>
            <li className="md:hidden">
              <Link href="/demo-login" className="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-600 md:p-0 dark:hover:text-green-400 dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors duration-200">
                Demo Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;