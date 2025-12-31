import React from 'react';
import SearchBar from './SearchBar';
import NavigationLinks from './NavigationLinks';

import type { SearchBarProps } from './SearchBar';

type MobileMenuProps = {
  isOpen: boolean;
  searchProps: SearchBarProps;
  onLinkClick: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, searchProps, onLinkClick }) => (
  <div 
    className={`md:hidden fixed left-0 right-0 bg-white shadow-lg z-40 transition-all duration-300 ease-in-out ${
      isOpen ? 'top-16 opacity-100' : 'top-[-100%] opacity-0'
    }`}
  >
    <div className="px-4 pt-4 pb-2">
      <SearchBar {...searchProps} onResultClick={onLinkClick} />
    </div>
    
    <div className="py-6">
      <NavigationLinks 
        vertical={true} 
        className="flex flex-col items-center justify-center space-y-4" 
        onLinkClick={onLinkClick}
      />
    </div>
  </div>
);

export default MobileMenu;