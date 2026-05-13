import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../data/types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
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
      // First check if it's a teacher
      const { data: teacherData } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', userId)
        .single();

      if (teacherData) {
        setUser({
          id: userId,
          name: teacherData.name,
          email: email,
          role: 'TEACHER',
          avatar: teacherData.avatar
        });
        return;
      }

      // Then check if it's a student
      const { data: studentData } = await supabase
        .from('students')
        .select('*')
        .eq('id', userId)
        .single();

      if (studentData) {
        setUser({
          id: userId,
          name: studentData.name,
          email: email,
          role: 'STUDENT',
          avatar: studentData.avatar
        });
        return;
      }

      // Check for Admin
      const { data: adminData } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .single();

      if (adminData) {
        setUser({
          id: userId,
          name: adminData.full_name,
          email: email,
          role: 'ADMIN'
        });
        return;
      }

      // If logged in but no approved profile found in students/teachers/admins
      setUser({
        id: userId,
        name: 'Pending User',
        email: email,
        role: 'GUEST'
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAuthenticated: !!user && user.role !== 'GUEST' }}>
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
