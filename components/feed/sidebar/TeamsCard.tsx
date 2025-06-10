import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SidebarCard } from './SidebarCard';
import { Link } from 'react-router-dom';
import Icon from '../../../components/shared/Icon';

interface Team {
  id: string;
  name: string;
  icon: string;
  postsCount: number;
}

// Simulated query function
const fetchActiveTeams = async (): Promise<Team[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Return mocked teams with post counts
  return [
    { id: 'team-1', name: 'Desarrollo Frontend', icon: 'code', postsCount: 47 },
    { id: 'team-2', name: 'Marketing Digital', icon: 'chart-bar', postsCount: 38 },
    { id: 'team-3', name: 'Recursos Humanos', icon: 'users', postsCount: 25 },
  ];
};

/**
 * Shows top 3 most active teams with quick links
 */
export const TeamsCard: React.FC = () => {
  const { data: teams, isLoading } = useQuery({
    queryKey: ['sidebar', 'activeTeams'],
    queryFn: fetchActiveTeams,
    refetchInterval: 60000, // Refetch every 60 seconds
    staleTime: 50000,
  });

  return (
    <SidebarCard title="Equipos Activos">
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
              <Icon name={team.icon as any} className="w-4 h-4 mr-2 text-primary-DEFAULT" />
              <span className="flex-1 truncate">{team.name}</span>
              <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">
                {team.postsCount}
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
