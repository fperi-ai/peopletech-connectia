import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from './ThemeContext';

interface GlassmorphismContextType {
  intensity: number;
  blur: number;
  setIntensity: (intensity: number) => void;
  setBlur: (blur: number) => void;
  applyGlassEffect: (additionalClasses?: string) => string;
  isGlassmorphismEnabled: boolean;
  toggleGlassmorphism: () => void;
  enableGlassmorphism: () => void;
  disableGlassmorphism: () => void;
}

const GlassmorphismContext = createContext<GlassmorphismContextType | undefined>(undefined);

interface GlassmorphismProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de contexto para gestionar el estilo Glassmorphism en toda la aplicación
 */
export const GlassmorphismProvider: React.FC<GlassmorphismProviderProps> = ({ 
  children 
}) => {
  const [intensity, setIntensity] = useState(15); // 0-100
  const [blur, setBlur] = useState(10); // px
  const [isGlassmorphismEnabled, setIsGlassmorphismEnabled] = useState<boolean>(() => {
    const savedPreference = localStorage.getItem('glassmorphismEnabled');
    return savedPreference !== null ? savedPreference === 'true' : true;
  });
  const { theme } = useTheme();
  
  // Actualizar variables CSS cuando cambian los valores
  useEffect(() => {
    // Actualizar variables CSS personalizadas
    document.documentElement.style.setProperty('--glass-blur', `${blur}px`);
    
    const bgOpacity = intensity / 100;
    if (theme === 'dark') {
      document.documentElement.style.setProperty(
        '--glass-background-dark', 
        `rgba(15, 23, 42, ${bgOpacity > 0.8 ? 0.8 : bgOpacity})`
      );
    } else {
      document.documentElement.style.setProperty(
        '--glass-background', 
        `rgba(255, 255, 255, ${bgOpacity > 0.3 ? 0.3 : bgOpacity})`
      );
    }

    // Aplicar o quitar la clase glassmorphism al html
    if (isGlassmorphismEnabled) {
      document.documentElement.classList.add('glassmorphism-enabled');
    } else {
      document.documentElement.classList.remove('glassmorphism-enabled');
    }
    // Guardar preferencia
    localStorage.setItem('glassmorphismEnabled', String(isGlassmorphismEnabled));
  }, [intensity, blur, theme, isGlassmorphismEnabled]);
  
  // Funciones para gestionar el estado de glassmorphism
  const toggleGlassmorphism = () => {
    setIsGlassmorphismEnabled(prev => !prev);
  };
  
  const enableGlassmorphism = () => {
    setIsGlassmorphismEnabled(true);
  };
  
  const disableGlassmorphism = () => {
    setIsGlassmorphismEnabled(false);
  };

  // Función utilitaria para aplicar el efecto glass a cualquier componente
  const applyGlassEffect = (additionalClasses = '') => {
    const baseClasses = 'glass transition-all duration-300 ease-in-out';
    return `${baseClasses} ${additionalClasses}`.trim();
  };

  return (
    <GlassmorphismContext.Provider value={{ 
      intensity, 
      blur, 
      setIntensity, 
      setBlur,
      applyGlassEffect,
      isGlassmorphismEnabled,
      toggleGlassmorphism,
      enableGlassmorphism,
      disableGlassmorphism
    }}>
      {children}
    </GlassmorphismContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de Glassmorphism
 */
export const useGlassmorphism = (): GlassmorphismContextType => {
  const context = useContext(GlassmorphismContext);
  
  if (context === undefined) {
    throw new Error('useGlassmorphism debe ser usado dentro de un GlassmorphismProvider');
  }
  
  return context;
};

export default GlassmorphismProvider;
