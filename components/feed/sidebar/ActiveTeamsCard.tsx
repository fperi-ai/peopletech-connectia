import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SidebarCard } from './SidebarCard';
import { Link } from 'react-router-dom';
import Icon from '../../../components/shared/Icon';
import { Team } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { INITIAL_TEAMS } from '../../../constants';

// Simulated query function to fetch user's teams
const fetchUserTeams = async (userId?: string): Promise<Team[]> => {
  if (!userId) return [];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Filter teams to only include those the user is a member of
  return INITIAL_TEAMS.filter(team => 
    team.memberIds.includes(userId) || team.creatorId === userId
  ).slice(0, 3); // Limit to 3 teams max
};

/**
 * Shows user's teams with quick links
 */
export const ActiveTeamsCard: React.FC = () => {
  const { currentUser } = useAuth();
  
  const { data: teams, isLoading } = useQuery({
    queryKey: ['sidebar', 'userTeams', currentUser?.id],
    queryFn: () => fetchUserTeams(currentUser?.id),
    refetchInterval: 60000, // Refetch every 60 seconds
    staleTime: 50000,
    enabled: !!currentUser?.id,
  });

  return (
    <SidebarCard title="Mis Equipos">
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {teams?.map(team => (
            <Link 
              key={team.id} 
              to={`/teams/${team.id}`} 
              className="block p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-md text-sm transition-colors flex items-center"
            >
              <span 
                className="w-6 h-6 flex items-center justify-center rounded-md mr-2 text-white text-xs"
                style={{ backgroundColor: team.accentColor || 'var(--color-primary)' }}
              >
                {team.icon ? <Icon name={team.icon as any} className="w-3 h-3" /> : team.name.charAt(0)}
              </span>
              <span className="flex-1 truncate">{team.name}</span>
              <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">
                {team.memberIds.length}
              </span>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-3 text-right">
        <Link to="/teams" className="text-xs text-primary-DEFAULT hover:underline inline-flex items-center">
          Ver todos <Icon name="chevron-right" className="w-3 h-3 ml-0.5" />
        </Link>
      </div>
    </SidebarCard>
  );
};
