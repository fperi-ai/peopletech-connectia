import React from 'react';

const HeroImage: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4">
      {/* Placeholder for the illustration. We will use a simple SVG for now. */}
      <svg 
        className="w-full h-auto max-w-sm text-gray-300 dark:text-gray-600"
        width="243" 
        height="243" 
        viewBox="0 0 243 243" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="243" height="243" rx="12" fill="currentColor"/>
        <path d="M121.5 81L146.5 121.5L121.5 162L96.5 121.5L121.5 81Z" stroke="#9CA3AF" strokeWidth="2"/>
        <circle cx="121.5" cy="121.5" r="20" stroke="#9CA3AF" strokeWidth="2"/>
      </svg>
    </div>
  );
};

export default HeroImage;
