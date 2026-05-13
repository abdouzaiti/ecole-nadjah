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
import { academyService } from '../../../services/academyService';

export default function Registrations() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [accountRequests, setAccountRequests] = useState<any[]>([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'ACCOUNTS' | 'ENROLLMENTS'>('ACCOUNTS');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [acc, enr] = await Promise.all([
        academyService.fetchAccountRequests(),
        academyService.fetchEnrollmentRequests()
      ]);
      setAccountRequests(acc || []);
      setEnrollmentRequests(enr || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async (id: string, type: 'ACCOUNT' | 'ENROLLMENT') => {
    try {
      await academyService.approveRequest(id, type);
      await fetchData();
    } catch (error) {
      alert('Error approving request');
    }
  };

  const handleReject = async (id: string, type: 'ACCOUNT' | 'ENROLLMENT') => {
    try {
      const table = type === 'ACCOUNT' ? 'registration_requests' : 'enrollment_requests';
      await supabase.from(table).update({ status: 'REJECTED' }).eq('id', id);
      await fetchData();
    } catch (error) {
      alert('Error rejecting request');
    }
  };

  const currentData = activeTab === 'ACCOUNTS' ? accountRequests : enrollmentRequests;

  return (
    <div className="space-y-6">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div>
          <h2 className={cn("text-2xl font-serif text-navy font-bold", isAr && "text-right")}>
            {t('dashboard.admin.sidebar.registrations')}
          </h2>
          <p className={cn("text-navy/50 text-sm", isAr && "text-right font-sans")}>
            {activeTab === 'ACCOUNTS' 
              ? (isAr ? 'إدارة طلبات التسجيل الجديدة' : 'Manage new account registrations')
              : (isAr ? 'إدارة طلبات إضافة المواد' : 'Manage subject enrollment requests')}
          </p>
        </div>
      </div>

      <div className={cn("flex gap-2", isAr && "flex-row-reverse")}>
        <button
          onClick={() => setActiveTab('ACCOUNTS')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'ACCOUNTS' ? "bg-navy text-white" : "bg-gray-50 text-navy/40"
          )}
        >
          {isAr ? 'حسابات جديدة' : 'New Accounts'}
        </button>
        <button
          onClick={() => setActiveTab('ENROLLMENTS')}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === 'ENROLLMENTS' ? "bg-navy text-white" : "bg-gray-50 text-navy/40"
          )}
        >
          {isAr ? 'طلبات المواد' : 'Subject Requests'}
        </button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl">
        <div className="overflow-x-auto">
          <table className={cn("w-full", isAr ? "text-right" : "text-left")}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">
                  {activeTab === 'ACCOUNTS' ? (isAr ? 'الاسم' : 'Name') : (isAr ? 'الطالب' : 'Student')}
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">
                  {activeTab === 'ACCOUNTS' ? (isAr ? 'المستوى' : 'Level') : (isAr ? 'المادة' : 'Subject')}
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40", isAr ? "text-left" : "text-right")}>{t('dashboard.admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-navy/30 italic font-sans">
                      {isAr ? 'جاري التحميل...' : 'Loading requests...'}
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-navy/30 italic font-sans">
                      {isAr ? 'لا توجد طلبات' : 'No pending requests'}
                    </td>
                  </tr>
                ) : (
                  currentData.map((reg, idx) => (
                    <motion.tr 
                      key={reg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-navy">
                            {activeTab === 'ACCOUNTS' ? reg.full_name : (reg.student_id ? 'Student' : 'Unknown')}
                          </div>
                          <div className="text-[10px] text-navy/40 font-mono">{reg.email || reg.id}</div>
                          {activeTab === 'ACCOUNTS' && (
                            <div className="mt-1">
                              <Badge variant={reg.role === 'ADMIN' ? 'navy' : reg.role === 'TEACHER' ? 'accent' : 'green'}>
                                {reg.role}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {activeTab === 'ACCOUNTS' ? (
                          <div className="flex flex-col gap-1">
                             <Badge variant="accent">{reg.levels?.name || reg.level_id || 'N/A'}</Badge>
                             {reg.years?.name && <span className="text-[10px] text-navy/40">{reg.years.name}</span>}
                             {reg.subject_name && <span className="text-[10px] text-blue-accent font-bold uppercase">{reg.subject_name}</span>}
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <Badge variant="green">{reg.year_subjects?.subjects?.name}</Badge>
                            <span className="text-[10px] text-navy/40 mt-1">{reg.year_subjects?.years?.name}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-navy/60 font-mono">
                          {new Date(reg.created_at).toLocaleDateString(isAr ? 'ar-DZ' : 'en-US')}
                        </div>
                      </td>
                      <td className={cn("px-6 py-4", isAr ? "text-left" : "text-right")}>
                         <div className={cn("flex items-center gap-1", isAr ? "justify-start" : "justify-end")}>
                            <button 
                              onClick={() => handleApprove(reg.id, activeTab === 'ACCOUNTS' ? 'ACCOUNT' : 'ENROLLMENT')}
                              className="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-all"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => handleReject(reg.id, activeTab === 'ACCOUNTS' ? 'ACCOUNT' : 'ENROLLMENT')}
                              className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-all"
                            >
                              <X size={18} />
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
