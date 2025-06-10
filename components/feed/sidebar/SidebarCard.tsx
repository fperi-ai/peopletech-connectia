import React, { ReactNode } from 'react';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Base component for sidebar cards with consistent styling
 */
export const SidebarCard: React.FC<SidebarCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white/90 dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{title}</h3>
      {children}
    </div>
  );
};
