import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from '../components/ui';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  useEffect(() => {
    if (user && user.role !== 'GUEST') {
      navigate(`/dashboard/${user.role.toLowerCase()}`);
    } else if (user && user.role === 'GUEST') {
      setError(isAr ? "حسابك قيد المراجعة. يرجى الانتظار حتى يتم قبول طلبك من طرف الإدارة." : "Your account is pending approval. Please wait for an admin to verify your credentials.");
      setLoading(false);
    }
  }, [user, navigate, isAr]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = err.message || 'Authentication failed';
      
      if (errorMessage.includes('fetch')) {
        errorMessage = isAr ? "فشل الاتصال بـ Supabase. يرجى التحقق من إعدادات المفاتيح (API Keys)." : "Failed to connect to Supabase. Please check your API Keys in settings.";
      } else if (errorMessage.toLowerCase().includes('invalid login credentials')) {
        errorMessage = isAr ? "بيانات الدخول غير صحيحة. تأكد من البريد الإلكتروني وكلمة المرور." : "Invalid email or password. Please try again.";
      } else if (errorMessage.toLowerCase().includes('email not confirmed')) {
        errorMessage = isAr ? "يرجى تأكيد بريدك الإلكتروني أولاً." : "Please confirm your email address before logging in.";
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-transparent transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="p-10 bg-white/60 backdrop-blur-xl border border-white/40 premium-shadow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-accent"></div>
          
          <div className="text-center mb-10">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
            <h1 className="text-4xl font-serif text-navy mb-2">{t('auth.welcome')}</h1>
            <p className="text-navy/50">{t('auth.access_secure')}</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-4" : "left-4")} size={20} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email_placeholder')} 
                  className={cn(
                    "w-full py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-navy/20 focus:ring-4 focus:ring-navy/5 outline-none transition-all",
                    isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                  )}
                />
              </div>
              <div className="relative">
                <Lock className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-4" : "left-4")} size={20} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password_placeholder')} 
                  className={cn(
                    "w-full py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-navy/20 focus:ring-4 focus:ring-navy/5 outline-none transition-all",
                    isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"
                  )}
                />
              </div>
            </div>

            <div className={cn("flex items-center justify-between text-sm", isAr && "flex-row-reverse text-right")}>
              <label className={cn("flex items-center gap-2 text-navy/60 cursor-pointer", isAr && "flex-row-reverse")}>
                <input type="checkbox" className="rounded text-navy focus:ring-navy" />
                {t('auth.remember_me')}
              </label>
              <button type="button" className="text-navy hover:underline font-medium">{t('auth.forgot_password')}</button>
            </div>

            <Button 
              type="submit" 
              variant="navy" 
              disabled={loading}
              className="w-full py-4 text-white uppercase tracking-widest font-bold shadow-lg shadow-blue-accent/20 bg-blue-accent hover:bg-blue-accent/90"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : t('auth.login_button')}
            </Button>
          </form>

          <p className={cn("text-center mt-8 text-navy/60 text-sm", isAr && "flex flex-row-reverse justify-center gap-2")}>
            {t('auth.no_account')} <a href="/register" className="text-navy font-bold hover:underline">{t('auth.register_here')}</a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
