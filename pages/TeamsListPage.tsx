
import React, { useState, useEffect, useMemo } from 'react';
import { Team, UserRole, TeamCategory } from '../types';
import { INITIAL_TEAMS, DEMO_USERS, TEAM_CATEGORIES, APP_NAME } from '../constants';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import { useAuth } from '../contexts/AuthContext';
import TeamCard from '../components/teams/TeamCard'; 
import Avatar from '../components/shared/Avatar'; 

const TeamsListPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(() => {
    const storedTeams = localStorage.getItem('connectia-teams');
    return storedTeams ? JSON.parse(storedTeams) : INITIAL_TEAMS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { currentUser, updateUser } = useAuth();

  useEffect(() => {
    localStorage.setItem('connectia-teams', JSON.stringify(teams));
  }, [teams]);

  const canCreateTeam = currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.MANAGER;

  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            team.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || team.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [teams, searchTerm, selectedCategory]);

  const handleJoinTeam = (teamId: string) => {
    if (!currentUser) return;
    setTeams(prevTeams => prevTeams.map(team => 
      team.id === teamId && !team.memberIds.includes(currentUser.id) 
        ? { ...team, memberIds: [...team.memberIds, currentUser.id] } 
        : team
    ));
    if (!currentUser.teamIds?.includes(teamId)) {
      updateUser({ teamIds: [...(currentUser.teamIds || []), teamId] });
    }
    alert(`Te has unido al equipo (simulado). ¡Bienvenido/a! 🎉`);
  };

  const onRequestJoinTeam = (teamId: string) => {
    alert(`Solicitud para unirse al equipo enviada. Un administrador la revisará (simulado).`);
  };

  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [newTeamCategory, setNewTeamCategory] = useState<TeamCategory>('general');
  const [newTeamIsPrivate, setNewTeamIsPrivate] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCreateTeam = () => {
    if (!newTeamName.trim() || !newTeamDesc.trim()) {
      setFormError('El nombre y la descripción son obligatorios.');
      return;
    }
    if (!currentUser) return;

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      description: newTeamDesc,
      category: newTeamCategory,
      isPrivate: newTeamIsPrivate,
      creatorId: currentUser.id,
      memberIds: [currentUser.id], 
      icon: '✨', 
    };
    setTeams(prevTeams => [newTeam, ...prevTeams]);
    if (!currentUser.teamIds?.includes(newTeam.id)) {
         updateUser({ teamIds: [...(currentUser.teamIds || []), newTeam.id] });
    }
    setShowCreateModal(false);
    setNewTeamName('');
    setNewTeamDesc('');
    setNewTeamCategory('general');
    setNewTeamIsPrivate(false);
    setFormError('');
    alert(`Equipo "${newTeam.name}" creado exitosamente.`);
  };


  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-primary-DEFAULT flex items-center">
            <Icon name="users" className="w-8 h-8 mr-2 text-secondary-DEFAULT" /> Equipos y Comunidades
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Equipos: porque nadie logra grandes cosas solo.</p>
        </div>
        {canCreateTeam && (
          <Button onClick={() => setShowCreateModal(true)} leftIcon={<Icon name="plus-circle" className="w-4 h-4" />}>
            Nuevo Equipo
          </Button>
        )}
      </div>

      <div className="mb-6 p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <label htmlFor="search-teams" className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1">Buscar Equipos</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                type="text"
                id="search-teams"
                placeholder="Nombre o descripción del equipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 pl-10 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight"
                />
            </div>
          </div>
          <div>
            <label htmlFor="filter-category" className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1">Filtrar por Categoría</label>
            <select 
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TeamCategory | 'all')}
              className="w-full p-2.5 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight"
            >
              <option value="all">Todas las Categorías</option>
              {TEAM_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
          <Icon name="face-smile" className="w-16 h-16 mx-auto mb-4 opacity-30"/>
          <p className="text-xl">No se encontraron equipos con estos criterios.</p>
          {canCreateTeam ? <p className="mt-2">¡Quizás quieras <button onClick={() => setShowCreateModal(true)} className="text-primary-DEFAULT hover:underline font-semibold">crear uno nuevo</button>!</p> : <p className="mt-2">Intenta ajustar tu búsqueda o filtros.</p>}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <TeamCard 
            key={team.id} 
            team={team} 
            currentUser={currentUser} 
            onJoinTeam={handleJoinTeam}
            onRequestJoinTeam={onRequestJoinTeam}
          />
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1100]" role="dialog" aria-modal="true" aria-labelledby="create-team-title">
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 id="create-team-title" className="text-2xl font-semibold text-primary-DEFAULT">Crear Nuevo Equipo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateModal(false)} aria-label="Cerrar modal">
                <Icon name="close" className="w-6 h-6" />
              </Button>
            </div>
            
            {formError && <p className="mb-3 text-sm text-error bg-error/10 p-2 rounded-md">{formError}</p>}

            <div className="space-y-4">
              <div>
                <label htmlFor="newTeamName" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Nombre del Equipo <span className="text-error">*</span></label>
                <input type="text" id="newTeamName" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT" />
              </div>
              <div>
                <label htmlFor="newTeamDesc" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Descripción <span className="text-error">*</span></label>
                <textarea id="newTeamDesc" value={newTeamDesc} onChange={(e) => setNewTeamDesc(e.target.value)} rows={3} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"></textarea>
              </div>
              <div>
                <label htmlFor="newTeamCategory" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Categoría</label>
                <select id="newTeamCategory" value={newTeamCategory} onChange={(e) => setNewTeamCategory(e.target.value as TeamCategory)} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT">
                  {TEAM_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="newTeamIsPrivate" checked={newTeamIsPrivate} onChange={(e) => setNewTeamIsPrivate(e.target.checked)} className="h-4 w-4 text-primary-DEFAULT border-neutral-borderLight rounded focus:ring-primary-DEFAULT mr-2" />
                <label htmlFor="newTeamIsPrivate" className="text-sm text-neutral-textDark dark:text-neutral-textLight">Equipo Privado (requiere aprobación para unirse)</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
              <Button onClick={handleCreateTeam}>Crear Equipo</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsListPage;
