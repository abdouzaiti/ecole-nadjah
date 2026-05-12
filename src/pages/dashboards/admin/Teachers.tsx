import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  MoreVertical,
  GraduationCap,
  Star
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

export default function Teachers() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching teachers:', error);
    } else {
      setTeachers(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">
            {t('auth.roles.teacher')}s
          </h2>
          <p className="text-navy/50 text-sm font-sans">
            {isAr ? 'إدارة الطاقم التربوي وتعيين المواد الدراسية' : 'Manage pedagogical staff and assign subjects'}
          </p>
        </div>
        
        <div className={cn("flex items-center gap-3 w-full md:w-auto", isAr && "flex-row-reverse")}>
          <Button variant="accent" size="sm" className="shrink-0 flex items-center gap-2">
            <Plus size={18} />
            {isAr ? 'إضافة أستاذ' : 'Add Teacher'}
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
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse h-64 bg-gray-50/50">
              <div className="w-full h-full" />
            </Card>
          ))
        ) : teachers.length === 0 ? (
          <div className="col-span-full py-20 text-center space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-navy/10">
              <Users size={40} />
            </div>
            <p className="text-navy/30 italic">{isAr ? 'لا يوجد أساتذة مسجلون حالياً' : 'No teachers found'}</p>
          </div>
        ) : (
          teachers.map((teacher, idx) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-5 flex flex-col h-full group hover:border-blue-accent/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={80} />
                </div>
                
                <div className={cn("flex justify-between items-start mb-6 relative z-10", isAr && "flex-row-reverse")}>
                  <div className={cn("flex gap-4 items-center", isAr && "flex-row-reverse")}>
                    <div className="w-16 h-16 rounded-2xl navy-gradient border-2 border-white shadow-xl flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                      <img src={teacher.avatar_url || `https://ui-avatars.com/api/?name=${teacher.name}&background=0A1D37&color=fff`} alt="" />
                    </div>
                    <div className={isAr ? "text-right" : ""}>
                      <h3 className="font-bold text-navy leading-tight text-lg">{teacher.name}</h3>
                      <p className="text-xs text-blue-accent font-bold uppercase tracking-widest mt-1 font-sans">{teacher.subject}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-grow relative z-10">
                   <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse text-right")}>
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-navy">4.9</span>
                      <span className="text-xs text-navy/40">({isAr ? '120 تقييم' : '120 Ratings'})</span>
                   </div>
                  
                  <div className={cn("flex items-center gap-3 text-sm text-navy/60", isAr && "flex-row-reverse")}>
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
                  <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                     <Badge variant="accent">{teacher.classes_count || 0} Classes</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2 h-auto text-blue-accent group-hover:translate-x-1 transition-transform">
                    {isAr ? 'التفاصيل' : 'Profile'} <ChevronRight size={18} className={cn("inline ml-1", isAr && "mr-1 rotate-180")} />
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
