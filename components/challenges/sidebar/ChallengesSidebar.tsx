import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useChallengesSidebarState } from './hooks/useChallengesSidebarState';
import { usePeriod } from './hooks/usePeriod';
import { LeaderboardPeriodSelect } from './LeaderboardPeriodSelect';
import { PodiumCard } from './PodiumCard';
import { YourRankCard } from './YourRankCard';
import { SkeletonCards } from './SkeletonCards';
import { getLeaderboard } from '../../../services/leaderboardService';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../shared/Icon';

/**
 * Sidebar component for Challenges page showing leaderboard
 */
export const ChallengesSidebar: React.FC = () => {
  const { isOpen, toggle } = useChallengesSidebarState();
  const { period, setPeriod } = usePeriod();
  const { currentUser } = useAuth();
  
  // Fetch leaderboard data with TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', period],
    queryFn: () => getLeaderboard(period, currentUser?.id),
    refetchInterval: 30000, // Refrescar cada 30 segundos
    staleTime: 25000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
  });

  return (
    <aside
      id="challenges-sidebar"
      role="complementary"
      aria-label="Leaderboard de retos"
      className={`fixed right-0 top-16 bottom-0 w-72 xl:w-80 transition-transform duration-200 ease-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        lg:block hidden`} // Oculto en móvil, visible desde lg
      aria-hidden={!isOpen}
    >
      <button
        onClick={toggle}
        aria-label={isOpen ? "Colapsar leaderboard" : "Expandir leaderboard"}
        aria-expanded={isOpen}
        aria-controls="challenges-sidebar"
        className="absolute -left-6 top-6 w-6 h-12 bg-teal-500 hover:bg-teal-600 
          text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-teal-400 dark:focus:ring-teal-500 transition-colors
          flex items-center justify-center"
      >
        <Icon
          name={isOpen ? "chevron-right" : "chevron-left"}
          className="w-4 h-4"
          aria-hidden="true"
        />
      </button>

      <div className="h-full overflow-y-auto bg-white/90 dark:bg-gray-800/80 backdrop-blur px-4 py-6 
        shadow-lg border-l border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Leaderboard – Retos ConnectIA
        </h2>

        <LeaderboardPeriodSelect
          period={period}
          setPeriod={setPeriod}
        />

        {isLoading ? (
          <SkeletonCards />
        ) : data ? (
          <>
            <PodiumCard data={data.top3} />
            <YourRankCard data={data.yourRank} />
          </>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Error al cargar datos
          </div>
        )}
      </div>
    </aside>
  );
};
