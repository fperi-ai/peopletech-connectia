import { useState, useEffect } from 'react';

const STORAGE_KEY = 'challenges-sidebar-open';

/**
 * Hook to manage challenges sidebar state with localStorage persistence
 */
export const useChallengesSidebarState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    // Only check localStorage on client-side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null ? JSON.parse(stored) : true; // Default to open
    }
    return true;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isOpen));
    }
  }, [isOpen]);

  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, toggle };
};
