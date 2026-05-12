import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Video, 
  GraduationCap,
  Calendar,
  Filter
} from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Sep', students: 400, revenue: 2400 },
  { name: 'Oct', students: 600, revenue: 3500 },
  { name: 'Nov', students: 800, revenue: 4800 },
  { name: 'Dec', students: 750, revenue: 4200 },
  { name: 'Jan', students: 950, revenue: 5800 },
  { name: 'Feb', students: 1100, revenue: 6500 },
  { name: 'Mar', students: 1248, revenue: 7200 },
];

export default function Analytics() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const stats = [
    { label: 'Total Revenue', value: '1,248,000 DA', trend: '+12.5%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Conversion Rate', value: '64.2%', trend: '+4.3%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Session Duration', value: '42m 15s', trend: '-2.1%', icon: Video, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Teacher Score', value: '4.8/5', trend: '+0.2', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div className={cn("flex justify-between items-center", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{t('dashboard.admin.sidebar.analytics')}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'نظرة شاملة على أداء المنصة' : 'Detailed insights into platform performance'}</p>
        </div>
        <Button variant="secondary" size="sm" className="flex items-center gap-2">
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
                    {stat.label.includes('Duration') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
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
            <div className="flex gap-2">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-accent" />
                  <span className="text-xs text-navy/40">Students</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className={cn("flex justify-between items-center mb-8", isAr && "flex-row-reverse")}>
             <h3 className={cn("font-bold text-navy", isAr ? "text-lg font-serif" : "")}>{isAr ? 'الإيرادات الشهرية (DA)' : 'Monthly Revenue (DA)'}</h3>
             <Button variant="ghost" size="sm"><Filter size={16} /></Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
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
