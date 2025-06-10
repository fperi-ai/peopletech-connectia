import React from 'react';

interface LogoProps {
  className?: string;
  isDarkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, isDarkMode }) => {
  const textColor = isDarkMode ? "#EAEAEA" : "#212121";

  return (
    <svg 
      viewBox="0 0 300 80" // Keep viewBox for aspect ratio
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-labelledby="connectia-logo-title connectia-logo-desc"
      className={className} // Size controlled by className (e.g., "w-48 h-auto")
    >
      <title id="connectia-logo-title">Logo de PeopleTech ConnectIA</title>
      <desc id="connectia-logo-desc">
        Un trazo circular en degradado turquesa que forma la letra C abierta, con un punto 
        interior que simboliza la IA, seguido del texto ConnectIA.
      </desc>
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2AB3B1"/>
          <stop offset="100%" stopColor="#70E0CB"/>
        </linearGradient>
      </defs>
      <path d="M50 15 a25 25 0 1 0 0 50" stroke="url(#gradLogo)" strokeWidth="15" strokeLinecap="round" fill="none"/>
      <circle cx="75" cy="40" r="6" fill="url(#gradLogo)"/>
      <text x="95" y="52" fontFamily="Inter, Nunito Sans, sans-serif" fontSize="36" fontWeight="700" fill={textColor}>
        Connect<tspan fill="url(#gradLogo)">IA</tspan>
      </text>
    </svg>
  );
};

export default Logo;
