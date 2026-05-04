import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';
import { GraduationCap, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Programmes', path: '/#programs' },
    { name: 'À Propos', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="École Nadjah Logo" className="w-full h-full object-contain shadow-sm rounded-lg" />
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-navy tracking-tight block leading-none">École Nadjah</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-accent font-bold">Excellence & Vision</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.path}
                className="text-sm font-medium text-navy/70 hover:text-navy transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to={`/dashboard/${user?.role.toLowerCase()}`}>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <User size={16} />
                    Mon Tableau
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={logout}>Déconnexion</Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button size="sm" variant="ghost">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="navy">S'inscrire</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-navy">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-navy hover:bg-gray-50 rounded-xl"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Connexion</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="navy" className="w-full">S'inscrire</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
