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
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session retrieval error:', error);
          if (error.message.includes('Refresh Token Not Found') || error.message.includes('invalid_grant')) {
            console.warn('Session is invalid, forcing sign out...');
            await supabase.auth.signOut();
          }
        }

        if (session) {
          await fetchUserData(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization caught error:', err);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
        return;
      }

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
    if (!userId) {
      setLoading(false);
      return;
    }
    
    console.log('--- START fetchUserData ---');
    console.log('User ID:', userId);
    console.log('Email:', email);
    
    setLoading(true);
    
    // Failsafe timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('fetchUserData failsafe timeout!');
      setLoading(false);
    }, 10000);

    try {
      // 1. Try profiles table
      console.log('Step 1: Profiles table check');
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profile && profile.role && profile.role !== 'GUEST') {
        console.log('Success: Found in profiles', profile.role);
        setUser({
          id: userId,
          name: profile.name || email.split('@')[0],
          email: email,
          role: profile.role as UserRole,
          avatar: profile.avatar_url
        });
        return;
      }

      // 2. Fallback: Teachers
      console.log('Step 2: Teachers table check');
      const { data: teacher } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (teacher) {
        console.log('Success: Found in teachers');
        setUser({
          id: userId,
          name: teacher.name,
          email: email,
          role: 'TEACHER',
          avatar: teacher.avatar
        });
        return;
      }

      // 3. Fallback: Students
      console.log('Step 3: Students table check');
      const { data: student } = await supabase
        .from('students')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (student) {
        console.log('Success: Found in students');
        setUser({
          id: userId,
          name: student.name,
          email: email,
          role: 'STUDENT',
          avatar: student.avatar
        });
        return;
      }

      // 4. Fallback: Admins
      console.log('Step 4: Admins table check');
      const { data: admin } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (admin) {
        console.log('Success: Found in admins');
        setUser({
          id: userId,
          name: admin.name,
          email: email,
          role: 'ADMIN'
        });
        return;
      }

      // 5. Default GUEST
      console.log('Final fallback: Guest');
      setUser({
        id: userId,
        name: profile?.name || email.split('@')[0] || 'User',
        email: email,
        role: 'GUEST'
      });
    } catch (error) {
      console.error('fetchUserData error:', error);
      setUser({
        id: userId,
        name: 'User',
        email: email,
        role: 'GUEST'
      });
    } finally {
      console.log('--- END fetchUserData ---');
      clearTimeout(timeoutId);
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
