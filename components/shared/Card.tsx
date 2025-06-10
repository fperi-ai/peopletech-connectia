import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphic?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glassmorphic = true,
  onClick,
  hoverable = false,
  bordered = true,
  shadow = 'md',
}) => {
  // Base classes
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  // Glassmorphic styles
  const glassStyles = glassmorphic
    ? 'backdrop-blur-md bg-white/20 dark:bg-neutral-bgDark/30'
    : 'bg-neutral-bgLight dark:bg-neutral-bgDark';
  
  // Border styles
  const borderStyles = bordered
    ? glassmorphic
      ? 'border border-white/20 dark:border-white/10'
      : 'border border-neutral-borderLight dark:border-neutral-borderDark'
    : '';
  
  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: glassmorphic ? 'shadow-glass-sm' : 'shadow-sm',
    md: glassmorphic ? 'shadow-glass' : 'shadow',
    lg: glassmorphic ? 'shadow-glass-lg' : 'shadow-lg',
  }[shadow];
  
  // Hover styles
  const hoverStyles = hoverable
    ? glassmorphic
      ? 'hover:bg-white/25 dark:hover:bg-neutral-bgDark/40 hover:shadow-glass-lg'
      : 'hover:bg-neutral-bgLight/90 dark:hover:bg-neutral-bgDark/90 hover:shadow-lg'
    : '';
  
  // Cursor style if clickable
  const cursorStyle = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${glassStyles} ${borderStyles} ${shadowStyles} ${hoverStyles} ${cursorStyle} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
