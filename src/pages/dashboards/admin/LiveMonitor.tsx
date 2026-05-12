import React, { useState } from 'react';
import { 
  Video, 
  Search,
  Filter,
  Monitor,
  Users,
  Eye,
  AlertCircle,
  Clock,
  Play,
  ChevronRight
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

export default function LiveMonitor() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [activeSessions] = useState([
    { id: 1, teacher: 'Dr. Sarah Amine', subject: 'Mathématiques', level: '3AS', students: 84, duration: '45:12', status: 'LIVE' },
    { id: 2, teacher: 'Pr. Ahmed K.', subject: 'Physique', level: '2AS', students: 56, duration: '12:05', status: 'LIVE' },
  ]);

  return (
    <div className="space-y-8">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{isAr ? 'مراقبة الحصص المباشرة' : 'Live Sessions Monitoring'}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'متابعة البث المباشر وأداء الحصص في الوقت الفعلي' : 'Monitor live broadcasts and session performance in real-time'}</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="green" className="animate-pulse flex items-center gap-2 h-10 px-4 rounded-xl">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
             {activeSessions.length} {isAr ? 'حصص جارية' : 'Active Classes'}
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-0 overflow-hidden relative border-none shadow-2xl group">
               <div className="aspect-video bg-navy flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center space-y-4">
                     <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/50 group-hover:scale-110 group-hover:bg-blue-accent transition-all duration-500">
                        <Monitor size={32} />
                     </div>
                     <p className="text-white/30 text-xs font-mono uppercase tracking-[0.2em]">{isAr ? 'معاينة البث' : 'Broadcast Preview'}</p>
                  </div>
                  
                  <div className={cn("absolute top-4 flex items-center gap-2 z-10", isAr ? "right-4" : "left-4")}>
                     <Badge variant="red" className="animate-pulse bg-red-500 text-white border-none py-1.5 px-3 rounded-lg shadow-lg">LIVE</Badge>
                     <div className="bg-black/40 backdrop-blur-md px-3 py-1 text-white text-[10px] font-mono rounded-lg flex items-center gap-2">
                        <Clock size={12} />
                        {session.duration}
                     </div>
                  </div>
               </div>

               <div className="p-6 bg-white">
                  <div className={cn("flex justify-between items-start mb-6", isAr && "flex-row-reverse")}>
                     <div className={isAr ? "text-right" : ""}>
                        <h3 className="font-bold text-navy">{session.teacher}</h3>
                        <p className="text-blue-accent text-xs font-bold uppercase tracking-widest mt-0.5">{session.subject}</p>
                     </div>
                     <Badge variant="accent">{session.level}</Badge>
                  </div>

                  <div className={cn("flex items-center justify-between pt-4 border-t border-gray-50", isAr && "flex-row-reverse")}>
                     <div className={cn("flex items-center gap-2 text-navy/40", isAr && "flex-row-reverse")}>
                        <Users size={16} />
                        <span className="text-xs font-bold">{session.students} {isAr ? 'تلميذ' : 'Students'}</span>
                     </div>
                     <button className="text-blue-accent hover:underline text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        {isAr ? 'دخول للمراقبة' : 'Join Monitor'}
                        <ChevronRight size={14} className={isAr && "rotate-180"} />
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
