import { User, UserRole, Post, Announcement, Challenge, Team, MemeTemplate, TeamCategory } from './types';

export const APP_NAME = "PeopleTech ConnectIA";
export const AI_ASSISTANT_NAME = "Connie"; // Updated

// Configuración de UI
export const ENABLE_GLASSMORPHISM = true; // Controla la aplicación global del estilo Glassmorphism

export const DEMO_USERS: User[] = [
  { id: 'user1', email: 'ana.admin@inditex.com', name: 'Ana Admin', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/ana/100/100', password: 'password', firstLogin: true, teamIds: ['team1', 'team3'], bio: `Liderando la transformación digital en People Tech. Entusiasta de la IA y el café bien cargado ☕. Fanática de los escape rooms y los retos complejos. #Innovacion #LiderazgoIA`, skills: ['Gestión de Proyectos', 'IA Estratégica', 'Liderazgo de Equipos', 'Transformación Digital', 'Public Speaking'], joinTimestamp: new Date('2020-01-15T10:00:00Z').getTime() },
  { id: 'user2', email: 'mario.manager@inditex.com', name: 'Mario Manager', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/mario/100/100', password: 'password', firstLogin: true, teamIds: ['team1', 'team3', 'team4'], bio: `Manager en People Tech, enfocado en UX y la felicidad del equipo. En mis tiempos libres, intento ser chef 🧑‍🍳 y fotógrafo aficionado. Buscando siempre el 'wow' en cada proyecto. #UXDesign #TeamBuilding`, skills: ['UX/UI Design', 'Gestión de Equipos', 'Metodologías Ágiles', 'Growth Hacking', 'Fotografía'], joinTimestamp: new Date('2019-07-22T14:30:00Z').getTime() },
  { id: 'user3', email: 'eva.empleado@inditex.com', name: 'Eva Empleado', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/eva/100/100', password: 'password', firstLogin: true, teamIds: ['team2', 'team3'], bio: `Developer en ConnectIA. Me encanta el código limpio y los gatos 🐈. Siempre aprendiendo algo nuevo. Runner ocasional y experta en encontrar los mejores memes. #FullStackDev #Gatos #AprendizajeContinuo`, skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Docker'], joinTimestamp: new Date('2021-03-10T09:00:00Z').getTime() },
  { id: 'user4', email: 'luis.leader@inditex.com', name: 'Luis Leader', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/luis/100/100', password: 'password', firstLogin: false, teamIds: ['team1', 'team3', 'team5'], bio: 'Apasionado por la tecnología y la música. Conectando ideas y personas. Siempre listo para un buen debate sobre el futuro del retail.', skills: ['Liderazgo Técnico', 'Arquitectura de Software', 'DevOps', 'Cloud Computing'], joinTimestamp: new Date('2018-11-05T11:00:00Z').getTime() },
  { id: 'user5', email: 'sara.social@inditex.com', name: 'Sara Social', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/sara/100/100', password: 'password', firstLogin: false, teamIds: ['team2', 'team3', 'team4'], bio: 'Comunicadora y estratega de contenido. Me encanta contar historias y crear comunidades. Adicta al té y a los libros de misterio.', skills: ['Marketing Digital', 'Redes Sociales', 'Content Creation', 'SEO', 'Análisis de Datos'], joinTimestamp: new Date('2022-05-20T16:00:00Z').getTime() },
];

export const INITIAL_POSTS: Post[] = [
  { 
    id: 'post1', 
    authorId: 'user2', 
    authorName: 'Mario Manager', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user2')?.avatar || '', 
    content: 'Excited to kick off the new quarter! Let\'s make it a great one. #NewBeginnings', 
    timestamp: Date.now() - 1000 * 60 * 60 * 2, 
    reactions: { '👍': ['user3', 'user1'] }, 
    comments: [
      { id: 'comment1-1', authorId: 'user3', authorName: 'Eva Empleado', authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', content: 'Totally agree, Mario!', timestamp: Date.now() - 1000 * 60 * 60 * 1 }
    ]
  },
  { 
    id: 'post2', 
    authorId: 'user3', 
    authorName: 'Eva Empleado', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', 
    content: 'Just discovered a great new coffee spot near the office! ☕ Anyone tried it?', 
    imageUrl: 'https://picsum.photos/seed/coffee/600/400', 
    timestamp: Date.now() - 1000 * 60 * 30, 
    reactions: { '❤️': ['user2'], '🎉': ['user1', 'user4'] }, 
    comments: []
  },
   { 
    id: 'post3', 
    authorId: 'user4', 
    authorName: 'Luis Leader', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user4')?.avatar || '', 
    content: 'Sharing some insights from the latest tech conference. Fascinating developments in AI!', 
    timestamp: Date.now() - 1000 * 60 * 60 * 24, 
    reactions: { '💡': ['user1', 'user2', 'user3', 'user5'] }, 
    comments: []
  },
  { 
    id: 'post-team1-1', 
    authorId: 'user1', 
    authorName: 'Ana Admin', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user1')?.avatar || '', 
    content: 'Great progress on Project Phoenix this week, team! Let\'s keep the momentum going. #ProjectPhoenix #TeamWork', 
    teamId: 'team3',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, 
    reactions: { '🚀': ['user2', 'user4'] }, 
    comments: []
  },
  { 
    id: 'post-team2-1', 
    authorId: 'user3', 
    authorName: 'Eva Empleado', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', 
    content: 'Who is up for a 5k run this Saturday? Meeting at Retiro Park, 9 AM. 🏃‍♀️🏃‍♂️ #RunningClub', 
    imageUrl: 'https://picsum.photos/seed/runclub/600/300',
    teamId: 'team2',
    timestamp: Date.now() - 1000 * 60 * 45, 
    reactions: { '👍': ['user5'] }, 
    comments: []
  },
  { 
    id: 'post-user1-profile', 
    authorId: 'user1', 
    authorName: 'Ana Admin', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user1')?.avatar || '', 
    content: 'Reflexionando sobre el futuro de la IA en Inditex. ¡El potencial es enorme! #AI #FutureTech', 
    timestamp: Date.now() - 1000 * 60 * 60 * 5, 
    reactions: { '💡': ['user2', 'user4', 'user5'] }, 
    comments: []
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ann1', title: 'New Corporate Values Launch', content: 'We are thrilled to announce our updated corporate values. Please review them on the intranet.', authorId: 'user1', authorName: 'Ana Admin', timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, isOfficial: true },
  { id: 'ann2', title: 'Upcoming Team Building Event', content: 'Mark your calendars for our annual team building event on July 15th! More details to follow.', authorId: 'user2', authorName: 'Mario Manager', timestamp: Date.now() - 1000 * 60 * 60 * 5, isOfficial: true },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch1', title: 'Complete Your Profile', description: 'Add a photo, bio, and skills to your profile.', points: 50, isCompleted: (user) => !!(user.bio && user.skills?.length), progress: (user) => ( (user.avatar !== DEMO_USERS.find(u=>u.id === user.id)?.avatar ? 33:0) + (user.bio ? 33:0) + (user.skills?.length ? 34:0))},
  { id: 'ch2', title: 'Share 3 Innovative Ideas', description: 'Post three ideas in the main feed or your team feed.', points: 100, isCompleted: (user) => INITIAL_POSTS.filter(p => p.authorId === user.id).length >=3, progress: (user) => (Math.min(100, (INITIAL_POSTS.filter(p => p.authorId === user.id).length / 3) * 100)) },
  { id: 'ch3', title: 'Master of Memes', description: `Create and share a meme using ${AI_ASSISTANT_NAME}'s Meme Generator.`, points: 75, isCompleted: () => false, progress: () => 0 }, // Requires tracking meme creation
  { id: 'ch4', title: 'Join a Team', description: 'Become a member of at least one team or community.', points: 30, isCompleted: (user) => (user.teamIds?.length || 0) > 0, progress: (user) => (user.teamIds?.length || 0) > 0 ? 100 : 0 },
  { id: 'ch5', title: 'Reaction Dynamo', description: 'React to 5 different posts.', points: 25, isCompleted: (user) => false, progress: () => 60 }, // Requires tracking reactions
];

export const TEAM_CATEGORIES: { id: TeamCategory, name: string }[] = [
    { id: 'department', name: 'Departamento' },
    { id: 'project', name: 'Proyecto' },
    { id: 'social', name: 'Social' },
    { id: 'hobby', name: 'Hobby' },
    { id: 'general', name: 'General' },
];

export const INITIAL_TEAMS: Team[] = [
  { 
    id: 'team1', 
    name: 'Tech Innovators Zaragoza', 
    description: 'Collaboration for the tech team in Zaragoza. Discussing new tools, frameworks, and local tech events.', 
    memberIds: ['user1', 'user2', 'user4'], 
    isPrivate: false, 
    icon: '💡', 
    creatorId: 'user1', 
    category: 'department',
    bannerUrl: 'https://picsum.photos/seed/zaragoza/800/200',
    accentColor: '#3B82F6' // Blue
  },
  { 
    id: 'team2', 
    name: 'Running Club Inditex', 
    description: 'For all running enthusiasts at Inditex. Share routes, organize runs, and motivate each other!', 
    memberIds: ['user3', 'user5'], 
    isPrivate: false, 
    icon: '🏃', 
    creatorId: 'user3', 
    category: 'hobby',
    bannerUrl: 'https://picsum.photos/seed/runningclub/800/200',
    accentColor: '#10B981' // Green
  },
  { 
    id: 'team3', 
    name: 'Project Phoenix Core', 
    description: 'Core team for the Project Phoenix initiative. All official communications and discussions happen here.', 
    memberIds: ['user1', 'user2', 'user3', 'user4', 'user5'], 
    isPrivate: true, 
    icon: '🔥', 
    creatorId: 'user2', 
    category: 'project',
    bannerUrl: 'https://picsum.photos/seed/phoenixproject/800/200',
    accentColor: '#F97316' // Orange
  },
  { 
    id: 'team4', 
    name: 'UX Design Thinkers', 
    description: 'A space for UX/UI designers to share insights, critique work, and discuss design trends.', 
    memberIds: ['user2', 'user5'], 
    isPrivate: false, 
    icon: '🎨', 
    creatorId: 'user2', 
    category: 'department',
    accentColor: '#EC4899' // Pink
  },
  { 
    id: 'team5', 
    name: 'Book Worms Society', 
    description: 'Love reading? Join us to discuss books, share recommendations, and maybe start a virtual book club!', 
    memberIds: ['user4'], 
    isPrivate: false, 
    icon: '📚', 
    creatorId: 'user4', 
    category: 'hobby',
    accentColor: '#8B5CF6' // Purple
  },
];

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: 'mt1', name: 'Distracted Boyfriend', imageUrl: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg', boxCount: 3 },
  { id: 'mt2', name: 'Drake Hotline Bling', imageUrl: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg', boxCount: 2 },
  { id: 'mt3', name: 'One Does Not Simply', imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg', boxCount: 2 },
  { id: 'mt4', name: 'This is Fine', imageUrl: 'https://imgflip.com/s/meme/This-Is-Fine.jpg', boxCount: 1 },
  { id: 'mt5', name: 'Surprised Pikachu', imageUrl: 'https://imgflip.com/s/meme/Surprised-Pikachu.jpg', boxCount: 1 },
];

export const CONNIE_QUOTES: string[] = [
  "Donde la Inteligencia Artificial se une a la Familia Inditex.",
  "Conecta y Colabora con un Toque de IA.",
  "La IA puede ser tu mejor colega – nunca se come tu yogurt del frigorífico.",
  "¿Sabías que sonreír mejora tu productividad? ¡Sonríe!",
  "Un dato curioso: ¡El café es el combustible de las grandes ideas!",
  `${AI_ASSISTANT_NAME} está aquí para ayudarte. ¿O para contarte un chiste malo? ¡Tú decides!`, // Updated
  "Recuerda: ¡colaborar es la nueva forma de innovar!",
  "¿Necesitas una chispa de inspiración? ¡Prueba el generador de memes!",
  "Equipos: porque nadie logra grandes cosas solo.",
  "En un equipo, 'IA' también significa 'Ideas Asombrosas'.",
];

export const AI_USER_CURIOSITIES: ((user: User, posts: Post[]) => string)[] = [
  (user, posts) => `He notado que tu reacción más usada es ${Object.entries(posts.reduce((acc,p) => {Object.keys(p.reactions).forEach(r => acc[r] = (acc[r]||0)+1); return acc;}, {} as Record<string,number>)).sort((a,b)=>b[1]-a[1])[0]?.[0] || '👍'}. ¡Qué expresivo/a!`,
  (user, posts) => `Parece que te gusta publicar sobre ${user.skills?.[0] || 'temas interesantes'}. ¡Sigue así!`,
  (user, posts) => `Has escrito ${posts.reduce((acc, p) => acc + p.content.length, 0)} caracteres en tus posts. ¡Eso es más que este mensaje!`,
  (user, posts) => `Te has unido a ${user.teamIds?.length || 0} equipos. ¡Eres todo un conector/a!`,
  (user, posts) => user.joinTimestamp ? `Te uniste un ${new Date(user.joinTimestamp).toLocaleDateString('es-ES', { weekday: 'long' })}. ¡Qué buen día para empezar!` : `¡Bienvenido/a a bordo!`,
  (user, posts) => `Tu post "${posts.filter(p=>p.authorId === user.id)[0]?.content.substring(0,20) || 'más reciente'}..." recibió ${Object.values(posts.filter(p=>p.authorId === user.id)[0]?.reactions || {}).flat().length} reacciones. ¡Popular!`,
  (user, posts) => `A ${AI_ASSISTANT_NAME} le consta que eres un ${user.role} muy activo/a.`, // Updated
  (user, posts) => `¿Sabías que tu nombre, ${user.name.split(' ')[0]}, significa algo genial en algún idioma? (Bueno, ¡quizás!). 😉`,
  (user, posts) => posts.filter(p => p.authorId === user.id).length > 2 ? `¡Has compartido ${posts.filter(p => p.authorId === user.id).length} ideas! Sigue así.` : `¡Anímate a compartir más ideas, ${user.name.split(' ')[0]}!`
];


export const AVAILABLE_REACTIONS = ['👍', '❤️', '😂', '💡', '🎉', '🤔', '😢', '🚀'];