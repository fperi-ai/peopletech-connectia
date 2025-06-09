"use client";

import { useState, useCallback } from "react";

// Definición de interfaces
export interface AuthResult {
  success: boolean;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null; // Idealmente, definir un tipo User más específico
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

// Hook de autenticación
export function useAuth(): AuthContextType {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  // Función de login simulada
  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      // Simulación de una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulación de validación básica
      if (credentials.email && credentials.password) {
        // En un caso real, aquí se validaría contra un backend
        setIsAuthenticated(true);
        setUser({
          id: "1",
          name: "Usuario Demo",
          email: credentials.email,
          role: "employee"
        });
        
        return {
          success: true
        };
      }
      
      return {
        success: false,
        message: "Credenciales inválidas"
      };
    } catch (error) {
      console.error("Error durante el login:", error);
      return {
        success: false,
        message: "Error al procesar la solicitud"
      };
    }
  }, []);

  // Función de logout
  const logout = useCallback(async (): Promise<void> => {
    // Simulación de una llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
}
