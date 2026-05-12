import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Globe, 
  Lock,
  ChevronRight,
  Save
} from 'lucide-react';
import { Card, Button, Badge } from '../../../components/ui';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeSubTab, setActiveSubTab] = useState('general');

  const tabs = [
    { id: 'general', label: isAr ? 'إعدادات عامة' : 'General', icon: Settings },
    { id: 'auth', label: isAr ? 'الأمان' : 'Security', icon: Lock },
    { id: 'notifications', label: isAr ? 'التنبيهات' : 'Notifications', icon: Bell },
    { id: 'appearance', label: isAr ? 'المظهر' : 'Appearance', icon: Palette },
    { id: 'integrations', label: isAr ? 'الربط' : 'Integrations', icon: Database },
  ];

  return (
    <div className="space-y-8">
      <div className={isAr ? "text-right" : ""}>
        <h2 className="text-2xl font-serif text-navy font-bold">{isAr ? 'الإعدادات' : 'Portal Settings'}</h2>
        <p className="text-navy/40 text-sm font-sans">{isAr ? 'تخصيص وبرمجة المنصة حسب احتياجات مدرسة النجاح' : 'Customize and configure the platform according to Nadjah School needs'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="p-2 h-fit bg-gray-50/50 border-none">
          <nav className="flex flex-col gap-1">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveSubTab(tab.id)}
                 className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                   activeSubTab === tab.id 
                     ? "bg-white text-blue-accent shadow-sm" 
                     : "text-navy/40 hover:text-navy hover:bg-white/50",
                   isAr && "flex-row-reverse text-right"
                 )}
               >
                 <tab.icon size={18} />
                 {tab.label}
                 {activeSubTab === tab.id && <ChevronRight size={14} className={cn("ml-auto", isAr && "mr-auto rotate-180")} />}
               </button>
             ))}
          </nav>
        </Card>

        <div className="lg:col-span-3 space-y-6">
           <Card className="p-8">
              <div className={cn("flex justify-between items-center mb-10", isAr && "flex-row-reverse")}>
                 <h3 className="text-xl font-serif font-bold text-navy">{isAr ? 'معلومات المدرسة' : 'School Information'}</h3>
                 <Button variant="accent" size="sm" className="flex items-center gap-2">
                    <Save size={16} />
                    {isAr ? 'حفظ التغييرات' : 'Save Changes'}
                 </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className={cn("block text-xs font-bold uppercase tracking-widest text-navy/40", isAr && "text-right font-sans")}>{isAr ? 'اسم المدرسة' : 'School Name'}</label>
                    <input 
                      type="text" 
                      defaultValue="مدرسة النجاح" 
                      className={cn("w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-accent/10 outline-none transition-all font-bold text-navy", isAr && "text-right font-serif")} 
                    />
                 </div>
                 <div className="space-y-4">
                    <label className={cn("block text-xs font-bold uppercase tracking-widest text-navy/40", isAr && "text-right font-sans")}>{isAr ? 'رابط المنصة' : 'Platform URL'}</label>
                    <input 
                      type="text" 
                      defaultValue="portal.nadjah.edu" 
                      className={cn("w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-accent/10 outline-none transition-all font-mono", isAr && "text-right")} 
                    />
                 </div>
                 <div className="md:col-span-2 space-y-4">
                    <label className={cn("block text-xs font-bold uppercase tracking-widest text-navy/40", isAr && "text-right font-sans")}>{isAr ? 'وصف المدرسة' : 'School Description'}</label>
                    <textarea 
                      rows={4}
                      className={cn("w-full px-4 py-3 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-accent/10 outline-none transition-all resize-none", isAr && "text-right font-serif")} 
                      defaultValue="المدرسة الرائدة في التعليم الرقمي والتميز الدراسي."
                    />
                 </div>
              </div>
           </Card>

           <Card className="p-8 border-red-100 bg-red-50/10">
              <h3 className={cn("text-lg font-bold text-navy mb-4", isAr && "text-right")}>{isAr ? 'منطقة الخطر' : 'Danger Zone'}</h3>
              <p className={cn("text-sm text-navy/40 mb-6", isAr && "text-right")}>{isAr ? 'الإجراءات أدناه لا يمكن التراجع عنها، يرجى الحذر.' : 'Actions below are irreversible, please be careful.'}</p>
              <div className={cn("flex gap-4", isAr && "flex-row-reverse")}>
                 <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-500 hover:text-white rounded-xl">
                   {isAr ? 'حذف جميع البيانات' : 'Purge All Data'}
                 </Button>
                 <Button variant="ghost" className="text-navy/40 rounded-xl">
                   {isAr ? 'تعطيل المنصة مؤقتًا' : 'Temporarily Disable Access'}
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
