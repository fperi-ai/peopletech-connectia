import React, { ReactNode, forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  glassmorphic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  leftIcon,
  rightIcon,
  glassmorphic = true, // Por defecto, aplicamos el estilo glassmorphic
  className = '', 
  ...props 
}, ref) => {
  const baseStyles = "font-semibold rounded-xl focus:outline-none transition-all duration-200 ease-in-out inline-flex items-center justify-center";
  
  // Estilos base para glassmorphism
  const glassStyles = glassmorphic ? "backdrop-blur-md border shadow-glass active:scale-95" : "";
  
  const variantStyles = {
    primary: glassmorphic 
      ? "bg-white/20 dark:bg-primary-DEFAULT/30 text-primary-dark dark:text-white border-white/18 dark:border-white/10 hover:bg-white/30 dark:hover:bg-primary-DEFAULT/40" 
      : "bg-primary-DEFAULT text-white hover:bg-primary-dark",
    secondary: glassmorphic 
      ? "bg-white/15 dark:bg-neutral-bgDark/40 text-neutral-textDark dark:text-neutral-textLight border-white/18 dark:border-white/5 hover:bg-white/25 dark:hover:bg-neutral-bgDark/50" 
      : "bg-neutral-textDark/10 dark:bg-neutral-textLight/10 text-neutral-textDark dark:text-neutral-textLight hover:bg-neutral-textDark/20 dark:hover:bg-neutral-textLight/20",
    danger: glassmorphic 
      ? "bg-error/20 text-error dark:text-white border-error/20 dark:border-error/10 hover:bg-error/30" 
      : "bg-error text-white hover:bg-red-700",
    ghost: glassmorphic 
      ? "bg-transparent text-primary-DEFAULT border-transparent hover:bg-white/10 dark:hover:bg-primary-dark/10" 
      : "bg-transparent text-primary-DEFAULT hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const loadingStyles = isLoading ? "opacity-75 cursor-not-allowed" : "";

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${glassStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;