import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title?: string;
  glassmorphic?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  placement = 'right',
  size = 'md',
  title,
  glassmorphic = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Manejar tecla Escape para cerrar el drawer
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Manejar clic fuera del drawer para cerrarlo
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Determinar tamaño según la dirección y el tamaño especificado
  const sizeClasses = {
    left: {
      xs: 'w-64',
      sm: 'w-80',
      md: 'w-96',
      lg: 'w-1/3',
      xl: 'w-1/2',
      full: 'w-full',
    },
    right: {
      xs: 'w-64',
      sm: 'w-80',
      md: 'w-96',
      lg: 'w-1/3',
      xl: 'w-1/2',
      full: 'w-full',
    },
    top: {
      xs: 'h-1/6',
      sm: 'h-1/4',
      md: 'h-1/3',
      lg: 'h-1/2',
      xl: 'h-2/3',
      full: 'h-full',
    },
    bottom: {
      xs: 'h-1/6',
      sm: 'h-1/4',
      md: 'h-1/3',
      lg: 'h-1/2',
      xl: 'h-2/3',
      full: 'h-full',
    },
  };

  // Determinar la posición según la dirección
  const placementClasses = {
    left: 'top-0 left-0 h-full',
    right: 'top-0 right-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  // Determinar la animación según la dirección
  const enterFromClasses = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  };

  // Estilos de glassmorphism
  const glassClasses = glassmorphic
    ? 'bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass'
    : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark shadow-lg';

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={drawerRef}
        className={`
          fixed ${placementClasses[placement]} ${sizeClasses[placement][size]}
          ${glassClasses} ${className}
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 translate-y-0' : enterFromClasses[placement]}
        `}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/10">
            {title && (
              <h2 className="text-lg font-semibold text-neutral-textDark dark:text-neutral-textLight">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  ${glassmorphic
                    ? 'hover:bg-white/25 dark:hover:bg-neutral-textLight/15'
                    : 'hover:bg-neutral-bgDark/10 dark:hover:bg-white/10'
                  } 
                  rounded-full p-1 text-neutral-textDark dark:text-neutral-textLight 
                  focus:outline-none transition-colors
                `}
                aria-label="Cerrar"
              >
                <Icon name="close" className="w-5 h-5" glassmorphic={glassmorphic} />
              </button>
            )}
          </div>
        )}
        <div className="p-4 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
