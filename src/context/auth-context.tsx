"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, type User } from "@/services/auth-service";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar la página
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();
      
      setUser(currentUser);
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.user && response.token) {
        // Guardar información de autenticación en localStorage
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error || "Error al iniciar sesión" 
      };
    } catch (error) {
      return { 
        success: false, 
        error: "Error inesperado al iniciar sesión" 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  
  return context;
}
