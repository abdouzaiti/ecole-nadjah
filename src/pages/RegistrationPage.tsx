import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { motion } from 'motion/react';
import { CheckCircle, Info, User, Mail, Phone, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function RegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-white">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-md text-center p-12 bg-white premium-shadow border-none">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-serif text-navy mb-4 font-bold">{t('auth.registration.success_title')}</h2>
            <p className="text-navy/60 mb-8 leading-relaxed font-sans">
              {t('auth.registration.success_message')}
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full">{t('auth.registration.back_home')}</Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-6 object-contain" />
          <Badge variant="navy">{t('auth.registration.step')}</Badge>
          <h1 className="text-4xl md:text-5xl font-serif text-navy mt-4 mb-4 font-bold">{t('auth.registration.title')}</h1>
          <p className="text-navy/60 italic font-sans">{t('auth.registration.form_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className={cn("text-xl font-serif text-navy mb-6 flex items-center gap-2 font-bold", isAr && "flex-row-reverse")}>
                    <User size={20} className="text-blue-accent" /> {t('auth.registration.student_info')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.last_name')}</label>
                      <input type="text" required placeholder={t('auth.registration.last_name_placeholder')} className={cn("w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none placeholder:text-navy/20", isAr && "text-right")} />
                    </div>
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.first_name')}</label>
                      <input type="text" required placeholder={t('auth.registration.first_name_placeholder')} className={cn("w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none placeholder:text-navy/20", isAr && "text-right")} />
                    </div>
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.birth_date')}</label>
                      <div className="relative">
                        <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input type="date" placeholder={t('auth.registration.date_placeholder')} required className={cn("w-full py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.desired_level')}</label>
                      <div className="relative">
                        <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <select defaultValue="" className={cn("w-full py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                          <option value="" disabled>{t('auth.registration.select_level')}</option>
                          <option>{t('levels.primary')}</option>
                          <option>{t('levels.middle')}</option>
                          <option>{t('levels.high')}</option>
                          <option>{t('levels.formation')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div>
                  <h3 className={cn("text-xl font-serif text-navy mb-6 flex items-center gap-2 font-bold", isAr && "flex-row-reverse")}>
                    <ShieldCheck size={20} className="text-blue-accent" /> {t('auth.registration.parent_info')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.parent_name')}</label>
                      <input type="text" required placeholder={t('auth.registration.parent_name_placeholder')} className={cn("w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none placeholder:text-navy/20", isAr && "text-right")} />
                    </div>
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.contact_email')}</label>
                      <div className="relative">
                        <Mail size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input type="email" required placeholder={t('auth.registration.email_placeholder')} className={cn("w-full py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.phone_number')}</label>
                      <div className="relative">
                        <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input type="tel" placeholder={t('auth.registration.phone_placeholder')} required className={cn("w-full py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="navy" className="w-full py-5 text-white font-bold uppercase tracking-[0.2em] shadow-xl shadow-navy/20">
                  {t('auth.registration.submit_button')}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-navy text-white p-8">
              <h4 className={cn("text-xl font-serif text-white mb-4 font-bold", isAr && "text-right")}>{t('auth.registration.important_title')}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className={cn("flex gap-3", isAr && "flex-row-reverse text-right")}>
                  <Info size={24} className="text-blue-accent shrink-0" />
                  <span>{t('auth.registration.important_note_1')}</span>
                </li>
                <li className={cn("flex gap-3", isAr && "flex-row-reverse text-right")}>
                  <CheckCircle size={20} className="text-blue-accent shrink-0" />
                  <span>{t('auth.registration.important_note_2')}</span>
                </li>
              </ul>
            </Card>
            
            <Card className={cn("p-8 border-navy/10 border-2 dashed", isAr && "text-right")}>
              <h4 className="text-lg font-serif text-navy mb-4 font-bold">{t('auth.registration.need_help')}</h4>
              <p className="text-sm text-navy/60 mb-6 font-sans">
                {t('auth.registration.help_desc')}
              </p>
              <Link to="/#contact">
                 <Button variant="outline" size="sm" className="w-full">
                    {t('contact_us')}
                 </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
