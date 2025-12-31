import React from 'react';
import Link from 'next/link';

type NavigationLinksProps = {
  className?: string;
  vertical?: boolean;
  onLinkClick?: () => void;
};

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  className = "", 
  vertical = false,
  onLinkClick
}) => {
  const links = [
    { href: "/", text: "Homepage" },
    { href: "/about", text: "About us" },
    { href: "/features", text: "Features" },
    { href: "/blog", text: "Blog" },
    { href: "/contact", text: "Contact us" },
    { href: "/demo", text: "Demo" },
  ];
  
  const linkClasses = "text-gray-700 hover:text-gray-900 transition-colors" + 
    (vertical ? " px-2 py-1" : "");
  
  return (
    <nav className={`${className} ${vertical ? 'flex flex-col items-center space-y-4' : 'items-center space-x-4 lg:space-x-8'}`}>
      {links.map(link => (
        <Link 
          key={link.href}
          href={link.href} 
          className={linkClasses}
          onClick={onLinkClick}
        >
          {link.text}
        </Link>
      ))}
      <Link 
        href="/get-started" 
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        onClick={onLinkClick}
      >
        Get Started
      </Link>
    </nav>
  );
};

export default NavigationLinks;