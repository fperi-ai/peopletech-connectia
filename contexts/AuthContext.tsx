
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../constants';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  setFirstLoginComplete: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user (e.g., from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = DEMO_USERS.find(u => u.email === email && u.password === pass);
    if (user) {
      const userToStore = { ...user };
      // For demo, don't store password in context or localStorage
      delete userToStore.password; 
      
      const firstLoginStatus = localStorage.getItem(`firstLogin_${user.id}`);
      if (firstLoginStatus === null) { // If no record, it's their first login conceptually
        userToStore.firstLogin = true;
      } else {
        userToStore.firstLogin = false;
      }

      setCurrentUser(userToStore);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const updateUser = useCallback((updatedUserPartial: Partial<User>) => {
    setCurrentUser(prevUser => {
      if (prevUser) {
        const newUser = { ...prevUser, ...updatedUserPartial };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return newUser;
      }
      return null;
    });
  }, []);

  const setFirstLoginComplete = useCallback(() => {
    if (currentUser) {
        const updatedUser = { ...currentUser, firstLogin: false };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem(`firstLogin_${currentUser.id}`, 'completed');
    }
  }, [currentUser]);


  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout, updateUser, setFirstLoginComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
