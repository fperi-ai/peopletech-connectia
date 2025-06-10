import { User, UserRole, Post, Announcement, Challenge, Team, MemeTemplate, TeamCategory } from './types';

export const APP_NAME = "PeopleTech ConnectIA";
export const AI_ASSISTANT_NAME = "Connie"; // Updated

// Configuración de UI
export const ENABLE_GLASSMORPHISM = true; // Controla la aplicación global del estilo Glassmorphism

export const DEMO_USERS: User[] = [
  { id: 'user1', email: 'fran.periago@inditex.com', name: 'Fran Periago', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/ana/100/100', password: 'password', firstLogin: true, teamIds: ['team1', 'team3'], bio: `Liderando la transformación digital en People Tech. Entusiasta de la IA y el café bien cargado ☕. Fanático de los escape rooms y los retos complejos. #Innovacion #LiderazgoIA`, skills: ['Gestión de Proyectos', 'IA Estratégica', 'Liderazgo de Equipos', 'Transformación Digital', 'Public Speaking'], joinTimestamp: new Date('2020-01-15T10:00:00Z').getTime(), roleDescription: 'Especialista IA', quote: 'Impulsamos la colaboración con IA para potenciar el talento de cada persona.' },
  { id: 'user2', email: 'fer.suarez@inditex.com', name: 'Fer Suárez', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/mario/100/100', password: 'password', firstLogin: true, teamIds: ['team1', 'team3', 'team4'], bio: `Manager en People Tech, enfocado en UX y la felicidad del equipo. En mis tiempos libres, intento ser chef 🧑‍🍳 y fotógrafo aficionado. Buscando siempre el 'wow' en cada proyecto. #UXDesign #TeamBuilding`, skills: ['UX/UI Design', 'Gestión de Equipos', 'Metodologías Ágiles', 'Growth Hacking', 'Fotografía'], joinTimestamp: new Date('2019-07-22T14:30:00Z').getTime(), roleDescription: 'Manager People Tech', quote: 'Una plataforma donde las voces de todos cuentan y la innovación florece.' },
  { id: 'user3', email: 'mari.prado@inditex.com', name: 'Mari Prado', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/eva/100/100', password: 'password', firstLogin: true, teamIds: ['team2', 'team3'], bio: `Developer en ConnectIA. Me encanta el código limpio y los gatos 🐈. Siempre aprendiendo algo nuevo. Runner ocasional y experta en encontrar los mejores memes. #FullStackDev #Gatos #AprendizajeContinuo`, skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Docker'], joinTimestamp: new Date('2021-03-10T09:00:00Z').getTime() },
  { id: 'user4', email: 'luis.jimenez@inditex.com', name: 'Luis Jiménez', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/luis/100/100', password: 'password', firstLogin: false, teamIds: ['team1', 'team3', 'team5'], bio: 'Apasionado por la tecnología y la música. Conectando ideas y personas. Siempre listo para un buen debate sobre el futuro del retail.', skills: ['Liderazgo Técnico', 'Arquitectura de Software', 'DevOps', 'Cloud Computing'], joinTimestamp: new Date('2018-11-05T11:00:00Z').getTime(), roleDescription: 'Data & Analytics', quote: 'Conecta, comparte y crece: tu comunidad tecnológica en un solo lugar.' },
  { id: 'user5', email: 'sara.garcia@inditex.com', name: 'Sara García', role: UserRole.EMPLOYEE, avatar: 'https://picsum.photos/seed/sara/100/100', password: 'password', firstLogin: false, teamIds: ['team2', 'team3', 'team4'], bio: 'Comunicadora y estratega de contenido. Me encanta contar historias y crear comunidades. Adicta al té y a los libros de misterio.', skills: ['Marketing Digital', 'Redes Sociales', 'Content Creation', 'SEO', 'Análisis de Datos'], joinTimestamp: new Date('2022-05-20T16:00:00Z').getTime() },
];

export const INITIAL_POSTS: Post[] = [
  { 
    id: 'post1', 
    authorId: 'user2', 
    authorName: 'Fer Suárez', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user2')?.avatar || '', 
    content: '¡Emocionada por empezar el nuevo Quarter! Vamos a hacerlo genial. #NuevosComienzos', 
    timestamp: Date.now() - 1000 * 60 * 60 * 2, 
    reactions: { '👍': ['user3', 'user1'] }, 
    comments: [
      { id: 'comment1-1', authorId: 'user3', authorName: 'Mari Prado', authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', content: '¡Totalmente de acuerdo, Fer!', timestamp: Date.now() - 1000 * 60 * 60 * 1 }
    ]
  },
  { 
    id: 'post2', 
    authorId: 'user3', 
    authorName: 'Mari Prado', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', 
    content: '¡Acabo de descubrir una nueva cafetería genial cerca de la oficina! ☕ ¿Alguien la ha probado?', 
    timestamp: Date.now() - 1000 * 60 * 60 * 22, 
    reactions: { '❤️': ['user1', 'user2', 'user4'], '😂': ['user5'] },
    comments: []
  },
  { 
    id: 'post3', 
    authorId: 'user1', 
    authorName: 'Fran Periago', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user1')?.avatar || '', 
    content: 'Compartiendo algunas ideas de la última conferencia de tecnología. ¡Interesantes avances en IA!', 
    timestamp: Date.now() - 1000 * 60 * 60 * 24, 
    reactions: { '💡': ['user1', 'user2', 'user3', 'user5'] }, 
    comments: []
  },
  { 
    id: 'post-team1-1', 
    authorId: 'user1', 
    authorName: 'Fran Periago', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user1')?.avatar || '', 
    content: '¡Genial progreso en el Proyecto de Mi Espacio esta semana, equipo! Vamos a mantener el ritmo. #MiEspacio #TrabajoEnEquipo', 
    teamId: 'team3',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, 
    reactions: { '🚀': ['user2', 'user4'] }, 
    comments: []
  },
  { 
    id: 'post-team2-1', 
    authorId: 'user3', 
    authorName: 'Mari Prado', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user3')?.avatar || '', 
    content: '¿Quién se apunta para un 5k este sábado? Nos vemos en el Parque del Retiro, 9 AM. 🏃‍♀️🏃‍♂️ #ClubDeCorredores', 
    imageUrl: 'https://picsum.photos/seed/runclub/600/300',
    teamId: 'team2',
    timestamp: Date.now() - 1000 * 60 * 45, 
    reactions: { '👍': ['user5'] }, 
    comments: []
  },
  { 
    id: 'post-user1-profile', 
    authorId: 'user1', 
    authorName: 'Fran Periago', 
    authorAvatar: DEMO_USERS.find(u=>u.id === 'user1')?.avatar || '', 
    content: 'Reflexionando sobre el futuro de la IA en Inditex. ¡El potencial es enorme! #IA #FuturoTecnológico', 
    timestamp: Date.now() - 1000 * 60 * 60 * 5, 
    reactions: { '💡': ['user2', 'user4', 'user5'] }, 
    comments: []
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: 'ann1', title: 'Lanzamiento de Nuevos Valores Corporativos', content: 'Estamos emocionados de anunciar nuestros valores corporativos actualizados. Por favor, revisenlos en la intranet.', authorId: 'user1', authorName: 'Fran Periago', timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, isOfficial: true },
  { id: 'ann2', title: 'Próximo Evento de Construcción de Equipos', content: 'Marquen sus calendarios para nuestro evento anual de construcción de equipos el 15 de julio. ¡Más detalles pronto!', authorId: 'user2', authorName: 'Fer Suárez', timestamp: Date.now() - 1000 * 60 * 60 * 5, isOfficial: true },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'ch1', title: 'Completa Tu Perfil', description: 'Agrega una foto, bio y habilidades a tu perfil.', points: 50, isCompleted: (user) => !!(user.bio && user.skills?.length), progress: (user) => ( (user.avatar !== DEMO_USERS.find(u=>u.id === user.id)?.avatar ? 33:0) + (user.bio ? 33:0) + (user.skills?.length ? 34:0))},
  { id: 'ch2', title: 'Comparte 3 Ideas Innovadoras', description: 'Publica tres ideas en el feed principal o en el feed de tu equipo.', points: 100, isCompleted: (user) => INITIAL_POSTS.filter(p => p.authorId === user.id).length >=3, progress: (user) => (Math.min(100, (INITIAL_POSTS.filter(p => p.authorId === user.id).length / 3) * 100)) },
  { id: 'ch3', title: 'Maestro de Memes', description: `Crea y comparte un meme usando el Generador de Memes de ${AI_ASSISTANT_NAME}.`, points: 75, isCompleted: () => false, progress: () => 0 }, // Requires tracking meme creation
  { id: 'ch4', title: 'Únete a un Equipo', description: 'Conviértete en miembro de al menos un equipo o comunidad.', points: 30, isCompleted: (user) => (user.teamIds?.length || 0) > 0, progress: (user) => (user.teamIds?.length || 0) > 0 ? 100 : 0 },
  { id: 'ch5', title: 'Dinamo de Reacciones', description: 'Reacciona a 5 publicaciones diferentes.', points: 25, isCompleted: (user) => false, progress: () => 60 }, // Requires tracking reactions
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
    name: 'Innovadores Tecnológicos Zaragoza', 
    description: 'Colaboración para el equipo de tecnología de Zaragoza. Discutimos nuevas herramientas, frameworks y eventos tecnológicos locales.', 
    memberIds: ['user1', 'user2', 'user4'], 
    isPrivate: false, 
    icon: '💻', 
    creatorId: 'user1',
    category: 'department',
    bannerUrl: 'https://picsum.photos/seed/techinnovators/800/200',
    accentColor: '#3B82F6' // Blue
  },
  { 
    id: 'team2', 
    name: 'Genios del Marketing', 
    description: 'Un grupo para que el equipo de marketing se alinee en campañas, comparta ideas creativas y siga los KPIs.', 
    memberIds: ['user3', 'user5'], 
    isPrivate: false, 
    icon: '📈', 
    creatorId: 'user5', 
    category: 'department',
    accentColor: '#10B981' // Green
  },
  { 
    id: 'team3', 
    name: 'Equipo Principal Proyecto Fénix', 
    description: 'El centro de operaciones para el equipo del Proyecto Fénix. Todas las actualizaciones, documentos y debates tienen lugar aquí.', 
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
    name: 'Pensadores de Diseño UX', 
    description: 'Un espacio para que los diseñadores UX/UI compartan ideas, critiquen trabajos y debatan sobre tendencias de diseño.', 
    memberIds: ['user2', 'user5'], 
    isPrivate: false, 
    icon: '🎨', 
    creatorId: 'user2', 
    category: 'department',
    accentColor: '#EC4899' // Pink
  },
  { 
    id: 'team5', 
    name: 'Club de Lectura', 
    description: '¿Te encanta leer? ¡Únete para hablar de libros, compartir recomendaciones y quizás empezar un club de lectura virtual!', 
    memberIds: ['user4'], 
    isPrivate: false, 
    icon: '📚', 
    creatorId: 'user4', 
    category: 'hobby',
    accentColor: '#8B5CF6' // Purple
  },
];

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: 'mt1', name: 'Novio Distraído', imageUrl: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg', boxCount: 3 },
  { id: 'mt2', name: 'Drake Hotline Bling', imageUrl: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg', boxCount: 2 },
  { id: 'mt3', name: 'Uno No Puede Simplemente', imageUrl: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg', boxCount: 2 },
  { id: 'mt4', name: 'Esto Está Bien', imageUrl: 'https://imgflip.com/s/meme/This-Is-Fine.jpg', boxCount: 1 },
  { id: 'mt5', name: 'Pikachu Sorprendido', imageUrl: 'https://imgflip.com/s/meme/Surprised-Pikachu.jpg', boxCount: 1 },
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
