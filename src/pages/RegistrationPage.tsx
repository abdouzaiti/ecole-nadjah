import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { motion } from 'motion/react';
import { CheckCircle, Info, User, Mail, Phone, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function RegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Constructing WhatsApp message
    const whatsappNumber = "213790356012";
    let message = "";
    
    if (role === 'teacher') {
      message = `*Nouveau Dossier d'Enseignant - École Nadjah*\n\n` +
                `👤 *Nom d'utilisateur:* ${data.username}\n` +
                `📧 *Email:* ${data.email}\n` +
                `📱 *Téléphone:* ${data.phone}\n` +
                `👨‍🏫 *Rappel:* Inscription en tant qu'enseignant.`;
    } else {
      const levelLabel = levels.find(l => l.key === data.level)?.label || data.level;
      const subjectLabel = subjects.find(s => s.key === data.subject)?.label || data.subject;
      
      message = `*Nouveau Dossier d'Élève - École Nadjah*\n\n` +
                `👤 *Nom d'utilisateur:* ${data.username}\n` +
                `📧 *Email:* ${data.email}\n` +
                `📱 *Téléphone Élève:* ${data.phone}\n` +
                `👨‍👩‍👧‍👦 *Téléphone Parent:* ${data.parentPhone}\n` +
                `📚 *Niveau:* ${levelLabel}\n` +
                `📅 *Année:* ${data.year}\n` +
                `🧪 *Matière:* ${subjectLabel}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSuccess(true);
  };

  const levels = [
    { key: 'primary', label: t('levels.primary') },
    { key: 'middle', label: t('levels.middle') },
    { key: 'high', label: t('levels.high') },
    { key: 'formation', label: t('levels.formation') },
  ];

  const subjects = [
    { key: 'math', label: t('subjects.math') },
    { key: 'physics', label: t('subjects.physics') },
    { key: 'philosophy', label: t('subjects.philosophy') },
    { key: 'history', label: t('subjects.history') },
    { key: 'arabic', label: t('subjects.arabic') },
    { key: 'french', label: t('subjects.french') },
    { key: 'english', label: t('subjects.english') },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-transparent">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-md text-center p-12 bg-white/60 backdrop-blur-xl border border-white/40 premium-shadow">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-serif text-navy mb-4 font-bold">{t('auth.registration.success_title')}</h2>
            <p className="text-navy/60 mb-8 leading-relaxed font-sans text-sm">
              {t('auth.registration.success_message')}
              <br />
              <span className="font-bold text-blue-accent mt-2 block">
                Veuillez finaliser l'envoi de votre message sur WhatsApp si la fenêtre s'est ouverte.
              </span>
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
    <div className="min-h-screen py-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-6 object-contain" />
          <Badge variant="navy">{t('auth.registration.step')}</Badge>
          <h1 className="text-4xl md:text-5xl font-serif text-navy mt-4 mb-4 font-bold">{t('auth.registration.title')}</h1>
          <p className="text-navy/60 italic font-sans">{t('auth.registration.form_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
              <div className="mb-8 p-1 bg-navy/5 rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all",
                    role === 'student' ? "bg-white text-blue-accent shadow-sm" : "text-navy/40 hover:text-navy/60"
                  )}
                >
                  <User size={18} />
                  {t('auth.registration.i_am_student')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all",
                    role === 'teacher' ? "bg-white text-blue-accent shadow-sm" : "text-navy/40 hover:text-navy/60"
                  )}
                >
                  <BookOpen size={18} />
                  {t('auth.registration.i_am_teacher')}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className={cn("text-xl font-serif text-navy mb-6 flex items-center gap-2 font-bold", isAr && "flex-row-reverse")}>
                    {role === 'student' ? (
                      <>
                        <User size={20} className="text-blue-accent" /> {t('auth.registration.student_info')}
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={20} className="text-blue-accent" /> {t('auth.registration.teacher_info')}
                      </>
                    )}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.username')}</label>
                      <div className="relative">
                        <User size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input name="username" type="text" required placeholder={t('auth.registration.username_placeholder')} className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.contact_email')}</label>
                      <div className="relative">
                        <Mail size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input name="email" type="email" required placeholder={t('auth.registration.email_placeholder')} className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.phone_number')}</label>
                      <div className="relative">
                        <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input name="phone" type="tel" placeholder={t('auth.registration.phone_placeholder')} dir="ltr" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>

                    {role === 'student' && (
                      <>
                        <div className="space-y-1 md:col-span-2">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.parent_phone')}</label>
                          <div className="relative">
                            <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <input name="parentPhone" type="tel" placeholder={t('auth.registration.phone_placeholder')} dir="ltr" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.desired_level')}</label>
                          <div className="relative">
                            <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select name="level" defaultValue="" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                              <option value="" disabled>{t('auth.registration.select_level')}</option>
                              {levels.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.academic_year')}</label>
                          <div className="relative">
                            <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select name="year" defaultValue="" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                              <option value="" disabled>{t('auth.registration.year_placeholder')}</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.subject')}</label>
                          <div className="relative">
                            <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select name="subject" defaultValue="" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                              <option value="" disabled>{t('auth.registration.subject_placeholder')}</option>
                              {subjects.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="navy" className="w-full py-5 text-white font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-accent/20 bg-blue-accent hover:bg-blue-accent/90">
                  {t('auth.registration.submit_button')}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-blue-accent/90 backdrop-blur-md text-white p-8 border-none ring-1 ring-white/20">
              <h4 className={cn("text-xl font-serif text-white mb-4 font-bold", isAr && "text-right")}>{t('auth.registration.important_title')}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className={cn("flex gap-3", isAr && "flex-row-reverse text-right")}>
                  <Info size={24} className="text-white shrink-0" />
                  <span className="text-white/90">{t('auth.registration.important_note_1')}</span>
                </li>
                <li className={cn("flex gap-3", isAr && "flex-row-reverse text-right")}>
                  <CheckCircle size={20} className="text-white shrink-0" />
                  <span className="text-white/90">{t('auth.registration.important_note_2')}</span>
                </li>
              </ul>
            </Card>
            
            <Card className={cn("p-8 bg-white/40 backdrop-blur-lg border-blue-accent/10 border-2 dashed", isAr && "text-right")}>
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
