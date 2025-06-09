import React from "react";

interface CollaborationIllustrationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function CollaborationIllustration({
  className = "",
  width = 300,
  height = 200
}: CollaborationIllustrationProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fondo con gradiente suave */}
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6F7F7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D0F0F0" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="robot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2AB3B1" />
          <stop offset="100%" stopColor="#70E0CB" />
        </linearGradient>
      </defs>
      
      {/* Fondo */}
      <rect x="0" y="0" width="400" height="300" fill="url(#bg-gradient)" rx="20" />
      
      {/* Persona 1 (izquierda) */}
      <circle cx="100" cy="120" r="30" fill="#F98F54" /> {/* Cabeza */}
      <rect x="85" y="150" width="30" height="60" rx="10" fill="#F98F54" /> {/* Cuerpo */}
      <line x1="85" y1="170" x2="65" y2="190" stroke="#F98F54" strokeWidth="10" strokeLinecap="round" /> {/* Brazo izquierdo */}
      <line x1="115" y1="170" x2="140" y2="180" stroke="#F98F54" strokeWidth="10" strokeLinecap="round" /> {/* Brazo derecho */}
      
      {/* Robot (centro) */}
      <rect x="170" y="100" width="60" height="70" rx="10" fill="url(#robot-gradient)" /> {/* Cabeza */}
      <rect x="180" y="170" width="40" height="60" rx="5" fill="url(#robot-gradient)" /> {/* Cuerpo */}
      <circle cx="185" cy="115" r="5" fill="white" /> {/* Ojo izquierdo */}
      <circle cx="215" cy="115" r="5" fill="white" /> {/* Ojo derecho */}
      <line x1="180" y1="140" x2="220" y2="140" stroke="white" strokeWidth="3" strokeLinecap="round" /> {/* Boca */}
      <line x1="170" y1="190" x2="150" y2="200" stroke="url(#robot-gradient)" strokeWidth="8" strokeLinecap="round" /> {/* Brazo izquierdo */}
      <line x1="220" y1="190" x2="250" y2="200" stroke="url(#robot-gradient)" strokeWidth="8" strokeLinecap="round" /> {/* Brazo derecho */}
      <circle cx="200" cy="85" r="8" fill="url(#robot-gradient)" /> {/* Antena */}
      <line x1="200" y1="92" x2="200" y2="100" stroke="url(#robot-gradient)" strokeWidth="3" /> {/* Conector antena */}
      
      {/* Persona 2 (derecha) */}
      <circle cx="300" cy="120" r="30" fill="#7C5DFA" /> {/* Cabeza */}
      <rect x="285" y="150" width="30" height="60" rx="10" fill="#7C5DFA" /> {/* Cuerpo */}
      <line x1="285" y1="170" x2="260" y2="180" stroke="#7C5DFA" strokeWidth="10" strokeLinecap="round" /> {/* Brazo izquierdo */}
      <line x1="315" y1="170" x2="335" y2="190" stroke="#7C5DFA" strokeWidth="10" strokeLinecap="round" /> {/* Brazo derecho */}
      
      {/* Líneas de conexión (representando colaboración) */}
      <path d="M140 180 Q 170 160 150 200" stroke="#F98F54" strokeWidth="2" strokeDasharray="4" />
      <path d="M250 200 Q 270 180 260 180" stroke="#7C5DFA" strokeWidth="2" strokeDasharray="4" />
      
      {/* Burbujas de diálogo */}
      <ellipse cx="70" cy="80" rx="40" ry="25" fill="white" stroke="#F98F54" strokeWidth="1" />
      <ellipse cx="330" cy="80" rx="40" ry="25" fill="white" stroke="#7C5DFA" strokeWidth="1" />
      <ellipse cx="200" cy="50" rx="45" ry="30" fill="white" stroke="url(#robot-gradient)" strokeWidth="1" />
      
      {/* Texto en burbujas (simulado) */}
      <line x1="60" y1="80" x2="80" y2="80" stroke="#F98F54" strokeWidth="2" />
      <line x1="55" y1="85" x2="85" y2="85" stroke="#F98F54" strokeWidth="2" />
      
      <line x1="320" y1="80" x2="340" y2="80" stroke="#7C5DFA" strokeWidth="2" />
      <line x1="315" y1="85" x2="345" y2="85" stroke="#7C5DFA" strokeWidth="2" />
      
      <line x1="180" y1="45" x2="220" y2="45" stroke="url(#robot-gradient)" strokeWidth="2" />
      <line x1="175" y1="50" x2="225" y2="50" stroke="url(#robot-gradient)" strokeWidth="2" />
      <line x1="180" y1="55" x2="220" y2="55" stroke="url(#robot-gradient)" strokeWidth="2" />
    </svg>
  );
}
