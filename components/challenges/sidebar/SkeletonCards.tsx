import React from 'react';

/**
 * Loading skeleton placeholder for leaderboard cards
 */
export const SkeletonCards: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-lg p-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center py-2">
              <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mr-3"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mr-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse mr-2"></div>
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
