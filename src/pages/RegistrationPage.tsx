import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { motion } from 'motion/react';
import { CheckCircle, Info, User, Mail, Phone, Calendar, BookOpen, ShieldCheck, Lock, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function RegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [dbLevels, setDbLevels] = useState<any[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  React.useEffect(() => {
    // Initial standard levels using the same UUIDs as the database schema for stability
    const standardLevels = [
      { id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', name: isAr ? 'ابتدائي' : 'Primaire', years: [{ id: 'y1', name: '1' }, { id: 'y2', name: '2' }, { id: 'y3', name: '3' }, { id: 'y4', name: '4' }, { id: 'y5', name: '5' }] },
      { id: 'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e', name: isAr ? 'متوسط' : 'Moyen', years: [{ id: 'y1', name: '1' }, { id: 'y2', name: '2' }, { id: 'y3', name: '3' }, { id: 'y4', name: '4' }] },
      { id: 'c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f', name: isAr ? 'ثانوي' : 'Secondaire', years: [{ id: 'y1', name: '1' }, { id: 'y2', name: '2' }, { id: 'y3', name: '3' }] },
      { id: 'd4e5f6a7-b8c9-4d8e-1f2a-3b4c5d6e7f8a', name: isAr ? 'تكوين' : 'Formation', years: [] }
    ];
    setDbLevels(standardLevels);

    const fetchLevels = async () => {
      try {
        console.log('Fetching levels from database...');
        const { data, error: fetchErr } = await supabase
          .from('levels')
          .select('*, years(*)');
        
        if (fetchErr) throw fetchErr;

        if (data && data.length > 0) {
          console.log('Successfully fetched levels:', data.length);
          setDbLevels(data);
        }
      } catch (err) {
        console.error('Error fetching levels:', err);
      }
    };
    fetchLevels();
  }, [isAr]);

  const getLevelKey = (id: string) => {
    if (id === 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d') return 'primary';
    if (id === 'b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e') return 'middle';
    if (id === 'c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f') return 'high';
    if (id === 'd4e5f6a7-b8c9-4d8e-1f2a-3b4c5d6e7f8a') return 'formation';
    
    const level = dbLevels.find(l => l.id === id);
    if (!level) return '';
    const name = level.name.toLowerCase();
    // English/French keywords
    if (name.includes('prim')) return 'primary';
    if (name.includes('moy') || name.includes('mid') || name.includes('middle')) return 'middle';
    if (name.includes('lyc') || name.includes('high') || name.includes('second')) return 'high';
    if (name.includes('form')) return 'formation';
    // Arabic keywords
    if (name.includes('ابتدائ') || name.includes('إبتدائ')) return 'primary';
    if (name.includes('متوسط')) return 'middle';
    if (name.includes('ثانوي')) return 'high';
    if (name.includes('تكوين')) return 'formation';
    return '';
  };

  const getYearName = (id: string) => {
    const level = dbLevels.find(l => l.id === selectedLevel);
    if (!level || !level.years) return '';
    const year = level.years.find((y: any) => y.id === id);
    return year ? year.name : '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // 1. Sign up user in Supabase Auth
      console.log('Attempting auth signUp for:', data.email);
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email as string,
        password: data.password as string,
        options: {
          data: {
            full_name: data.username,
            role: role.toUpperCase(),
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered') || signUpError.status === 400) {
          setError(isAr ? "هذا الحساب موجود بالفعل. يرجى تسجيل الدخول." : "This email is already registered. Please login instead.");
          setLoading(false);
          return;
        }
        throw signUpError;
      }
      if (!authData.user) throw new Error('Signup failed');
      console.log('Auth signUp success, user ID:', authData.user.id);

      // 2. Insert into registration_requests for admin approval
      const requestPayload: any = {
        id: authData.user.id,
        full_name: data.username,
        email: data.email,
        phone: data.phone,
        role: role.toUpperCase(),
        status: 'PENDING'
      };

      // Ensure UUID format for foreign keys
      const isUUID = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

      if (selectedLevel && isUUID(selectedLevel)) {
        requestPayload.level_id = selectedLevel;
      }
      
      if (selectedYear && isUUID(selectedYear)) {
        requestPayload.year_id = selectedYear;
      }
      
      if (data.subject) {
        const subjectsList = subjectsByContext();
        const subjectObj = subjectsList.find((s: any) => s.key === data.subject);
        requestPayload.subject_name = subjectObj ? subjectObj.label : (data.subject as string);
      }
      
      if (data.parentPhone) requestPayload.parent_phone = data.parentPhone;

      console.log('Inserting registration request:', requestPayload);
      
      // Try to insert - we use upsert to handle case where user might have been created but request failed previously
      const { error: requestError } = await supabase
        .from('registration_requests')
        .upsert([requestPayload], { onConflict: 'id' });

      if (requestError) {
        console.error('Registration table error:', requestError);
        // Provide very specific feedback for common issues
        if (requestError.code === '42703') { // Column not found
          setError(isAr ? "خطأ في بنية قاعدة البيانات (عمود مفقود)" : "Database schema error: Missing columns in registration_requests.");
        } else if (requestError.code === '23503') { // FK violation
          setError(isAr ? "خطأ في المراجعة (المستوى أو السنة غير موجودة)" : "Referential error: Level or Year ID not found in database.");
        } else {
          setError(`DB Error: ${requestError.message}`);
        }
        setLoading(false);
        return;
      }

      console.log('Registration request inserted successfully');

      // WhatsApp message (Keeping it as requested for multi-channel notification)
      const whatsappNumber = "213790356012";
      let message = "";
      
      const levelName = dbLevels.find(l => l.id === selectedLevel)?.name || '';
      const yearName = getYearName(selectedYear);

      if (role === 'teacher') {
        message = `*Nouveau Dossier d'Enseignant - École Nadjah*\n\n` +
                  `👤 *Nom:* ${data.username}\n` +
                  `📧 *Email:* ${data.email}\n` +
                  `📱 *Téléphone:* ${data.phone}\n` +
                  `👨‍🏫 *Role:* Enseignant\n` +
                  `📚 *Niveau:* ${levelName}\n` +
                  `📅 *Année:* ${yearName}\n` +
                  `📖 *Matière:* ${data.subject}`;
      } else if (role === 'admin') {
        message = `*Nouveau Dossier d'Administrateur - École Nadjah*\n\n` +
                  `👤 *Nom:* ${data.username}\n` +
                  `📧 *Email:* ${data.email}\n` +
                  `📱 *Téléphone:* ${data.phone}\n` +
                  `🛡️ *Role:* Admin`;
      } else {
        message = `*Nouveau Dossier d'Élève - École Nadjah*\n\n` +
                  `👤 *Nom:* ${data.username}\n` +
                  `📧 *Email:* ${data.email}\n` +
                  `📱 *Téléphone:* ${data.phone}\n` +
                  `👨‍👩‍👧‍👦 *Parent:* ${data.parentPhone}\n` +
                  `📚 *Niveau:* ${levelName}\n` +
                  `📅 *Année:* ${yearName}\n` +
                  `📖 *Matière:* ${data.subject}`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
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

  const subjectsByContext = () => {
    const levelKey = getLevelKey(selectedLevel);
    if (!levelKey) return [];
    
    const yearName = getYearName(selectedYear);

    if (levelKey === 'primary') {
      if (['1', '2'].includes(yearName)) {
        return [
          { key: 'ar', label: isAr ? "اللغة العربية" : "Arabe" },
          { key: 'math', label: isAr ? "الرياضيات" : "Mathématique" },
          { key: 'islamic', label: isAr ? "التربية الإسلامية" : "Éducation Islamique" },
          { key: 'civic', label: isAr ? "التربية المدنية" : "Éducation Civique" },
          { key: 'scientific', label: isAr ? "التربية العلمية" : "Éducation Scientifique" },
          { key: 'pe', label: isAr ? "التربية البدنية" : "Éducation Physique" },
          { key: 'art', label: isAr ? "التربية الفنية" : "Éducation Artistique" },
        ];
      }
      return [
        { key: 'ar', label: isAr ? "اللغة العربية" : "Arabe" },
        { key: 'math', label: isAr ? "الرياضيات" : "Mathématique" },
        { key: 'fr', label: isAr ? "اللغة الفرنسية" : "Français" },
        { key: 'en', label: isAr ? "اللغة الإنجليزية" : "Anglais" },
        { key: 'hist_geo', label: isAr ? "التاريخ والجغرافيا" : "Histoire/Géo" },
        { key: 'islamic', label: isAr ? "التربية الإسلامية" : "Éducation Islamique" },
        { key: 'civic', label: isAr ? "التربية المدنية" : "Éducation Civique" },
        { key: 'scientific', label: isAr ? "التربية العلمية" : "Éducation Scientifique" },
        { key: 'pe', label: isAr ? "التربية البدنية" : "Éducation Physique" },
        { key: 'art', label: isAr ? "التربية الفنية" : "Éducation Artistique" },
      ];
    }

    if (levelKey === 'middle') {
      return [
        { key: 'ar', label: isAr ? "اللغة العربية" : "Arabe" },
        { key: 'math', label: isAr ? "الرياضيات" : "Mathématique" },
        { key: 'fr', label: isAr ? "اللغة الفرنسية" : "Français" },
        { key: 'en', label: isAr ? "اللغة الإنجليزية" : "Anglais" },
        { key: 'science', label: isAr ? "العلوم الطبيعية" : "Sciences Naturelles" },
        { key: 'physics', label: isAr ? "العلوم الفيزيائية" : "Physique" },
        { key: 'hist_geo', label: isAr ? "التاريخ والجغرافيا" : "Histoire/Géo" },
        { key: 'islamic', label: isAr ? "التربية الإسلامية" : "Éducation Islamique" },
        { key: 'civic', label: isAr ? "التربية المدنية" : "Éducation Civique" },
        { key: 'pe', label: isAr ? "التربية البدنية" : "Éducation Physique" },
        { key: 'it', label: isAr ? "المعلوماتية" : "Informatique" },
        { key: 'art', label: isAr ? "التربية الفنية/الموسيقية" : "Arts/Musique" },
      ];
    }

    if (levelKey === 'high') {
      if (yearName === '1') {
        if (selectedStream === 'science') {
          return [
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'physics', label: isAr ? "فيزياء" : "Physique" },
            { key: 'science', label: isAr ? "علوم طبيعية" : "SVT" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'tech', label: isAr ? "تكنولوجيا" : "Techno" },
            { key: 'it', label: isAr ? "إعلام آلي" : "Informatique" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ];
        }
        if (selectedStream === 'arts') {
          return [
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'fr', label: isAr ? "لغة فرنسية" : "Français" },
            { key: 'en', label: isAr ? "لغة إنجليزية" : "Anglais" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'science', label: isAr ? "علوم طبيعية" : "SVT" },
            { key: 'lang3', label: isAr ? "لغة حية ثالثة" : "Langue 3" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ];
        }
      } else if (['2', '3'].includes(yearName)) {
        const branchSubjects: Record<string, any[]> = {
          exp_science: [
            { key: 'science', label: isAr ? "علوم طبيعية" : "SVT" },
            { key: 'physics', label: isAr ? "فيزياء" : "Physique" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ],
          math: [
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'physics', label: isAr ? "فيزياء" : "Physique" },
            { key: 'science', label: isAr ? "علوم طبيعية" : "SVT" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ],
          tech_math: [
            { key: 'tech', label: isAr ? "تكنولوجيا" : "Techno" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'physics', label: isAr ? "فيزياء" : "Physique" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ],
          mgt_eco: [
            { key: 'mgt', label: isAr ? "تسيير محاسبي ومالي" : "Gestion/Finance" },
            { key: 'eco', label: isAr ? "اقتصاد ومناجم" : "Eco" },
            { key: 'law', label: isAr ? "قانون" : "Droit" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ],
          arts_phil: [
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'fr', label: isAr ? "فرنسية" : "Français" },
            { key: 'en', label: isAr ? "إنجليزية" : "Anglais" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ],
          languages: [
            { key: 'ar', label: isAr ? "لغة عربية" : "Arabe" },
            { key: 'fr', label: isAr ? "لغة فرنسية" : "Français" },
            { key: 'en', label: isAr ? "لغة إنجليزية" : "Anglais" },
            { key: 'lang3', label: isAr ? "لغة أجنبية ثالثة" : "Langue 3" },
            { key: 'phil', label: isAr ? "فلسفة" : "Philo" },
            { key: 'hist_geo', label: isAr ? "تاريخ وجغرافيا" : "Histoire/Géo" },
            { key: 'math', label: isAr ? "رياضيات" : "Maths" },
            { key: 'islamic', label: isAr ? "تربية إسلامية" : "Religion" },
            { key: 'pe', label: isAr ? "تربية بدنية" : "EPS" },
          ]
        };
        return branchSubjects[selectedStream] || [];
      }
    }

    if (selectedLevel === 'formation') {
      return [
        { key: 'ar', label: isAr ? "اللغة العربية" : "Arabe" },
        { key: 'fr', label: isAr ? "اللغة الفرنسية" : "Français" },
        { key: 'es', label: isAr ? "اللغة الإسبانية" : "Espagnol" },
        { key: 'de', label: isAr ? "اللغة الألمانية" : "Allemand" },
        { key: 'en', label: isAr ? "اللغة الإنجليزية" : "Anglais" },
      ];
    }

    return subjects;
  };

  const getStreams = () => {
    if (selectedLevel !== 'high') return [];
    if (selectedYear === '1') {
      return [
        { key: 'science', label: isAr ? "جذع مشترك علوم وتكنولوجيا" : "Tronc Commun Sciences" },
        { key: 'arts', label: isAr ? "جذع مشترك آداب" : "Tronc Commun Lettres" },
      ];
    }
    return [
      { key: 'exp_science', label: isAr ? "شعبة العلوم التجريبية" : "Sciences Expérimentales" },
      { key: 'math', label: isAr ? "شعبة الرياضيات" : "Mathématiques" },
      { key: 'tech_math', label: isAr ? "شعبة تقني رياضي" : "Technique Math" },
      { key: 'mgt_eco', label: isAr ? "شعبة تسيير واقتصاد" : "Gestion & Économie" },
      { key: 'arts_phil', label: isAr ? "شعبة آداب وفلسفة" : "Lettres & Philosophie" },
      { key: 'languages', label: isAr ? "شعبة لغات أجنبية" : "Langues Étrangères" },
    ];
  };

  const getYearsForLevel = (level: string) => {
    switch (level) {
      case 'primary': return [1, 2, 3, 4, 5];
      case 'middle': return [1, 2, 3, 4];
      case 'high': return [1, 2, 3];
      case 'formation': return [];
      default: return [1];
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-transparent">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-md text-center p-12 bg-white/60 backdrop-blur-xl border border-white/40 premium-shadow">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-serif text-navy mb-4 font-bold">{t('auth.registration.success_title')}</h2>
            <div className="space-y-4 text-navy/60 mb-8 leading-relaxed font-sans text-sm">
              <p>
                {isAr 
                  ? "لقد تم استلام طلبك بنجاح. سنقوم بمراجعة حسابك والرد عليك في أقرب وقت ممكن عبر WhatsApp أو البريد الإلكتروني."
                  : "Votre demande a été reçue avec succès. Nous allons examiner votre compte et vous répondrons dans les plus brefs délais via WhatsApp ou Email."
                }
              </p>
              <div className="p-4 bg-blue-accent/5 rounded-xl text-blue-accent font-bold">
                {isAr 
                  ? "يرجى الانتظار حتى يقوم المدير بتفعيل حسابك."
                  : "Veuillez patienter jusqu'à ce que l'administrateur active votre compte."
                }
              </div>
              <p className="text-xs italic">
                {isAr
                  ? "يرجى التأكد من إرسال الرسالة إلى WhatsApp إذا تم فتح النافذة."
                  : "Veuillez finaliser l'envoi de votre message sur WhatsApp si la fenêtre s'est ouverte."
                }
              </p>
            </div>
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
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-bold transition-all",
                    role === 'admin' ? "bg-white text-blue-accent shadow-sm" : "text-navy/40 hover:text-navy/60"
                  )}
                >
                  <ShieldCheck size={18} />
                  {t('auth.roles.admin') || 'Admin'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-xl flex flex-col gap-2 text-red-600 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                    {error.includes('registered') && (
                      <Link to="/login" className="text-blue-600 font-bold hover:underline px-7">
                        {isAr ? "انتقل إلى صفحة تسجيل الدخول" : "Go to login page"} &rarr;
                      </Link>
                    )}
                  </motion.div>
                )}

                <div>
                  <h3 className={cn("text-xl font-serif text-navy mb-6 flex items-center gap-2 font-bold", isAr && "flex-row-reverse")}>
                    {role === 'student' ? (
                      <>
                        <User size={20} className="text-blue-accent" /> {t('auth.registration.student_info')}
                      </>
                    ) : role === 'teacher' ? (
                      <>
                        <ShieldCheck size={20} className="text-blue-accent" /> {t('auth.registration.teacher_info')}
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={20} className="text-blue-accent" /> {t('auth.roles.admin') || 'Admin'}
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
                      <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.password_placeholder')}</label>
                      <div className="relative">
                        <Lock size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input name="password" type="password" required minLength={6} placeholder="••••••••" className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                       <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.phone_number')}</label>
                      <div className="relative">
                        <Phone size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                        <input name="phone" type="tel" placeholder={t('auth.registration.phone_placeholder')} dir="ltr" required className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")} />
                      </div>
                    </div>

                    {role === 'teacher' && (
                      <>
                        <div className="space-y-1">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.desired_level')}</label>
                          <div className="relative">
                            <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select 
                              name="level" 
                              value={selectedLevel} 
                              required 
                              onChange={(e) => {
                                setSelectedLevel(e.target.value);
                                setSelectedYear('');
                                setSelectedStream('');
                              }}
                              className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                            >
                              <option value="" disabled>{t('auth.registration.select_level')}</option>
                              {dbLevels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                          </div>
                        </div>

                        {getLevelKey(selectedLevel) && getLevelKey(selectedLevel) !== 'formation' && (
                          <div className="space-y-1">
                            <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.academic_year')}</label>
                            <div className="relative">
                              <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                              <select 
                                name="year" 
                                value={selectedYear}
                                required 
                                onChange={(e) => {
                                  setSelectedYear(e.target.value);
                                  setSelectedStream('');
                                }}
                                className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                              >
                                <option value="" disabled>{t('auth.registration.year_placeholder')}</option>
                                {dbLevels.find(l => l.id === selectedLevel)?.years?.map((y: any) => (
                                  <option key={y.id} value={y.id}>{y.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {getLevelKey(selectedLevel) === 'high' && (
                          <div className="space-y-1 md:col-span-2">
                            <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>
                              {isAr ? "الشعبة / الجذع المشترك" : "Filière / Tronc Commun"}
                            </label>
                            <div className="relative">
                              <ShieldCheck size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                              <select 
                                name="stream"
                                value={selectedStream}
                                required
                                onChange={(e) => setSelectedStream(e.target.value)}
                                className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                              >
                                <option value="" disabled>{isAr ? "اختر الشعبة..." : "Choisir la filière..."}</option>
                                {getStreams().map(s => (
                                  <option key={s.key} value={s.key}>{s.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1 md:col-span-2">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.subject')}</label>
                          <div className="relative">
                            <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select 
                              name="subject" 
                              required 
                              className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                            >
                              <option value="" disabled>{t('auth.registration.subject_placeholder')}</option>
                              {subjectsByContext().map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

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
                            <select 
                              name="level" 
                              value={selectedLevel}
                              required 
                              onChange={(e) => {
                                setSelectedLevel(e.target.value);
                                setSelectedYear('');
                                setSelectedStream('');
                              }}
                              className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                            >
                              <option value="" disabled>{t('auth.registration.select_level')}</option>
                              {dbLevels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                          </div>
                        </div>

                        {getLevelKey(selectedLevel) && getLevelKey(selectedLevel) !== 'formation' && (
                          <div className="space-y-1">
                            <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.academic_year')}</label>
                            <div className="relative">
                              <Calendar size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                              <select 
                                name="year" 
                                value={selectedYear}
                                required 
                                onChange={(e) => {
                                  setSelectedYear(e.target.value);
                                  setSelectedStream('');
                                }}
                                className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                              >
                                <option value="" disabled>{t('auth.registration.year_placeholder')}</option>
                                {dbLevels.find(l => l.id === selectedLevel)?.years?.map((y: any) => (
                                  <option key={y.id} value={y.id}>{y.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        {getLevelKey(selectedLevel) === 'high' && (
                          <div className="space-y-1 md:col-span-2">
                            <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>
                              {isAr ? "الشعبة / الجذع المشترك" : "Filière / Tronc Commun"}
                            </label>
                            <div className="relative">
                              <ShieldCheck size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                              <select 
                                name="stream"
                                value={selectedStream}
                                required
                                onChange={(e) => setSelectedStream(e.target.value)}
                                className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                              >
                                <option value="" disabled>{isAr ? "اختر الشعبة..." : "Choisir la filière..."}</option>
                                {getStreams().map(s => (
                                  <option key={s.key} value={s.key}>{s.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1 md:col-span-2">
                          <label className={cn("text-xs font-bold uppercase tracking-widest text-navy/40 px-1 block", isAr && "text-right")}>{t('auth.registration.subject')}</label>
                          <div className="relative">
                            <BookOpen size={18} className={cn("absolute top-1/2 -translate-y-1/2 text-navy/20", isAr ? "right-4" : "left-4")} />
                            <select 
                              name="subject" 
                              required 
                              className={cn("w-full py-4 bg-white/40 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-accent outline-none appearance-none", isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left")}
                            >
                              <option value="" disabled>{t('auth.registration.subject_placeholder')}</option>
                              {subjectsByContext().map((s: any) => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="navy" 
                  disabled={loading}
                  className="w-full py-5 text-white font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-accent/20 bg-blue-accent hover:bg-blue-accent/90"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : t('auth.registration.submit_button')}
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
              <a href="tel:0790356012" className="block w-full">
                 <Button variant="outline" size="sm" className="w-full">
                    {t('contact_us')}
                 </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
