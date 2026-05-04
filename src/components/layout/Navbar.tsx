import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';
import { GraduationCap, Menu, X, User, Languages } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ];

  const navLinks = [
    { name: t('nav.home'), path: '#' },
    { name: t('nav.programs'), path: '#programs' },
    { name: t('nav.about'), path: '#about' },
    { name: t('nav.contact'), path: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="École Nadjah Logo" className="w-full h-full object-contain shadow-sm rounded-lg" />
            </div>
            <div className={i18n.language === 'ar' ? 'text-right' : 'text-left'}>
              <span className="text-xl font-serif font-bold text-navy tracking-tight block leading-none">{t('school_name')}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-accent font-bold">{t('tagline')}</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
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
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-navy/70 hover:text-navy transition-colors"
              >
                <Languages size={18} />
                <span className="uppercase">{i18n.language}</span>
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 bg-white shadow-xl rounded-xl border border-gray-100 p-2 w-32"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                          i18n.language === lang.code ? "bg-blue-accent/10 text-blue-accent font-bold" : "hover:bg-gray-50 text-navy"
                        )}
                        style={{ direction: lang.code === 'ar' ? 'rtl' : 'ltr' }}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to={`/dashboard/${user?.role.toLowerCase()}`}>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <User size={16} />
                    {t('nav.my_dashboard')}
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={logout}>
                   {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button size="sm" variant="ghost">{t('login')}</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="navy">{t('register_now')}</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => changeLanguage(i18n.language === 'ar' ? 'fr' : 'ar')}
              className="text-xs font-bold uppercase text-blue-accent"
            >
              {i18n.language === 'ar' ? 'FR' : 'AR'}
            </button>
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
                  <Button variant="outline" className="w-full">{t('login')}</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="navy" className="w-full">{t('register_now')}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
