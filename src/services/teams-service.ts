import { User } from "./auth-service";

// Tipos para el servicio de equipos
export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: Date;
  imageUrl?: string;
  tags: string[];
  isPrivate: boolean;
}

export interface TeamMember {
  user: User;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
}

// Datos mock para los equipos
const mockUsers = [
  {
    id: '1',
    name: 'Ana Admin',
    email: 'admin@peopletech.com',
    role: 'admin',
    avatar: '/avatars/admin.png',
  },
  {
    id: '2',
    name: 'Mario Manager',
    email: 'manager@peopletech.com',
    role: 'manager',
    avatar: '/avatars/manager.png',
  },
  {
    id: '3',
    name: 'Eva Empleado',
    email: 'empleado@peopletech.com',
    role: 'employee',
    avatar: '/avatars/employee.png',
  },
  {
    id: '4',
    name: 'Carlos Colaborador',
    email: 'carlos@peopletech.com',
    role: 'employee',
    avatar: '/avatars/employee2.png',
  },
  {
    id: '5',
    name: 'Laura Líder',
    email: 'laura@peopletech.com',
    role: 'manager',
    avatar: '/avatars/manager2.png',
  },
  {
    id: '6',
    name: 'Pablo Programador',
    email: 'pablo@peopletech.com',
    role: 'employee',
    avatar: '/avatars/employee3.png',
  },
  {
    id: '7',
    name: 'Sara Soporte',
    email: 'sara@peopletech.com',
    role: 'employee',
    avatar: '/avatars/employee4.png',
  },
  {
    id: '8',
    name: 'Daniel Diseñador',
    email: 'daniel@peopletech.com',
    role: 'employee',
    avatar: '/avatars/employee5.png',
  },
];

// Generar fechas aleatorias recientes para la creación de equipos
const getRandomDate = (monthsAgo: number = 12) => {
  const now = new Date();
  const randomMonths = Math.floor(Math.random() * monthsAgo);
  const randomDays = Math.floor(Math.random() * 30);
  
  now.setMonth(now.getMonth() - randomMonths);
  now.setDate(now.getDate() - randomDays);
  
  return now;
};

// Generar fechas aleatorias para cuando los miembros se unieron (después de la creación del equipo)
const getRandomJoinDate = (teamCreationDate: Date) => {
  const joinDate = new Date(teamCreationDate);
  const randomDays = Math.floor(Math.random() * 30) + 1; // Al menos 1 día después
  
  joinDate.setDate(joinDate.getDate() + randomDays);
  
  return joinDate;
};

// Generar miembros aleatorios para un equipo
const generateRandomMembers = (count: number, teamCreationDate: Date): TeamMember[] => {
  const shuffledUsers = [...mockUsers].sort(() => 0.5 - Math.random());
  const selectedUsers = shuffledUsers.slice(0, count);
  
  return selectedUsers.map((user, index) => ({
    user,
    role: index === 0 ? "owner" : index < 3 ? "admin" : "member",
    joinedAt: index === 0 ? teamCreationDate : getRandomJoinDate(teamCreationDate),
  }));
};

