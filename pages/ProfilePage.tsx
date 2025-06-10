
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Post as PostType, Team } from '../types';
import { DEMO_USERS, INITIAL_POSTS, INITIAL_TEAMS, AI_ASSISTANT_NAME, AI_USER_CURIOSITIES, INITIAL_CHALLENGES } from '../constants';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import Icon, { IconName } from '../components/shared/Icon';
import PostCard from '../components/feed/PostCard';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser, updateUser: updateAuthUser } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [userBadges, setUserBadges] = useState<{ id: string, title: string, icon: React.ReactNode }[]>([]);

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editableName, setEditableName] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [editableSkillsString, setEditableSkillsString] = useState('');
  const [currentAICuriosity, setCurrentAICuriosity] = useState('');
  const [curiosityIndex, setCuriosityIndex] = useState(0);

  const [allPosts, setAllPosts] = useState<PostType[]>(() => {
    const storedPosts = localStorage.getItem('connectia-posts');
    return storedPosts ? JSON.parse(storedPosts) : INITIAL_POSTS;
  });

   useEffect(() => {
    localStorage.setItem('connectia-posts', JSON.stringify(allPosts));
  }, [allPosts]);


  useEffect(() => {
    const foundUser = DEMO_USERS.find(u => u.id === userId);
    if (foundUser) {
      setProfileUser(foundUser);
      
      setIsOwnProfile(currentUser?.id === foundUser.id);
      
      setEditableName(foundUser.name || '');
      setEditableBio(foundUser.bio || '');
      setEditableSkillsString((foundUser.skills || []).join(', '));
      
      const postsForUser = allPosts.filter(p => p.authorId === foundUser.id).sort((a,b) => b.timestamp - a.timestamp);
      setUserPosts(postsForUser.slice(0, 10)); 

      const teamsForUser = INITIAL_TEAMS.filter(team => team.memberIds.includes(foundUser.id));
      setUserTeams(teamsForUser);

      const badgesForUser = INITIAL_CHALLENGES.filter(ch => ch.isCompleted && ch.isCompleted(foundUser))
        .map(ch => ({ id: ch.id, title: ch.title, icon: <Icon name="trophy" className="w-4 h-4 mr-1.5 text-secondary-dark"/> })); 
      setUserBadges(badgesForUser);

    } else {
      navigate('/'); 
    }
  }, [userId, currentUser, navigate, allPosts]);

  const memoizedAICuriosities = useMemo(() => {
    if (profileUser) {
      return AI_USER_CURIOSITIES.map(func => func(profileUser, userPosts));
    }
    return [];
  }, [profileUser, userPosts]);

  useEffect(() => {
    if (memoizedAICuriosities.length > 0) {
      setCurrentAICuriosity(memoizedAICuriosities[curiosityIndex % memoizedAICuriosities.length]);
    }
  }, [memoizedAICuriosities, curiosityIndex]);


  const handleSaveProfile = () => {
    if (isOwnProfile && profileUser) {
        const updatedSkills = editableSkillsString.split(',').map(s => s.trim()).filter(s => s);
        const updatedFields: Partial<User> = { 
            name: editableName,
            bio: editableBio, 
            skills: updatedSkills,
        };
        
        setProfileUser(prev => prev ? {...prev, ...updatedFields} : null);
        updateAuthUser(updatedFields); 
        
        setIsEditing(false);
        alert("Perfil actualizado (simulado).");
    }
  };

  const handleAvatarChangeClick = () => {
    if (isOwnProfile) {
        const newAvatarUrl = prompt("Simulación: Ingresa la URL de tu nuevo avatar:", profileUser?.avatar);
        if (newAvatarUrl) {
            setProfileUser(prev => prev ? {...prev, avatar: newAvatarUrl} : null);
            updateAuthUser({ avatar: newAvatarUrl });
            alert("Avatar actualizado (simulado).");
        }
    }
  };
  
  const cycleCuriosity = () => {
    setCuriosityIndex(prev => prev + 1);
  };

  const handleUpdateUserPost = (updatedPost: PostType) => {
    setAllPosts(prevAllPosts => prevAllPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const handleDeleteUserPost = (postId: string) => {
    setAllPosts(prevAllPosts => prevAllPosts.filter(p => p.id !== postId));
  };


  if (!profileUser) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-DEFAULT"></div></div>;
  }
  
  const SkillChip: React.FC<{skill: string}> = ({skill}) => (
    <span className="inline-block bg-primary-DEFAULT/10 dark:bg-primary-dark/20 text-primary-dark dark:text-primary-light text-xs font-medium px-2.5 py-1 rounded-full mr-2 mb-2">
        {skill}
    </span>
  );

  const RecentActivityItem: React.FC<{text: string, iconName: IconName}> = ({text, iconName}) => ( 
    <li className="flex items-center text-sm py-1.5">
        <Icon name={iconName} className="w-4 h-4 mr-2.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </li>
  );


  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-gradient-to-br from-primary-DEFAULT/80 to-secondary-DEFAULT/70 dark:from-primary-dark/80 dark:to-secondary-dark/70 shadow-xl rounded-lg p-6 md:p-8 mb-8 relative text-white">
        {isOwnProfile && !isEditing && (
            <Button size="sm" onClick={() => setIsEditing(true)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/50 border !ring-offset-transparent">
                <Icon name="edit" className="w-4 h-4 mr-1.5"/>Editar Perfil
            </Button>
        )}
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <div className="relative group mb-4 md:mb-0 md:mr-6">
            <Avatar src={profileUser.avatar} alt={profileUser.name} size="xl" className="ring-4 ring-white/50 group-hover:ring-white transition-all" />
            {isOwnProfile && (
                <button 
                    onClick={handleAvatarChangeClick} 
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Cambiar avatar"
                >
                    <Icon name="edit" className="w-8 h-8 text-white"/> 
                </button>
            )}
          </div>
          <div className="flex-grow">
            {isEditing ? (
                 <input type="text" value={editableName} onChange={(e) => setEditableName(e.target.value)} className="text-3xl font-bold mb-1 w-full p-1 border rounded-md bg-transparent placeholder-white/70 border-white/50 focus:bg-white/10 focus:ring-white focus:border-white" placeholder="Tu nombre"/>
            ) : (
                <h1 className="text-3xl font-bold mb-1">{profileUser.name}</h1>
            )}
            <p className="text-lg text-white/90 mb-1">{profileUser.role} - People Tech</p>
            <p className="text-sm text-white/80 mb-3">En Inditex desde {profileUser.joinTimestamp ? new Date(profileUser.joinTimestamp).getFullYear() : 'hace un tiempo'}</p>
            
            {isEditing ? (
                <textarea value={editableBio} onChange={(e) => setEditableBio(e.target.value)} rows={3} className="text-sm w-full p-2 border rounded-md bg-transparent placeholder-white/70 border-white/50 focus:bg-white/10 focus:ring-white focus:border-white" placeholder="Cuenta algo sobre ti..."></textarea>
            ) : (
                <p className="text-sm text-white/95">{profileUser.bio || (isOwnProfile ? "Añade una biografía para que tus compañeros te conozcan mejor." : "Este usuario aún no ha añadido una biografía.")}</p>
            )}
             {isEditing && (
                <div className="mt-4 space-x-2">
                    <Button size="sm" onClick={handleSaveProfile} className="bg-white/90 hover:bg-white text-primary-dark border-transparent">Guardar Cambios</Button>
                    <Button size="sm" variant="secondary" onClick={() => {setIsEditing(false); setEditableBio(profileUser.bio||''); setEditableName(profileUser.name||''); setEditableSkillsString((profileUser.skills||[]).join(', '));}} className="bg-transparent hover:bg-white/10 text-white border-white/50 border">Cancelar</Button>
                </div>
            )}
            {!isEditing && !isOwnProfile && (
                <div className="mt-4 space-x-2">
                    <Button size="sm" onClick={() => alert('Mensaje enviado (simulado)')} className="bg-white/20 hover:bg-white/30 text-white border-white/50 border"><Icon name="chat-bubble" className="w-4 h-4 mr-1.5"/>Enviar Mensaje</Button>
                    <Button size="sm" variant="secondary" onClick={() => alert('Siguiendo (simulado)')} className="bg-transparent hover:bg-white/10 text-white border-white/50 border">Seguir</Button>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
            <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-neutral-borderLight dark:border-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight">Información Personal</h2>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-neutral-textDark dark:text-neutral-textLight"><Icon name="users" className="w-5 h-5 mr-2 text-primary-DEFAULT"/> {profileUser.email}</li>
                    <li className="flex items-center text-neutral-textDark dark:text-neutral-textLight"><Icon name="users" className="w-5 h-5 mr-2 text-primary-DEFAULT"/> Departamento: People Tech (Innovación)</li>
                </ul>
                <div className="mt-4">
                    <h3 className="font-medium mb-2 text-neutral-textDark dark:text-neutral-textLight">Habilidades & Intereses:</h3>
                    {isEditing ? (
                        <textarea value={editableSkillsString} onChange={(e) => setEditableSkillsString(e.target.value)} rows={3} className="text-sm w-full p-2 border rounded-md bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT" placeholder="Ej: React, IA, Viajar, Cocina... (separados por comas)"></textarea>
                    ) : (
                        (profileUser.skills && profileUser.skills.length > 0) ? profileUser.skills.map(skill => <SkillChip key={skill} skill={skill}/>) : <p className="text-xs text-gray-500 dark:text-gray-400 italic">Aún no hay habilidades listadas.</p>
                    )}
                </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-neutral-borderLight dark:border-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight">Equipos</h2>
                {userTeams.length > 0 ? (
                    <ul className="space-y-1.5 text-sm">
                    {userTeams.map(team => (
                        <li key={team.id} className="flex items-center">
                            <span className="text-2xl mr-2">{team.icon || '🧑‍🤝‍🧑'}</span>
                            <Link to={`/teams/${team.id}`} className="text-primary-DEFAULT hover:underline">{team.name}</Link>
                        </li>
                    ))}
                    </ul>
                ) : <p className="text-xs text-gray-500 dark:text-gray-400 italic">No pertenece a ningún equipo aún.</p>}
            </div>

            <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-neutral-borderLight dark:border-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight">Insignias ("Logros ConnectIA")</h2>
                {userBadges.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                    {userBadges.map(badge => (
                        <span key={badge.id} title={badge.title} className="text-xs bg-secondary-DEFAULT/20 text-secondary-dark dark:text-secondary-DEFAULT px-3 py-1.5 rounded-full font-medium flex items-center shadow-sm">
                            {badge.icon} {badge.title.length > 15 ? badge.title.substring(0,12) + '...' : badge.title}
                        </span>
                    ))}
                    </div>
                ) : <p className="text-xs text-gray-500 dark:text-gray-400 italic">Aún no ha ganado insignias.</p>}
            </div>
            
            <div className="bg-gradient-to-tr from-accent-DEFAULT/20 to-secondary-DEFAULT/10 dark:from-accent-dark/20 dark:to-secondary-dark/10 p-5 rounded-lg shadow-lg relative overflow-hidden">
                <Icon name="robot" className="w-20 h-20 text-primary-DEFAULT/10 dark:text-primary-dark/10 absolute -right-5 -bottom-5 transform rotate-[-15deg] opacity-50 dark:opacity-30" />
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light flex items-center">
                        <Icon name="robot" className="w-6 h-6 mr-2"/>
                        Curiosidad IA por {AI_ASSISTANT_NAME}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={cycleCuriosity} className="text-xs !p-1 text-primary-dark/80 dark:text-primary-light/80 hover:bg-transparent/10">Otra</Button>
                </div>
                <p className="italic text-sm text-gray-700 dark:text-gray-300 leading-relaxed min-h-[4em]">{currentAICuriosity || `${AI_ASSISTANT_NAME} está pensando...`}</p>
            </div>
        </div>

        <div className="md:col-span-2 space-y-6">
             <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-3 border-b pb-2 border-neutral-borderLight dark:border-neutral-borderDark text-neutral-textDark dark:text-neutral-textLight">Actividad Reciente</h2>
                <ul className="space-y-1">
                    <RecentActivityItem text={`Reaccionó a un post sobre "Innovación"`} iconName="face-smile" />
                    <RecentActivityItem text={`Se unió al equipo "Tech Innovators Zaragoza"`} iconName="users" />
                    <RecentActivityItem text={`Completó el reto "Perfil Completo"`} iconName="trophy" />
                    <RecentActivityItem text={`Comentó en un anuncio de "El Altavoz"`} iconName="chat-bubble" />
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-textDark dark:text-neutral-textLight">Publicaciones de {profileUser.name.split(' ')[0]}</h2>
                {userPosts.length > 0 ? (
                <div className="space-y-6">
                    {userPosts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        currentUser={currentUser} 
                        onUpdatePost={handleUpdateUserPost}
                        onDeletePost={handleDeleteUserPost}
                    />
                    ))}
                </div>
                ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-card-light dark:bg-card-dark rounded-lg shadow-md">
                    <Icon name="face-smile" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{profileUser.name.split(' ')[0]} aún no ha publicado nada.</p>
                    {isOwnProfile && <p className="text-sm mt-1">¡Anímate a compartir algo!</p>}
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
