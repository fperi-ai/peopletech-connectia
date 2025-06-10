import React, { useState, useEffect } from 'react';
import Icon from './Icon';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  glassmorphic?: boolean;
  closable?: boolean;
  autoClose?: boolean;
  autoCloseTime?: number;
  className?: string;
  icon?: boolean;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  glassmorphic = true,
  closable = true,
  autoClose = false,
  autoCloseTime = 5000,
  className = '',
  icon = true,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: number;
    
    if (autoClose && visible) {
      timer = window.setTimeout(() => {
        handleClose();
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, autoCloseTime, visible]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  // Configuración de iconos y colores según el tipo
  const alertConfig = {
    info: {
      iconName: 'information-circle',
      baseColor: glassmorphic 
        ? 'bg-blue-500/20 dark:bg-blue-500/15 border-blue-500/30 dark:border-blue-500/20 text-blue-700 dark:text-blue-200' 
        : 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-200',
      iconColor: 'text-blue-500 dark:text-blue-400'
    },
    success: {
      iconName: 'check-circle',
      baseColor: glassmorphic 
        ? 'bg-green-500/20 dark:bg-green-500/15 border-green-500/30 dark:border-green-500/20 text-green-700 dark:text-green-200' 
        : 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-200',
      iconColor: 'text-green-500 dark:text-green-400'
    },
    warning: {
      iconName: 'exclamation',
      baseColor: glassmorphic 
        ? 'bg-amber-500/20 dark:bg-amber-500/15 border-amber-500/30 dark:border-amber-500/20 text-amber-700 dark:text-amber-200' 
        : 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-200',
      iconColor: 'text-amber-500 dark:text-amber-400'
    },
    error: {
      iconName: 'x-circle',
      baseColor: glassmorphic 
        ? 'bg-error/20 dark:bg-error/15 border-error/30 dark:border-error/20 text-error dark:text-red-200' 
        : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-error dark:text-red-200',
      iconColor: 'text-error dark:text-red-400'
    }
  };

  const glassClasses = glassmorphic ? 'backdrop-blur-md' : '';

  return (
    <div 
      className={`
        flex items-start p-4 rounded-lg border ${alertConfig[type].baseColor} ${glassClasses}
        ${glassmorphic ? 'shadow-glass-sm' : 'shadow-sm'}
        ${className}
      `}
      role="alert"
    >
      {icon && (
        <div className={`flex-shrink-0 ${alertConfig[type].iconColor}`}>
          <Icon name={alertConfig[type].iconName as any} className="w-5 h-5" />
        </div>
      )}
      
      <div className="ml-3 flex-1">
        {title && (
          <h3 className="text-sm font-medium">{title}</h3>
        )}
        <div className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</div>
      </div>
      
      {closable && (
        <button
          type="button"
          className={`
            ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:outline-none
            ${alertConfig[type].iconColor}
            ${glassmorphic 
              ? 'hover:bg-white/10 dark:hover:bg-black/10' 
              : 'hover:bg-opacity-20'}
          `}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <span className="sr-only">Cerrar</span>
          <Icon name="close" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
