
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Team, Post as PostType, User, UserRole, TeamCategory } from '../types';
import { INITIAL_TEAMS, INITIAL_POSTS, DEMO_USERS, TEAM_CATEGORIES, AI_ASSISTANT_NAME } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';

const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { currentUser, updateUser: updateAuthUserContext } = useAuth();

  const [teams, setTeams] = useState<Team[]>(() => {
    const storedTeams = localStorage.getItem('connectia-teams');
    return storedTeams ? JSON.parse(storedTeams) : INITIAL_TEAMS;
  });
  const [allPosts, setAllPosts] = useState<PostType[]>(() => {
    const storedPosts = localStorage.getItem('connectia-posts'); 
    return storedPosts ? JSON.parse(storedPosts) : INITIAL_POSTS;
  });
  
  const [team, setTeam] = useState<Team | null>(null);
  const [teamPosts, setTeamPosts] = useState<PostType[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [editedName, setEditedName] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [editedCategory, setEditedCategory] = useState<TeamCategory>('general');
  const [editedIsPrivate, setEditedIsPrivate] = useState(false);

  useEffect(() => {
    localStorage.setItem('connectia-teams', JSON.stringify(teams));
  }, [teams]);
   useEffect(() => {
    localStorage.setItem('connectia-posts', JSON.stringify(allPosts));
  }, [allPosts]);


  useEffect(() => {
    const foundTeam = teams.find(t => t.id === teamId);
    if (foundTeam) {
      setTeam(foundTeam);
      setEditedName(foundTeam.name);
      setEditedDesc(foundTeam.description);
      setEditedCategory(foundTeam.category);
      setEditedIsPrivate(foundTeam.isPrivate);

      const postsForTeam = allPosts.filter(p => p.teamId === teamId).sort((a, b) => b.timestamp - a.timestamp);
      setTeamPosts(postsForTeam);
    } else {
      navigate('/teams', {replace: true}); 
    }
  }, [teamId, teams, allPosts, navigate]);

  const isMember = useMemo(() => currentUser && team?.memberIds.includes(currentUser.id), [currentUser, team]);
  const isTeamAdmin = useMemo(() => currentUser && team && (team.creatorId === currentUser.id || currentUser.role === UserRole.ADMIN), [currentUser, team]);

  if (!currentUser || !team) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-bgLight dark:bg-neutral-bgDark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-DEFAULT"></div>
      </div>
    );
  }

  const handleJoinTeam = () => {
    if (!isMember) {
      setTeams(prevTeams => prevTeams.map(t => 
        t.id === team.id ? { ...t, memberIds: [...t.memberIds, currentUser.id] } : t
      ));
      if (!currentUser.teamIds?.includes(team.id)) {
        updateAuthUserContext({ teamIds: [...(currentUser.teamIds || []), team.id] });
      }
      alert(`¡Te has unido a ${team.name}! Bienvenido/a. 🎉`);
    }
  };

  const handleLeaveTeam = () => {
    if (window.confirm(`¿Seguro que quieres abandonar el equipo "${team.name}"? Te echaremos de menos 😢`)) {
      setTeams(prevTeams => prevTeams.map(t => 
        t.id === team.id ? { ...t, memberIds: t.memberIds.filter(id => id !== currentUser.id) } : t
      ));
      updateAuthUserContext({ teamIds: currentUser.teamIds?.filter(id => id !== team.id) });
      alert(`Has abandonado el equipo ${team.name}.`);
    }
  };
  
  const handleCreatePostInTeam = (content: string, imageUrl?: string, teamIdToAttach?: string) => {
    const newPost: PostType = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content,
      imageUrl,
      timestamp: Date.now(),
      reactions: {},
      comments: [],
      teamId: teamIdToAttach || team.id,
    };
    setAllPosts(prev => [newPost, ...prev]); 
  };

  const handleUpdateTeamPost = (updatedPost: PostType) => {
    setAllPosts(prevAllPosts => prevAllPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const handleDeleteTeamPost = (postId: string) => {
    setAllPosts(prevAllPosts => prevAllPosts.filter(p => p.id !== postId));
  };


  const handleSaveChanges = () => {
    setTeams(prevTeams => prevTeams.map(t => 
      t.id === team.id ? { ...t, name: editedName, description: editedDesc, category: editedCategory, isPrivate: editedIsPrivate } : t
    ));
    setShowEditModal(false);
    alert("Detalles del equipo actualizados.");
  };

  const handleDeleteTeam = () => {
    if (window.confirm(`¿Estás ABSOLUTAMENTE SEGURO de que quieres eliminar el equipo "${team.name}"? Esta acción es irreversible y todo su contenido (publicaciones, etc.) se perderá para siempre.`)) {
        setTeams(prevTeams => prevTeams.filter(t => t.id !== team.id));
        setAllPosts(prevAllPosts => prevAllPosts.filter(p => p.teamId !== team.id));
        team.memberIds.forEach(memberId => {
            const user = DEMO_USERS.find(u => u.id === memberId); 
            if (user && user.teamIds?.includes(team.id)) {
                console.log(`User ${memberId} should have team ${team.id} removed from their list.`);
            }
        });
        alert(`Equipo "${team.name}" eliminado.`);
        navigate('/teams');
    }
    setShowDeleteConfirm(false);
  };

  const teamMembers = DEMO_USERS.filter(user => team.memberIds.includes(user.id));


  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg mb-8 overflow-hidden">
        {team.bannerUrl ? (
          <img src={team.bannerUrl} alt={`${team.name} banner`} className="w-full h-48 object-cover" />
        ) : (
          <div 
            className="w-full h-48 flex items-center justify-center text-white text-6xl font-bold"
            style={{backgroundColor: team.accentColor || 'var(--color-primary-dark, #1F8A88)'}} 
          >
            {team.icon || team.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
            <div>
              <h1 className="text-3xl font-bold text-neutral-textDark dark:text-neutral-textLight">{team.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{team.category} {team.isPrivate && <span className="text-xs">(<Icon name="lock-closed" className="inline w-3 h-3 align-baseline"/> Privado)</span>}</p>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              {isTeamAdmin && (
                <>
                  <Button variant="secondary" size="sm" onClick={() => setShowEditModal(true)} leftIcon={<Icon name="edit" className="w-4 h-4"/>}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)} leftIcon={<Icon name="trash" className="w-4 h-4"/>}>Eliminar</Button>
                </>
              )}
              {!isMember && team.isPrivate && <Button size="sm" onClick={() => alert('Solicitud de unión enviada (simulado).')}>Solicitar Unirse</Button>}
              {!isMember && !team.isPrivate && <Button size="sm" onClick={handleJoinTeam}>Unirse al Equipo</Button>}
              {isMember && !isTeamAdmin && <Button variant="secondary" size="sm" onClick={handleLeaveTeam}>Abandonar Equipo</Button>}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{team.description}</p>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Icon name="users" className="w-5 h-5 mr-2" /> {team.memberIds.length} miembro{team.memberIds.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {isMember || !team.isPrivate ? (
            <>
              {isMember && <PostComposer onCreatePost={handleCreatePostInTeam} currentUser={currentUser} teamId={team.id} teamName={team.name} />}
              {teamPosts.length > 0 ? teamPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  currentUser={currentUser} 
                  onUpdatePost={handleUpdateTeamPost}
                  onDeletePost={handleDeleteTeamPost}
                />
              )) : (
                <div className="text-center py-10 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                    <Icon name="chat-bubble" className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500"/>
                    <p className="text-gray-500 dark:text-gray-400">Este equipo aún no tiene publicaciones.</p>
                    {isMember && <p className="text-sm mt-1">¡Sé el primero en compartir algo!</p>}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
              <Icon name="lock-closed" className="w-16 h-16 mx-auto mb-4 text-gray-400" /> 
              <h2 className="text-xl font-semibold mb-2 text-neutral-textDark dark:text-neutral-textLight">Este equipo es privado</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Debes ser miembro para ver y publicar en este equipo.</p>
              {!isMember && <Button onClick={() => alert('Solicitud de unión enviada (simulado).')}>Solicitar Unirse</Button>}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5 sticky top-20">
            <h2 className="text-xl font-semibold mb-4 border-b border-neutral-borderLight pb-2 dark:border-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight">Miembros ({teamMembers.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-borderLight dark:scrollbar-thumb-neutral-borderDark scrollbar-track-transparent">
              {teamMembers.map(member => (
                <Link key={member.id} to={`/profile/${member.id}`} className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20 transition-colors">
                  <Avatar src={member.avatar} alt={member.name} size="md" />
                  <div>
                    <p className="font-medium text-sm text-neutral-textDark dark:text-neutral-textLight">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                  {team.creatorId === member.id && <span className="ml-auto text-xs bg-accent-DEFAULT/20 text-accent-dark dark:text-accent-DEFAULT px-1.5 py-0.5 rounded-full">Admin</span>}
                </Link>
              ))}
              {teamMembers.length === 0 && <p className="text-xs text-gray-500 dark:text-gray-400">Este equipo no tiene miembros aún.</p>}
            </div>
          </div>
        </div>
      </div>
      
      {showEditModal && isTeamAdmin && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1100]" role="dialog" aria-modal="true" aria-labelledby="edit-team-title">
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 id="edit-team-title" className="text-2xl font-semibold text-primary-DEFAULT">Editar Equipo</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)} aria-label="Cerrar modal"><Icon name="close" className="w-6 h-6" /></Button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="editedTeamName" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Nombre del Equipo</label>
                <input type="text" id="editedTeamName" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT" />
              </div>
              <div>
                <label htmlFor="editedTeamDesc" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Descripción</label>
                <textarea id="editedTeamDesc" value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)} rows={3} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"></textarea>
              </div>
              <div>
                <label htmlFor="editedTeamCategory" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Categoría</label>
                <select id="editedTeamCategory" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value as TeamCategory)} className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight focus:ring-primary-DEFAULT focus:border-primary-DEFAULT">
                  {TEAM_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="editedTeamIsPrivate" checked={editedIsPrivate} onChange={(e) => setEditedIsPrivate(e.target.checked)} className="h-4 w-4 text-primary-DEFAULT border-neutral-borderLight rounded focus:ring-primary-DEFAULT mr-2" />
                <label htmlFor="editedTeamIsPrivate" className="text-sm text-neutral-textDark dark:text-neutral-textLight">Equipo Privado</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
              <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && isTeamAdmin && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-[1200]" role="dialog" aria-modal="true" aria-labelledby="delete-team-title">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl p-6 w-full max-w-md">
                <h2 id="delete-team-title" className="text-xl font-bold text-error mb-3">Confirmar Eliminación</h2>
                <p className="text-sm text-neutral-textDark dark:text-neutral-textLight mb-1">
                    ¿Estás <strong className="text-error">ABSOLUTAMENTE SEGURO</strong> de que quieres eliminar el equipo 
                    <strong className="text-error"> "{team.name}"</strong>?
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Esta acción es irreversible y todo su contenido (publicaciones, comentarios, etc.) se perderá para siempre.
                </p>
                <div className="flex justify-end space-x-3">
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDeleteTeam}>Sí, Eliminar Equipo</Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default TeamDetailPage;