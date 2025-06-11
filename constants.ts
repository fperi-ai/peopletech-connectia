/* ------------------------------------------------------------------
 * MOCK DATA – PeopleTech ConnectIA
 * ------------------------------------------------------------------
 * Types referenced:
 *   User, UserRole, Post, Announcement, Challenge,
 *   Team, MemeTemplate, TeamCategory
 * ---------------------------------------------------------------- */

import {
  User,
  UserRole,
  Post,
  Announcement,
  Challenge,
  Team,
  MemeTemplate,
  TeamCategory,
} from './types'

/* ---------- Constantes globales ---------- */
export const APP_NAME = 'PeopleTech ConnectIA'
export const AI_ASSISTANT_NAME = 'Connie'

/* Control de estilo global (Glassmorphism) */
export const ENABLE_GLASSMORPHISM = true

/* ---------- DEMO USERS ---------- */
export const DEMO_USERS: User[] = [
  {
    id: 'user1',
    email: 'fran.periago@inditex.com',
    name: 'Fran Periago',
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/seed/ana/100/100',
    password: 'password',
    firstLogin: true,
    teamIds: ['team1', 'team3'],
    bio:
      'Liderando la transformación digital en People Tech. Entusiasta de la IA y el café bien cargado ☕. Fanático de los escape rooms y los retos complejos. #Innovacion #LiderazgoIA',
    skills: [
      'Gestión de Proyectos',
      'IA Estratégica',
      'Liderazgo de Equipos',
      'Transformación Digital',
      'Public Speaking',
    ],
    joinTimestamp: new Date('2020-01-15T10:00:00Z').getTime(),
    roleDescription: 'Especialista IA',
    quote:
      'Impulsamos la colaboración con IA para potenciar el talento de cada persona.',
  },
  {
    id: 'user2',
    email: 'fer.suarez@inditex.com',
    name: 'Fer Suárez',
    role: UserRole.MANAGER,
    avatar: 'https://picsum.photos/seed/mario/100/100',
    password: 'password',
    firstLogin: true,
    teamIds: ['team1', 'team3', 'team4'],
    bio:
      "Manager en People Tech, enfocado en UX y la felicidad del equipo. En mis tiempos libres, intento ser chef 🧑‍🍳 y fotógrafo aficionado. Buscando siempre el 'wow' en cada proyecto. #UXDesign #TeamBuilding",
    skills: [
      'UX/UI Design',
      'Gestión de Equipos',
      'Metodologías Ágiles',
      'Growth Hacking',
      'Fotografía',
    ],
    joinTimestamp: new Date('2019-07-22T14:30:00Z').getTime(),
    roleDescription: 'Manager People Tech',
    quote:
      'Una plataforma donde las voces de todos cuentan y la innovación florece.',
  },
  {
    id: 'user3',
    email: 'mari.prado@inditex.com',
    name: 'Mari Prado',
    role: UserRole.EMPLOYEE,
    avatar: 'https://picsum.photos/seed/eva/100/100',
    password: 'password',
    firstLogin: true,
    teamIds: ['team2', 'team3'],
    bio:
      'Developer en ConnectIA. Me encanta el código limpio y los gatos 🐈. Siempre aprendiendo algo nuevo. Runner ocasional y experta en encontrar los mejores memes. #FullStackDev #Gatos #AprendizajeContinuo',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Docker'],
    joinTimestamp: new Date('2021-03-10T09:00:00Z').getTime(),
  },
  {
    id: 'user4',
    email: 'luis.jimenez@inditex.com',
    name: 'Luis Jiménez',
    role: UserRole.MANAGER,
    avatar: 'https://picsum.photos/seed/luis/100/100',
    password: 'password',
    firstLogin: false,
    teamIds: ['team1', 'team3', 'team5'],
    bio:
      'Apasionado por la tecnología y la música. Conectando ideas y personas. Siempre listo para un buen debate sobre el futuro del retail.',
    skills: [
      'Liderazgo Técnico',
      'Arquitectura de Software',
      'DevOps',
      'Cloud Computing',
    ],
    joinTimestamp: new Date('2018-11-05T11:00:00Z').getTime(),
    roleDescription: 'Data & Analytics',
    quote:
      'Conecta, comparte y crece: tu comunidad tecnológica en un solo lugar.',
  },
  {
    id: 'user5',
    email: 'sara.garcia@inditex.com',
    name: 'Sara García',
    role: UserRole.EMPLOYEE,
    avatar: 'https://picsum.photos/seed/sara/100/100',
    password: 'password',
    firstLogin: false,
    teamIds: ['team2', 'team3', 'team4'],
    bio:
      'Comunicadora y estratega de contenido. Me encanta contar historias y crear comunidades. Adicta al té y a los libros de misterio.',
    skills: [
      'Marketing Digital',
      'Redes Sociales',
      'Content Creation',
      'SEO',
      'Análisis de Datos',
    ],
    joinTimestamp: new Date('2022-05-20T16:00:00Z').getTime(),
  },
  /* --- NUEVOS USERS (user6-user13) --- */
{
  id: 'user6',
  email: 'kike.garcia@inditex.com',
  name: 'Kike Garcia',
  role: UserRole.ADMIN,          // Admin Accesibilidad
  avatar: 'https://picsum.photos/seed/kike/100/100',
  password: 'password',
  firstLogin: true,
  teamIds: ['team7'],                          // Accessibility Champions
  bio: 'Especialista en accesibilidad. Apasionado de hacer la tecnología usable para todos. Runner y fan del chocolate negro.',
  skills: ['WCAG', 'Auditorías A11y', 'Design Systems', 'HTML Semántico'],
  joinTimestamp: new Date('2017-04-12T09:30:00Z').getTime(),
  roleDescription: 'Accessibility Lead',
  quote: 'La accesibilidad no es un plus, es un derecho.'
},
{
  id: 'user7',
  email: 'javi.sanesteban@inditex.com',
  name: 'Javi Sanesteban',
  role: UserRole.MANAGER,                      // Manager Experiencia Persona
  avatar: 'https://picsum.photos/seed/javi/100/100',
  password: 'password',
  firstLogin: false,
  teamIds: ['team3'],
  bio: 'Manager de Experiencia Persona. Transformando procesos en experiencias memorables. Trotamundos y amante de la gastronomía.',
  skills: ['Product Strategy', 'Roadmapping', 'Scrum', 'CX'],
  joinTimestamp: new Date('2016-09-01T08:00:00Z').getTime(),
  roleDescription: 'Vertical Lead – Experiencia Persona',
  quote: 'Cada interacción cuenta.'
},
{
  id: 'user8',
  email: 'tere.casal@inditex.com',
  name: 'Tere Casal',
  role: UserRole.MANAGER,                      // Manager Compensación
  avatar: 'https://picsum.photos/seed/tere/100/100',
  password: 'password',
  firstLogin: true,
  teamIds: ['team5'],
  bio: 'Responsable de Compensación. Buscando siempre el equilibrio perfecto entre datos y personas. Fan de la música indie.',
  skills: ['People Analytics', 'Payroll', 'OKR', 'Comunicación'],
  joinTimestamp: new Date('2018-02-15T11:45:00Z').getTime(),
  roleDescription: 'Manager – Compensación',
  quote: 'Los números también cuentan historias humanas.'
},
{
  id: 'user9',
  email: 'marcos.otero@inditex.com',
  name: 'Marcos Otero',
  role: UserRole.EMPLOYEE,                     // Equipo Maestro Salarios
  avatar: 'https://picsum.photos/seed/marcos/100/100',
  password: 'password',
  firstLogin: true,
  teamIds: ['team6', 'team8'],
  bio: 'Backend developer en Maestro de Salarios. Entusiasta de la automatización y la pizza napolitana.',
  skills: ['Java', 'Spring', 'Kubernetes', 'CI/CD'],
  joinTimestamp: new Date('2023-01-10T10:15:00Z').getTime()
},
{
  id: 'user10',
  email: 'evelyn.torras@inditex.com',
  name: 'Evelyn Torras',
  role: UserRole.EMPLOYEE,                     // Equipo Mi Espacio
  avatar: 'https://picsum.photos/seed/evelyn/100/100',
  password: 'password',
  firstLogin: false,
  teamIds: ['team3', 'team4'],
  bio: 'Frontend dev en Mi Espacio. Apasionada de React y la ilustración digital.',
  skills: ['React', 'TypeScript', 'Figma', 'Unit Testing'],
  joinTimestamp: new Date('2022-08-20T13:00:00Z').getTime()
},
{
  id: 'user11',
  email: 'ares.bautista@inditex.com',
  name: 'Ares Bautista',
  role: UserRole.EMPLOYEE,           // SA Experiencia Persona
  avatar: 'https://picsum.photos/seed/ares/100/100',
  password: 'password',
  firstLogin: false,
  teamIds: ['team3', 'team6'],
  bio: 'Solution Architect en Experiencia Persona. Armonizando microservicios y café ☕.',
  skills: ['Microservices', 'Event-Driven', 'AWS', 'DDD'],
  joinTimestamp: new Date('2015-06-05T07:30:00Z').getTime(),
  roleDescription: 'Solution Architect – Exp. Persona',
  quote: 'La arquitectura es invisible, hasta que falla.'
},
{
  id: 'user12',
  email: 'maria.luaces@inditex.com',
  name: 'María Luaces',
  role: UserRole.EMPLOYEE,                     // Data & IA
  avatar: 'https://picsum.photos/seed/maria/100/100',
  password: 'password',
  firstLogin: true,
  teamIds: ['team6'],
  bio: 'Data engineer convertida en entusiasta de la IA generativa. Runner y fan de los puzles.',
  skills: ['Python', 'ETL', 'SQL', 'ML Ops'],
  joinTimestamp: new Date('2024-03-18T09:00:00Z').getTime()
},
{
  id: 'user13',
  email: 'roque.serrantes@inditex.com',
  name: 'Roque Serrantes',
  role: UserRole.ADMIN,                    // Admin Arquitectura
  avatar: 'https://picsum.photos/seed/roque/100/100',
  password: 'password',
  firstLogin: false,
  teamIds: ['team6', 'team8'],
  bio: 'Chief Architect en People Tech. Evangelista de buenas prácticas y guitarrista aficionado.',
  skills: ['Arquitectura Enterprise', 'EOL Governance', 'Cloud Strategy'],
  joinTimestamp: new Date('2014-11-12T08:20:00Z').getTime(),
  roleDescription: 'Arquitectura People Tech',
  quote: 'El mejor código es el que no tienes que escribir.'
},
]

