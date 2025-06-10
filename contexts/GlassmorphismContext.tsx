import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ENABLE_GLASSMORPHISM } from '../constants';

interface GlassmorphismContextType {
  isGlassmorphismEnabled: boolean;
  toggleGlassmorphism: () => void;
  enableGlassmorphism: () => void;
  disableGlassmorphism: () => void;
}

const GlassmorphismContext = createContext<GlassmorphismContextType | undefined>(undefined);

interface GlassmorphismProviderProps {
  children: ReactNode;
  initialValue?: boolean;
}

/**
 * Proveedor de contexto para gestionar el estilo Glassmorphism en toda la aplicación
 */
export const GlassmorphismProvider: React.FC<GlassmorphismProviderProps> = ({ 
  children, 
  initialValue = ENABLE_GLASSMORPHISM 
}) => {
  const [isGlassmorphismEnabled, setIsGlassmorphismEnabled] = useState<boolean>(initialValue);

  const toggleGlassmorphism = () => {
    setIsGlassmorphismEnabled(prev => !prev);
  };

  const enableGlassmorphism = () => {
    setIsGlassmorphismEnabled(true);
  };

  const disableGlassmorphism = () => {
    setIsGlassmorphismEnabled(false);
  };

  return (
    <GlassmorphismContext.Provider 
      value={{ 
        isGlassmorphismEnabled, 
        toggleGlassmorphism,
        enableGlassmorphism,
        disableGlassmorphism
      }}
    >
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
