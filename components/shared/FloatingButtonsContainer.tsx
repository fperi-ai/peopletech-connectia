
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icon';
import ConniePopover from './ConniePopover'; 
import AccessibilityPopover from './AccessibilityPopover'; 
import { AI_ASSISTANT_NAME } from '../../constants';

interface FloatingButtonsContainerProps {
  glassmorphic?: boolean;
}

const FloatingButtonsContainer: React.FC<FloatingButtonsContainerProps> = ({ 
  glassmorphic = true 
}) => {
  const [isConniePopoverOpen, setIsConniePopoverOpen] = useState(false);
  const [isAccessibilityPopoverOpen, setIsAccessibilityPopoverOpen] = useState(false);

  const connieButtonRef = useRef<HTMLButtonElement>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null);

  const toggleConniePopover = useCallback(() => {
    const currentlyOpening = !isConniePopoverOpen;
    setIsConniePopoverOpen(currentlyOpening);
    if (currentlyOpening && isAccessibilityPopoverOpen) {
      setIsAccessibilityPopoverOpen(false);
    }
  }, [isAccessibilityPopoverOpen, isConniePopoverOpen]);

  const toggleAccessibilityPopover = useCallback(() => {
    const currentlyOpening = !isAccessibilityPopoverOpen;
    setIsAccessibilityPopoverOpen(currentlyOpening);
    if (currentlyOpening && isConniePopoverOpen) {
      setIsConniePopoverOpen(false);
    }
  }, [isConniePopoverOpen, isAccessibilityPopoverOpen]);
  
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isConniePopoverOpen) {
          setIsConniePopoverOpen(false);
          connieButtonRef.current?.focus();
        }
        if (isAccessibilityPopoverOpen) {
          setIsAccessibilityPopoverOpen(false);
          accessibilityButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isConniePopoverOpen, isAccessibilityPopoverOpen]);


  return (
    <>
      <button
        ref={connieButtonRef}
        onClick={toggleConniePopover}
        className={`fixed bottom-6 left-6 w-14 h-14 rounded-full ${
          glassmorphic 
            ? 'backdrop-blur-md bg-neutral-bgDark/70 dark:bg-neutral-bgDark/80 border border-white/10 shadow-glass' 
            : 'bg-[#333333] shadow-lg'
        } text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-in-out motion-safe:hover:scale-110 z-[1000] flex items-center justify-center`}
        aria-label={`Abrir asistente ${AI_ASSISTANT_NAME}`}
        aria-haspopup="dialog" 
        aria-expanded={isConniePopoverOpen}
      >
        <Icon name="robot" className="w-7 h-7" glassmorphic={false} />
      </button>

      <button
        ref={accessibilityButtonRef}
        onClick={toggleAccessibilityPopover}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full ${
          glassmorphic 
            ? 'backdrop-blur-md bg-neutral-bgDark/70 dark:bg-neutral-bgDark/80 border border-white/10 shadow-glass' 
            : 'bg-[#333333] shadow-lg'
        } text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-in-out motion-safe:hover:scale-110 z-[1000] flex items-center justify-center`}
        aria-label="Abrir configuración de accesibilidad"
        aria-haspopup="dialog" 
        aria-expanded={isAccessibilityPopoverOpen}
      >
        <Icon name="accessibility" className="w-7 h-7" glassmorphic={false} />
      </button>

      <ConniePopover 
        isOpen={isConniePopoverOpen} 
        onClose={() => {
          setIsConniePopoverOpen(false);
          connieButtonRef.current?.focus();
        }} 
        anchorRef={connieButtonRef}
        glassmorphic={glassmorphic}
      />
      <AccessibilityPopover 
        isOpen={isAccessibilityPopoverOpen} 
        onClose={() => {
          setIsAccessibilityPopoverOpen(false);
          accessibilityButtonRef.current?.focus();
        }}
        anchorRef={accessibilityButtonRef}
        glassmorphic={glassmorphic}
      />
    </>
  );
};

export default FloatingButtonsContainer;