/* ---------- POSTS ---------- */
export const INITIAL_POSTS: Post[] = [
  {
    id: 'post1',
    authorId: 'user2',
    authorName: 'Fer Suárez',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user2')?.avatar || '',
    content:
      '¡Emocionada por empezar el nuevo Quarter! Vamos a hacerlo genial. #NuevosComienzos',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    reactions: { '👍': ['user3', 'user1'] },
    comments: [
      {
        id: 'comment1-1',
        authorId: 'user3',
        authorName: 'Mari Prado',
        authorAvatar:
          DEMO_USERS.find((u) => u.id === 'user3')?.avatar || '',
        content: '¡Totalmente de acuerdo, Fer!',
        timestamp: Date.now() - 1000 * 60 * 60 * 1,
      },
    ],
  },
  {
    id: 'post2',
    authorId: 'user3',
    authorName: 'Mari Prado',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user3')?.avatar || '',
    content:
      '¡Acabo de descubrir una nueva cafetería genial cerca de la oficina! ☕ ¿Alguien la ha probado?',
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    reactions: {
      '❤️': ['user1', 'user2', 'user4'],
      '😂': ['user5'],
    },
    comments: [],
  },
  {
    id: 'post3',
    authorId: 'user1',
    authorName: 'Fran Periago',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user1')?.avatar || '',
    content:
      'Compartiendo algunas ideas de la última conferencia de tecnología. ¡Interesantes avances en IA!',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    reactions: { '💡': ['user1', 'user2', 'user3', 'user5'] },
    comments: [],
  },
  {
    id: 'post4',
    authorId: 'user4',
    authorName: 'Luis Jiménez',
    authorAvatar: DEMO_USERS.find(u => u.id === 'user4')?.avatar || '',
    content: '¡Buenas noticias! El script de migración a PostgreSQL para reemplazar DB2 ya está en pruebas. Se aceptan testers voluntarios. #EOL #PeopleTech',
    timestamp: Date.now() - 1000 * 60 * 30,
    reactions: { '💡': ['user1', 'user3'], '🎉': ['user2'] },
    comments: [
      {
        id: 'comment4-1',
        authorId: 'user1',
        authorName: 'Fran Periago',
        authorAvatar: DEMO_USERS.find(u => u.id === 'user1')?.avatar || '',
        content: '¡Cuenta conmigo para testear, Luis!',
        timestamp: Date.now() - 1000 * 60 * 20,
      },
    ],
  },
  {
    id: 'post5',
    authorId: 'user2',
    authorName: 'Fer Suárez',
    authorAvatar: DEMO_USERS.find(u => u.id === 'user2')?.avatar || '',
    content: 'Este viernes hacemos workshop de “UX Writing con IA”. Plazas limitadas, ¡apúntate en el formulario interno! ✍️🤖',
    timestamp: Date.now() - 1000 * 60 * 60 * 6,
    reactions: { '👍': ['user5'], '💡': ['user3'] },
    comments: [],
  },
  {
    id: 'post6',
    authorId: 'user1',
    authorName: 'Fran Periago',
    authorAvatar: DEMO_USERS.find(u => u.id === 'user1')?.avatar || '',
    content: 'Nuevo micro-learning sobre prompts eficientes en ChatGPT disponible en la intranet. ¡Perfecto para nuestros retos IA! 🚀',
    timestamp: Date.now() - 1000 * 60 * 60 * 9,
    reactions: { '💡': ['user2', 'user4', 'user5'], '🎉': ['user3'] },
    comments: [],
  },
  {
    id: 'post7',
    authorId: 'user5',
    authorName: 'Sara García',
    authorAvatar: DEMO_USERS.find(u => u.id === 'user5')?.avatar || '',
    content: 'Recordatorio rápido: activa el modo alto contraste si trabajas de noche, ¡descansan tus ojos y lo agradecerás mañana! 🌙👀',
    timestamp: Date.now() - 1000 * 60 * 60 * 11,
    reactions: { '👍': ['user3'], '🤔': ['user4'] },
    comments: [],
  },
  {
    id: 'post-team4-1',
    authorId: 'user2',
    authorName: 'Fer Suárez',
    authorAvatar: DEMO_USERS.find(u => u.id === 'user2')?.avatar || '',
    content: 'He subido los mockups de la próxima iteración de Mi Espacio al Figma del equipo. Feedback bienvenido. #UXGuild',
    teamId: 'team4',
    timestamp: Date.now() - 1000 * 60 * 50,
    reactions: { '👍': ['user1', 'user5'] },
    comments: [],
  },
  {
    id: 'post-team1-1',
    authorId: 'user1',
    authorName: 'Fran Periago',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user1')?.avatar || '',
    content:
      '¡Genial progreso en el Proyecto de Mi Espacio esta semana, equipo! Vamos a mantener el ritmo. #MiEspacio #TrabajoEnEquipo',
    teamId: 'team3',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
    reactions: { '🚀': ['user2', 'user4'] },
    comments: [],
  },
  {
    id: 'post-team2-1',
    authorId: 'user3',
    authorName: 'Mari Prado',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user3')?.avatar || '',
    content:
      '¿Quién se apunta para un 5k este sábado? Nos vemos en el Parque del Retiro, 9 AM. 🏃‍♀️🏃‍♂️ #ClubDeCorredores',
    imageUrl: 'https://picsum.photos/seed/runclub/600/300',
    teamId: 'team2',
    timestamp: Date.now() - 1000 * 60 * 45,
    reactions: { '👍': ['user5'] },
    comments: [],
  },
  {
    id: 'post-user1-profile',
    authorId: 'user1',
    authorName: 'Fran Periago',
    authorAvatar: DEMO_USERS.find((u) => u.id === 'user1')?.avatar || '',
    content:
      'Reflexionando sobre el futuro de la IA en Inditex. ¡El potencial es enorme! #IA #FuturoTecnológico',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    reactions: { '💡': ['user2', 'user4', 'user5'] },
    comments: [],
  },
  /* --- POSTS de los nuevos users --- */
{
  id: 'post8',
  authorId: 'user6',
  authorName: 'Kike Garcia',
  authorAvatar: DEMO_USERS.find(u => u.id === 'user6')?.avatar || '',
  content: '¡Funcionalidad alto contraste desplegada! ✨ Gracias a todos los que apoyaron las pruebas de accesibilidad. #A11y',
  timestamp: Date.now() - 1000 * 60 * 25,
  reactions: { '🎉': ['user2', 'user3'], '👍': ['user1'] },
  comments: []
},
{
  id: 'post9',
  authorId: 'user7',
  authorName: 'Javi Sanesteban',
  authorAvatar: DEMO_USERS.find(u => u.id === 'user7')?.avatar || '',
  content: 'Experiencia Persona ha superado el 95 % de satisfacción interna este trimestre. ¡Gracias equipo! 🏆',
  timestamp: Date.now() - 1000 * 60 * 90,
  reactions: { '❤️': ['user2', 'user10'], '🎉': ['user3'] },
  comments: []
},
{
  id: 'post10',
  authorId: 'user11',
  authorName: 'Ares Bautista',
  authorAvatar: DEMO_USERS.find(u => u.id === 'user11')?.avatar || '',
  content: 'Terminada la POC de eventos Kafka para solicitudes de vacaciones 🎉. Próximo paso: incluir feature flags y tests E2E. #Arquitectura',
  timestamp: Date.now() - 1000 * 60 * 60 * 4,
  reactions: { '💡': ['user1', 'user4'], '🚀': ['user12'] },
  comments: []
},
{
  id: 'post11',
  authorId: 'user9',
  authorName: 'Marcos Otero',
  authorAvatar: DEMO_USERS.find(u => u.id === 'user9')?.avatar || '',
  content: 'Fixeada la última incidencia de WAS en Maestro de Salarios. ¡Checklist EOL casi listo! 🔧',
  timestamp: Date.now() - 1000 * 60 * 55,
  reactions: { '👍': ['user4'], '🎉': ['user2'] },
  comments: []
},
{
  id: 'post12',
  authorId: 'user10',
  authorName: 'Evelyn Torras',
  authorAvatar: DEMO_USERS.find(u => u.id === 'user10')?.avatar || '',
  content: 'Subí nuevas ilustraciones responsive para Mi Espacio. Feedback bienvenido en el Figma. 🎨',
  teamId: 'team4',
  timestamp: Date.now() - 1000 * 60 * 35,
  reactions: { '👍': ['user2', 'user5'] },
  comments: []
},
]

