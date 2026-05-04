import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../../components/ui';
import { Video, Calendar, BookOpen, Users, Plus, Play, MoreVertical } from 'lucide-react';
import { MOCK_COURSES, MOCK_LIVES } from '../../data/mock';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export default function TeacherDashboard() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const sidebarItems = [
    { name: t('dashboard.teacher.sidebar.my_space'), icon: Video, path: '/dashboard/teacher' },
    { name: t('dashboard.teacher.sidebar.my_courses'), icon: BookOpen, path: '#' },
    { name: t('dashboard.teacher.sidebar.schedule'), icon: Calendar, path: '#' },
    { name: t('dashboard.teacher.sidebar.students'), icon: Users, path: '#' },
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="space-y-8">
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
          <div className={cn(isAr && "text-right")}>
            <h1 className="text-3xl font-serif text-navy font-bold">{t('dashboard.teacher.welcome')}</h1>
            <p className="text-navy/50 font-sans">{t('dashboard.teacher.subtitle')}</p>
          </div>
          <div className={cn("flex gap-3", isAr && "flex-row-reverse")}>
             <Button variant="outline" className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                <Calendar size={18} /> {t('dashboard.teacher.plan_session')}
             </Button>
             <Button variant="accent" className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                <Plus size={18} /> {t('dashboard.teacher.new_course')}
             </Button>
          </div>
        </div>

        {/* Live Now Card */}
        <Card className="bg-navy overflow-hidden relative border-none">
           <div className={cn("absolute top-0 p-8 opacity-10 pointer-events-none", isAr ? "left-0" : "right-0")}>
              <Video size={200} className="text-white" />
           </div>
           <div className={cn("relative z-10 p-8 flex flex-col md:flex-row justify-between items-center gap-8", isAr && "flex-row-reverse")}>
              <div className={cn("max-w-xl text-center md:text-left", isAr && "md:text-right")}>
                 <Badge variant="accent">{t('dashboard.teacher.live_detected')}</Badge>
                 <h2 className="text-3xl font-serif text-white mt-4 mb-4 font-bold">{t('dashboard.placeholders.live_title_math')}</h2>
                 <p className="text-white/60 mb-6 font-sans">
                    {t('dashboard.placeholders.live_desc_math')}
                 </p>
                 <div className={cn("flex gap-4 justify-center md:justify-start", isAr && "md:justify-end flex-row-reverse")}>
                    <Button variant="accent" className={cn("flex items-center gap-2 px-8", isAr && "flex-row-reverse")}>
                       <Play size={18} fill="currentColor" className={isAr && "rotate-180"} /> {t('dashboard.teacher.launch_live')}
                    </Button>
                    <div className={cn("flex items-center gap-2 text-white/40 text-sm", isAr && "flex-row-reverse")}>
                       <Users size={16} /> 124 {t('dashboard.teacher.waiting_students')}
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-64 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                  <div className="text-4xl font-serif text-white font-bold mb-2">00:15</div>
                  <div className="text-xs uppercase tracking-widest text-white/40">{t('dashboard.teacher.rec_duration')}</div>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Library section */}
           <div className="lg:col-span-2 space-y-6">
              <div className={cn("flex justify-between items-center", isAr && "flex-row-reverse")}>
                 <h2 className={cn("text-xl font-serif text-navy font-bold", isAr && "text-right")}>{t('dashboard.teacher.recent_courses')}</h2>
                 <Button variant="ghost" className="text-sm">{t('dashboard.teacher.manage_all')}</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_COURSES.slice(0, 2).map((course, i) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                       <Card className="p-0 overflow-hidden group">
                          <div className="aspect-video relative overflow-hidden">
                             <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                             <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors"></div>
                             <div className={cn("absolute top-3", isAr ? "right-3" : "left-3")}>
                                <Badge variant="accent">{course.subject}</Badge>
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="accent" size="sm" className="rounded-full w-12 h-12 p-0"><Play size={20} fill="currentColor" className={isAr && "rotate-180"} /></Button>
                             </div>
                          </div>
                          <div className={cn("p-5", isAr && "text-right")}>
                             <h4 className="font-serif text-lg text-navy mb-2 line-clamp-1 font-bold">{course.title}</h4>
                             <div className={cn("flex justify-between items-center text-xs text-navy/40", isAr && "flex-row-reverse")}>
                                <span>{course.duration}</span>
                                <span>{course.level}</span>
                             </div>
                          </div>
                       </Card>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Schedule section */}
           <div className="space-y-6">
              <div className={cn("flex justify-between items-center", isAr && "flex-row-reverse")}>
                 <h2 className={cn("text-xl font-serif text-navy font-bold", isAr && "text-right")}>{t('dashboard.teacher.today')}</h2>
              </div>
              <div className="space-y-4">
                 {MOCK_LIVES.map((live, i) => (
                    <Card key={live.id} className={cn("p-4 flex gap-4 transition-colors", isAr ? "flex-row-reverse border-r-4 border-r-blue-accent border-l-0" : "border-l-4 border-l-blue-accent border-r-0")}>
                       <div className={cn("shrink-0 text-center px-3 border-gray-100", isAr ? "border-l" : "border-r")}>
                          <div className="text-xs font-bold text-navy/40 uppercase font-sans">Mai</div>
                          <div className="text-2xl font-serif text-navy font-bold">04</div>
                       </div>
                       <div className={cn(isAr && "text-right flex-grow")}>
                          <h5 className="font-bold text-navy text-sm">{live.title}</h5>
                          <p className="text-xs text-navy/40 mt-1">{live.subject} • {live.level}</p>
                          <div className={cn("flex items-center gap-2 mt-3", isAr && "flex-row-reverse")}>
                             <Badge variant={live.status === 'LIVE' ? 'red' : 'navy'}>{live.status === 'LIVE' ? t('dashboard.student.live_now') : t('dashboard.student.coming_soon')}</Badge>
                             <span className="text-[10px] text-navy/40 font-bold font-mono">14:30</span>
                          </div>
                       </div>
                    </Card>
                 ))}
              </div>
              <Card className="bg-blue-accent/5 border-blue-accent/10 p-6 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-blue-accent/10 text-blue-accent rounded-full flex items-center justify-center mb-4">
                    <Users size={24} />
                 </div>
                 <h4 className="font-serif text-navy mb-2 font-bold">{t('dashboard.teacher.pedagogical_tip')}</h4>
                 <p className="text-xs text-navy/60 leading-relaxed font-sans">
                    {t('dashboard.teacher.tip_desc')}
                 </p>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
