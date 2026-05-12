import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit2, 
  Layers,
  ChevronRight,
  BookMarked,
  Search,
  Filter,
  Users
} from 'lucide-react';
import { Card, Button, Badge } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';

export default function Subjects() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function fetchSubjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching subjects:', error);
    } else {
      setSubjects(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{isAr ? 'المواد الدراسية' : 'Subjects Management'}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'إدارة المناهج والمواد التعليمية والأساتذة المشرفين' : 'Manage curriculum, educational materials and supervising teachers'}</p>
        </div>
        <Button variant="accent" size="sm" className="flex items-center gap-2">
          <Plus size={18} />
          {isAr ? 'إضافة مادة' : 'Add Subject'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           [...Array(6)].map((_, i) => (
             <Card key={i} className="animate-pulse h-48 bg-gray-50/50">
               <div className="w-full h-full" />
             </Card>
           ))
        ) : subjects.length === 0 ? (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/20">
             <BookMarked size={48} className="mx-auto text-navy/10 mb-4" />
             <p className="text-navy/30 italic">{isAr ? 'لا يوجد مواد دراسية حالياً' : 'No subjects found yet'}</p>
             <Button variant="outline" size="sm" className="mt-4">{isAr ? 'إنشاء أول مادة' : 'Create your first subject'}</Button>
          </div>
        ) : (
          subjects.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-blue-accent/30 transition-all group h-full">
                <div className={cn("flex justify-between items-start mb-4", isAr && "flex-row-reverse")}>
                  <div className={cn("p-4 rounded-2xl bg-blue-accent/5 text-blue-accent group-hover:bg-blue-accent group-hover:text-white transition-all duration-300")}>
                    <BookOpen size={24} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-100 text-navy/40 rounded-lg"><Edit2 size={16} /></button>
                    <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <div className={isAr ? "text-right" : ""}>
                   <h3 className="text-lg font-bold text-navy truncate">{subject.name}</h3>
                   <p className="text-xs text-navy/40 uppercase tracking-widest mt-1 mb-6 font-sans">
                     {subject.level || 'General'} • {subject.year || 'All Years'}
                   </p>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                      <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy/40">
                         <Layers size={14} />
                      </div>
                      <span className="text-xs font-bold text-navy/60">{subject.chapters_count || 0} {isAr ? 'محور' : 'Chapters'}</span>
                   </div>
                   <div className={cn("flex items-center gap-2", isAr && "flex-row-reverse")}>
                      <Users size={14} className="text-navy/40" />
                      <span className="text-xs font-bold text-navy/60">{subject.teachers_count || 0}</span>
                   </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