/* ---------- ANNOUNCEMENTS ---------- */
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    title: 'Lanzamiento oficial de ConnectIA',
    content:
      '¡ConnectIA ya está en producción! Arranca la colaboración impulsada por IA en People Tech. Todos los empleados pueden acceder desde hoy.',
    authorId: 'user1',
    authorName: 'Fran Periago',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
    isOfficial: true,
  },
  {
    id: 'ann2',
    title: 'Concurso People Bot Talent',
    content:
      'Registra tu idea de bot antes del 20 de junio y compite por premios a las mejores integraciones. Encuentra las bases en la intranet.',
    authorId: 'user2',
    authorName: 'Fer Suárez',
    timestamp: Date.now() - 1000 * 60 * 60 * 10,
    isOfficial: true,
  },
  {
    id: 'ann3',
    title: 'Recordatorio EOL DB2 & WAS',
    content:
      'Los equipos de Experiencia Persona y Payroll Masters deben finalizar las migraciones antes de fin de mes. Contactar con Luis Jiménez para dudas.',
    authorId: 'user4',
    authorName: 'Luis Jiménez',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    isOfficial: true,
  },
  {
    id: 'ann4',
    title: 'Ruta de Formación IA 2025',
    content: 'Lanzamos un itinerario formativo sobre IA práctica (Prompt Engineering, Auto-AI, ML Ops). Inscríbete antes del 30 de junio para reservar plaza.',
    authorId: 'user1',
    authorName: 'Fran Periago',
    timestamp: Date.now() - 1000 * 60 * 60 * 30,
    isOfficial: true,
  },
  {
    id: 'ann5',
    title: 'Parada programada de DB2',
    content: 'El próximo martes a las 20:00 se realizará la última parada de DB2 previa al apagado definitivo. Se ruega no desplegar a esa hora.',
    authorId: 'user4',
    authorName: 'Luis Jiménez',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    isOfficial: true,
  },
  /* --- ANNOUNCEMENTS nuevos --- */
{
  id: 'ann6',
  title: 'Accesibilidad nivel AA alcanzado',
  content: 'ConnectIA cumple oficialmente WCAG 2.2 AA. ¡Enhorabuena a Kike y al equipo de Accessibility Champions!',
  authorId: 'user6',
  authorName: 'Kike Garcia',
  timestamp: Date.now() - 1000 * 60 * 60 * 8,
  isOfficial: true
},
{
  id: 'ann7',
  title: 'Kick-off migración WAS → Quarkus',
  content: 'Arrancamos la iniciativa para modernizar las apps de Maestro de Salarios. Lead técnico: Marcos Otero.',
  authorId: 'user9',
  authorName: 'Marcos Otero',
  timestamp: Date.now() - 1000 * 60 * 60 * 14,
  isOfficial: true
}
]

