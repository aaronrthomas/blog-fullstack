"use client"

import React, { useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavigationLinks from './NavigationLinks';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchProps = useSearch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 mx-8">
            <SearchBar {...searchProps} />
          </div>
          
          <NavigationLinks className="hidden md:flex" />
          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile menu */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          searchProps={searchProps}
          onLinkClick={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;