import React, { useState, useEffect } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Video,
  Calendar,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

export default function Overview() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    // In a real app, these would come from Supabase aggregate queries or a summary table
    const mockStats = [
      { label: t('dashboard.admin.stats.total_students'), value: '1,248', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: t('dashboard.admin.stats.active_courses'), value: '84', change: '+5', icon: BookOpen, color: 'text-blue-accent', bg: 'bg-blue-accent/10' },
      { label: t('dashboard.admin.stats.teachers'), value: '42', change: '0', icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-50' },
      { label: t('dashboard.admin.stats.revenue'), value: '2.4M', change: '+18.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];
    setStats(mockStats);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h1 className="text-3xl font-serif text-navy font-bold">{t('dashboard.admin.welcome')}</h1>
          <p className="text-navy/40 font-sans tracking-wide mt-1">{t('dashboard.admin.subtitle')}</p>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="sm" className="hidden sm:flex border-gray-100">
             <Calendar size={18} className={isAr ? "ml-2" : "mr-2"} />
             {isAr ? 'تخصيص النطاق' : 'Custom Range'}
           </Button>
           <Button variant="accent" size="sm" className="shadow-lg shadow-blue-accent/20">
             {isAr ? 'تحميل التقرير' : 'Download Report'}
           </Button>
        </div>
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", isAr && "flex-row-reverse")}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group">
              <div className={cn("flex justify-between items-start mb-6", isAr && "flex-row-reverse")}>
                <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500", stat.bg, stat.color)}>
                   <stat.icon size={24} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold",
                  stat.change.startsWith('+') ? "text-green-600" : "text-gray-400"
                )}>
                  {stat.change}
                  {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <div className={cn("text-3xl font-bold text-navy", isAr && "text-right")}>{stat.value}</div>
              <div className={cn("text-xs font-bold text-navy/30 uppercase tracking-[0.15em] mt-2", isAr && "text-right font-sans")}>{stat.label}</div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] text-navy/30 font-bold uppercase tracking-widest">{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                 <ArrowUpRight size={14} className="text-blue-accent" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-0 overflow-hidden shadow-2xl border-none">
           <div className={cn("p-6 border-b border-gray-100 flex justify-between items-center bg-white", isAr && "flex-row-reverse")}>
              <div className={cn("flex items-center gap-3", isAr && "flex-row-reverse")}>
                <div className="p-2 bg-blue-accent/5 text-blue-accent rounded-lg">
                  <Video size={20} />
                </div>
                <h2 className="text-xl font-serif text-navy font-bold">{isAr ? 'البث المباشر الحالي' : 'Active Live Sessions'}</h2>
              </div>
              <Badge variant="green" className="animate-pulse">Live Now</Badge>
           </div>
           
           <div className="p-8 text-center bg-gray-50/20">
              <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl relative">
                  <Video size={32} className="text-navy/10" />
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-navy/10 animate-spin-slow"></div>
              </div>
              <p className="text-navy/30 italic max-w-xs mx-auto">
                {isAr ? 'لا يوجد حصص مباشرة في الوقت الحالي.' : 'No live sessions currently in progress. The monitoring system will automatically update when a class begins.'}
              </p>
           </div>
        </Card>

        <Card className="p-6 shadow-2xl border-none bg-navy text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10">
              <div className={cn("flex justify-between items-center mb-8", isAr && "flex-row-reverse")}>
                 <div className="p-3 bg-white/10 rounded-xl">
                    <AlertCircle size={24} className="text-blue-accent" />
                 </div>
                 <Badge variant="accent" className="bg-white/5 border border-white/10 text-white">Action Required</Badge>
              </div>
              <h3 className={cn("text-2xl font-serif font-bold mb-2", isAr && "text-right")}>{isAr ? 'طلبات تسجيل جديدة' : 'Pending Approvals'}</h3>
              <p className={cn("text-white/50 text-sm mb-10", isAr && "text-right font-sans")}>{isAr ? 'هناك 12 طلباً جديداً بحاجة للمراجعة' : 'There are 12 new enrollment requests waiting for your review.'}</p>
              
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className={cn("flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5", isAr && "flex-row-reverse")}>
                      <div className={cn("flex items-center gap-3", isAr && "flex-row-reverse")}>
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">A</div>
                         <div className={cn("text-xs", isAr && "text-right")}>
                            <p className="font-bold">Student {i}</p>
                            <p className="text-white/40 tracking-wider">BAC 2026</p>
                         </div>
                      </div>
                      <ChevronRight size={16} className={cn("text-white/20", isAr && "rotate-180")} />
                   </div>
                 ))}
              </div>
              
              <Button variant="accent" className="w-full mt-10 rounded-xl h-14 font-bold shadow-xl shadow-blue-accent/20">
                {isAr ? 'مراجعة الكل' : 'Review Applications'}
              </Button>
           </div>
        </Card>
      </div>
    </div>
  );
}