/* ---------- CHALLENGES ---------- */
export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch1',
    title: 'Perfil Profesional',
    description:
      'Completa tu perfil con foto personalizada, bio completa y al menos 5 habilidades.',
    points: 50,
    isCompleted: (user) =>
      !!(
        user.bio && (user.skills?.length || 0) >= 5
      ),
    progress: (user) =>
      (user.avatar !==
      DEMO_USERS.find((u) => u.id === user.id)?.avatar
        ? 25
        : 0) +
      (user.bio ? 25 : 0) +
      Math.min(
        50,
        ((user.skills?.length || 0) * 10),
      ),
  },
  {
    id: 'ch2',
    title: 'Innovador Digital',
    description:
      'Publica tres ideas sobre transformación digital o innovación tecnológica.',
    points: 100,
    isCompleted: (user) =>
      INITIAL_POSTS.filter(
        (p) =>
          p.authorId === user.id &&
          (p.content.includes('#Innovación') ||
            p.content.includes('#IA') ||
            p.content.includes('#TransformacionDigital')),
      ).length >= 3,
    progress: (user) =>
      Math.min(
        100,
        (INITIAL_POSTS.filter(
          (p) =>
            p.authorId === user.id &&
            (p.content.includes('#Innovación') ||
              p.content.includes('#IA') ||
              p.content.includes('#TransformacionDigital')),
        ).length /
          3) *
          100,
      ),
  },
  {
    id: 'ch3',
    title: 'Creador de Memes',
    description: `Crea y comparte un meme usando el Generador de Memes de ${AI_ASSISTANT_NAME} que haga reír a tus compañeros.`,
    points: 75,
    isCompleted: () => false, // requires runtime tracking
    progress: () => 0,
  },
  {
    id: 'ch4',
    title: 'Networker',
    description:
      'Únete a 2 equipos diferentes y participa activamente en cada uno.',
    points: 60,
    isCompleted: (user) => (user.teamIds?.length || 0) >= 2,
    progress: (user) =>
      Math.min(
        100,
        ((user.teamIds?.length || 0) / 2) * 100,
      ),
  },
  {
    id: 'ch5',
    title: 'Social Engager',
    description:
      'Reacciona o comenta en 10 publicaciones de tus compañeros esta semana.',
    points: 45,
    isCompleted: () => false, // requires runtime tracking
    progress: () => 30,
  },
  {
    id: 'ch6',
    title: 'Accesibilidad Pro',
    description:
      'Configura al menos una preferencia de accesibilidad en tu perfil y compártela con tu equipo.',
    points: 40,
    isCompleted: () => false,
    progress: () => 0,
  },
  {
    id: 'ch7',
    title: 'EOL Manager',
    description:
      'Colabora en la migración de al menos un sistema EOL de tu departamento.',
    points: 90,
    isCompleted: () => false,
    progress: () => 15,
  },
  {
    id: 'ch8',
    title: 'Mentor IA',
    description: 'Comparte en ConnectIA al menos un truco o prompt avanzado de ChatGPT que te haya ahorrado tiempo.',
    points: 70,
    isCompleted: () => false,
    progress: () => 0,
  },
  {
    id: 'ch9',
    title: 'Accesibilidad Activa',
    description: 'Activa el modo alto contraste y compártelo en un post con #Accesibilidad.',
    points: 40,
    isCompleted: () => false,
    progress: () => 0,
  },
  {
    id: 'ch10',
    title: 'Sprint EOL',
    description: 'Participa en la corrección de al menos 3 incidencias derivadas de la migración DB2 → PostgreSQL.',
    points: 90,
    isCompleted: () => false,
    progress: () => 0,
  },
{
  id: 'ch11',
  title: 'A11y Evangelist',
  description: 'Publica un post explicando un tip de accesibilidad y consigue al menos 5 “me gusta”.',
  points: 60,
  isCompleted: () => false,
  progress: () => 0
},
{
  id: 'ch12',
  title: 'Arquitectura Documentada',
  description: 'Sube un diagrama actualizado de tu servicio con microservicios y eventos.',
  points: 80,
  isCompleted: () => false,
  progress: () => 0
},
]

