import React from 'react';
import { User } from '../../../types';

// Tipo extendido para incluir puntos en el ranking
export type UserWithRankAndPoints = User & { 
  points: number;
  rank: number;
};

interface PodiumCardProps {
  data: UserWithRankAndPoints[];
}

const getMedalEmoji = (position: number): string => {
  switch (position) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
};

/**
 * Shows top 3 users in the leaderboard podium
 */
export const PodiumCard: React.FC<PodiumCardProps> = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mb-6 text-center p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No hay datos disponibles en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 shadow-sm">
      <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">
        Podio de Líderes
      </h3>
      <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {data.map((user) => (
            <li 
              key={user.id} 
              className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="text-xl mr-2" aria-hidden="true">
                {getMedalEmoji(user.rank)}
              </span>
              <img 
                src={user.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">
                {user.name}
                <span className="sr-only">posición {user.rank}</span>
              </span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-medium">
                {user.points} pts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
