import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../data/types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  debugAdminLogin?: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await fetchUserData(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await fetchUserData(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string, email: string) => {
    try {
      // 1. Try to fetch from modern profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        setUser({
          id: userId,
          name: profile.name || 'User',
          email: email,
          role: (profile.role as UserRole) || 'GUEST',
          avatar: profile.avatar_url
        });
        return;
      }

      // 2. Fallback: Check legacy tables for existing users
      const { data: teacher } = await supabase.from('teachers').select('*').eq('id', userId).single();
      if (teacher) {
        setUser({ id: userId, name: teacher.name, email, role: 'TEACHER', avatar: teacher.avatar });
        return;
      }

      const { data: student } = await supabase.from('students').select('*').eq('id', userId).single();
      if (student) {
        setUser({ id: userId, name: student.name, email, role: 'STUDENT', avatar: student.avatar });
        return;
      }

      // 3. Fallback: Check admins table
      const { data: admin } = await supabase.from('admins').select('name').eq('id', userId).single();
      if (admin) {
        setUser({ id: userId, name: admin.name, email, role: 'ADMIN' });
        return;
      }

      // 4. Default to GUEST if no profile/legacy data found
      setUser({
        id: userId,
        name: 'Pending User',
        email: email,
        role: 'GUEST'
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Even on error, we might be a GUEST if the session is valid but tables are missing
      setUser({
        id: userId,
        name: 'Guest User',
        email: email,
        role: 'GUEST'
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const debugAdminLogin = () => {
    setLoading(true);
    setUser({
      id: 'debug-admin-id',
      name: 'Temporary Admin (Debug)',
      email: 'admin@debug.com',
      role: 'ADMIN'
    });
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAuthenticated: !!user, debugAdminLogin }}>
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