/* ---------- TEAM CATEGORIES ---------- */
export const TEAM_CATEGORIES: { id: TeamCategory; name: string }[] = [
  { id: 'department', name: 'Departamento' },
  { id: 'project', name: 'Proyecto' },
  { id: 'social', name: 'Social' },
  { id: 'hobby', name: 'Hobby' },
  { id: 'general', name: 'General' },
]

/* ---------- TEAMS ---------- */
export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team1',
    name: 'Innovadores Tecnológicos Zaragoza',
    description:
      'Colaboración para el equipo de tecnología de Zaragoza. Discutimos nuevas herramientas, frameworks y eventos tecnológicos locales.',
    memberIds: ['user1', 'user2', 'user4'],
    isPrivate: false,
    icon: '💻',
    creatorId: 'user1',
    category: 'department',
    bannerUrl:
      'https://picsum.photos/seed/techinnovators/800/200',
    accentColor: '#3B82F6',
  },
  {
    id: 'team2',
    name: 'Genios del Marketing',
    description:
      'Un grupo para que el equipo de marketing se alinee en campañas, comparta ideas creativas y siga los KPIs.',
    memberIds: ['user3', 'user5'],
    isPrivate: false,
    icon: '📈',
    creatorId: 'user5',
    category: 'department',
    accentColor: '#10B981',
  },
  {
    id: 'team3',
    name: 'Equipo Principal Proyecto Fénix',
    description:
      'El centro de operaciones para el equipo del Proyecto Fénix. Todas las actualizaciones, documentos y debates tienen lugar aquí.',
    memberIds: ['user1', 'user2', 'user3', 'user4', 'user5'],
    isPrivate: true,
    icon: '🔥',
    creatorId: 'user2',
    category: 'project',
    bannerUrl:
      'https://picsum.photos/seed/phoenixproject/800/200',
    accentColor: '#F97316',
  },
  {
    id: 'team4',
    name: 'Pensadores de Diseño UX',
    description:
      'Un espacio para que los diseñadores UX/UI compartan ideas, critiquen trabajos y debatan sobre tendencias de diseño.',
    memberIds: ['user2', 'user5'],
    isPrivate: false,
    icon: '🎨',
    creatorId: 'user2',
    category: 'department',
    accentColor: '#EC4899',
  },
  {
    id: 'team5',
    name: 'Club de Lectura',
    description:
      '¿Te encanta leer? ¡Únete para hablar de libros, compartir recomendaciones y quizás empezar un club de lectura virtual!',
    memberIds: ['user4'],
    isPrivate: false,
    icon: '📚',
    creatorId: 'user4',
    category: 'hobby',
    accentColor: '#8B5CF6',
  },
  {
    id: 'team6',
    name: 'IA Guild',
    description: 'Comunidad abierta para compartir avances, ideas y pruebas de concepto en Inteligencia Artificial dentro de People Tech.',
    memberIds: ['user1', 'user2', 'user3', 'user4', 'user5'],
    isPrivate: false,
    icon: '🤖',
    creatorId: 'user1',
    category: 'general',
    bannerUrl: 'https://picsum.photos/seed/iaguild/800/200',
    accentColor: '#06B6D4',
  },
  {
    id: 'team7',
    name: 'Accessibility Champions',
    description: 'Equipo dedicado a impulsar mejores prácticas de accesibilidad y usabilidad en nuestras aplicaciones internas.',
    memberIds: ['user2', 'user5'],
    isPrivate: false,
    icon: '♿️',
    creatorId: 'user2',
    category: 'project',
    accentColor: '#F59E0B',
  },
  {
    id: 'team8',
    name: 'PeopleBot Hackers',
    description: 'Grupo de trabajo del concurso People Bot Talent para prototipar bots que mejoren la experiencia de empleado.',
    memberIds: ['user3', 'user4', 'user5'],
    isPrivate: true,
    icon: '🛠️',
    creatorId: 'user3',
    category: 'project',
    bannerUrl: 'https://picsum.photos/seed/botbuilders/800/200',
    accentColor: '#EF4444',
  },
  /* --- EQUIPOS nuevos relacionados --- */
{
  id: 'team9',
  name: 'Compensation Crew',
  description: 'Foro para compartir mejores prácticas y automatizaciones en Compensación y Payroll.',
  memberIds: ['user8', 'user9', 'user4'],
  isPrivate: false,
  icon: '💶',
  creatorId: 'user8',
  category: 'department',
  accentColor: '#FFB020'
},
{
  id: 'team10',
  name: 'Experiencia Persona Core',
  description: 'Equipo de gobierno de Experiencia Persona: métricas, roadmap y cultura.',
  memberIds: ['user7', 'user11', 'user1', 'user3'],
  isPrivate: true,
  icon: '👥',
  creatorId: 'user7',
  category: 'project',
  bannerUrl: 'https://picsum.photos/seed/exppersona/800/200',
  accentColor: '#0EA5E9'
},
]

