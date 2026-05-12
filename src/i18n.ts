import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      "school_name": "مدرسة النجاح",
      "tagline": "التميز والرؤية",
      "enrollment_open": "التسجيلات مفتوحة 2026-2027",
      "hero_title": "مدرسة النجاح :",
      "hero_subtitle": "التميز الرقمي",
      "hero_description": "مرحباً بكم في المنصة الرسمية لمدرسة النجاح. منظومة تعليمية كاملة توفر دروساً مباشرة، وصولاً غير محدود لإعادة الدروس بجودة عالية، متابعة تربوية فورية وخدمات إدارية متكاملة لضمان النجاح. وهي أول مدرسة تطلق نظاماً تعليمياً رقمياً متكاملاً عبر منصتها الخاصة.",
      "discover_school": "اكتشف المدرسة",
      "learn_more": "اعرف المزيد",
      "path_subtitle": "مسار تعليمي كامل، من الخطوة الأولى إلى الجامعة.",
      "view_google_maps": "عرض على خرائط جوجل",
      "open_maps_app": "فتح تطبيق الخرائط",
      "register_now": "سجل الآن",
      "close": "إغلاق",
      "login": "تسجيل الدخول",
      "all": "الكل",
      "our_pillars": "ركائزنا",
      "prestige_education": "تعليم متميز",
      "digital_learning": "التعلم الرقمي",
      "digital_learning_desc": "منصة تفاعلية متكاملة لمتابعة هجينة فعالة.",
      "personalized_teaching": "تعليم مخصص",
      "personalized_teaching_desc": "أقسام مصغرة لاهتمام مخصص بكل تلميذ.",
      "contact_us": "اتصل بنا",
      "location": "مستغانم، الجزائر",
      "footer_rights": "© 2026 مدرسة النجاح. جميع الحقوق محفوظة. تصميم التميز.",
      "stats": {
        "students": "تلميذ",
        "bac_success": "نجاح في البكالوريا",
        "teachers": "أستاذ",
        "online_courses": "دروس عبر الإنترنت"
      },
      "levels": {
        "primary": "ابتدائي",
        "primary_desc": "إرساء أسس تعلم قوية ببيداغوجيا رعاية.",
        "middle": "متوسط",
        "middle_desc": "مواكبة الانتقال نحو المراهقة وتعزيز المكتسبات الأكاديمية.",
        "high": "ثانوي",
        "high_desc": "إعداد التميز للبكالوريا والتوجيه الجامعي.",
        "formation": "تكوين",
        "formation_desc": "برامج تدريبية متخصصة لتطوير المهارات العملية والمهنية.",
        "courses": "دورات تقوية",
        "courses_desc": "حصص دعم مكثفة في المواد الأساسية لمواجهة صعوبات التعلم والتميز الدراسي.",
        "details": {
          "primary": ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة", "السنة الخامسة"],
          "middle": ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة"],
          "high": ["السنة الأولى", "السنة الثانية", "السنة الثالثة"],
          "formation": ["المعلوماتية", "الهندسة المعمارية", "التصميم", "اللغات"],
          "courses": ["التاريخ والجغرافيا", "الرياضيات", "اللغة العربية", "الفيزياء", "الفلسفة"]
        }
      },
      "why_us": {
        "title": "لماذا تختارنا ؟",
        "subtitle": "تعليم متميز"
      },
      "about": {
        "title": "قصتنا ومهمتنا",
        "description1": "مدرسة النجاح بمستغانم ليست مجرد مؤسسة تعليمية، بل هي صرح أكاديمي رائد يجمع بين الأصالة التربوية والابتكار الرقمي، لتوفير تجربة تعليمية استثنائية لطلابنا.",
        "description2": "نحن فخورون بكوننا أول مدرسة في المنطقة تمتلك منصة تعليمية رقمية متكاملة خاصة بها، مصممة بأحدث التقنيات لخدمة أبنائنا وتوفير متابعة ذكية وشاملة تضمن التميز والنجاح.",
        "years_exp": "سنة من الخبرة",
        "graduates": "خريج ناجح"
      },
      "form": {
        "title": "أرسل رسالة",
        "name": "الاسم",
        "email": "البريد الإلكتروني",
        "subject": "الموضوع",
        "message": "الرسالة",
        "send": "إرسال الرسالة"
      },
      "auth": {
        "welcome": "مرحباً بكم",
        "access_secure": "ادخل إلى مساحتك الآمنة",
        "email_placeholder": "البريد الإلكتروني الأكاديمي",
        "password_placeholder": "كلمة المرور",
        "remember_me": "تذكرني",
        "forgot_password": "نسيت كلمة المرور؟",
        "login_button": "تسجيل الدخول",
        "no_account": "ليس لديك حساب بعد؟",
        "register_here": "سجل هنا",
        "roles": {
          "student": "تلميذ",
          "teacher": "أستاذ",
          "admin": "مسؤول"
        },
        "registration": {
          "title": "تسجيل طالب",
          "step": "خطوة 1 من 2",
          "form_subtitle": "يرجى ملء النموذج أدناه بالمعلومات الصحيحة.",
          "student_info": "معلومات التلميذ",
          "teacher_info": "معلومات الأستاذ",
          "role_selection": "من أنت؟",
          "i_am_student": "أنا تلميذ",
          "i_am_teacher": "أنا أستاذ",
          "username": "اسم المستخدم",
          "academic_year": "السنة الدراسية",
          "subject": "المادة",
          "parent_phone": "رقم هاتف ولي الأمر",
          "subject_placeholder": "اختر المادة...",
          "year_placeholder": "اختر السنة...",
          "username_placeholder": "اسم المستخدم...",
          "parent_info": "ولي الأمر / الوصي",
          "first_name": "الاسم",
          "last_name": "اللقب",
          "birth_date": "تاريخ الميلاد",
          "desired_level": "المستوى المطلوب",
          "parent_name": "الاسم الكامل لولي الأمر",
          "contact_email": "بريد الاتصال",
          "phone_number": "رقم الهاتف",
          "phone_placeholder": "...0",
          "date_placeholder": "يوم/شهر/سنة",
          "first_name_placeholder": "الاسم الشخصي...",
          "last_name_placeholder": "اللقب العائلي...",
          "parent_name_placeholder": "الاسم واللقب لولي الأمر...",
          "email_placeholder": "example@email.com",
          "select_level": "اختر المستوى...",
          "submit_button": "تقديم ملفي",
          "success_title": "تم إرسال الطلب !",
          "success_message": "لقد تم استلام طلب تسجيلك بنجاح. سيقوم فريقنا الإداري بدراسة ملفك والاتصال بك هاتفياً خلال 48 ساعة.",
          "back_home": "العودة إلى الرئيسية",
          "important_title": "معلومات هامة",
          "important_note_1": "يجب إيداع الملف الكامل في المدرسة بعد القبول الأولي.",
          "important_note_2": "الأماكن محدودة لكل مستوى.",
          "need_help": "هل تحتاج لمساعدة في التسجيل؟",
          "help_desc": "هل تحتاج لمساعدة في ملء النموذج أو معلومات حول أسعارنا؟"
        }
      },
      "dashboard": {
        "sidebar": {
          "library": "مكتبتي",
          "live": "الحصص المباشرة",
          "notes": "ملاحظاتي",
          "resources": "الموارد",
          "users": "المستخدمون",
          "analytics": "التحليلات",
          "settings": "الإعدادات",
          "logout": "تسجيل الخروج"
        },
        "search_placeholder": "ابحث عن الموارد، الدروس، التلاميذ...",
        "student": {
          "welcome": "مرحباً",
          "motivation": "« التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم »",
          "completed_courses": "دروس مكتملة",
          "continue_watching": "متابعة القراءة",
          "see_all": "عرض الكل",
          "remaining": "متبقية",
          "resume_course": "استئناف الدرس",
          "progression": "التقدم",
          "new_uploads": "جديد",
          "upcoming_live": "بث مباشر قادم",
          "live_now": "مباشر",
          "joining_live": "انضمام",
          "reminder": "تذكير",
          "coming_soon": "قريباً",
          "live": {
            "waiting_stream": "في انتظار البث",
            "participants": "مشارك",
            "chat": "الدردشة المباشرة",
            "write_message": "اكتب رسالة...",
            "quit": "خروج"
          }
        },
        "placeholders": {
          "course_title": "المتتاليات العددية: التقارب والنهايات",
          "course_desc": "تعمق هذه الوحدة في مفاهيم نهايات المتتاليات ومعايير التقارب الضرورية للبكالوريا.",
          "live_title_math": "مراجعة البكالوريا: الجبر الخطي",
          "live_desc_math": "تبدأ حصتك للمراجعة المكثفة الآن. 124 تلميذ في الانتظار."
        },
        "teacher": {
          "sidebar": {
            "my_space": "مساحتي",
            "my_courses": "دروسي",
            "schedule": "جدول المواعيد",
            "students": "التلاميذ"
          },
          "welcome": "فضاء الأستاذ",
          "subtitle": "حضّر دروسك وقم بتسيير مواردك التعليمية.",
          "plan_session": "جدولة حصة",
          "new_course": "درس جديد",
          "live_detected": "تم اكتشاف حصة مباشرة",
          "launch_live": "إطلاق البث",
          "waiting_students": "في الانتظار",
          "rec_duration": "المدة المقترحة",
          "recent_courses": "دروسِي الأخيرة",
          "manage_all": "تسيير الكل",
          "today": "اليوم",
          "pedagogical_tip": "نصيحة تربوية",
          "tip_desc": "تتمتع حصص الصباح بمعدل تفاعل أعلى بنسبة 30٪. فكر في جدولة مراجعاتك الرئيسية قبل الظهر."
        },
        "replays": {
          "title": "مكتبة الإعادات",
          "subtitle": "تجد هنا جميع دروسك المسجلة للمراجعة.",
          "search_placeholder": "البحث بالعنوان...",
          "filters": {
            "all": "الكل",
            "recent": "الأحدث",
            "popular": "الشائع",
            "favorites": "المفضلة"
          },
          "published_on": "نشر في",
          "watch": "مشاهدة"
        },
        "admin": {
          "sidebar": {
            "overview": "نظرة عامة",
            "registrations": "التسجيلات",
            "analytics": "التحليلات"
          },
          "welcome": "لوحة تحكم المسؤول",
          "subtitle": "مرحباً، إليك نظرة عامة على المدرسة اليوم.",
          "stats": {
            "total_students": "إجمالي التلاميذ",
            "active_courses": "دروس نشطة",
            "teachers": "الأساتذة",
            "revenue": "رقم الأعمال"
          },
          "recent_registrations": "التسجيلات الأخيرة",
          "recent_activities": "الأنشطة الأخيرة",
          "table": {
            "student": "التلميذ",
            "level": "المستوى",
            "status": "الحالة",
            "date": "التاريخ",
            "actions": "الإجراءات"
          },
          "activity_report": "تقرير النشاط الكامل",
          "activities": [
            { "user": "أ. يسين", "action": "أضاف درساً جديداً", "time": "منذ 10 دقائق" },
            { "user": "نظام الإدارة", "action": "تحديث خطة الدرس", "time": "منذ ساعة" },
            { "user": "أميرة قاسي", "action": "قدمت طلب تسجيلها", "time": "منذ 3 ساعات" },
            { "user": "د. سارة", "action": "أنهت حصة مباشرة", "time": "منذ 5 ساعات" }
          ]
        }
      },
      "nav": {
        "home": "الرئيسية",
        "programs": "البرامج",
        "about": "عن المدرسة",
        "contact": "اتصل بنا",
        "logout": "خروج",
        "my_dashboard": "لوحة تحكمي"
      },
      "chatbot": {
        "name": "مساعد النجاح",
        "welcome_msg": "مرحباً! أنا مساعد مدرسة النجاح. كيف يمكنني مساعدتك اليوم؟",
        "placeholder": "اكتب رسالتك هنا...",
        "error": "عذراً، حدث خطأ ما. يرجى المحاولة لاحقاً."
      },
      "subjects": {
        "math": "الرياضيات",
        "physics": "الفيزياء",
        "philosophy": "الفلسفة",
        "history": "التاريخ والجغرافيا",
        "arabic": "اللغة العربية",
        "french": "اللغة الفرنسية",
        "english": "اللغة الإنجليزية"
      }
    }
  },
  fr: {
    translation: {
      "school_name": "ÉCOLE NADJAH",
      "tagline": "Excellence & Vision",
      "enrollment_open": "Inscriptions Ouvertes 2026-2027",
      "hero_title": "ÉCOLE NADJAH :",
      "hero_subtitle": "L'Excellence Digitale",
      "hero_description": "Bienvenue sur la plateforme officielle de l'ÉCOLE NADJAH. Un écosystème éducatif complet offrant des cours en direct, un accès illimité aux replays HD, un suivi pédagogique instantané et une gestion administrative simplifiée pour une réussite garantie. Nous sommes la première école à lancer un système éducatif numérique intégré via sa propre plateforme.",
      "discover_school": "Découvrir l’École",
      "learn_more": "En savoir plus",
      "path_subtitle": "Un parcours éducatif complet, de la petite section à l'université.",
      "view_google_maps": "Voir sur Google Maps",
      "open_maps_app": "Ouvrir l'application Maps",
      "register_now": "S'inscrire Maintenant",
      "close": "Fermer",
      "login": "Se Connecter",
      "all": "Tous",
      "our_pillars": "Nos Piliers",
      "prestige_education": "Une Éducation de Prestige",
      "digital_learning": "Digital Learning",
      "digital_learning_desc": "Plateforme interactive intégrée pour un suivi hybride efficace.",
      "personalized_teaching": "Enseignement Personnalisé",
      "personalized_teaching_desc": "Des classes réduites pour une attention dédiée à chaque élève.",
      "contact_us": "Nous Contacter",
      "location": "Mostaganem, Algérie",
      "footer_rights": "© 2026 ÉCOLE NADJAH. Tous droits réservés. Design by Excellence.",
      "stats": {
        "students": "Élèves",
        "bac_success": "Réussite au Bac",
        "teachers": "Enseignants",
        "online_courses": "Cours en Ligne"
      },
      "levels": {
        "primary": "Primaire",
        "primary_desc": "Poser les bases d'un apprentissage solide avec une pédagogie bienveillante.",
        "middle": "Moyen",
        "middle_desc": "Accompagner la transition vers l'adolescence et renforcer les acquis académiques.",
        "high": "Secondaire",
        "high_desc": "Préparer l'excellence pour le Baccalauréat et l'orientation universitaire.",
        "formation": "Formation",
        "formation_desc": "Des programmes de formation spécialisés pour le développement des compétences professionnelles.",
        "courses": "Cours de Soutien",
        "courses_desc": "Des cours de soutien intensifs dans les matières principales pour surmonter les difficultés et exceller.",
        "details": {
          "primary": ["1ère année", "2ème année", "3ème année", "4ème année", "5ème année"],
          "middle": ["1ère année", "2ème année", "3ème année", "4ème année"],
          "high": ["1ère année", "2ème année", "3ème année"],
          "formation": ["Informatique", "Architecture", "Design", "Langues"],
          "courses": ["Histoire / Géo", "Mathématiques", "Arabe", "Physique", "Philosophie"]
        }
      },
      "why_us": {
        "title": "Pourquoi Nous Choisir ?",
        "subtitle": "Une Éducation de Prestige"
      },
      "about": {
        "title": "Notre Histoire & Mission",
        "description1": "L'École Nadjah de Mostaganem n'est pas seulement une institution éducative, c'est un pôle académique pionnier alliant authenticité pédagogique et innovation numérique.",
        "description2": "Nous sommes fiers d'être la première école de la région à disposer de sa propre plateforme numérique intégrée, conçue avec les technologies les plus avancées pour offrir à nos élèves un suivi intelligent et complet garantissant l'excellence.",
        "years_exp": "Ans d'Expérience",
        "graduates": "Diplômés Succès"
      },
      "form": {
        "title": "Envoyez un message",
        "name": "Nom",
        "email": "Email",
        "subject": "Sujet",
        "message": "Message",
        "send": "Envoyer le Message"
      },
      "auth": {
        "welcome": "Bienvenue",
        "access_secure": "Accédez à votre espace sécurisé",
        "email_placeholder": "Email académique",
        "password_placeholder": "Mot de passe",
        "remember_me": "Se souvenir de moi",
        "forgot_password": "Mot de passe oublié ?",
        "login_button": "Se Connecter",
        "no_account": "Vous n'avez pas encore de compte ?",
        "register_here": "Inscrivez-vous ici",
        "roles": {
          "student": "Élève",
          "teacher": "Enseignant",
          "admin": "Admin"
        },
        "registration": {
          "title": "Inscription Étudiant",
          "step": "Étape 1 sur 2",
          "form_subtitle": "Veuillez remplir le formulaire ci-dessous avec les informations exactes.",
          "student_info": "Informations de l'Élève",
          "teacher_info": "Informations de l'Enseignant",
          "role_selection": "Qui êtes-vous ?",
          "i_am_student": "Je suis un élève",
          "i_am_teacher": "Je suis un enseignant",
          "username": "Nom d'utilisateur",
          "academic_year": "Année Scolaire",
          "subject": "Matière",
          "parent_phone": "Téléphone du parent",
          "subject_placeholder": "Choisir la matière...",
          "year_placeholder": "Choisir l'année...",
          "username_placeholder": "Nom d'utilisateur...",
          "parent_info": "Parent / Tuteur",
          "first_name": "Prénom",
          "last_name": "Nom",
          "birth_date": "Date de Naissance",
          "desired_level": "Niveau Souhaité",
          "parent_name": "Nom Complet du Parent",
          "contact_email": "Email de Contact",
          "phone_number": "Numéro de Téléphone",
          "phone_placeholder": "0...",
          "date_placeholder": "JJ/MM/AAAA",
          "first_name_placeholder": "Prénom de l'élève...",
          "last_name_placeholder": "Nom de l'élève...",
          "parent_name_placeholder": "Nom complet du parent...",
          "email_placeholder": "exemple@email.com",
          "select_level": "Choisir le niveau...",
          "submit_button": "Soumettre mon dossier",
          "success_title": "Demande Envoyée !",
          "success_message": "Votre demande d'inscription a bien été reçue. Notre équipe administrative étudiera votre dossier et vous contactera par téléphone d'ici 48 heures.",
          "back_home": "Retour à l'accueil",
          "important_title": "Informations Importantes",
          "important_note_1": "Le dossier complet doit être déposé physiquement après acceptation préliminaire.",
          "important_note_2": "Les places sont limitées par niveau.",
          "need_help": "Aide à l'inscription?",
          "help_desc": "Besoin d'assistance pour remplir le formulaire ou de renseignements sur nos tarifs ?"
        }
      },
      "dashboard": {
        "sidebar": {
          "library": "Ma Bibliothèque",
          "live": "Sessions Live",
          "notes": "Mes Notes",
          "resources": "Ressources",
          "users": "Utilisateurs",
          "analytics": "Analyses",
          "settings": "Paramètres",
          "logout": "Déconnexion"
        },
        "search_placeholder": "Rechercher des ressources, cours, élèves...",
        "student": {
          "welcome": "Bonjour",
          "motivation": "« L'éducation est l'arme la plus puissante pour changer le monde »",
          "completed_courses": "Cours Complétés",
          "continue_watching": "Continuer la Lecture",
          "see_all": "Tout voir",
          "remaining": "restantes",
          "resume_course": "Reprendre le cours",
          "progression": "Progression",
          "new_uploads": "Nouveautés",
          "upcoming_live": "Direct à venir",
          "live_now": "En Direct",
          "joining_live": "Rejoindre",
          "reminder": "Rappel",
          "coming_soon": "Bientôt",
          "live": {
            "waiting_stream": "Flux vidéo en attente",
            "participants": "participants",
            "chat": "Chat en direct",
            "write_message": "Écrire un message...",
            "quit": "Quitter"
          }
        },
        "placeholders": {
          "course_title": "Les Suites Numériques: Convergence et Limites",
          "course_desc": "Ce module approfondit les concepts de limites de suites et les critères de convergence essentiels pour le baccalauréat.",
          "live_title_math": "Révisions Bac: Algèbre Linéaire",
          "live_desc_math": "Votre session de révision intensive commence maintenant. 124 élèves sont déjà en attente."
        },
        "teacher": {
          "sidebar": {
            "my_space": "Mon Espace",
            "my_courses": "Mes Cours",
            "schedule": "Emploi du temps",
            "students": "Étudiants"
          },
          "welcome": "Espace Enseignant",
          "subtitle": "Préparez vos sessions et gérez vos ressources éducatives.",
          "plan_session": "Planifier Session",
          "new_course": "Nouveau Cours",
          "live_detected": "Session Live Détectée",
          "launch_live": "Lancer le Direct",
          "waiting_students": "en attente",
          "rec_duration": "Durée recommandée",
          "recent_courses": "Mes Cours Récents",
          "manage_all": "Gérer tout",
          "today": "Aujourd'hui",
          "pedagogical_tip": "Conseil Pédagogique",
          "tip_desc": "Les sessions du matin ont un taux d'engagement 30% plus élevé. Envisagez de planifier vos révisions clés avant midi."
        },
        "replays": {
          "title": "Bibliothèque des Replays",
          "subtitle": "Retrouvez tous vos cours enregistrés pour révision.",
          "search_placeholder": "Rechercher par titre...",
          "filters": {
            "all": "Tous",
            "recent": "Récent",
            "popular": "Populaire",
            "favorites": "Favoris"
          },
          "published_on": "Publié le",
          "watch": "Regarder"
        },
        "admin": {
          "sidebar": {
            "overview": "Vue d'ensemble",
            "registrations": "Inscriptions",
            "analytics": "Analytiques"
          },
          "welcome": "Tableau de Bord Admin",
          "subtitle": "Bienvenue, voici un aperçu de l'école aujourd'hui.",
          "stats": {
            "total_students": "Total Étudiants",
            "active_courses": "Cours Actifs",
            "teachers": "Enseignants",
            "revenue": "Chiffre d’affaires"
          },
          "recent_registrations": "Inscriptions Récentes",
          "recent_activities": "Activités Récentes",
          "table": {
            "student": "Étudiant",
            "level": "Niveau",
            "status": "Statut",
            "date": "Date",
            "actions": "Actions"
          },
          "activity_report": "Rapport d'activité complet",
          "activities": [
            { "user": "Prof. Yacine", "action": "a ajouté un nouveau cours", "time": "Il y a 10 min" },
            { "user": "Admin System", "action": "Mise à jour plan de cours", "time": "Il y a 1 heure" },
            { "user": "Amira Kaci", "action": "a soumis son inscription", "time": "Il y a 3 heures" },
            { "user": "Dr. Sarah", "action": "a terminé une session live", "time": "Il y a 5 heures" }
          ]
        }
      },
      "nav": {
        "home": "Accueil",
        "programs": "Programmes",
        "about": "À Propos",
        "contact": "Contact",
        "logout": "Déconnexion",
        "my_dashboard": "Mon Tableau de Bord"
      },
      "chatbot": {
        "name": "Assistant Nadjah",
        "welcome_msg": "Bonjour ! Je suis l'assistant de l'École Nadjah. Comment puis-je vous aider aujourd'hui ?",
        "placeholder": "Écrivez votre message...",
        "error": "Désolé, une erreur est survenue. Veuillez réessayer plus tard."
      },
      "subjects": {
        "math": "Mathématiques",
        "physics": "Physique",
        "philosophy": "Philosophie",
        "history": "Histoire / Géo",
        "arabic": "Arabe",
        "french": "Français",
        "english": "Anglais"
      }
    }
  },
  en: {
    translation: {
      "school_name": "NADJAH SCHOOL",
      "tagline": "Excellence & Vision",
      "enrollment_open": "Enrollment Open 2026-2027",
      "hero_title": "NADJAH SCHOOL:",
      "hero_subtitle": "Digital Excellence",
      "hero_description": "Welcome to the official platform of NADJAH SCHOOL. A complete educational ecosystem providing live lessons, unlimited access to high-quality replays, immediate pedagogical follow-up, and simplified administrative management to ensure success. We are the first school to launch an integrated digital educational system via its own platform.",
      "discover_school": "Discover the School",
      "learn_more": "Learn More",
      "path_subtitle": "A complete educational journey, from the first step to university.",
      "view_google_maps": "View on Google Maps",
      "open_maps_app": "Open Maps App",
      "register_now": "Register Now",
      "close": "Close",
      "login": "Login",
      "all": "All",
      "our_pillars": "Our Pillars",
      "prestige_education": "Prestige Education",
      "digital_learning": "Digital Learning",
      "digital_learning_desc": "Integrated interactive platform for effective hybrid monitoring.",
      "personalized_teaching": "Personalized Teaching",
      "personalized_teaching_desc": "Small classes for dedicated attention to each student.",
      "contact_us": "Contact Us",
      "location": "Mostaganem, Algeria",
      "footer_rights": "© 2026 NADJAH SCHOOL. All rights reserved. Design by Excellence.",
      "stats": {
        "students": "Students",
        "bac_success": "Bac Success",
        "teachers": "Teachers",
        "online_courses": "Online Courses"
      },
      "levels": {
        "primary": "Primary",
        "primary_desc": "Laying the foundations for solid learning with caring pedagogy.",
        "middle": "Middle School",
        "middle_desc": "Supporting the transition to adolescence and reinforcing academic achievements.",
        "high": "High School",
        "high_desc": "Preparing for excellence in the Baccalaureate and university orientation.",
        "formation": "Training",
        "formation_desc": "Specialized training programs for professional skill development.",
        "courses": "Support Courses",
        "courses_desc": "Intensive support classes in core subjects to overcome learning difficulties and achieve academic excellence.",
        "details": {
          "primary": ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
          "middle": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
          "high": ["1st Year", "2nd Year", "3rd Year"],
          "formation": ["Computing", "Architecture", "Design", "Languages"],
          "courses": ["History / Geo", "Mathematics", "Arabic", "Physics", "Philosophy"]
        }
      },
      "why_us": {
        "title": "Why Choose Us?",
        "subtitle": "Prestige Education"
      },
      "about": {
        "title": "Our Story & Mission",
        "description1": "Nadjah School in Mostaganem is not just an educational institution; it is a pioneering academic hub that combines pedagogical authenticity with digital innovation.",
        "description2": "We are proud to be the first school in the region to have its own integrated digital platform, designed with the most advanced technologies to provide our students with smart, comprehensive tracking that guarantees excellence.",
        "years_exp": "Years Experience",
        "graduates": "Successful Graduates"
      },
      "form": {
        "title": "Send a message",
        "name": "Name",
        "email": "Email",
        "subject": "Subject",
        "message": "Message",
        "send": "Send Message"
      },
      "auth": {
        "welcome": "Welcome",
        "access_secure": "Access your secure space",
        "email_placeholder": "Academic Email",
        "password_placeholder": "Password",
        "remember_me": "Remember me",
        "forgot_password": "Forgot password?",
        "login_button": "Login",
        "no_account": "Don't have an account yet?",
        "register_here": "Register here",
        "roles": {
          "student": "Student",
          "teacher": "Teacher",
          "admin": "Admin"
        },
        "registration": {
          "title": "Student Registration",
          "step": "Step 1 of 2",
          "form_subtitle": "Please fill out the form below with accurate information.",
          "student_info": "Student Information",
          "teacher_info": "Teacher Information",
          "role_selection": "Who are you?",
          "i_am_student": "I am a student",
          "i_am_teacher": "I am a teacher",
          "username": "Username",
          "academic_year": "Academic Year",
          "subject": "Subject",
          "parent_phone": "Parent's Phone",
          "subject_placeholder": "Select subject...",
          "year_placeholder": "Select year...",
          "username_placeholder": "Username...",
          "parent_info": "Parent / Guardian",
          "first_name": "First Name",
          "last_name": "Last Name",
          "birth_date": "Date of Birth",
          "desired_level": "Desired Level",
          "parent_name": "Parent's Full Name",
          "contact_email": "Contact Email",
          "phone_number": "Phone Number",
          "phone_placeholder": "0...",
          "date_placeholder": "DD/MM/YYYY",
          "first_name_placeholder": "Student's first name...",
          "last_name_placeholder": "Student's last name...",
          "parent_name_placeholder": "Parent's full name...",
          "email_placeholder": "example@email.com",
          "select_level": "Select level...",
          "submit_button": "Submit my application",
          "success_title": "Request Sent!",
          "success_message": "Your registration request has been successfully received. Our administrative team will review your file and contact you by phone within 48 hours.",
          "back_home": "Back to Home",
          "important_title": "Important Information",
          "important_note_1": "The complete file must be dropped off physically after preliminary acceptance.",
          "important_note_2": "Places are limited per level.",
          "need_help": "Help with registration?",
          "help_desc": "Need assistance filling out the form or information about our rates?"
        }
      },
      "dashboard": {
        "sidebar": {
          "library": "My Library",
          "live": "Live Sessions",
          "notes": "My Notes",
          "resources": "Resources",
          "users": "Users",
          "analytics": "Analytics",
          "settings": "Settings",
          "logout": "Logout"
        },
        "search_placeholder": "Search for resources, courses, students...",
        "student": {
          "welcome": "Hello",
          "motivation": "« Education is the most powerful weapon you can use to change the world »",
          "completed_courses": "Completed Courses",
          "continue_watching": "Continue Watching",
          "see_all": "View all",
          "remaining": "remaining",
          "resume_course": "Resume course",
          "progression": "Progression",
          "new_uploads": "Newest Uploads",
          "upcoming_live": "Upcoming Live",
          "live_now": "Live Now",
          "joining_live": "Join",
          "reminder": "Reminder",
          "coming_soon": "Coming Soon",
          "live": {
            "waiting_stream": "Waiting for stream",
            "participants": "participants",
            "chat": "Live Chat",
            "write_message": "Write a message...",
            "quit": "Quit"
          }
        },
        "placeholders": {
          "course_title": "Numerical Sequences: Convergence and Limits",
          "course_desc": "This module deepens the concepts of sequence limits and essential convergence criteria for the baccalaureate.",
          "live_title_math": "Bac Review: Linear Algebra",
          "live_desc_math": "Your intensive review session begins now. 124 students are waiting."
        },
        "teacher": {
          "sidebar": {
            "my_space": "My Space",
            "my_courses": "My Courses",
            "schedule": "Schedule",
            "students": "Students"
          },
          "welcome": "Teacher Space",
          "subtitle": "Prepare your sessions and manage your educational resources.",
          "plan_session": "Plan Session",
          "new_course": "New Course",
          "live_detected": "Live Session Detected",
          "launch_live": "Launch Live",
          "waiting_students": "waiting",
          "rec_duration": "Recommended duration",
          "recent_courses": "My Recent Courses",
          "manage_all": "Manage all",
          "today": "Today",
          "pedagogical_tip": "Pedagogical Advice",
          "tip_desc": "Morning sessions have a 30% higher engagement rate. Consider planning your key reviews before noon."
        },
        "replays": {
          "title": "Replays Library",
          "subtitle": "Find all your recorded lessons for review.",
          "search_placeholder": "Search by title...",
          "filters": {
            "all": "All",
            "recent": "Recent",
            "popular": "Popular",
            "favorites": "Favorites"
          },
          "published_on": "Published on",
          "watch": "Watch"
        },
        "admin": {
          "sidebar": {
            "overview": "Overview",
            "registrations": "Registrations",
            "analytics": "Analytics"
          },
          "welcome": "Admin Dashboard",
          "subtitle": "Welcome, here is an overview of the school today.",
          "stats": {
            "total_students": "Total Students",
            "active_courses": "Active Courses",
            "teachers": "Teachers",
            "revenue": "Revenue"
          },
          "recent_registrations": "Recent Registrations",
          "recent_activities": "Recent Activities",
          "table": {
            "student": "Student",
            "level": "Level",
            "status": "Status",
            "date": "Date",
            "actions": "Actions"
          },
          "activity_report": "Full activity report",
          "activities": [
            { "user": "Prof. Yacine", "action": "added a new course", "time": "10 min ago" },
            { "user": "Admin System", "action": "Updated lesson plan", "time": "1 hour ago" },
            { "user": "Amira Kaci", "action": "submitted her registration", "time": "3 hours ago" },
            { "user": "Dr. Sarah", "action": "finished a live session", "time": "5 hours ago" }
          ]
        }
      },
      "nav": {
        "home": "Home",
        "programs": "Programs",
        "about": "About",
        "contact": "Contact",
        "logout": "Logout",
        "my_dashboard": "My Dashboard"
      },
      "chatbot": {
        "name": "Nadjah Assistant",
        "welcome_msg": "Hello! I am the Nadjah School assistant. How can I help you today?",
        "placeholder": "Type your message...",
        "error": "Sorry, something went wrong. Please try again later."
      },
      "subjects": {
        "math": "Mathematics",
        "physics": "Physics",
        "philosophy": "Philosophy",
        "history": "History / Geo",
        "arabic": "Arabic",
        "french": "French",
        "english": "English"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
