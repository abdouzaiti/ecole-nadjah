import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../data/types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // Mock logins
    const mockUsers: Record<UserRole, User> = {
      ADMIN: { id: 'admin1', name: 'Administrateur Nadjah', email: 'admin@nadjah.edu', role: 'ADMIN' },
      TEACHER: { id: 't1', name: 'Dr. Sarah Amine', email: 'sarah@nadjah.edu', role: 'TEACHER', subject: 'Mathématiques' },
      STUDENT: { id: 's1', name: 'Amine Djema', email: 'amine@stud.edu', role: 'STUDENT', level: 'Secondaire' },
      GUEST: { id: 'g1', name: 'Visiteur', email: 'guest@web.com', role: 'GUEST' }
    };
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
