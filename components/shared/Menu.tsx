import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  glassmorphic?: boolean;
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top';
  className?: string;
  width?: 'auto' | 'sm' | 'md' | 'lg';
}

const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  glassmorphic = true,
  placement = 'bottom-start',
  className = '',
  width = 'auto',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Cerrar el menú cuando se presiona la tecla Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      setIsOpen(false);
    }
  };

  // Clases para el posicionamiento del menú
  const placementClasses = {
    'bottom-start': 'top-full left-0 mt-1',
    'bottom-end': 'top-full right-0 mt-1',
    'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-1',
    'top-start': 'bottom-full left-0 mb-1',
    'top-end': 'bottom-full right-0 mb-1',
    'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
  };

  // Clases para el ancho del menú
  const widthClasses = {
    'auto': 'min-w-[160px]',
    'sm': 'w-48',
    'md': 'w-56',
    'lg': 'w-64',
  };

  // Estilos de glassmorphism
  const glassClasses = glassmorphic
    ? 'bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-glass'
    : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark shadow-md';

  return (
    <div className="relative inline-block text-left">
      <div ref={triggerRef} onClick={toggleMenu}>
        {trigger}
      </div>

      {isOpen && (
        <div 
          ref={menuRef}
          className={`
            absolute z-50 ${placementClasses[placement]} ${widthClasses[width]}
            ${glassClasses} rounded-lg overflow-hidden py-1 ${className}
          `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.divider ? (
                  <div className="my-1 border-t border-white/20 dark:border-white/10" />
                ) : (
                  <button
                    className={`
                      w-full text-left px-4 py-2 text-sm flex items-center gap-2
                      ${item.disabled 
                        ? 'opacity-50 cursor-not-allowed text-neutral-textDark/50 dark:text-neutral-textLight/50' 
                        : item.danger
                          ? 'text-error hover:bg-error/10 dark:hover:bg-error/10' 
                          : 'text-neutral-textDark dark:text-neutral-textLight hover:bg-white/15 dark:hover:bg-neutral-textLight/10'
                      }
                    `}
                    role="menuitem"
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                  >
                    {item.icon && (
                      <Icon 
                        name={item.icon as any} 
                        className="w-4 h-4" 
                        glassmorphic={false}
                      />
                    )}
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
