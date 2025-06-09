import React from "react";

interface ConnieAssistantProps {
  message: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ConnieAssistant({
  message,
  className = "",
  size = "md"
}: ConnieAssistantProps) {
  // Tamaños responsivos basados en el prop size
  const dimensions = {
    sm: { width: 40, height: 40, textWidth: 150 },
    md: { width: 60, height: 60, textWidth: 220 },
    lg: { width: 80, height: 80, textWidth: 280 }
  };
  
  const { width, height, textWidth } = dimensions[size];
  
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      {/* Avatar de Connie */}
      <div 
        className="relative flex-shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 p-1 shadow-md"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Cara del robot */}
          <rect x="20" y="20" width="60" height="70" rx="10" fill="white" />
          
          {/* Ojos */}
          <circle cx="35" cy="40" r="8" fill="#2AB3B1" />
          <circle cx="65" cy="40" r="8" fill="#2AB3B1" />
          <circle cx="35" cy="40" r="3" fill="white" />
          <circle cx="65" cy="40" r="3" fill="white" />
          
          {/* Boca */}
          <path 
            d="M35 65 Q 50 75, 65 65" 
            stroke="#2AB3B1" 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none"
          />
          
          {/* Antena */}
          <circle cx="50" cy="10" r="5" fill="#2AB3B1" />
          <line x1="50" y1="15" x2="50" y2="20" stroke="#2AB3B1" strokeWidth="3" />
          
          {/* Orejas/Sensores */}
          <rect x="10" y="35" width="10" height="20" rx="5" fill="#2AB3B1" />
          <rect x="80" y="35" width="10" height="20" rx="5" fill="#2AB3B1" />
        </svg>
        
        {/* Indicador de "en línea" */}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900"></span>
      </div>
      
      {/* Burbuja de mensaje */}
      <div 
        className="relative rounded-2xl rounded-bl-none bg-teal-100 p-3 text-sm text-gray-800 shadow-sm dark:bg-teal-900 dark:text-gray-100"
        style={{ maxWidth: `${textWidth}px` }}
      >
        <p>{message}</p>
        <div className="absolute -bottom-2 -left-2 h-4 w-4 bg-teal-100 dark:bg-teal-900" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }}></div>
      </div>
    </div>
  );
}
