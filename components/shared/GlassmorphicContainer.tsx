import React, { ReactNode } from 'react';
import { useGlassmorphism } from '../../contexts/GlassmorphismContext';

interface GlassmorphicContainerProps {
  children: ReactNode;
  className?: string;
  glassmorphic?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  borderVisible?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
  ariaLabel?: string;
}

/**
 * Componente contenedor con estilo Glassmorphism
 * 
 * @param children - Contenido del contenedor
 * @param className - Clases adicionales para personalizar el contenedor
 * @param glassmorphic - Activar/desactivar el efecto glassmorphism
 * @param intensity - Intensidad del efecto (low, medium, high)
 * @param borderVisible - Mostrar/ocultar el borde
 * @param hoverEffect - Activar/desactivar efecto hover
 * @param onClick - Función a ejecutar al hacer clic
 * @param as - Elemento HTML a utilizar (div por defecto)
 * @param ariaLabel - Etiqueta aria para accesibilidad
 */
const GlassmorphicContainer: React.FC<GlassmorphicContainerProps> = ({
  children,
  className = '',
  glassmorphic: propGlassmorphic,
  intensity = 'medium',
  borderVisible = true,
  hoverEffect = false,
  onClick,
  as: Component = 'div',
  ariaLabel,
}) => {
  // Usar el contexto global de Glassmorphism
  const { isGlassmorphismEnabled } = useGlassmorphism();
  
  // Si se proporciona la prop glassmorphic, usarla; de lo contrario, usar el valor global
  const glassmorphic = propGlassmorphic !== undefined ? propGlassmorphic : isGlassmorphismEnabled;
  // Base styles
  const baseStyles = 'rounded-lg transition-all duration-200';
  
  // Estilos para cuando glassmorphic está desactivado
  const nonGlassStyles = 'bg-card-light dark:bg-card-dark shadow-md';
  
  // Intensidad del efecto glassmorphism
  const intensityMap = {
    low: {
      bg: 'bg-white/10 dark:bg-neutral-bgDark/20',
      blur: 'backdrop-blur-sm',
      border: 'border-white/10 dark:border-white/5'
    },
    medium: {
      bg: 'bg-white/20 dark:bg-neutral-bgDark/30',
      blur: 'backdrop-blur-md',
      border: 'border-white/20 dark:border-white/10'
    },
    high: {
      bg: 'bg-white/30 dark:bg-neutral-bgDark/40',
      blur: 'backdrop-blur-xl',
      border: 'border-white/30 dark:border-white/15'
    }
  };
  
  // Aplicar estilos según configuración
  const glassStyles = glassmorphic
    ? `${intensityMap[intensity].bg} ${intensityMap[intensity].blur} shadow-glass ${borderVisible ? `border ${intensityMap[intensity].border}` : ''}`
    : nonGlassStyles;
  
  // Efecto hover
  const hoverStyles = hoverEffect && glassmorphic
    ? 'hover:bg-white/30 dark:hover:bg-neutral-bgDark/40 hover:shadow-glass-lg active:scale-[0.99] cursor-pointer'
    : hoverEffect
      ? 'hover:shadow-lg active:scale-[0.99] cursor-pointer'
      : '';
  
  // Props para accesibilidad
  const accessibilityProps = {
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    ...(onClick && { role: 'button', tabIndex: 0 }),
  };
  
  // Manejador de eventos de teclado para accesibilidad
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };
  
  return (
    <Component
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...accessibilityProps}
    >
      {children}
    </Component>
  );
};

export default GlassmorphicContainer;
