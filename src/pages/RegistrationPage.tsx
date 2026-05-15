import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { motion } from 'motion/react';
import { CheckCircle, Info, User, Mail, Phone, Calendar, BookOpen, ShieldCheck, Lock, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const levels = [
    { id: 'primary', name: isAr ? 'ابتدائي' : 'Primaire' },
    { id: 'middle', name: isAr ? 'متوسط' : 'Moyen' },
    { id: 'high', name: isAr ? 'ثانوي' : 'Secondaire' },
    { id: 'formation', name: isAr ? 'تكوين' : 'Formation' }
  ];

  const years: Record<string, string[]> = {
    primary: ['1 AP', '2 AP', '3 AP', '4 AP', '5 AP'],
    middle: ['1 AM', '2 AM', '3 AM', '4 AM'],
    high: ['1 AS', '2 AS', '3 AS'],
  };

  const getSubjects = () => {
    if (selectedLevel === 'formation') {
      return [
        isAr ? "لغة فرنسية" : "Français",
        isAr ? "لغة إنجليزية" : "Anglais",
        isAr ? "لغة عربية" : "Arabe",
        isAr ? "لغة ألمانية" : "Allemand",
        isAr ? "لغة إسبانية" : "Espagnol",
        isAr ? "إعلام آلي (Bureautique)" : "Informatique Bureautique"
      ];
    }
    return [
      isAr ? "رياضيات" : "Mathématique",
      isAr ? "فيزياء" : "Physique",
      isAr ? "علوم" : "Sciences",
      isAr ? "لغة عربية" : "Arabe",
      isAr ? "لغة فرنسية" : "Français",
      isAr ? "لغة إنجليزية" : "Anglais",
      isAr ? "تاريخ وجغرافيا" : "Histoire/Géo",
      isAr ? "فلسفة" : "Philosophie"
    ];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // WhatsApp message
    const whatsappNumber = "213790356012";
    let message = `*Nouvelle Inscription - École Nadjah*\n\n` +
                  `👤 *Nom:* ${data.username}\n` +
                  `📱 *Téléphone:* ${data.phone}\n` +
                  `👨‍🏫 *Role:* ${role === 'student' ? 'Élève' : 'Enseignant'}\n` +
                  `📚 *Niveau:* ${selectedLevel}\n` +
                  `📅 *Année:* ${selectedYear}\n` +
                  `📖 *Matière:* ${selectedSubject}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 relative">
          <Badge variant="navy" className="mb-4 bg-white/50 backdrop-blur-sm border-navy/10 px-6 py-1.5 text-xs tracking-widest uppercase font-bold">
            {t('auth.registration.step')}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif text-navy mt-2 mb-4 font-extrabold tracking-tighter">
            {isAr 
              ? (role === 'student' ? 'تسجيل طالب' : 'تسجيل أستاذ') 
              : (role === 'student' ? 'Inscription Élève' : 'Inscription Enseignant')
            }
          </h1>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
              <div className="mb-8 p-1 bg-navy/5 rounded-xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={cn("flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all", role === 'student' ? "bg-white text-blue-accent shadow-sm" : "text-navy/40 hover:text-navy/60")}
                >
                  <User size={18} />
                  {t('auth.registration.i_am_student')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={cn("flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all", role === 'teacher' ? "bg-white text-blue-accent shadow-sm" : "text-navy/40 hover:text-navy/60")}
                >
                  <BookOpen size={18} />
                  {t('auth.registration.i_am_teacher')}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative md:col-span-2">
                    <User size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                    <input name="username" type="text" required placeholder={t('auth.registration.username_placeholder')} className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                  </div>

                  <div className="relative">
                    <Mail size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                    <input name="email" type="email" required placeholder={t('auth.registration.email_placeholder')} className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                  </div>

                  <div className="relative">
                    <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                    <input name="phone" type="tel" placeholder={t('auth.registration.phone_placeholder')} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                  </div>

                  {role === 'student' && (
                    <div className="relative md:col-span-2">
                      <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                      <input name="parentPhone" type="tel" placeholder={t('auth.registration.parent_phone')} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                    </div>
                  )}

                  <div className="relative">
                    <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                  <select name="level" onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      setSelectedYear('');
                    }} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                      <option value="">{t('auth.registration.select_level')}</option>
                      {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  </div>

                  {years[selectedLevel] && (
                    <div className="relative">
                      <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                      <select name="year" onChange={(e) => setSelectedYear(e.target.value)} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                        <option value="">{t('auth.registration.year_placeholder')}</option>
                        {years[selectedLevel].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="relative md:col-span-2">
                    <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                    <select name="subject" onChange={(e) => setSelectedSubject(e.target.value)} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                      <option value="">{t('auth.registration.subject_placeholder')}</option>
                      {getSubjects().map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full py-6 text-xl bg-green-500 hover:bg-green-600 rounded-xl" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : t('auth.registration.submit_button')}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white p-6 shadow-sm border border-navy/10">
              <h4 className={cn("text-lg font-serif text-navy mb-3 font-bold", isAr && "text-right")}>
                {isAr ? "هل لديك استفسار؟" : "Besoin d'aide ?"}
              </h4>
              <p className={cn("text-navy/70 text-sm mb-4", isAr && "text-right")}>
                {isAr ? "لأي استفسار إضافي حول التسجيل، لا تتردد في الاتصال بنا." : "Pour toute question supplémentaire concernant l'inscription, n'hésitez pas à nous contacter."}
              </p>
              <div className="space-y-3">
                <a 
                  href={`https://wa.me/213790356012?text=${encodeURIComponent(isAr ? "مرحباً، لدي استفسار بخصوص التسجيل في مدرسة النجاح." : "Bonjour, j'ai une question concernant l'inscription à l'école Nadjah.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("inline-flex items-center gap-2 text-green-600 font-bold hover:underline", isAr && "flex-row-reverse")}
                >
                  <Phone size={18} />
                  {isAr ? "اتصل بنا عبر WhatsApp" : "Contactez-nous sur WhatsApp"}
                </a>
                <a 
                  href="tel:+213790356012"
                  className={cn("inline-flex items-center gap-2 text-navy font-bold hover:underline", isAr && "flex-row-reverse")}
                >
                  <Phone size={18} />
                  {isAr ? "اتصل بنا هاتفياً: 0790356012" : "Appelez-nous : 0790356012"}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
