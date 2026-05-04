import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../data/types';
import { Button, Card } from '../components/ui';
import { motion } from 'motion/react';
import { Shield, GraduationCap, Laptop, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(`/dashboard/${selectedRole.toLowerCase()}`);
  };

  const roles = [
    { id: 'STUDENT', label: 'Élève', icon: <GraduationCap size={20} /> },
    { id: 'TEACHER', label: 'Enseignant', icon: <Laptop size={20} /> },
    { id: 'ADMIN', label: 'Admin', icon: <Shield size={20} /> },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <Card className="p-10 bg-white premium-shadow relative overflow-hidden border-gray-100">
          <div className="absolute top-0 left-0 w-full h-2 navy-gradient"></div>
          
          <div className="text-center mb-10">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
            <h1 className="text-4xl font-serif text-navy mb-2">Bienvenue</h1>
            <p className="text-navy/50">Accédez à votre espace sécurisé</p>
          </div>

          <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-medium text-sm ${
                  selectedRole === role.id 
                    ? 'bg-white text-navy shadow-sm' 
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
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" size={20} />
                <input 
                  type="email" 
                  required 
                  placeholder="Email académique" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-navy/20 focus:ring-4 focus:ring-navy/5 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" size={20} />
                <input 
                  type="password" 
                  required 
                  placeholder="Mot de passe" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-navy/20 focus:ring-4 focus:ring-navy/5 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-navy/60 cursor-pointer">
                <input type="checkbox" className="rounded text-navy focus:ring-navy" />
                Se souvenir de moi
              </label>
              <a href="#" className="text-navy hover:underline font-medium">Mot de passe oublié ?</a>
            </div>

            <Button type="submit" variant="navy" className="w-full py-4 text-white uppercase tracking-widest font-bold shadow-lg shadow-navy/20">
              Se Connecter
            </Button>
          </form>

          <p className="text-center mt-8 text-navy/60 text-sm">
            Vous n'avez pas encore de compte ? <a href="/register" className="text-navy font-bold hover:underline">Inscrivez-vous ici</a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
