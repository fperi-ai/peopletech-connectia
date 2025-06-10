import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SidebarCard } from './SidebarCard';
import { getLeaderboard } from '../../../services/leaderboardService';
import { useAuth } from '../../../contexts/AuthContext';
import { UserWithRankAndPoints } from '../../challenges/sidebar/PodiumCard';
import { ALL_TIME_PERIOD } from '../../challenges/sidebar/hooks/usePeriod';

// Wrapper function to adapt the leaderboard data format for the feed sidebar
const fetchLeaderboardForFeed = async (userId?: string): Promise<UserWithRankAndPoints[]> => {
  // Llamar al servicio de leaderboard con el periodo "all"
  const leaderboardData = await getLeaderboard(ALL_TIME_PERIOD, userId);
  return leaderboardData.top3;
};

/**
 * Shows top 3 users in leaderboard with points
 */
export const LeaderboardCard: React.FC = () => {
  const { currentUser } = useAuth();
  
  const { data: topUsers, isLoading } = useQuery<UserWithRankAndPoints[]>({
    queryKey: ['sidebar', 'leaderboard'],
    queryFn: () => fetchLeaderboardForFeed(currentUser?.id),
    refetchInterval: 60000, // Refetch every 60 seconds
    staleTime: 50000,
  });

  return (
    <SidebarCard title="Ranking de Retos">
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="ml-3 flex-1">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-4 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : (
        <ol className="space-y-3">
          {topUsers?.map((user, index) => (
            <li key={user.id} className="flex items-center">
              <span className="text-xs font-bold w-4 text-gray-500">{index + 1}</span>
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover ml-1" 
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">
                {user.name}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
                {user.points} pts
              </span>
            </li>
          ))}
        </ol>
      )}
    </SidebarCard>
  );
};
