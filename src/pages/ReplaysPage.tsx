import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../components/ui';
import { BookOpen, Search, Filter, Play, Clock, User, Download, Share2 } from 'lucide-react';
import { MOCK_COURSES } from '../data/mock';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function ReplaysPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  const [activeFilter, setActiveFilter] = useState('all');
  
  const sidebarItems = [
    { name: t('dashboard.sidebar.library'), icon: BookOpen, path: '/dashboard/student' },
  ];

  const filters = [
    { id: 'all', label: t('replays.filters.all') },
    { id: 'recent', label: t('replays.filters.recent') },
    { id: 'popular', label: t('replays.filters.popular') },
    { id: 'favorites', label: t('replays.filters.favorites') }
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="space-y-8">
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-6", isAr && "flex-row-reverse")}>
          <div className={cn(isAr && "text-right")}>
            <h1 className="text-3xl font-serif text-navy font-bold">{t('replays.title')}</h1>
            <p className="text-navy/50 font-sans">{t('replays.subtitle')}</p>
          </div>
          <div className={cn("flex gap-4 w-full md:w-auto", isAr && "flex-row-reverse")}>
             <div className="relative flex-grow md:w-64">
                <Search className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400", isAr ? "right-3" : "left-3")} size={18} />
                <input 
                  type="text" 
                  placeholder={t('replays.search_placeholder')} 
                  className={cn("w-full py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-navy outline-none text-sm transition-all shadow-sm", isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left")}
                />
             </div>
             <Button variant="outline" className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                <Filter size={18} /> {t('dashboard.admin.table.actions')}
             </Button>
          </div>
        </div>

        <div className={cn("flex gap-3 h-10", isAr && "flex-row-reverse")}>
          {filters.map(f => (
            <button 
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "px-4 py-1 rounded-lg text-sm font-medium transition-all",
                activeFilter === f.id ? "bg-navy text-white shadow-md" : "bg-white text-navy/60 hover:bg-gray-50 border border-gray-100"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
           {MOCK_COURSES.map((course, i) => (
             <motion.div
               key={course.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
                <Card className="p-0 overflow-hidden group">
                   <div className="aspect-video relative overflow-hidden">
                      <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-16 h-16 bg-blue-accent text-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                            <Play size={32} fill="currentColor" />
                         </div>
                      </div>
                      <div className="absolute bottom-3 right-3 py-1 px-2 bg-black/60 backdrop-blur-md rounded-md text-[10px] text-white font-bold">
                         {course.duration}
                      </div>
                   </div>
                   <div className={cn("p-6", isAr && "text-right")}>
                      <div className={cn("flex justify-between items-start mb-4", isAr && "flex-row-reverse")}>
                         <Badge variant="accent">{course.subject}</Badge>
                         <div className={cn("flex gap-2", isAr && "flex-row-reverse")}>
                            <button className="text-navy/20 hover:text-blue-accent transition-colors"><Share2 size={16} /></button>
                            <button className="text-navy/20 hover:text-navy transition-colors"><Download size={16} /></button>
                         </div>
                      </div>
                      <h3 className="text-xl font-serif text-navy mb-4 group-hover:text-blue-accent transition-colors line-clamp-1">{course.title}</h3>
                      <div className="flex flex-col gap-3">
                         <div className={cn("flex items-center gap-2 text-sm text-navy/60", isAr && "flex-row-reverse")}>
                            <User size={16} className="text-blue-accent" />
                            <span>{course.teacherName}</span>
                         </div>
                         <div className={cn("flex items-center gap-2 text-sm text-navy/60", isAr && "flex-row-reverse")}>
                            <Clock size={16} className="text-blue-accent" />
                            <span>{t('replays.published_on')} {course.date}</span>
                         </div>
                      </div>
                      <div className={cn("mt-6 pt-6 border-t border-gray-100 flex justify-between items-center", isAr && "flex-row-reverse")}>
                         <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">{course.level}</span>
                         <Button variant="ghost" size="sm" className={cn("p-0 hover:text-blue-accent group/btn flex items-center gap-1 font-bold text-xs uppercase tracking-widest", isAr && "flex-row-reverse")}>
                            {t('replays.watch')} <Play size={12} fill="currentColor" className={cn("group-hover/btn:translate-x-1 transition-transform", isAr && "rotate-180 group-hover/btn:-translate-x-1")} />
                         </Button>
                      </div>
                   </div>
                </Card>
             </motion.div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
