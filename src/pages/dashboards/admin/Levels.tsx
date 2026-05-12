import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit2, 
  ChevronRight,
  Monitor,
  FolderOpen
} from 'lucide-react';
import { Card, Button, Badge } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

export default function Levels() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const levels = [
    { id: 'primary', name: isAr ? 'التعليم الابتدائي' : 'Primary Education', years: ['1AP', '2AP', '3AP', '4AP', '5AP'], icon: '🎒' },
    { id: 'middle', name: isAr ? 'التعليم المتوسط' : 'Middle School', years: ['1AM', '2AM', '3AM', '4AM'], icon: '📚' },
    { id: 'secondary', name: isAr ? 'التعليم الثانوي' : 'High School', years: ['1AS', '2AS', '3AS'], icon: '🎓' },
  ];

  return (
    <div className="space-y-8">
      <div className={cn("flex justify-between items-center", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{isAr ? 'الأطوار والسنوات الدراسية' : 'Levels & Years'}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'هيكلة النظام التعليمي للمدرسة' : 'Structure the school educational system'}</p>
        </div>
        <Button variant="accent" size="sm" className="flex items-center gap-2">
          <Plus size={18} />
          {isAr ? 'إضافة طور' : 'Add Level'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {levels.map((level, i) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-0 overflow-hidden border-none shadow-xl group">
               <div className={cn("p-6 bg-navy text-white flex justify-between items-center", isAr && "flex-row-reverse")}>
                  <div className={cn("flex items-center gap-4", isAr && "flex-row-reverse")}>
                     <span className="text-3xl">{level.icon}</span>
                     <div>
                        <h3 className="text-lg font-bold">{level.name}</h3>
                        <p className="text-white/40 text-xs font-sans tracking-widest">{level.years.length} Academic Years</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"><Edit2 size={16} /></button>
                     <button className="p-2 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                  </div>
               </div>
               
               <div className="p-8 bg-white overflow-hidden">
                  <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", isAr && "flex-row-reverse")}>
                     {level.years.map((year, idx) => (
                       <Card key={idx} className="p-4 bg-gray-50 border-transparent hover:bg-white hover:border-blue-accent/20 cursor-pointer group/year relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/year:opacity-100 transition-opacity">
                             <Edit2 size={12} className="text-navy/20" />
                          </div>
                          <div className="text-center">
                             <p className="text-lg font-black text-navy">{year}</p>
                             <p className="text-[10px] uppercase font-bold text-navy/30 tracking-tighter mt-1">{isAr ? 'سنة دراسية' : 'Year'}</p>
                          </div>
                       </Card>
                     ))}
                     <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-100 rounded-2xl hover:border-blue-accent/30 hover:bg-blue-accent/5 transition-all text-navy/20 hover:text-blue-accent">
                        <Plus size={24} />
                        <span className="text-[10px] font-bold uppercase mt-2 tracking-widest">{isAr ? 'إضافة سنة' : 'Add Year'}</span>
                     </button>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
