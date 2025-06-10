import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  glassmorphic?: boolean;
  className?: string;
  dot?: boolean;
  count?: number;
  maxCount?: number;
  showZero?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  glassmorphic = true,
  className = '',
  dot = false,
  count,
  maxCount = 99,
  showZero = false,
}) => {
  // Determinar si se debe mostrar el badge
  const showBadge = dot || (typeof count === 'number' && (count > 0 || showZero));
  
  // Formatear el contador
  const formattedCount = typeof count === 'number' 
    ? count > maxCount 
      ? `${maxCount}+` 
      : count.toString()
    : '';

  // Variantes de color
  const variantClasses = {
    primary: glassmorphic 
      ? 'bg-primary-DEFAULT/30 text-primary-dark dark:text-white border-primary-DEFAULT/30' 
      : 'bg-primary-DEFAULT text-white',
    success: glassmorphic 
      ? 'bg-green-500/30 text-green-700 dark:text-green-200 border-green-500/30' 
      : 'bg-green-500 text-white',
    warning: glassmorphic 
      ? 'bg-amber-500/30 text-amber-700 dark:text-amber-200 border-amber-500/30' 
      : 'bg-amber-500 text-white',
    error: glassmorphic 
      ? 'bg-error/30 text-error dark:text-red-200 border-error/30' 
      : 'bg-error text-white',
    info: glassmorphic 
      ? 'bg-blue-500/30 text-blue-700 dark:text-blue-200 border-blue-500/30' 
      : 'bg-blue-500 text-white',
    default: glassmorphic 
      ? 'bg-white/20 dark:bg-neutral-bgDark/40 text-neutral-textDark dark:text-neutral-textLight border-white/20 dark:border-white/10' 
      : 'bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight',
  };

  // Tamaños
  const sizeClasses = {
    sm: dot ? 'w-1.5 h-1.5' : 'text-xs px-1.5 min-w-[18px] h-[18px]',
    md: dot ? 'w-2 h-2' : 'text-xs px-2 min-w-[20px] h-[20px]',
    lg: dot ? 'w-2.5 h-2.5' : 'text-sm px-2.5 min-w-[22px] h-[22px]',
  };

  // Estilos para el punto
  const dotPositionClasses = 'absolute -top-1 -right-1 flex items-center justify-center';
  
  // Estilos para el contador
  const countPositionClasses = 'absolute -top-2 -right-2 flex items-center justify-center';

  // Estilos de glassmorphism
  const glassClasses = glassmorphic 
    ? 'backdrop-blur-md border' 
    : '';

  return (
    <div className="relative inline-flex">
      {children}
      
      {showBadge && (
        <span 
          className={`
            ${dot ? dotPositionClasses : countPositionClasses}
            ${variantClasses[variant]}
            ${sizeClasses[size]}
            ${glassClasses}
            ${dot ? 'rounded-full' : 'rounded-full flex items-center justify-center'}
            ${className}
          `}
        >
          {!dot && formattedCount}
        </span>
      )}
    </div>
  );
};

export default Badge;
