import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

export default function Registrations() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED

  // Fetch registrations from Supabase
  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  async function fetchRegistrations() {
    setLoading(true);
    let query = supabase
      .from('registration_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'ALL') {
      query = query.eq('status', filter);
    }

    const { data: requests, error } = await query;
    if (error) {
      console.error('Error fetching registrations:', error);
    } else {
      setData(requests || []);
    }
    setLoading(false);
  }

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const { error } = await supabase
      .from('registration_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      alert('Error updating status');
    } else {
      fetchRegistrations();
    }
  };

  return (
    <div className="space-y-6">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div>
          <h2 className={cn("text-2xl font-serif text-navy font-bold", isAr && "text-right")}>
            {t('dashboard.admin.sidebar.registrations')}
          </h2>
          <p className={cn("text-navy/50 text-sm", isAr && "text-right font-sans")}>
            {t('dashboard.admin.registrations_subtitle') || 'Review and manage new student applications'}
          </p>
        </div>
        
        <div className={cn("flex items-center gap-3 w-full md:w-auto", isAr && "flex-row-reverse")}>
          <div className="relative flex-grow md:w-64">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-3" : "left-3")} size={18} />
            <input 
              type="text" 
              placeholder={t('dashboard.search_placeholder')}
              className={cn(
                "w-full py-2 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-accent/20 outline-none text-sm transition-all",
                isAr ? "pr-10 pl-4 text-right font-serif" : "pl-10 pr-4 text-left"
              )}
            />
          </div>
          <Button variant="secondary" size="sm" className="shrink-0 h-10 w-10 p-0 rounded-xl border-gray-100">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      <div className={cn("flex gap-2 overflow-x-auto pb-2", isAr && "flex-row-reverse")}>
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
              filter === f 
                ? "bg-navy text-white shadow-lg shadow-navy/20" 
                : "bg-gray-50 text-navy/40 hover:bg-gray-100"
            )}
          >
            {f === 'ALL' ? (isAr ? 'الكل' : 'ALL') : 
             f === 'PENDING' ? (isAr ? 'قيد الانتظار' : 'PENDING') :
             f === 'APPROVED' ? (isAr ? 'مقبول' : 'APPROVED') :
             (isAr ? 'مرفوض' : 'REJECTED')}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl">
        <div className="overflow-x-auto">
          <table className={cn("w-full", isAr ? "text-right" : "text-left")}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">{isAr ? 'الطالب / ولي الأمر' : 'Student / Parent'}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">{t('dashboard.admin.table.level')}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">{t('dashboard.admin.table.status')}</th>
                <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr ? "text-left" : "text-right")}>{t('dashboard.admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-navy/30 italic">
                      {isAr ? 'جاري التحميل...' : 'Loading registrations...'}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-navy/30 italic">
                      {isAr ? 'لا توجد طلبات حالياً' : 'No registration requests found'}
                    </td>
                  </tr>
                ) : (
                  data.map((reg, idx) => (
                    <motion.tr 
                      key={reg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-accent/10 flex items-center justify-center text-blue-accent font-bold text-xs">
                             {reg.student_name?.charAt(0)}
                           </div>
                           <div>
                              <div className="font-bold text-navy truncate max-w-[150px]">{reg.student_name}</div>
                              <div className="text-[10px] text-navy/40 flex items-center gap-1">
                                <Mail size={10} /> {reg.email}
                              </div>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="accent">{reg.level}</Badge>
                        <div className="text-[10px] text-navy/30 mt-1 font-mono">{reg.year}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-navy/60 font-mono">
                          {new Date(reg.created_at).toLocaleDateString(isAr ? 'ar-DZ' : 'en-US')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          reg.status === 'APPROVED' ? 'green' : 
                          reg.status === 'REJECTED' ? 'red' : 
                          'navy'
                        }>
                          {reg.status}
                        </Badge>
                      </td>
                      <td className={cn("px-6 py-4", isAr ? "text-left" : "text-right")}>
                         <div className={cn("flex items-center gap-1", isAr ? "justify-start" : "justify-end")}>
                            {reg.status === 'PENDING' && (
                              <>
                                <button 
                                  onClick={() => handleAction(reg.id, 'APPROVED')}
                                  className="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-all hover:scale-110 active:scale-95"
                                >
                                  <Check size={18} />
                                </button>
                                <button 
                                  onClick={() => handleAction(reg.id, 'REJECTED')}
                                  className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-all hover:scale-110 active:scale-95"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            )}
                            <button className="p-2 hover:bg-gray-100 text-navy/40 rounded-lg transition-colors">
                              <Eye size={18} />
                            </button>
                         </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
