
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; // Siempre usar modo claro por defecto
  });

  useEffect(() => {
    // Forzar el modo claro/oscuro para asegurar la correcta aplicación del tema
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
    
    // Solución para forzar el repintado de componentes
    document.body.style.transition = 'background-color 0.3s ease';
    
    // Forzar reflujo
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
