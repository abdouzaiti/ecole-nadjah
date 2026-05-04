import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../../components/ui';
import { LayoutDashboard, Users, GraduationCap, BookOpen, TrendingUp, Check, X, Eye } from 'lucide-react';
import { MOCK_REGISTRATIONS } from '../../data/mock';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const sidebarItems = [
    { name: t('dashboard.admin.sidebar.overview'), icon: LayoutDashboard, path: '/dashboard/admin' },
    { name: t('dashboard.admin.sidebar.registrations'), icon: Users, path: '#' },
    { name: t('auth.roles.student'), icon: GraduationCap, path: '#' },
    { name: t('dashboard.sidebar.library'), icon: BookOpen, path: '#' },
    { name: t('dashboard.admin.sidebar.analytics'), icon: TrendingUp, path: '#' },
  ];

  const stats = [
    { label: t('dashboard.admin.stats.total_students'), value: '1,248', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: t('dashboard.admin.stats.active_courses'), value: '84', change: '+5', icon: BookOpen, color: 'bg-blue-accent/10 text-blue-accent' },
    { label: t('dashboard.admin.stats.teachers'), value: '42', change: '0', icon: GraduationCap, color: 'bg-green-50 text-green-600' },
    { label: t('dashboard.admin.stats.revenue'), value: '2.4M', change: '+18.5%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="space-y-8">
        <div className={cn(isAr && "text-right")}>
          <h1 className="text-3xl font-serif text-navy font-bold">{t('dashboard.admin.welcome')}</h1>
          <p className="text-navy/50 font-sans">{t('dashboard.admin.subtitle')}</p>
        </div>

        {/* Stats Grid */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", isAr && "flex-row-reverse")}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5">
                <div className={cn("flex justify-between items-start mb-4", isAr && "flex-row-reverse")}>
                  <div className={cn("p-3 rounded-xl", stat.color)}>
                     <stat.icon size={24} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    stat.change.startsWith('+') ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div className={cn("text-2xl font-bold text-navy", isAr && "text-right")}>{stat.value}</div>
                <div className={cn("text-sm font-medium text-navy/40", isAr && "text-right font-sans")}>{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-0 overflow-hidden shadow-xl border-none">
             <div className={cn("p-6 border-b border-gray-100 flex justify-between items-center bg-white", isAr && "flex-row-reverse")}>
                <h2 className={cn("text-xl font-serif text-navy font-bold", isAr && "text-right")}>{t('dashboard.admin.recent_registrations')}</h2>
                <Button variant="ghost" size="sm" className="text-blue-accent">{t('dashboard.student.see_all')}</Button>
             </div>
             <div className="overflow-x-auto">
                <table className={cn("w-full", isAr ? "text-right" : "text-left")}>
                   <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                         <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr && "text-right")}>{t('dashboard.admin.table.student')}</th>
                         <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr && "text-right")}>{t('dashboard.admin.table.level')}</th>
                         <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr && "text-right")}>{t('dashboard.admin.table.status')}</th>
                         <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr && "text-right")}>{t('dashboard.admin.table.date')}</th>
                         <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr ? "text-left" : "text-right")}>{t('dashboard.admin.table.actions')}</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {MOCK_REGISTRATIONS.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-bold text-navy">{reg.studentName}</div>
                              <div className="text-xs text-navy/40">{reg.parentName}</div>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant="accent">{reg.level}</Badge>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant={reg.status === 'APPROVED' ? 'green' : 'navy'}>{reg.status}</Badge>
                           </td>
                           <td className="px-6 py-4 text-sm text-navy/60 font-mono">{reg.date}</td>
                           <td className={cn("px-6 py-4 space-x-2", isAr ? "text-left" : "text-right")}>
                                <button className="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-colors"><Check size={16} /></button>
                                <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"><X size={16} /></button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>

          <Card className="p-6 shadow-xl border-none">
             <h2 className={cn("text-xl font-serif text-navy mb-6 font-bold", isAr && "text-right")}>{t('dashboard.admin.recent_activities')}</h2>
             <div className="space-y-6">
                {(t('dashboard.admin.activities', { returnObjects: true }) as any[]).map((act, i) => (
                   <div key={i} className={cn("flex gap-4 relative", isAr && "flex-row-reverse")}>
                    {!isAr && i !== 3 && <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-100"></div>}
                    {isAr && i !== 3 && <div className="absolute right-4 top-8 bottom-0 w-px bg-gray-100"></div>}
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                       {act.user.charAt(0)}
                    </div>
                    <div className={cn("pb-4", isAr && "text-right flex-grow")}>
                       <p className="text-sm text-navy font-medium"><span className="font-bold">{act.user}</span> {act.action}</p>
                       <p className="text-xs text-navy/40 mt-1 font-sans">{act.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <Button variant="outline" className="w-full mt-6 py-3">
                {t('dashboard.admin.activity_report')}
             </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
