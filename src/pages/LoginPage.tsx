import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../data/types';
import { Button, Card } from '../components/ui';
import { motion } from 'motion/react';
import { Shield, GraduationCap, Laptop, Lock, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(`/dashboard/${selectedRole.toLowerCase()}`);
  };

  const roles = [
    { id: 'STUDENT', label: t('auth.roles.student'), icon: <GraduationCap size={20} /> },
    { id: 'TEACHER', label: t('auth.roles.teacher'), icon: <Laptop size={20} /> },
    { id: 'ADMIN', label: t('auth.roles.admin'), icon: <Shield size={20} /> },
  ];

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

          <div className={cn("flex gap-2 p-1 bg-white/40 rounded-2xl mb-8 border border-white/20", isAr && "flex-row-reverse")}>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-medium text-sm ${
                  selectedRole === role.id 
                    ? 'bg-white text-blue-accent shadow-md' 
                    : 'text-navy/40 hover:text-navy/60'
                }`}
              >
                {role.icon}
                {role.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-4" : "left-4")} size={20} />
                <input 
                  type="email" 
                  required 
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
              <a href="#" className="text-navy hover:underline font-medium">{t('auth.forgot_password')}</a>
            </div>

            <Button type="submit" variant="navy" className="w-full py-4 text-white uppercase tracking-widest font-bold shadow-lg shadow-blue-accent/20 bg-blue-accent hover:bg-blue-accent/90">
              {t('auth.login_button')}
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
