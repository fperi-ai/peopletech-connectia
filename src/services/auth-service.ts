// Tipos para el servicio de autenticación
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
  department?: string;
  joinDate?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Tipo extendido para incluir contraseña en los usuarios demo
interface DemoUser extends User {
  password: string;
}

// Usuarios demo para login rápido con sus contraseñas
export const demoUsers: DemoUser[] = [
  {
    id: '1',
    name: 'Ana Admin',
    email: 'ana.admin@inditex.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: '/avatars/admin.png',
    department: 'Tecnología',
    joinDate: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Mario Manager',
    email: 'mario.manager@inditex.com',
    password: 'manager123',
    role: 'manager' as const,
    avatar: '/avatars/manager.png',
    department: 'Innovación Digital',
    joinDate: new Date('2023-03-10')
  },
  {
    id: '3',
    name: 'Eva Empleado',
    email: 'eva.empleado@inditex.com',
    password: 'empleado123',
    role: 'employee' as const,
    avatar: '/avatars/employee.png',
    department: 'Desarrollo Frontend',
    joinDate: new Date('2023-06-22')
  },
];

// Versión pública de los usuarios (sin contraseñas)
export const publicDemoUsers: User[] = demoUsers.map(({ password, ...user }) => user);

// Servicio de autenticación mock
export const authService = {
  // Función para iniciar sesión
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Verificamos si las credenciales corresponden a algún usuario demo
    const user = demoUsers.find((u) => u.email === credentials.email);
    
    if (user && credentials.password === user.password) {
      // Eliminamos la contraseña antes de devolver el usuario
      const { password, ...userWithoutPassword } = user;
      
      // Guardamos el token y el usuario en localStorage
      const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        token,
      };
    }
    
    return {
      success: false,
      error: 'Credenciales incorrectas. ¿Olvidaste tu contraseña? Prueba con una de las cuentas demo 😜',
    };
  },
  
  // Función para cerrar sesión
  logout: async (): Promise<void> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 300));
    // En una implementación real, aquí invalidaríamos el token
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  
  // Función para recuperar contraseña
  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Verificamos si el email corresponde a algún usuario demo
    const userExists = demoUsers.some((u) => u.email === email);
    
    if (userExists) {
      return {
        success: true,
        message: 'Se ha enviado un correo con instrucciones para restablecer tu contraseña. Revisa tu bandeja de entrada (bueno, en realidad no, esto es una demo 😉).',
      };
    }
    
    return {
      success: false,
      message: '¡Ups! No encontramos ninguna cuenta con ese correo. ¿Seguro que trabajas aquí? 🧐',
    };
  },
  
  // Función para verificar si el usuario está autenticado
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },
  
  // Función para obtener el usuario actual
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      return null;
    }
  },
};
