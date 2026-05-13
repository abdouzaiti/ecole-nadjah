import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search,
  Filter,
  Play,
  Trash2,
  Edit2,
  Calendar,
  Eye,
  FileText,
  Upload,
  Clock
} from 'lucide-react';
import { Card, Badge, Button } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';
import { academyService } from '../../../services/academyService';

export default function ReplayLibrary() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [replays, setReplays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReplays();
  }, []);

  async function fetchReplays() {
    setLoading(true);
    try {
      const data = await academyService.fetchCourses();
      setReplays(data || []);
    } catch (error) {
      console.error('Error fetching replays:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-4", isAr && "flex-row-reverse")}>
        <div className={isAr ? "text-right" : ""}>
          <h2 className="text-2xl font-serif text-navy font-bold">{isAr ? 'مكتبة الإعادة (Replay)' : 'Replay Library Management'}</h2>
          <p className="text-navy/40 text-sm font-sans">{isAr ? 'تنظيم الحصص المسجلة والمرفقات التعليمية' : 'Organize recorded classes and educational attachments'}</p>
        </div>
        <Button variant="accent" size="sm" className="flex items-center gap-2">
          <Upload size={18} />
          {isAr ? 'رفع فيديو' : 'Upload Replay'}
        </Button>
      </div>

      <div className={cn("flex flex-col sm:flex-row gap-4", isAr && "flex-row-reverse")}>
         <div className="relative flex-grow">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-navy/30", isAr ? "right-3" : "left-3")} size={18} />
            <input 
              type="text" 
              placeholder={isAr ? 'البحث في المكتبة...' : 'Search in library...'} 
              className={cn(
                "w-full py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-accent/10 outline-none text-sm transition-all shadow-sm",
                isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
              )}
            />
         </div>
         <Button variant="secondary" className="h-[52px] px-6 rounded-2xl shadow-sm">
            <Filter size={18} className={isAr ? "ml-2" : "mr-2"} />
            {isAr ? 'تصفية' : 'Filter'}
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {replays.length === 0 && !loading ? (
          <div className="col-span-full py-20 text-center text-navy/30 italic font-sans">
            {isAr ? 'لا توجد دروس مرفوعة في المكتبة' : 'No recorded courses found in library'}
          </div>
        ) : (
          replays.map((replay, i) => (
            <motion.div
              key={replay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-0 overflow-hidden group border-none shadow-xl flex flex-col h-full">
                 <div className="aspect-video bg-navy/5 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center brightness-75 group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: `url(${replay.thumbnail_url || 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800'})` }}
                    ></div>
                    <div className="absolute inset-0 bg-navy/20"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-blue-accent transition-all duration-300">
                          <Play size={24} className="ml-1" />
                       </div>
                    </div>

                    <div className={cn("absolute bottom-4 flex items-center gap-2", isAr ? "right-4" : "left-4")}>
                       <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono">{replay.duration}</div>
                    </div>
                 </div>

                 <div className="p-6 space-y-4 flex-grow">
                    <div className={cn("flex justify-between items-start", isAr && "flex-row-reverse")}>
                       <h3 className={cn("font-bold text-navy text-lg line-clamp-2 leading-tight flex-grow", isAr ? "text-right" : "")}>{replay.title}</h3>
                       <Badge variant="accent" className="shrink-0">{replay.year_subject?.years?.name}</Badge>
                    </div>
                    
                    <div className={cn("flex items-center gap-3", isAr && "flex-row-reverse")}>
                       <div className="w-8 h-8 rounded-full navy-gradient flex items-center justify-center text-[10px] text-white font-bold">
                          {(replay.teacher?.name || 'T').charAt(0)}
                       </div>
                       <span className="text-xs font-bold text-navy/40 truncate">{replay.teacher?.name}</span>
                    </div>
                 </div>

                 <div className={cn("p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center", isAr && "flex-row-reverse")}>
                    <div className={cn("flex items-center gap-4", isAr && "flex-row-reverse")}>
                       <div className="flex items-center gap-1 text-navy/30">
                          <Eye size={14} />
                          <span className="text-[10px] font-bold">{replay.views_count}</span>
                       </div>
                       <div className="flex items-center gap-1 text-navy/30">
                          <Clock size={14} />
                          <span className="text-[10px] font-bold">
                            {new Date(replay.created_at).toLocaleDateString(isAr ? 'ar-DZ' : 'en-US')}
                          </span>
                       </div>
                    </div>
                    
                    <div className="flex gap-1">
                       <button className="p-2 hover:bg-white text-navy/20 hover:text-navy rounded-lg transition-colors"><Edit2 size={14} /></button>
                       <button className="p-2 hover:bg-white text-navy/20 hover:text-red-400 rounded-lg transition-colors"><Trash2 size={14} /></button>
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