// Equipos mock
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Desarrollo Frontend',
    description: 'Equipo encargado del desarrollo de interfaces de usuario y experiencia de usuario para las aplicaciones de la empresa.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(8, getRandomDate()),
    tags: ['frontend', 'ui', 'ux', 'react', 'nextjs'],
    isPrivate: false,
    imageUrl: '/images/teams/frontend.jpg',
  },
  {
    id: '2',
    name: 'Desarrollo Backend',
    description: 'Equipo responsable de la implementación de APIs, servicios y lógica de negocio para las aplicaciones.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(6, getRandomDate()),
    tags: ['backend', 'api', 'nodejs', 'database'],
    isPrivate: false,
    imageUrl: '/images/teams/backend.jpg',
  },
  {
    id: '3',
    name: 'Innovación Digital',
    description: 'Equipo multidisciplinar enfocado en la investigación y desarrollo de nuevas tecnologías y soluciones innovadoras.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(5, getRandomDate()),
    tags: ['innovación', 'investigación', 'tecnología', 'futuro'],
    isPrivate: false,
    imageUrl: '/images/teams/innovation.jpg',
  },
  {
    id: '4',
    name: 'Diseño UX/UI',
    description: 'Equipo especializado en el diseño de interfaces de usuario y experiencia de usuario para todas las plataformas.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(4, getRandomDate()),
    tags: ['diseño', 'ui', 'ux', 'figma', 'sketch'],
    isPrivate: false,
    imageUrl: '/images/teams/design.jpg',
  },
  {
    id: '5',
    name: 'DevOps',
    description: 'Equipo responsable de la infraestructura, despliegue y operaciones de las aplicaciones y servicios.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(3, getRandomDate()),
    tags: ['devops', 'cloud', 'ci/cd', 'kubernetes', 'docker'],
    isPrivate: false,
    imageUrl: '/images/teams/devops.jpg',
  },
  {
    id: '6',
    name: 'Proyecto Secreto X',
    description: 'Equipo especial trabajando en un proyecto confidencial de alta prioridad.',
    createdAt: getRandomDate(),
    members: generateRandomMembers(4, getRandomDate()),
    tags: ['confidencial', 'proyecto-x', 'innovación'],
    isPrivate: true,
    imageUrl: '/images/teams/secret.jpg',
  },
];

// Servicio de equipos mock
export const teamsService = {
  // Obtener todos los equipos públicos
  getPublicTeams: async (): Promise<Team[]> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Devolvemos solo los equipos públicos
    return mockTeams.filter(team => !team.isPrivate);
  },
  
  // Obtener todos los equipos (públicos y privados) - solo para admins
  getAllTeams: async (): Promise<Team[]> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Devolvemos todos los equipos
    return [...mockTeams];
  },
  
  // Obtener equipos a los que pertenece un usuario
  getUserTeams: async (userId: string): Promise<Team[]> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Filtramos los equipos donde el usuario es miembro
    return mockTeams.filter(team => 
      team.members.some(member => member.user.id === userId)
    );
  },
  
  // Obtener un equipo por su ID
  getTeamById: async (teamId: string): Promise<Team | null> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Buscamos el equipo por ID
    const team = mockTeams.find(team => team.id === teamId);
    
    return team || null;
  },
  
  // Crear un nuevo equipo
  createTeam: async (
    name: string,
    description: string,
    tags: string[],
    isPrivate: boolean,
    ownerId: string
  ): Promise<Team> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const owner = mockUsers.find(user => user.id === ownerId);
    
    if (!owner) {
      throw new Error('Usuario no encontrado');
    }
    
    const creationDate = new Date();
    
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name,
      description,
      tags,
      isPrivate,
      createdAt: creationDate,
      members: [
        {
          user: owner,
          role: "owner",
          joinedAt: creationDate,
        },
      ],
    };
    
    // En una implementación real, aquí guardaríamos el equipo en la base de datos
    mockTeams.push(newTeam);
    
    return newTeam;
  },
  
  // Unirse a un equipo
  joinTeam: async (teamId: string, userId: string): Promise<Team> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    const team = mockTeams.find(team => team.id === teamId);
    
    if (!team) {
      throw new Error('Equipo no encontrado');
    }
    
    const user = mockUsers.find(user => user.id === userId);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Verificar si el usuario ya es miembro
    if (team.members.some(member => member.user.id === userId)) {
      throw new Error('El usuario ya es miembro de este equipo');
    }
    
    // Añadir el usuario como miembro
    team.members.push({
      user,
      role: "member",
      joinedAt: new Date(),
    });
    
    return team;
  },
  
  // Abandonar un equipo
  leaveTeam: async (teamId: string, userId: string): Promise<void> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    const team = mockTeams.find(team => team.id === teamId);
    
    if (!team) {
      throw new Error('Equipo no encontrado');
    }
    
    // Verificar si el usuario es el propietario
    const isOwner = team.members.some(
      member => member.user.id === userId && member.role === "owner"
    );
    
    if (isOwner) {
      throw new Error('El propietario no puede abandonar el equipo. Transfiere la propiedad primero.');
    }
    
    // Eliminar al usuario de los miembros
    team.members = team.members.filter(member => member.user.id !== userId);
  },
};