/* ---------- MEME TEMPLATES ---------- */
export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'mt1',
    name: 'Novio Distraído',
    imageUrl:
      'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg',
    boxCount: 3,
  },
  {
    id: 'mt2',
    name: 'Drake Hotline Bling',
    imageUrl:
      'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg',
    boxCount: 2,
  },
  {
    id: 'mt3',
    name: 'Uno No Puede Simplemente',
    imageUrl:
      'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
    boxCount: 2,
  },
  {
    id: 'mt4',
    name: 'Esto Está Bien',
    imageUrl:
      'https://imgflip.com/s/meme/This-Is-Fine.jpg',
    boxCount: 1,
  },
  {
    id: 'mt5',
    name: 'Pikachu Sorprendido',
    imageUrl:
      'https://imgflip.com/s/meme/Surprised-Pikachu.jpg',
    boxCount: 1,
  },
]

/* ---------- QUOTES de Connie ---------- */
export const CONNIE_QUOTES: string[] = [
  'Donde la Inteligencia Artificial se une a la Familia Inditex.',
  'Conecta y Colabora con un Toque de IA.',
  'La IA puede ser tu mejor colega – nunca se come tu yogurt del frigorífico.',
  '¿Sabías que sonreír mejora tu productividad? ¡Sonríe!',
  'Un dato curioso: ¡El café es el combustible de las grandes ideas!',
  `${AI_ASSISTANT_NAME} está aquí para ayudarte. ¿O para contarte un chiste malo? ¡Tú decides!`,
  'Recuerda: ¡colaborar es la nueva forma de innovar!',
  '¿Necesitas una chispa de inspiración? ¡Prueba el generador de memes!',
  'Equipos: porque nadie logra grandes cosas solo.',
  'En un equipo, "IA" también significa "Ideas Asombrosas".',
]

