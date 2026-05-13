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
      // Don't overwrite debug session
      if (user?.id === 'debug-admin-id') {
        setLoading(false);
        return;
      }

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
      // Skip if in debug mode
      if (user?.id === 'debug-admin-id') return;

      if (session) {
        await fetchUserData(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id]);

  const fetchUserData = async (userId: string, email: string) => {
    try {
      // Use centralized profiles table
      const { data: profile, error: profileError } = await supabase
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
      } else {
        // Fallback if profile doesn't exist yet
        setUser({
          id: userId,
          name: 'Pending User',
          email: email,
          role: 'GUEST'
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const debugAdminLogin = () => {
    setUser({
      id: 'debug-admin-id',
      name: 'Temporary Admin (Debug)',
      email: 'admin@debug.com',
      role: 'ADMIN'
    });
    setLoading(false);
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
