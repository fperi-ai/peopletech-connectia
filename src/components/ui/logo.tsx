import React from "react";

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  darkMode?: boolean;
}

export function Logo({ width = 300, height = 80, className = "", darkMode = false }: LogoProps) {
  const textColor = darkMode ? "#EAEAEA" : "#212121";

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 80"
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-labelledby="logo-title logo-desc"
      className={className}
    >
      <title id="logo-title">Logo de PeopleTech ConnectIA</title>
      <desc id="logo-desc">
        Un trazo circular en degradado turquesa que forma la letra C abierta, con un punto
        interior que simboliza la IA, seguido del texto ConnectIA.
      </desc>

      {/* Degradado principal */}
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2AB3B1"/>
          <stop offset="100%" stopColor="#70E0CB"/>
        </linearGradient>
      </defs>

      {/* C semicircular */}
      <path 
        d="M50 15 a25 25 0 1 0 0 50"
        stroke="url(#grad)"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />

      {/* Punto IA */}
      <circle cx="75" cy="40" r="6" fill="url(#grad)"/>

      {/* Texto ConnectIA */}
      <text 
        x="95" 
        y="52"
        fontFamily="Inter, Nunito Sans, sans-serif"
        fontSize="36"
        fontWeight="700"
        fill={textColor}
      >
        Connect<tspan fill="url(#grad)">IA</tspan>
      </text>
    </svg>
  );
}

// Versión más pequeña para uso en móvil o espacios reducidos
export function LogoCompact({ width = 50, height = 50, className = "", darkMode = false }: LogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-labelledby="logo-compact-title logo-compact-desc"
      className={className}
    >
      <title id="logo-compact-title">Logo compacto de ConnectIA</title>
      <desc id="logo-compact-desc">Versión compacta del logo de ConnectIA</desc>

      {/* Degradado principal */}
      <defs>
        <linearGradient id="grad-compact" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2AB3B1"/>
          <stop offset="100%" stopColor="#70E0CB"/>
        </linearGradient>
      </defs>

      {/* C semicircular */}
      <path 
        d="M30 25 a25 25 0 1 0 0 50"
        stroke="url(#grad-compact)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      {/* Punto IA */}
      <circle cx="65" cy="50" r="6" fill="url(#grad-compact)"/>
    </svg>
  );
}
