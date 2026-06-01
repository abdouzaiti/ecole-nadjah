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

  const highSchoolStreams: Record<string, { id: string; name: string }[]> = {
    '1 AS': [
      { id: 'tc-st', name: isAr ? 'جذع مشترك علوم وتكنولوجيا' : 'Tronc Commun Sciences & Tech' },
      { id: 'tc-l', name: isAr ? 'جذع مشترك آداب' : 'Tronc Commun Lettres' }
    ],
    '2 AS': [
      { id: 'sci', name: isAr ? 'علوم تجريبية' : 'Sciences Expérimentales' },
      { id: 'math', name: isAr ? 'رياضيات' : 'Mathématiques' },
      { id: 'tech-math', name: isAr ? 'تقني رياضي' : 'Technique Mathématique' },
      { id: 'gestion', name: isAr ? 'تسيير واقتصاد' : 'Gestion & Économie' },
      { id: 'philo', name: isAr ? 'آداب وفلسفة' : 'Lettres & Philosophie' },
      { id: 'lang', name: isAr ? 'لغات أجنبية' : 'Langues Étrangères' }
    ],
    '3 AS': [
      { id: 'sci', name: isAr ? 'علوم تجريبية (ثالثة ثانوي)' : 'Sciences Expérimentales (3AS)' },
      { id: 'math', name: isAr ? 'رياضيات (ثالثة ثانوي)' : 'Mathématiques (3AS)' },
      { id: 'tech-math', name: isAr ? 'تقني رياضي (ثالثة ثانوي)' : 'Technique Mathématique (3AS)' },
      { id: 'gestion', name: isAr ? 'تسيير واقتصاد (ثالثة ثانوي)' : 'Gestion & Économie (3AS)' },
      { id: 'philo', name: isAr ? 'آداب وفلسفة (ثالثة ثانوي)' : 'Lettres & Philosophie (3AS)' },
      { id: 'lang', name: isAr ? 'لغات أجنبية (ثالثة ثانوي)' : 'Langues Étrangères (3AS)' }
    ]
  };

  const getSubjects = () => {
    if (selectedLevel === 'formation') {
      return [
        { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
        { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
        { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
        { id: 'de', name: isAr ? "لغة ألمانية" : "Allemand" },
        { id: 'es', name: isAr ? "لغة إسبانية" : "Espagnol" },
        { id: 'it', name: isAr ? "لغة إيطالية" : "Italien" },
        { id: 'info', name: isAr ? "إعلام آلي (Bureautique)" : "Informatique Bureautique" }
      ];
    }

    if (selectedLevel === 'primary') {
      return [
        { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
        { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
        { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
        { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
        { id: 'sci', name: isAr ? "تربية علمية وتكنولوجية" : "Éducation Scientifique" },
        { id: 'civ', name: isAr ? "تربية مدنية" : "Éducation Civique" },
        { id: 'islam', name: isAr ? "تربية إسلامية" : "Éducation Islamique" },
        { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" }
      ];
    }

    if (selectedLevel === 'middle') {
      return [
        { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
        { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
        { id: 'phys', name: isAr ? "علوم فيزيائية وتكنولوجيا" : "Physique" },
        { id: 'sci', name: isAr ? "علوم الطبيعة والحياة" : "Sciences de la Nature" },
        { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
        { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
        { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
        { id: 'islam', name: isAr ? "تربية إسلامية" : "Éducation Islamique" },
        { id: 'civ', name: isAr ? "تربية مدنية" : "Éducation Civique" }
      ];
    }

    if (selectedLevel === 'high') {
      if (!selectedYear) return [];

      if (selectedYear === '1 AS') {
        if (selectedStream === 'tc-st') {
          return [
            { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
            { id: 'phys', name: isAr ? "علوم فيزيائية" : "Sciences Physiques" },
            { id: 'sci', name: isAr ? "علوم الطبيعة والحياة" : "Sciences de la Nature" },
            { id: 'tech', name: isAr ? "تكنولوجيا" : "Technologie" },
            { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
            { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
            { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
            { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
            { id: 'islam', name: isAr ? "تربية إسلامية" : "Éducation Islamique" },
            { id: 'info', name: isAr ? "إعلام آلي" : "Informatique" }
          ];
        }
        if (selectedStream === 'tc-l') {
          return [
            { id: 'ar', name: isAr ? "لغة عربية وآدابها" : "Arabe & Littérature" },
            { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
            { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
            { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
            { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
            { id: 'islam', name: isAr ? "تربية إسلامية" : "Éducation Islamique" },
            { id: 'sci', name: isAr ? "علوم الطبيعة والحياة" : "Sciences" }
          ];
        }
        return [
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'phys', name: isAr ? "علوم فيزيائية" : "Sciences Physiques" },
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" }
        ];
      }

      if (selectedStream === 'sci') {
        return [
          { id: 'sci', name: isAr ? "علوم الطبيعة والحياة" : "Sciences de la Nature" },
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'phys', name: isAr ? "علوم فيزيائية" : "Sciences Physiques" },
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" },
          { id: 'philo', name: isAr ? "فلسفة" : "Philosophie" }
        ];
      }
      if (selectedStream === 'math') {
        return [
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'phys', name: isAr ? "علوم فيزيائية" : "Sciences Physiques" },
          { id: 'sci', name: isAr ? "علوم الطبيعة والحياة" : "Sciences de la Nature" },
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" },
          { id: 'philo', name: isAr ? "فلسفة" : "Philosophie" }
        ];
      }
      if (selectedStream === 'tech-math') {
        return [
          { id: 'tech', name: isAr ? "تكنولوجيا (هندسة)" : "Technologie (Génie)" },
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'phys', name: isAr ? "علوم فيزيائية" : "Sciences Physiques" },
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" },
          { id: 'philo', name: isAr ? "فلسفة" : "Philosophie" }
        ];
      }
      if (selectedStream === 'gestion') {
        return [
          { id: 'compta', name: isAr ? "تسيير محاسبي ومالي" : "Gestion Comptable & Financière" },
          { id: 'eco', name: isAr ? "اقتصاد ومناجمنت" : "Économie & Management" },
          { id: 'droit', name: isAr ? "قانون" : "Droit" },
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" }
        ];
      }
      if (selectedStream === 'philo') {
        return [
          { id: 'philo', name: isAr ? "فلسفة" : "Philosophie" },
          { id: 'ar', name: isAr ? "لغة عربية وآدابها" : "Arabe & Littérature" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" }
        ];
      }
      if (selectedStream === 'lang') {
        return [
          { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
          { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
          { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" },
          { id: 'es', name: isAr ? "لغة إسبانية" : "Espagnol" },
          { id: 'de', name: isAr ? "لغة ألمانية" : "Allemand" },
          { id: 'it', name: isAr ? "لغة إيطالية" : "Italien" },
          { id: 'hist-geo', name: isAr ? "تاريخ وجغرافيا" : "Histoire/Géographie" },
          { id: 'philo', name: isAr ? "فلسفة" : "Philosophie" },
          { id: 'islam', name: isAr ? "علوم إسلامية" : "Sciences Islamiques" }
        ];
      }

      return [
        { id: 'math', name: isAr ? "رياضيات" : "Mathématiques" },
        { id: 'phys', name: isAr ? "علوم فيزيائية" : "Physique" },
        { id: 'ar', name: isAr ? "لغة عربية" : "Arabe" },
        { id: 'fr', name: isAr ? "لغة فرنسية" : "Français" },
        { id: 'en', name: isAr ? "لغة إنجليزية" : "Anglais" }
      ];
    }

    return [];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const getLevelName = (lvl: string) => {
      const found = levels.find(l => l.id === lvl);
      return found ? found.name : lvl;
    };

    const getStreamName = (str: string) => {
      if (!selectedYear || !highSchoolStreams[selectedYear]) return str;
      const found = highSchoolStreams[selectedYear].find(s => s.id === str);
      return found ? found.name : str;
    };

    // WhatsApp message
    const whatsappNumber = "213657097226";
    let message = `*Nouvelle Inscription - École Nadjah*\n\n` +
                  `👤 *الاسم الكامل / Nom:* ${data.username}\n` +
                  `📧 *البريد الإلكتروني / Email:* ${data.email || 'N/A'}\n` +
                  `📱 *الهاتف / Téléphone:* ${data.phone}\n` +
                  (role === 'student' && data.parentPhone ? `📞 *هاتف الولي / Tél Parent:* ${data.parentPhone}\n` : '') +
                  `👨‍🏫 *الصفة / Rôle:* ${role === 'student' ? (isAr ? 'تلميذ' : 'Élève') : (isAr ? 'أستاذ' : 'Enseignant')}\n` +
                  `📚 *المستوى / Niveau:* ${getLevelName(selectedLevel)}\n` +
                  `📅 *السنة / Année:* ${selectedYear || 'N/A'}\n` +
                  (selectedLevel === 'high' && selectedStream ? `🧬 *الشعبة / Filière:* ${getStreamName(selectedStream)}\n` : '') +
                  `📖 *المادة / Matière:* ${selectedSubject}`;

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
                      setSelectedStream('');
                      setSelectedSubject('');
                    }} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                      <option value="">{t('auth.registration.select_level')}</option>
                      {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                  </div>

                  {years[selectedLevel] && (
                    <div className="relative">
                      <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                      <select name="year" onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedStream('');
                        setSelectedSubject('');
                      }} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                        <option value="">{t('auth.registration.year_placeholder')}</option>
                        {years[selectedLevel].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  )}

                  {selectedLevel === 'high' && selectedYear && highSchoolStreams[selectedYear] && (
                    <div className="relative md:col-span-2">
                      <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                      <select name="stream" onChange={(e) => {
                        setSelectedStream(e.target.value);
                        setSelectedSubject('');
                      }} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                        <option value="">{isAr ? "اختر الشعبة..." : "Choisir la filière / شعبة..."}</option>
                        {highSchoolStreams[selectedYear].map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="relative md:col-span-2">
                    <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                    <select name="subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}>
                      <option value="">{t('auth.registration.subject_placeholder')}</option>
                      {getSubjects().map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
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
                  href={`https://wa.me/213657097226?text=${encodeURIComponent(isAr ? "مرحباً، لدي استفسار بخصوص التسجيل في مدرسة النجاح." : "Bonjour, j'ai une question concernant l'inscription à l'école Nadjah.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("inline-flex items-center gap-2 text-green-600 font-bold hover:underline", isAr && "flex-row-reverse")}
                >
                  <Phone size={18} />
                  {isAr ? "اتصل بنا عبر WhatsApp" : "Contactez-nous sur WhatsApp"}
                </a>
                <a 
                  href="tel:+213657097226"
                  className={cn("inline-flex items-center gap-2 text-navy font-bold hover:underline", isAr && "flex-row-reverse")}
                >
                  <Phone size={18} />
                  {isAr ? "اتصل بنا هاتفياً: 0657097226" : "Appelez-nous : 0657097226"}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
