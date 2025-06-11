
import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import Button from './Button';
import { useTheme } from '../../contexts/ThemeContext';
import { useGlassmorphism } from '../../contexts/GlassmorphismContext';

interface AccessibilityPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  glassmorphic?: boolean;
}

type FontSize = 'sm' | 'base' | 'lg';

const AccessibilityPopover: React.FC<AccessibilityPopoverProps> = ({ isOpen, onClose, anchorRef, glassmorphic = true }) => {
  const { theme, toggleTheme } = useTheme();
  const glassmorphismContext = useGlassmorphism();
  const { isGlassmorphismEnabled, toggleGlassmorphism } = glassmorphismContext;
  const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem('fontSize') as FontSize) || 'base');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [reducedMotion, setReducedMotion] = useState(() => {
      const storedVal = localStorage.getItem('reducedMotion');
      if (storedVal !== null) return storedVal === 'true';
      // Default to user's OS preference if available
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const popoverRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFocusableElementRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    document.documentElement.classList.add(`text-${fontSize}`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);
  
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('motion-reduce');
    } else {
      document.documentElement.classList.remove('motion-reduce');
    }
    localStorage.setItem('reducedMotion', String(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);


  if (!isOpen) return null;

  const ToggleSwitch: React.FC<{label: string, isEnabled: boolean, onToggle: () => void, describedById?: string}> = ({label, isEnabled, onToggle, describedById}) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-neutral-textDark dark:text-neutral-textLight" id={describedById}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        aria-labelledby={describedById}
        onClick={onToggle}
        className={`${isEnabled ? `${glassmorphic ? 'bg-primary-DEFAULT/80 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-glass' : 'bg-primary-DEFAULT'}` : `${glassmorphic ? 'bg-gray-300/70 dark:bg-gray-600/50 backdrop-blur-sm border border-gray-400/30 dark:border-white/5 shadow-glass' : 'bg-gray-300 dark:bg-gray-600'}`} 
                   relative inline-flex items-center h-6 rounded-full w-11 transition-colors 
                   focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT 
                   focus:ring-offset-2 ${glassmorphic ? 'dark:focus:ring-offset-neutral-bgDark/30' : 'dark:focus:ring-offset-card-dark'}`}
      >
        <span className={`${isEnabled ? 'translate-x-6' : 'translate-x-1'} 
                         inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
      </button>
    </div>
  );
  
  const getPopoverStyle = (): React.CSSProperties => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      return {
        position: 'fixed',
        bottom: `${window.innerHeight - rect.top}px`, 
        right: `${window.innerWidth - rect.right}px`, 
        zIndex: 1050,
        animationName: 'popoverOpenAnim',
        animationDuration: '0.2s'
      };
    }
    return { 
        position: 'fixed', 
        bottom: 'calc(1.5rem + 3.5rem + 0.5rem)', 
        right: '1.5rem', 
        zIndex: 1050,
        animationName: 'popoverOpenAnim',
        animationDuration: '0.2s'
    };
  };


  return (
    <div 
      ref={popoverRef}
      role="dialog" 
      aria-labelledby="accessibility-popover-title"
      className={`${glassmorphic ? 'bg-white/20 dark:bg-neutral-bgDark/30 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass' : 'bg-card-light dark:bg-card-dark'} rounded-lg w-full max-w-xs sm:max-w-sm max-h-[80vh] flex flex-col motion-safe:transform motion-safe:transition-all`}
      style={getPopoverStyle()}
    >
      <header className={`flex items-center justify-between p-4 border-b ${glassmorphic ? 'border-white/20 dark:border-white/10' : 'border-neutral-borderLight dark:border-neutral-borderDark'}`}>
        <div className="flex items-center">
          <Icon name="accessibility" className="w-6 h-6 mr-2 text-primary-DEFAULT" glassmorphic={glassmorphic} />
          <h2 id="accessibility-popover-title" className="text-xl font-semibold text-neutral-textDark dark:text-neutral-textLight">Accesibilidad</h2>
        </div>
        <button 
          onClick={onClose} 
          className={`w-8 h-8 rounded-full text-neutral-textDark dark:text-neutral-textLight ${glassmorphic ? 'bg-white/10 dark:bg-neutral-textLight/10 hover:bg-white/25 dark:hover:bg-neutral-textLight/15' : 'bg-neutral-textDark/5 dark:bg-neutral-textLight/5 hover:bg-neutral-textDark/10 dark:hover:bg-neutral-textLight/10'} focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT flex items-center justify-center p-0`}
          aria-label="Cerrar popover de accesibilidad"
        >
          <Icon name="close" className="w-5 h-5" glassmorphic={glassmorphic} />
        </button>
      </header>

      <main className={`p-4 flex-grow overflow-y-auto divide-y ${glassmorphic ? 'divide-white/20 dark:divide-white/10' : 'divide-neutral-borderLight dark:divide-neutral-borderDark'} scrollbar-thin scrollbar-thumb-neutral-borderLight dark:scrollbar-thumb-neutral-borderDark scrollbar-track-transparent`}>
          <div className="py-2">
            <ToggleSwitch 
              label="Modo Oscuro" 
              isEnabled={theme === 'dark'} 
              onToggle={toggleTheme} 
              describedById="theme-label"
            />
             <p id="theme-label-desc" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Activa el tema oscuro para reducir el brillo de la pantalla.
            </p>
          </div>

          <div className="py-2">
            <ToggleSwitch 
              label="Glassmorphism" 
              isEnabled={isGlassmorphismEnabled} 
              onToggle={toggleGlassmorphism} 
              describedById="glassmorphism-label"
            />
             <p id="glassmorphism-label-desc" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Activa el efecto de cristal translúcido en la interfaz.
            </p>
          </div>

          <div className="py-3">
            <p className="text-sm text-neutral-textDark dark:text-neutral-textLight mb-2" id="fontsize-label">Tamaño de Fuente</p>
            <div className="flex space-x-2" role="group" aria-labelledby="fontsize-label">
              {(['sm', 'base', 'lg'] as FontSize[]).map(size => (
                <Button
                  key={size}
                  variant={fontSize === size ? 'primary' : 'secondary'}
                  onClick={() => setFontSize(size)}
                  className="flex-1 !text-xs sm:!text-sm" // Ensure button text size is consistent
                  aria-pressed={fontSize === size}
                  ref={size === 'sm' ? firstFocusableElementRef : undefined} 
                >
                  {size === 'sm' ? 'Pequeño' : size === 'base' ? 'Mediano' : 'Grande'}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ajusta el tamaño del texto para mejorar la legibilidad.
            </p>
          </div>
          
          <div className="py-2">
            <ToggleSwitch 
                label="Contraste Alto (Beta)" 
                isEnabled={highContrast} 
                onToggle={() => setHighContrast(prev => !prev)}
                describedById="contrast-label"
            />
            <p id="contrast-label-desc" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Aumenta el contraste de los colores para facilitar la visualización.
            </p>
          </div>

          <div className="py-2">
             <ToggleSwitch 
                label="Reducir Movimiento" 
                isEnabled={reducedMotion} 
                onToggle={() => setReducedMotion(prev => !prev)}
                describedById="motion-label"
            />
            <p id="motion-label-desc" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Desactiva animaciones y transiciones innecesarias.
            </p>
          </div>


      </main>
      <footer className={`p-4 border-t ${glassmorphic ? 'border-white/20 dark:border-white/10' : 'border-neutral-borderLight dark:border-neutral-borderDark'} flex justify-between items-center`}>
          <Button 
            onClick={() => {
              // Restablecer todas las preferencias a los valores predeterminados
              if (theme === 'dark') toggleTheme(); // Cambiar a tema claro
              setFontSize('base');
              setHighContrast(false);
              setReducedMotion(false);
              glassmorphismContext.enableGlassmorphism(); // Activar Glassmorphism
              
              // Limpiar localStorage
              localStorage.removeItem('fontSize');
              localStorage.removeItem('highContrast');
              localStorage.removeItem('reducedMotion');
              localStorage.setItem('theme', 'light');
              
              // Actualizar clases del documento
              document.documentElement.classList.remove('dark', 'high-contrast', 'motion-reduce', 'text-sm', 'text-lg');
              document.documentElement.classList.add('text-base');
            }} 
            variant="secondary"
            className="text-xs"
          >
            Restablecer valores
          </Button>
          <Button onClick={onClose} variant="primary">Cerrar</Button>
      </footer>
      <style>{`
        @keyframes popoverOpenAnim {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-neutral-borderLight::-webkit-scrollbar-thumb { background-color: var(--color-neutral-borderLight); border-radius: 4px; }
        .dark .scrollbar-thumb-neutral-borderDark::-webkit-scrollbar-thumb { background-color: var(--color-neutral-borderDark); border-radius: 4px; }
        .scrollbar-track-transparent::-webkit-scrollbar-track { background-color: transparent; }

        /* Experimental high-contrast styling */
        :root.high-contrast {
            --hc-bg: #000000;
            --hc-text: #FFFFFF;
            --hc-border: #FFFFFF;
            --hc-primary-bg: #00FFFF; /* Cyan */
            --hc-primary-text: #000000;
            --hc-secondary-bg: #FFFF00; /* Yellow */
            --hc-secondary-text: #000000;
            --hc-card-bg: #0A0A0A;
        }
        .high-contrast body {
            background-color: var(--hc-bg) !important;
            color: var(--hc-text) !important;
        }
        .high-contrast .bg-card-light, .high-contrast .dark\\:bg-card-dark,
        .high-contrast [class*="bg-neutral-bg"] {
            background-color: var(--hc-card-bg) !important;
            border: 1px solid var(--hc-border) !important;
        }
        .high-contrast [class*="text-neutral-"], .high-contrast [class*="text-gray-"] {
            color: var(--hc-text) !important;
        }
        .high-contrast .text-primary-DEFAULT, .high-contrast .dark\\:text-primary-light,
        .high-contrast .text-primary-dark {
            color: var(--hc-primary-bg) !important;
        }
         .high-contrast .text-secondary-DEFAULT, .high-contrast .dark\\:text-secondary-dark {
            color: var(--hc-secondary-bg) !important;
        }
        .high-contrast .border-neutral-borderLight, .high-contrast .dark\\:border-neutral-borderDark,
        .high-contrast [class*="border-gray-"] {
            border-color: var(--hc-border) !important;
        }
        .high-contrast button, .high-contrast input, .high-contrast textarea, .high-contrast select {
            background-color: #111111 !important;
            color: var(--hc-text) !important;
            border: 1px solid var(--hc-border) !important;
        }
        .high-contrast button.bg-primary-DEFAULT, .high-contrast button[class*="bg-primary-DEFAULT"] {
            background-color: var(--hc-primary-bg) !important;
            color: var(--hc-primary-text) !important;
            border-color: var(--hc-primary-bg) !important;
        }
        .high-contrast button.bg-secondary-DEFAULT, .high-contrast button[class*="bg-secondary-DEFAULT"] {
            background-color: var(--hc-secondary-bg) !important;
            color: var(--hc-secondary-text) !important;
             border-color: var(--hc-secondary-bg) !important;
        }
        .high-contrast .from-primary-DEFAULT, .high-contrast .bg-gradient-to-br.from-primary-DEFAULT {
             --tw-gradient-from: var(--hc-primary-bg) !important;
             --tw-gradient-to: rgba(0, 255, 255, 0) !important;
        }
        .high-contrast .to-primary-light, .high-contrast .bg-gradient-to-br.to-primary-light {
            --tw-gradient-to: var(--hc-primary-bg) !important;
        }
         .high-contrast .from-primary-DEFAULT\\/80 {
            --tw-gradient-from: var(--hc-primary-bg) !important;
        }
        .high-contrast .to-secondary-DEFAULT\\/70 {
            --tw-gradient-to: var(--hc-secondary-bg) !important;
        }
      `}</style>
    </div>
  );
};

export default AccessibilityPopover;