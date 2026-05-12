import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  MoreVertical,
  GraduationCap
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

export default function Students() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching students:', error);
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">
            {t('auth.roles.student')}s
          </h2>
          <p className="text-navy/50 text-sm font-sans">
            {isAr ? 'إدارة جميع الطلاب المسجلين والتحكم في إمكانية وصولهم' : 'Manage all enrolled students and control their access'}
          </p>
        </div>
        
        <div className={cn("flex items-center gap-3 w-full md:w-auto", isAr && "flex-row-reverse")}>
          <Button variant="accent" size="sm" className="shrink-0 flex items-center gap-2">
            <Plus size={18} />
            {isAr ? 'إضافة طالب' : 'Add Student'}
          </Button>
          <div className="relative flex-grow md:w-64">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-3" : "left-3")} size={18} />
            <input 
              type="text" 
              placeholder={t('dashboard.search_placeholder')}
              className={cn(
                "w-full py-2 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-accent/20 outline-none text-sm transition-all",
                isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
              )}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-grow">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="h-20 bg-gray-50 rounded-xl" />
            </Card>
          ))
        ) : students.length === 0 ? (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-navy/10">
              <GraduationCap size={40} />
            </div>
            <p className="text-navy/30 italic">{isAr ? 'لا يوجد طلاب مسجلون حالياً' : 'No students found'}</p>
            <Button variant="outline" size="sm">{isAr ? 'إضافة طالب يدويًا' : 'Add your first student'}</Button>
          </div>
        ) : (
          students.map((student, idx) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-5 flex flex-col h-full group hover:border-blue-accent/30">
                <div className={cn("flex justify-between items-start mb-6", isAr && "flex-row-reverse")}>
                  <div className={cn("flex gap-4 items-center", isAr && "flex-row-reverse")}>
                    <div className="w-14 h-14 rounded-2xl navy-gradient border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                      <img src={student.avatar_url || `https://ui-avatars.com/api/?name=${student.name}&background=0A1D37&color=fff`} alt="" />
                    </div>
                    <div className={isAr ? "text-right" : ""}>
                      <h3 className="font-bold text-navy leading-tight">{student.name}</h3>
                      <p className="text-xs text-navy/40 uppercase tracking-widest mt-1 font-sans">{student.level}</p>
                    </div>
                  </div>
                  <button className="p-2 text-navy/20 hover:text-navy hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="space-y-3 flex-grow">
                  <div className={cn("flex items-center gap-3 text-sm text-navy/60", isAr && "flex-row-reverse")}>
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className={cn("flex items-center gap-3 text-sm text-navy/60", isAr && "flex-row-reverse")}>
                    <Phone size={14} className="shrink-0" />
                    <span>{student.phone || '---'}</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-accent/10 flex items-center justify-center text-[10px] text-blue-accent font-bold">
                         {String.fromCharCode(65 + i)}
                       </div>
                     ))}
                     <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] text-navy/30 font-bold">
                       +2
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2 h-auto text-blue-accent group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={18} className={isAr ? "rotate-180" : ""} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
