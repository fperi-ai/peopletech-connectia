
import React from 'react';
import { Link } from 'react-router-dom';
import { Team, User, UserRole } from '../../types'; // Added UserRole
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import { DEMO_USERS } from '../../constants'; 

interface TeamCardProps {
  team: Team;
  currentUser: User | null;
  onJoinTeam: (teamId: string) => void;
  onRequestJoinTeam: (teamId: string) => void;
  glassmorphic?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, currentUser, onJoinTeam, onRequestJoinTeam, glassmorphic = true }) => {
  const isMember = currentUser && team.memberIds.includes(currentUser.id);
  // Creator or Admin can manage (simplified)
  const isTeamAdminByCurrentUser = currentUser && (team.creatorId === currentUser.id || currentUser.role === UserRole.ADMIN);


  const handleJoinClick = () => {
    if (team.isPrivate && !isMember) { // Added !isMember for clarity
      onRequestJoinTeam(team.id);
    } else if (!isMember) { // Added !isMember for clarity
      onJoinTeam(team.id);
    }
  };

  return (
    <div className={`${glassmorphic ? 'glass-card backdrop-blur-md bg-white/20 dark:bg-neutral-bgDark/30 border border-white/20 dark:border-white/10' : 'bg-card-light dark:bg-card-dark'} shadow-xl rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
      <Link to={`/teams/${team.id}`} className="block hover:opacity-90 transition-opacity">
        {team.bannerUrl ? (
          <img src={team.bannerUrl} alt={`${team.name} banner`} className="w-full h-36 object-cover" />
        ) : (
          <div 
            className="w-full h-36 flex items-center justify-center text-white text-5xl font-bold backdrop-blur-sm"
            // Use team accent color or fallback to a shade of primary with transparency for glassmorphism
            style={{ backgroundColor: glassmorphic ? `${team.accentColor || 'var(--color-primary-dark, #1F8A88)'}80` : team.accentColor || 'var(--color-primary-dark, #1F8A88)' }}
          >
            {team.icon || team.name.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>
      
      <div className="p-5 flex-grow flex flex-col relative">
        <div className="flex justify-between items-start mb-1">
            <Link to={`/teams/${team.id}`} className="hover:underline">
                <h2 className="text-xl font-semibold text-neutral-textDark dark:text-neutral-textLight">{team.name}</h2>
            </Link>
            {team.isPrivate && <Icon name="lock-closed" className="w-5 h-5 text-gray-500 dark:text-gray-400" titleAccess="Equipo Privado"/>}
        </div>

        {isTeamAdminByCurrentUser && <span className="text-xs bg-accent-DEFAULT/20 text-accent-dark dark:text-accent-DEFAULT px-2 py-0.5 rounded-full mb-2 inline-block">Admin</span>}
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-grow line-clamp-2" title={team.description}>{team.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Icon name="users" className="w-4 h-4 mr-1.5" /> {team.memberIds.length} miembro{team.memberIds.length !== 1 ? 's' : ''}
          <span className="mx-1.5">·</span>
          <span className="capitalize">{team.category}</span>
        </div>

        <div className="flex -space-x-2 overflow-hidden mb-4">
            {team.memberIds.slice(0, 4).map(memberId => {
                const member = DEMO_USERS.find(u => u.id === memberId);
                return member ? <Avatar key={memberId} src={member.avatar} alt={member.name} size="sm" className={`${glassmorphic ? 'ring-2 ring-white/30 dark:ring-white/10' : 'ring-2 ring-card-light dark:ring-card-dark'}`} /> : null;
            })}
            {team.memberIds.length > 4 && (
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-neutral-textDark dark:text-neutral-textLight ${glassmorphic ? 'bg-white/30 dark:bg-white/10 backdrop-blur-sm ring-2 ring-white/30 dark:ring-white/10' : 'bg-neutral-borderLight dark:bg-neutral-borderDark ring-2 ring-card-light dark:ring-card-dark'}`}>
                +{team.memberIds.length - 4}
                </div>
            )}
            {team.memberIds.length === 0 && <p className="text-xs text-gray-400">Sé el primero en unirte.</p>}
        </div>

        <div className="mt-auto">
          {isMember ? (
            <Button variant="secondary" size="sm" className="w-full" disabled>
              <Icon name="check" className="w-4 h-4 mr-1.5"/>
              Miembro
            </Button>
          ) : (
            <Button 
              onClick={handleJoinClick} 
              size="sm" 
              variant="primary"
              className="w-full"
            >
              {team.isPrivate ? 'Solicitar Unirse' : 'Unirse al Equipo'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;