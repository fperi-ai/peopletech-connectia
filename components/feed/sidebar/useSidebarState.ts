import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to manage sidebar open/closed state with localStorage persistence
 */
export function useSidebarState() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-open');
    if (stored !== null) setIsOpen(stored === 'true');
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      localStorage.setItem('sidebar-open', (!prev).toString());
      return !prev;
    });
  }, []);

  return { isOpen, toggle };
}
