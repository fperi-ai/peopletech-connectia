import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  glassmorphic?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  glassmorphic = true,
  size = 'md',
  closeOnClickOutside = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, closeOnClickOutside]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const glassClasses = glassmorphic
    ? 'bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass'
    : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={`${glassClasses} ${sizeClasses[size]} w-full rounded-xl overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20 dark:border-white/10">
          {title && (
            <h2 id="modal-title" className="text-lg font-semibold text-neutral-textDark dark:text-neutral-textLight">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={`${
              glassmorphic
                ? 'hover:bg-white/25 dark:hover:bg-neutral-textLight/15'
                : 'hover:bg-neutral-bgDark/10 dark:hover:bg-white/10'
            } rounded-full p-1 text-neutral-textDark dark:text-neutral-textLight focus:outline-none transition-colors`}
            aria-label="Cerrar"
          >
            <Icon name="close" className="w-5 h-5" glassmorphic={glassmorphic} />
          </button>
        </div>
        <div className="p-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
