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
    { name: t('nav.home'), path: '/', hash: '' },
    { name: t('nav.programs'), path: '/', hash: '#programs' },
    { name: t('nav.about'), path: '/', hash: '#about' },
    { name: t('nav.contact'), path: '/', hash: '#contact' },
  ];

  const handleLinkClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    const isHomePage = location.pathname === '/';
    
    if (link.hash && isHomePage) {
      e.preventDefault();
      setIsOpen(false);
      
      const targetHash = link.hash;
      // Wait for menu animation to start closing before scrolling
      setTimeout(() => {
        const element = document.querySelector(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else if (link.path === '/' && !link.hash && isHomePage) {
       e.preventDefault();
       setIsOpen(false);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
       // For normal navigation, just close the menu
       setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
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
                  href={link.hash ? `${link.path}${link.hash}` : link.path}
                  onClick={(e) => handleLinkClick(link, e)}
                  className="text-sm font-medium text-navy/70 hover:text-navy transition-colors relative group cursor-pointer"
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
                aria-expanded={langMenuOpen}
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
                  <Button size="sm" variant="navy" style={{ backgroundColor: '#1b1ba3' }}>{t('register_now')}</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => changeLanguage(i18n.language === 'ar' ? 'fr' : 'ar')}
              className="w-12 h-12 flex items-center justify-center text-xs font-bold uppercase text-blue-accent active:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              {i18n.language === 'ar' ? 'FR' : 'AR'}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-12 h-12 flex items-center justify-center text-navy active:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            <div className="px-4 pt-2 pb-8 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.hash ? `${link.path}${link.hash}` : link.path}
                  onClick={(e) => handleLinkClick(link, e)}
                  className="block px-4 py-5 text-xl font-medium text-navy hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-all cursor-pointer touch-manipulation relative z-10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full py-6 text-lg">{t('login')}</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="navy" size="lg" className="w-full py-6 text-lg" style={{ backgroundColor: '#1b1ba3' }}>{t('register_now')}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
