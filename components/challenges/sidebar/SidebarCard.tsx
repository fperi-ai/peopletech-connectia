import React, { ReactNode } from 'react';

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

/**
 * Wrapper component for sidebar cards with consistent styling
 */
export const SidebarCard: React.FC<SidebarCardProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        {title}
      </h3>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        {children}
      </div>
    </div>
  );
};
