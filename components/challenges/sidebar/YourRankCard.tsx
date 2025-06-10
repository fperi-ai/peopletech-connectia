import React from 'react';
import { UserWithRankAndPoints } from './PodiumCard';

interface YourRankCardProps {
  data?: UserWithRankAndPoints | null;
}

/**
 * Shows current user's rank in the leaderboard if not in top 3
 */
export const YourRankCard: React.FC<YourRankCardProps> = ({ data }) => {
  if (!data || data.rank <= 3) {
    return null; // No mostrar si el usuario está en el top 3 o no hay datos
  }

  return (
    <div className="mb-4">
      <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">
        Tu Posición
      </h3>
      <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-lg p-3 
        border-2 border-teal-400/30 dark:border-teal-500/30">
        <div className="flex items-center">
          <span className="text-xl mr-2" role="img" aria-label="Objetivo">
            🎯
          </span>
          <img 
            src={data.avatar}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
            aria-hidden="true"
          />
          <div className="ml-2 flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {data.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Posición #{data.rank}
            </p>
          </div>
          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-medium">
            {data.points} pts
          </span>
        </div>
      </div>
    </div>
  );
};
