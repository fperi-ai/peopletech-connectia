import { User } from "./auth-service";

// Tipos para el servicio de feed
export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  images?: string[];
  isAnnouncement?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
}

// Datos mock para el feed
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
];

// Generar fechas aleatorias recientes
const getRandomDate = () => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 7); // Hasta 7 días atrás
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  
  now.setDate(now.getDate() - randomDays);
  now.setHours(now.getHours() - randomHours);
  now.setMinutes(now.getMinutes() - randomMinutes);
  
  return now;
};

// Generar comentarios aleatorios para un post
const generateRandomComments = (count: number): Comment[] => {
  const comments: Comment[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    
    comments.push({
      id: `comment-${Date.now()}-${i}`,
      content: [
        "¡Excelente publicación! Muy interesante.",
        "Estoy de acuerdo con lo que comentas.",
        "Me gustaría saber más sobre este tema.",
        "Gracias por compartir esta información.",
        "Esto me recuerda a un proyecto en el que trabajé.",
        "¿Podríamos hablar más sobre esto en la próxima reunión?",
        "¡Genial! Voy a implementar algunas de estas ideas.",
      ][Math.floor(Math.random() * 7)],
      author: randomUser,
      createdAt: getRandomDate(),
      likes: Math.floor(Math.random() * 10),
    });
  }
  
  return comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Posts mock para el feed principal
export const mockPosts: Post[] = [
  {
    id: '1',
    content: '¡Bienvenidos a PeopleTech ConnectIA! Esta es nuestra nueva red social corporativa donde podremos compartir conocimientos, experiencias y mantenernos conectados. ¡Esperamos que la disfruten!',
    author: mockUsers[0], // Ana Admin
    createdAt: getRandomDate(),
    likes: 15,
    comments: generateRandomComments(3),
    isAnnouncement: true,
  },
  {
    id: '2',
    content: 'Acabo de terminar el curso de React avanzado. Si alguien está interesado en aprender más sobre hooks personalizados y patrones de renderizado, ¡estaré encantado de compartir mis apuntes!',
    author: mockUsers[2], // Eva Empleado
    createdAt: getRandomDate(),
    likes: 8,
    comments: generateRandomComments(2),
  },
  {
    id: '3',
    content: 'Hoy presentamos el nuevo proyecto de IA para optimización de inventario. Los resultados preliminares muestran una mejora del 23% en la precisión de las predicciones. ¡Un gran logro para el equipo!',
    author: mockUsers[1], // Mario Manager
    createdAt: getRandomDate(),
    likes: 12,
    comments: generateRandomComments(4),
    images: ['/images/project-chart.jpg'],
  },
  {
    id: '4',
    content: '¿Alguien más va a asistir al hackathon interno de la próxima semana? Estoy buscando formar un equipo para trabajar en una idea de app de bienestar para empleados.',
    author: mockUsers[3], // Carlos Colaborador
    createdAt: getRandomDate(),
    likes: 5,
    comments: generateRandomComments(1),
  },
  {
    id: '5',
    content: 'RECORDATORIO: La próxima semana comienza la campaña de evaluación de desempeño. Por favor, asegúrense de completar sus autoevaluaciones antes del viernes.',
    author: mockUsers[4], // Laura Líder
    createdAt: getRandomDate(),
    likes: 7,
    comments: generateRandomComments(2),
    isAnnouncement: true,
  },
];

// Anuncios corporativos mock
export const mockAnnouncements: Post[] = mockPosts.filter(post => post.isAnnouncement);

// Servicio de feed mock
export const feedService = {
  // Obtener todos los posts del feed principal
  getPosts: async (): Promise<Post[]> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Devolvemos una copia de los posts ordenados por fecha (más recientes primero)
    return [...mockPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  // Obtener solo los anuncios corporativos
  getAnnouncements: async (): Promise<Post[]> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // Devolvemos una copia de los anuncios ordenados por fecha (más recientes primero)
    return [...mockAnnouncements].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  // Crear un nuevo post
  createPost: async (content: string, authorId: string, isAnnouncement: boolean = false, images?: string[]): Promise<Post> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const author = mockUsers.find(user => user.id === authorId) || mockUsers[0];
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      author,
      createdAt: new Date(),
      likes: 0,
      comments: [],
      isAnnouncement,
      images,
    };
    
    // En una implementación real, aquí guardaríamos el post en la base de datos
    mockPosts.unshift(newPost);
    
    if (isAnnouncement) {
      mockAnnouncements.unshift(newPost);
    }
    
    return newPost;
  },
  
  // Dar like a un post
  likePost: async (postId: string): Promise<Post> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const post = mockPosts.find(p => p.id === postId);
    
    if (!post) {
      throw new Error('Post no encontrado');
    }
    
    post.likes += 1;
    
    return post;
  },
  
  // Comentar en un post
  commentOnPost: async (postId: string, content: string, authorId: string): Promise<Comment> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const post = mockPosts.find(p => p.id === postId);
    
    if (!post) {
      throw new Error('Post no encontrado');
    }
    
    const author = mockUsers.find(user => user.id === authorId) || mockUsers[0];
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      author,
      createdAt: new Date(),
      likes: 0,
    };
    
    post.comments.push(newComment);
    
    return newComment;
  },
};
