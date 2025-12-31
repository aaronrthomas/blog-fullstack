import React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
      <span className="text-white font-bold text-sm">B</span>
    </div>
    <span className="text-xl font-semibold text-gray-900">Beyond UI</span>
  </Link>
);

export default Logo;