/* ---------- Curiosidades IA ---------- */
export const AI_USER_CURIOSITIES: ((
  user: User,
  posts: Post[],
) => string)[] = [
  (user, posts) => {
    const reactionTotals: Record<string, number> = {}
    posts.forEach((p) =>
      Object.keys(p.reactions).forEach((r) => {
        reactionTotals[r] = (reactionTotals[r] || 0) + 1
      }),
    )
    const topReaction =
      Object.entries(reactionTotals).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0] || '👍'
    return `He notado que tu reacción más usada es ${topReaction}. ¡Qué expresivo/a!`
  },
  (user) =>
    `Parece que te gusta publicar sobre ${
      user.skills?.[0] || 'temas interesantes'
    }. ¡Sigue así!`,
  (user, posts) =>
    `Has escrito ${posts
      .filter((p) => p.authorId === user.id)
      .reduce(
        (acc, p) => acc + p.content.length,
        0,
      )} caracteres en tus posts. ¡Eso es más que este mensaje!`,
  (user) =>
    `Te has unido a ${user.teamIds?.length || 0} equipos. ¡Eres todo un conector/a!`,
  (user) =>
    user.joinTimestamp
      ? `Te uniste un ${new Date(
          user.joinTimestamp,
        ).toLocaleDateString('es-ES', {
          weekday: 'long',
        })}. ¡Qué buen día para empezar!`
      : '¡Bienvenido/a a bordo!',
  (user, posts) => {
    const firstPost = posts.find(
      (p) => p.authorId === user.id,
    )
    return firstPost
      ? `Tu post "${firstPost.content.substring(
          0,
          20,
        )}..." recibió ${Object.values(firstPost.reactions)
          .flat()
          .length} reacciones. ¡Popular!`
      : 'Aún no has publicado nada… ¡es tu oportunidad! 😉'
  },
  (user) =>
    `A ${AI_ASSISTANT_NAME} le consta que eres un ${
      user.role
    } muy activo/a.`,
  (user) =>
    `¿Sabías que tu nombre, ${
      user.name.split(' ')[0]
    }, significa algo genial en algún idioma? (Bueno, ¡quizás!). 😉`,
  (user, posts) =>
    posts.filter((p) => p.authorId === user.id).length > 2
      ? `¡Has compartido ${
          posts.filter((p) => p.authorId === user.id).length
        } ideas! Sigue así.`
      : `¡Anímate a compartir más ideas, ${
          user.name.split(' ')[0]
        }!`,
]

/* ---------- Reacciones disponibles ---------- */
export const AVAILABLE_REACTIONS = [
  '👍',
  '❤️',
  '😂',
  '💡',
  '🎉',
  '🤔',
  '😢',
  '🚀',
]
