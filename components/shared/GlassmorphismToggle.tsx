import React from 'react';
import { useGlassmorphism } from '../../contexts/GlassmorphismContext';
import Icon from './Icon';

interface GlassmorphismToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente para activar/desactivar el estilo Glassmorphism en toda la aplicación
 */
const GlassmorphismToggle: React.FC<GlassmorphismToggleProps> = ({
  className = '',
  showLabel = true,
  size = 'md',
}) => {
  const { isGlassmorphismEnabled, toggleGlassmorphism } = useGlassmorphism();
  
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  };
  
  const thumbSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  const translateClasses = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
    lg: 'translate-x-7',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && (
        <span className="mr-2 text-sm text-neutral-textDark dark:text-neutral-textLight">
          {isGlassmorphismEnabled ? 'Glassmorphism' : 'Estándar'}
        </span>
      )}
      
      <button
        type="button"
        role="switch"
        aria-checked={isGlassmorphismEnabled}
        onClick={toggleGlassmorphism}
        className={`
          relative inline-flex flex-shrink-0 ${sizeClasses[size]} cursor-pointer rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:ring-offset-2
          ${isGlassmorphismEnabled ? 'bg-primary-DEFAULT' : 'bg-gray-200 dark:bg-gray-700'}
        `}
      >
        <span className="sr-only">Activar estilo Glassmorphism</span>
        <span
          aria-hidden="true"
          className={`
            ${isGlassmorphismEnabled ? translateClasses[size] : 'translate-x-0'}
            pointer-events-none inline-block ${thumbSizeClasses[size]} transform rounded-full 
            bg-white shadow ring-0 transition duration-200 ease-in-out
            flex items-center justify-center
          `}
        >
          {isGlassmorphismEnabled && (
            <span className="text-primary-DEFAULT" style={{ transform: 'scale(0.7)' }}>
              <Icon name="check" className="w-full h-full" />
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default GlassmorphismToggle;
