import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Video, 
  GraduationCap,
  Calendar,
  Filter
} from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

export default function Analytics() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [stats, setStats] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [i18n.language]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      // 1. Fetch Key Metrics
      const [
        { count: studentCount },
        { count: teacherCount },
        { data: coursesData },
        { count: enrollmentCount },
        { count: liveCount }
      ] = await Promise.all([
        supabase.from('registration_requests').select('*', { count: 'exact', head: true }).eq('role', 'STUDENT').eq('status', 'APPROVED'),
        supabase.from('registration_requests').select('*', { count: 'exact', head: true }).eq('role', 'TEACHER').eq('status', 'APPROVED'),
        supabase.from('courses').select('views_count'),
        supabase.from('enrollment_requests').select('*', { count: 'exact', head: true }).eq('status', 'APPROVED'),
        supabase.from('lives').select('*', { count: 'exact', head: true })
      ]);

      const totalViews = coursesData?.reduce((sum, c) => sum + (c.views_count || 0), 0) || 0;

      const dynamicStats = [
        { label: isAr ? 'إجمالي الطلاب' : 'Total Students', value: (studentCount || 0).toLocaleString(), trend: '+0%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: isAr ? 'إجمالي الأساتذة' : 'Total Teachers', value: (teacherCount || 0).toLocaleString(), trend: '+0%', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: isAr ? 'مشاهدات الدروس' : 'Course Views', value: totalViews.toLocaleString(), trend: '+0%', icon: Video, color: 'text-green-600', bg: 'bg-green-50' },
        { label: isAr ? 'الحصص المباشرة' : 'Live Sessions', value: (liveCount || 0).toLocaleString(), trend: '+0%', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
      ];
      setStats(dynamicStats);

      // 2. Prepare Chart Data (Mocking historical data based on current counts for visual effect)
      const months = isAr 
        ? ['سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر', 'جانفي', 'فيفري', 'مارس']
        : ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
      
      const studentsBase = studentCount || 0;
      const enrollmentBase = enrollmentCount || 0;

      const preparedData = months.map((month, i) => {
        const factor = (i + 1) / months.length;
        return {
          name: month,
          students: Math.floor(studentsBase * factor),
          enrollments: Math.floor(enrollmentBase * factor),
          revenue: Math.floor(enrollmentBase * factor * 2000) 
        };
      });
      setChartData(preparedData);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-navy/40 italic font-sans">{isAr ? 'جاري التحميل...' : 'Loading analytics...'}</div>;
  }

  return (
    <div className="space-y-8">
      <div className={cn("flex justify-between items-center", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{t('dashboard.admin.sidebar.analytics')}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'نظرة شاملة على أداء المنصة' : 'Detailed insights into platform performance'}</p>
        </div>
        <Button variant="secondary" size="sm" className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
          <Calendar size={18} />
          {isAr ? 'آخر 30 يوم' : 'Last 30 Days'}
        </Button>
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", isAr && "flex-row-reverse")}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 overflow-hidden relative">
              <div className={cn("flex justify-between items-start mb-4", isAr && "flex-row-reverse")}>
                 <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <div className={cn("flex items-center gap-1 text-xs font-bold", stat.color)}>
                    {stat.trend}
                    {stat.trend.startsWith('-') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                 </div>
              </div>
              <div className={cn("text-2xl font-bold text-navy", isAr && "text-right")}>{stat.value}</div>
              <div className={cn("text-xs font-medium text-navy/30 uppercase tracking-widest mt-1", isAr && "text-right font-sans")}>{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className={cn("flex justify-between items-center mb-8", isAr && "flex-row-reverse")}>
            <h3 className={cn("font-bold text-navy", isAr ? "text-lg font-serif" : "")}>{isAr ? 'نمو الطلاب والاشتراكات' : 'Student Growth & Enrollment'}</h3>
            <div className={cn("flex gap-4", isAr && "flex-row-reverse")}>
               <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                  <div className="w-3 h-3 rounded-full bg-blue-accent" />
                  <span className="text-xs text-navy/40">{isAr ? 'طلاب' : 'Students'}</span>
               </div>
               <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-navy/40">{isAr ? 'اشتراكات' : 'Enrollments'}</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} reversed={isAr} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} orientation={isAr ? 'right' : 'left'} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="enrollments" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEnrollments)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className={cn("flex justify-between items-center mb-8", isAr && "flex-row-reverse")}>
             <h3 className={cn("font-bold text-navy", isAr ? "text-lg font-serif" : "")}>{isAr ? 'الإيرادات الشهرية تقديرياً (DA)' : 'Estimated Monthly Revenue (DA)'}</h3>
             <Button variant="ghost" size="sm"><Filter size={16} /></Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} reversed={isAr} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} orientation={isAr ? 'right' : 'left'} />
                <Tooltip 
                   cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#0A1D37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
