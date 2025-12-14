// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`${isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'} text-white border-b border-gray-800 sticky top-0 z-50 transition-all duration-200`}>
        <div className="flex justify-between items-center px-6 lg:px-26 py-4">
          {/* Left side: Logo + Mobile Menu */}
          <div className="flex gap-6 items-center">
            <button 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
            <div className="flex gap-2 items-center">
              <span className="font-bold text-xl">LOGO</span>
              <Link href="#" className="lg:hidden hover:text-green-400 transition-colors duration-200 font-medium">
                HOME
              </Link>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex gap-8 items-center">
            <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
              HOME
            </Link>
            <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
              STORE
            </Link>
            <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
              NEWS
            </Link>
            <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
              DELIVERY
            </Link>
          </div>

          {/* Right side: Search + User Actions */}
          <div className="flex gap-4 items-center">
            {/* Desktop Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search Product..."
                className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 text-white placeholder-gray-500"
              />
            </div>

            {/* Cart and User Actions */}
            <div className="flex gap-3 items-center">
              <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group" aria-label="Shopping cart">
                <ShoppingCart size={20} className="group-hover:text-green-400" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  3
                </span>
              </button>
              
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group" aria-label="User profile">
                <User size={20} className="group-hover:text-green-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-6 py-4 border-t border-gray-800 bg-black">
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium py-2">
                HOME
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium py-2">
                STORE
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium py-2">
                NEWS
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium py-2">
                DELIVERY
              </Link>
            </div>
          </div>
        )}

        <div className="md:hidden px-6 py-3 border-t border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200 text-white placeholder-gray-500"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;