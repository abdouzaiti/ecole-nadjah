import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../../components/ui';
import { Plus, Heart, ChevronRight, Search, Play, Star, Video, BookOpen, GraduationCap, Clock } from 'lucide-react';
import { MOCK_COURSES, MOCK_LIVES } from '../../data/mock';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isAr = i18n.language === 'ar';

  const sidebarItems = [
    { name: t('dashboard.sidebar.library'), icon: BookOpen, path: '/dashboard/student' },
    { name: t('dashboard.sidebar.live'), icon: Video, path: '#' },
    { name: t('dashboard.sidebar.notes'), icon: Star, path: '#' },
    { name: t('dashboard.sidebar.resources'), icon: GraduationCap, path: '#' },
  ];

  const subjects = [
    t('subjects.math'), 
    t('subjects.physics'), 
    t('subjects.philosophy'), 
    t('subjects.history'), 
    t('subjects.arabic'), 
    t('subjects.french'), 
    t('subjects.english')
  ];

  return (
    <DashboardLayout items={sidebarItems}>
       <div className="space-y-12 pb-12">
          {/* Header & Categories */}
          <div className="space-y-6">
             <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
               <div className={cn(isAr && "text-right")}>
                  <h1 className="text-3xl font-serif text-navy font-bold">{t('dashboard.student.welcome')}, {user?.name.split(' ')[0]}</h1>
                  <p className="text-navy/50 italic font-sans">{t('dashboard.student.motivation')}</p>
               </div>
               <div className={cn("flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100", isAr && "flex-row-reverse")}>
                  <div className="w-8 h-8 rounded-full bg-blue-accent/10 text-blue-accent flex items-center justify-center font-bold text-xs">
                     12
                  </div>
                  <span className="text-sm font-bold text-navy">{t('dashboard.student.completed_courses')}</span>
               </div>
             </div>

             <div className={cn("flex gap-3 overflow-x-auto pb-4 no-scrollbar", isAr && "flex-row-reverse")}>
                {[t('all'), ...subjects].map((subject, i) => (
                  <button 
                    key={i} 
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      i === 0 ? 'bg-navy text-white shadow-lg' : 'bg-white text-navy/60 hover:bg-navy/5 border border-gray-100'
                    )}
                  >
                    {subject}
                  </button>
                ))}
             </div>
          </div>

          {/* Continue Watching Section - Hero Style */}
          <section className="space-y-6">
             <div className={cn("flex justify-between items-end", isAr && "flex-row-reverse")}>
                <h2 className="text-2xl font-serif text-navy font-bold">{t('dashboard.student.continue_watching')}</h2>
                <Link to="/replays" className={cn("text-blue-accent text-sm font-bold flex items-center gap-1 hover:translate-x-1 transition-transform", isAr && "flex-row-reverse hover:-translate-x-1")}>
                   {t('dashboard.student.see_all')} {isAr ? <ChevronRight size={16} className="rotate-180" /> : <ChevronRight size={16} />}
                </Link>
             </div>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <div className="relative aspect-[21/9] rounded-3xl overflow-hidden group shadow-2xl bg-navy-gradient border border-white/5">
                   <div className="absolute inset-0 bg-navy-gradient"></div>
                   <div className={cn("absolute top-0 w-1/2 h-full bg-blue-accent/5 blur-2xl translate-y-0", isAr ? "left-0 -skew-x-12 -translate-x-1/3" : "right-0 skew-x-12 translate-x-1/3")}></div>
                   
                   <div className={cn("absolute bottom-0 p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-end gap-6 relative z-10", isAr ? "right-0 flex-row-reverse" : "left-0")}>
                      <div className={cn("max-w-2xl", isAr && "text-right")}>
                         <div className={cn("flex items-center gap-3 mb-4", isAr && "flex-row-reverse")}>
                            <Badge variant="accent">{t('subjects.math')}</Badge>
                            <span className="text-white/40 text-sm">• 45 min {t('dashboard.student.remaining')}</span>
                         </div>
                         <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 line-clamp-1 font-bold">{t('dashboard.placeholders.course_title')}</h3>
                         <p className="text-white/60 text-lg line-clamp-2 mb-6 hidden md:block font-sans">
                            {t('dashboard.placeholders.course_desc')}
                         </p>
                         <div className={cn("flex gap-4", isAr && "flex-row-reverse")}>
                            <Link to="/replays">
                              <Button variant="accent" className={cn("flex items-center gap-2 px-8 py-3", isAr && "flex-row-reverse")}>
                                <Play size={20} fill="currentColor" className={isAr && "rotate-180"} /> {t('dashboard.student.resume_course')}
                              </Button>
                            </Link>
                            <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-12 h-12 p-0">
                               <Plus size={24} />
                            </Button>
                         </div>
                      </div>
                      <div className={cn("hidden lg:block w-48", isAr ? "text-left" : "text-right")}>
                         <div className={cn("text-white/40 text-xs font-bold uppercase mb-2", isAr && "text-right")}>{t('dashboard.student.progression')}</div>
                         <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={cn("h-full bg-blue-accent w-[65%]", isAr && "float-right")}></div>
                         </div>
                         <div className={cn("text-blue-accent font-bold text-xl mt-2 tracking-tighter", isAr && "text-right")}>65%</div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </section>

          {/* Newest Uploads - Netflix Rows */}
          <section className="space-y-6">
             <div className={cn("flex justify-between items-end", isAr && "flex-row-reverse")}>
                <h2 className={cn("text-2xl font-serif text-navy font-bold", isAr && "text-right")}>{t('dashboard.student.new_uploads')}</h2>
                <div className={cn("flex gap-2", isAr && "flex-row-reverse")}>
                   <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-white"><ChevronRight size={18} className={isAr ? "" : "rotate-180"} /></button>
                   <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-navy hover:bg-white"><ChevronRight size={18} className={isAr ? "rotate-180" : ""} /></button>
                </div>
             </div>
             
             <div className={cn("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6", isAr && "rtl")}>
                {MOCK_COURSES.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                     <div className="group space-y-3 cursor-pointer">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md group-hover:shadow-xl transition-all duration-300">
                           <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all flex items-center justify-center">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                                 <Play size={24} fill="currentColor" className={isAr ? "rotate-180" : ""} />
                              </div>
                           </div>
                           <div className={cn("absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity", isAr ? "left-2" : "right-2")}>
                              <button className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:text-red-400"><Heart size={16} /></button>
                           </div>
                        </div>
                        <div className={cn("px-1", isAr && "text-right")}>
                           <h4 className="font-bold text-navy text-sm line-clamp-1 group-hover:text-blue-accent transition-colors">{course.title}</h4>
                           <div className={cn("flex items-center justify-between mt-1", isAr && "flex-row-reverse")}>
                             <span className="text-[10px] text-navy/40 font-bold uppercase">{course.subject}</span>
                             <span className="text-[10px] text-blue-accent font-bold">{course.duration}</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Upcoming Live - Special Card */}
          <section className="space-y-6">
             <h2 className={cn("text-2xl font-serif text-navy font-bold", isAr && "text-right")}>{t('dashboard.student.upcoming_live')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MOCK_LIVES.map((live, i) => (
                  <Card key={i} className={cn("p-0 border-none bg-white shadow-xl flex flex-col sm:flex-row overflow-hidden group", isAr && "sm:flex-row-reverse")}>
                     <div className="sm:w-1/3 aspect-video sm:aspect-auto relative overflow-hidden">
                        <img 
                           src={i === 0 ? "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop" : "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=400&fit=crop"} 
                           alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-navy/20"></div>
                        <div className={cn("absolute top-4", isAr ? "right-4" : "left-4")}>
                           <div className={cn(
                               "px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter",
                               live.status === 'LIVE' ? "bg-red-500 animate-pulse" : "bg-blue-accent"
                             )}>
                               {live.status === 'LIVE' ? t('dashboard.student.live_now') : t('dashboard.student.coming_soon')}
                           </div>
                        </div>
                     </div>
                     <div className={cn("p-6 sm:w-2/3 flex flex-col justify-center", isAr && "text-right")}>
                        <span className="text-xs font-bold text-blue-accent uppercase tracking-widest mb-2">{live.subject}</span>
                        <h4 className="text-xl font-serif text-navy mb-4 font-bold">{live.title}</h4>
                        <div className={cn("flex items-center justify-between", isAr && "flex-row-reverse")}>
                           <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-navy font-bold text-xs ring-2 ring-gray-100 shrink-0">
                                 {live.teacherName.charAt(0)}
                              </div>
                              <span className="text-xs text-navy/60 font-medium">{live.teacherName}</span>
                           </div>
                           <Link to={`/live/${live.id}`}>
                              <Button variant={live.status === 'LIVE' ? 'accent' : 'outline'} size="sm">
                                 {live.status === 'LIVE' ? t('dashboard.student.joining_live') : t('dashboard.student.reminder')}
                              </Button>
                           </Link>
                        </div>
                     </div>
                  </Card>
                ))}
             </div>
          </section>
       </div>
    </DashboardLayout>
  );
}
