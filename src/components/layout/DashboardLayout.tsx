import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Video, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItem {
  name: string;
  icon: any;
  path: string;
}

export function DashboardLayout({ children, items }: { children: ReactNode, items: SidebarItem[] }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col w-72 bg-navy border-r border-white/5 transition-all duration-300 relative z-30"
      )}>
        <div className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain shadow-sm rounded-lg" />
            </div>
            <span className="text-xl font-serif font-bold text-white tracking-tight">Nadjah Portal</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 mt-8 space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group",
                  isActive 
                    ? "bg-blue-accent/10 text-blue-accent" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-blue-accent" : "group-hover:text-white")} />
                {item.name}
                {isActive && <motion.div layoutId="activePointer" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <div className="px-4 py-4 mb-4 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-accent/20 flex items-center justify-center text-blue-accent font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                <p className="text-xs text-white/40 truncate uppercase tracking-widest">{user?.role}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium text-sm group"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-navy">
               <Menu />
             </button>
             <div className="relative w-full hidden sm:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Rechercher des ressources, cours, élèves..." 
                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none text-sm transition-all"
               />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 text-gray-400 hover:text-navy hover:bg-gray-50 rounded-xl relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-10 w-px bg-gray-100 mx-2 hidden sm:block"></div>
             <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                   <p className="text-sm font-bold text-navy leading-none">{user?.name}</p>
                   <p className="text-[10px] uppercase font-bold text-blue-accent tracking-widest mt-1">{user?.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full navy-gradient border-2 border-white overflow-hidden flex items-center justify-center text-white font-bold">
                   <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=0A1D37&color=fff`} alt="" />
                </div>
             </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-grow p-4 lg:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               onClick={() => setIsMobileMenuOpen(false)}
               className="absolute inset-0 bg-navy/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="absolute top-0 left-0 bottom-0 w-72 bg-navy p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                   <span className="text-xl font-serif text-white font-bold">Nadjah Portal</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50"><X /></button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-xl text-white/50 font-medium",
                      location.pathname === item.path && "bg-blue-accent/10 text-blue-accent"
                    )}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
