import { motion } from "motion/react";
import { Button, Card, Badge } from "../components/ui";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Monitor,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Facebook,
  Instagram,
  Youtube,
  BookOpen,
  Play,
  MessageSquare,
  Folder,
  Video,
  Bell,
  Star,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";
import { GlowCard } from "../components/GlowCard";
import { useState, ReactNode } from "react";
import { ProgramModal } from "../components/ProgramModal";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

interface DetailedProgram {
  id: string;
  title: string;
  items: string[];
  icon: ReactNode;
}

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [selectedProgram, setSelectedProgram] =
    useState<DetailedProgram | null>(null);

  const programs = [
    {
      id: "primary",
      level: t("levels.primary"),
      desc: t("levels.primary_desc"),
      icon: <GraduationCap size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: [
        "/primaire/primaire1.jpg",
        "/primaire/primaire2.jpg",
        "/primaire/primaire3.jpg",
      ],
    },
    {
      id: "middle",
      level: t("levels.middle"),
      desc: t("levels.middle_desc"),
      icon: <CheckCircle2 size={48} className="text-blue-accent" />,
      color: "bg-navy/5",
      images: ["/cem/cem1.jpg", "/cem/cem2.jpg", "/cem/cem3.jpg"],
    },
    {
      id: "high",
      level: t("levels.high"),
      desc: t("levels.high_desc"),
      icon: <ShieldCheck size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: ["/lycee/lycee1.jpg", "/lycee/lycee2.jpg", "/lycee/lycee3.jpg"],
    },
    {
      id: "formation",
      level: t("levels.formation"),
      desc: t("levels.formation_desc"),
      icon: <Monitor size={48} className="text-blue-accent" />,
      color: "bg-navy/5",
      images: [
        "/formation/formation1.jpg",
        "/formation/formation2.jpg",
        "/formation/formation3.jpg",
      ],
    },
    {
      id: "courses",
      level: t("levels.courses"),
      desc: t("levels.courses_desc"),
      icon: <BookOpen size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: [
        "/dawarat/dawra1.jpg",
        "/dawarat/dawra2.jpg",
        "/dawarat/dawra3.jpg",
      ],
    },
  ];

  const handleLearnMore = (id: string, levelName: string, icon: ReactNode) => {
    // Access details from i18n
    const details = t(`levels.details.${id}`, {
      returnObjects: true,
    }) as string[];
    if (Array.isArray(details)) {
      setSelectedProgram({
        id,
        title: levelName,
        items: details,
        icon,
      });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <ProgramModal
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title || ""}
        items={selectedProgram?.items || []}
        icon={selectedProgram?.icon}
      />
      {/* Hero Section */}
      <section className="relative flex items-center pt-24 pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-transparent">
        {/* Abstract Background Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0 flex justify-center">
          <div className="w-[1200px] h-full bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20"></div>
        </div>
        {/* Floating Arrow 1 */}
        <div className="absolute top-32 right-1/2 translate-x-20 z-0 hidden lg:block opacity-40">
          <svg
            width="40"
            height="80"
            viewBox="0 0 40 80"
            fill="none"
            className="text-[#3b82f6]"
          >
            <path
              d="M10,10 C30,30 20,60 30,70 L20,70 M30,70 L30,60"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Floating Arrow 2 */}
        <div className="absolute bottom-10 right-10 lg:right-32 z-0 hidden lg:block opacity-40">
          <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            fill="none"
            className="text-[#004cfb]"
          >
            <path
              d="M10,90 C30,80 60,60 90,20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M70,20 L90,20 L90,40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center",
              isAr && "rtl",
            )}
          >
            {/* Left Content */}
            <div
              className={cn(
                "max-w-2xl px-2 lg:px-0",
                isAr ? "text-right" : "text-left",
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn("flex", isAr && "justify-start")}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 text-blue-accent font-semibold text-sm shadow-[0_0_15px_rgba(29,78,216,0.1)] border border-blue-100">
                  <Star size={16} className={cn(isAr && "ml-1")} />
                  <span>
                    {isAr
                      ? "المنصة التعليمية المتكاملة"
                      : "LA PLATEFORME ÉDUCATIVE TOUT-EN-UN"}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "text-5xl md:text-6xl lg:text-[5.5rem] font-sans text-navy mt-6 mb-6 font-bold leading-[1.1] tracking-tight drop-shadow-sm",
                  isAr && "font-serif",
                )}
              >
                {isAr ? (
                  <>
                    تعلموا، تواصلوا <br /> وتطوروا{" "}
                    <span className="text-blue-accent">معاً.</span>
                  </>
                ) : (
                  <>
                    Apprenez, échangez <br />
                    et progressez <br />
                    <span className="text-blue-accent">ensemble.</span>
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl text-navy/70 mb-10 font-sans max-w-lg leading-relaxed relative z-20"
              >
                {isAr
                  ? "مدرسة النجاح هي منصة متكاملة للأساتذة والتلاميذ. حصص مباشرة، مناقشات، موارد تعليمية، ومراجعات ذكية."
                  : "École Nadjah est une plateforme tout-en-un pour les enseignants et les élèves : classes en direct, discussions, ressources et replays."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className={cn(
                  "flex flex-col sm:flex-row gap-4 mb-10 relative z-20",
                  isAr && "justify-start",
                )}
              >
                <Link to="/register">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full sm:w-auto px-8 py-7 text-base font-bold bg-[#004cfb] hover:bg-blue-700 text-white rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(0,76,251,0.3)] flex items-center justify-center",
                      isAr && "flex-row-reverse",
                    )}
                  >
                    {isAr ? "ابدأ مجاناً الآن" : "Commencer gratuitement"}{" "}
                    <ChevronRight
                      size={20}
                      className={cn(isAr ? "mr-2 rotate-180" : "ml-2")}
                    />
                  </Button>
                </Link>
                <a href="#demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className={cn(
                      "w-full sm:w-auto px-8 py-7 text-base font-bold rounded-xl border-gray-200 text-navy bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm flex items-center justify-center",
                      isAr && "flex-row-reverse",
                    )}
                  >
                    <Play
                      size={20}
                      className={cn(
                        "text-navy fill-navy",
                        isAr ? "ml-3" : "mr-3",
                      )}
                    />{" "}
                    {isAr ? "شاهد الفيديو" : "Voir la vidéo"}
                  </Button>
                </a>
              </motion.div>

              {/* Student Rating Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-4 relative z-20"
              >
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop"
                    className="w-10 h-10 rounded-full border-2 border-white relative z-0"
                    alt="Student"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                    className="w-10 h-10 rounded-full border-2 border-white relative z-10"
                    alt="Student"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                    className="w-10 h-10 rounded-full border-2 border-white relative z-20"
                    alt="Student"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop"
                    className="w-10 h-10 rounded-full border-2 border-white relative z-30"
                    alt="Student"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=40&h=40&fit=crop"
                    className="w-10 h-10 rounded-full border-2 border-white relative z-40"
                    alt="Student"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-navy/80 mb-1">
                    {isAr
                      ? "+5,000 طالب ينضمون يومياً"
                      : "+5,000 étudiants rejoignent tous les jours"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-navy">4.9/5</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Mockups */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.4,
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              className="relative hidden lg:block translate-y-6 translate-x-6"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 rounded-full blur-[100px] -z-10"></div>

              {/* --- Floating Badges Start --- */}
              {/* Badge 1: Top Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6, type: "spring" }}
                className={cn(
                  "absolute -top-10 -left-12 z-50 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-3 pr-4 flex items-center gap-4 rotate-[-4deg]",
                  isAr && "flex-row-reverse",
                )}
              >
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white relative z-0"
                    alt="Avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white relative z-10"
                    alt="Avatar"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop"
                    className="w-8 h-8 rounded-full border-2 border-white relative z-20"
                    alt="Avatar"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-white relative z-30 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                    ...
                  </div>
                </div>
                <div className={cn(isAr && "text-right")}>
                  <div className="text-[11px] font-medium text-gray-500 mb-0.5">
                    {isAr ? "طلاب نشطون الآن" : "Étudiants actifs"}
                  </div>
                  <div className="text-xl font-black text-blue-accent leading-none">
                    +320
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Middle Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                className={cn(
                  "absolute bottom-[-100px] -right-[230px] z-50 bg-[#3b82f6] rounded-2xl shadow-[0_15px_40px_rgba(59,130,246,0.3)] p-4 pr-5 text-white flex items-center gap-4 rotate-[6deg]",
                  isAr && "flex-row-reverse",
                )}
              >
                <div className={cn(isAr && "text-right")}>
                  <div className="text-2xl font-black leading-none mb-1">
                    +1200
                  </div>
                  <div className="text-[12px] font-medium text-white/80">
                    {isAr ? "درس متاح" : "Cours disponibles"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <BookOpen size={20} className="text-white" />
                </div>
              </motion.div>

              {/* Badge 3: Bottom Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
                className={cn(
                  "absolute bottom-6 -left-16 z-50 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-3 pr-4 flex items-center gap-3",
                  isAr && "flex-row-reverse",
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <div className={cn(isAr && "text-right")}>
                  <div className="text-sm font-bold text-navy mb-0.5">
                    {isAr ? "مراجعة وحل التمارين" : "Exercices & Révisions"}
                  </div>
                  <div className="text-[10px] font-medium text-gray-400">
                    {isAr ? "تم رفع 15 تمرين جديد" : "15 nouveaux exercices"}
                  </div>
                </div>
              </motion.div>
              {/* --- Floating Badges End --- */}

              {/* Laptop Mockup */}
              <div className="relative z-10 scale-[1.1] translate-x-12">
                <div className="bg-[#1a1a1b] rounded-t-[24px] p-2.5 pb-3.5 shadow-2xl border-[3px] border-[#d1d5db] border-b-0 relative">
                  {/* Camera Dot */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0a0a] rounded-full border border-[#2a2a2b] flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-blue-900/40 rounded-full"></div>
                  </div>

                  <div className="bg-white rounded-t-sm rounded-b-[2px] overflow-hidden aspect-[16/10] relative ring-1 ring-black/10">
                    {/* Fake UI */}
                    <div className="absolute top-0 left-0 w-full h-12 bg-white border-b flex items-center px-4 justify-between leading-none">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-accent text-white rounded flex items-center justify-center font-bold text-[10px]">
                          EN
                        </div>
                        <span className="font-bold text-navy text-xs mt-0.5">
                          {isAr ? "مدرسة النجاح" : "ÉCOLE NADJAH"}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-navy text-center absolute left-1/2 -translate-x-1/2 flex items-center gap-2 mt-0.5">
                        {isAr
                          ? "الرياضيات — النهائي"
                          : "Mathématiques — Terminale"}{" "}
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-500 text-[10px]">
                          {isAr ? "مباشر" : "En direct"}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-12 left-0 w-48 h-full bg-gray-50 border-r p-4 hidden sm:block">
                      <div className="space-y-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-6 w-32 bg-blue-50 rounded text-blue-accent flex items-center px-2 text-[10px] font-bold">
                          {isAr ? "المجتمعات" : "Communautés"}
                        </div>
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="absolute top-12 left-48 right-64 h-[calc(100%-3rem)] p-4 bg-white overflow-hidden hidden md:block">
                      <div className="w-full h-64 bg-navy rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_80%)]"></div>
                        {/* Fake Math Content */}
                        <div className="text-white text-center font-mono opacity-80 z-10">
                          <div className="text-2xl mb-4">y = ax² + bx + c</div>
                          <div className="text-xl">Δ = b² - 4ac</div>
                        </div>
                        <div className="absolute bottom-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </div>
                        <div className="absolute bottom-3 right-3 text-white text-[10px] flex items-center gap-1 z-10 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
                          <Users size={12} /> 128
                        </div>
                      </div>
                      <h3 className="font-bold text-navy mb-2 text-sm">
                        {isAr ? "الإعادات الحديثة" : "Replays récents"}
                      </h3>
                      <div className="flex gap-2">
                        <div className="h-20 flex-1 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-accent transition-colors">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Play
                              size={12}
                              className="text-blue-accent ml-0.5"
                            />
                          </div>
                        </div>
                        <div className="h-20 flex-1 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-accent transition-colors">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Play
                              size={12}
                              className="text-blue-accent ml-0.5"
                            />
                          </div>
                        </div>
                        <div className="h-20 flex-1 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-accent transition-colors">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Play
                              size={12}
                              className="text-blue-accent ml-0.5"
                            />
                          </div>
                        </div>
                        <div className="h-20 flex-1 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-blue-accent transition-colors">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Play
                              size={12}
                              className="text-blue-accent ml-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Chat Sidebar */}
                    <div className="absolute top-12 right-0 w-64 h-[calc(100%-3rem)] bg-white border-l p-4 hidden lg:flex flex-col">
                      <h4 className="font-bold text-navy text-xs mb-4">
                        {isAr ? "الدردشة المباشرة" : "Chat en direct"}
                      </h4>
                      <div className="space-y-4 flex-1">
                        <div className="flex gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop"
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="text-[10px] font-bold text-navy mb-0.5">
                              Sami
                            </div>
                            <div className="text-[10px] bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-r-lg rounded-bl-lg w-40 text-gray-600">
                              {isAr ? "شكراً أستاذ !" : "Merci professeur !"}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop"
                            className="w-6 h-6 rounded-full"
                          />
                          <div>
                            <div className="text-[10px] font-bold text-navy mb-0.5">
                              Imane
                            </div>
                            <div className="text-[10px] bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-r-lg rounded-bl-lg w-40 text-gray-600">
                              {isAr
                                ? "هل يمكنك شرح هذا المثال؟"
                                : "Pouvez-vous expliquer cet exemple ?"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto bg-gray-50 h-8 rounded-full border border-gray-200 flex items-center px-3">
                        <div className="text-[10px] text-gray-400">
                          {isAr ? "رسالة..." : "Écrivez un message..."}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bezel Logo (MacBook style text) */}
                  <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 text-[7px] font-medium text-[#7a7a7b] tracking-[0.2em]">
                    MacBook Pro
                  </div>
                </div>

                {/* Laptop Base */}
                <div className="relative z-20">
                  {/* Top deck (keyboard area edge) */}
                  <div className="bg-[#e5e7eb] w-[114%] h-[12px] -ml-[7%] rounded-t-md shadow-[inset_0_1px_1px_rgba(255,255,255,1)] border-t border-[#d1d5db] relative flex justify-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/5">
                    {/* Trackpad notch */}
                    <div className="w-24 h-1.5 bg-[#d1d5db] rounded-b-[4px] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.5)]"></div>
                  </div>
                  {/* Bottom lip */}
                  <div className="bg-[#9ca3af] w-[114%] h-[10px] -ml-[7%] rounded-b-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-[#6b7280] relative overflow-hidden flex justify-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/30"></div>
                </div>
              </div>

              {/* Mobile Mockup Overlay */}
              <div className="absolute -bottom-16 -right-12 w-[260px] h-[540px] bg-[#f8fafc] rounded-[40px] border-[12px] border-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-30 flex flex-col ring-1 ring-white/20">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[85px] h-[24px] bg-black rounded-full z-50 flex items-center justify-between px-2">
                  <div className="w-6 h-3 bg-[#111] rounded-full border border-white/5"></div>
                  <div className="w-2.5 h-2.5 bg-blue-900/40 rounded-full border border-white/5 relative shadow-[inset_0_0_2px_rgba(255,255,255,0.4)]"></div>
                </div>

                {/* Status Bar */}
                <div className="absolute top-0 left-0 w-full h-8 z-40 flex items-center justify-between px-5 pt-3">
                  <span className="text-[11px] font-semibold text-black tracking-tight relative top-[1px] ml-1">
                    9:41
                  </span>
                  <div className="flex gap-1.5 items-center mr-1">
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20V10" />
                      <path d="M18 20V4" />
                      <path d="M6 20v-4" />
                    </svg>
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12.01" y2="20" />
                    </svg>
                    <div className="w-[20px] h-[10px] border border-black/80 rounded-[3px] relative opacity-90">
                      <div className="absolute top-[1px] left-[1px] w-[13px] h-[6px] bg-black rounded-[1px]"></div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 px-4 pt-14 pb-20 overflow-y-auto no-scrollbar">
                  <h3 className="font-bold text-navy mb-1 text-sm">
                    {isAr ? "مرحباً،" : "Bonjour,"}
                  </h3>
                  <h2 className="text-xl font-bold text-navy mb-5">
                    Zaitihabibi
                  </h2>

                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-bold text-navy">
                      {isAr ? "مجتمعاتي" : "Mes communautés"}
                    </div>
                    <div className="text-[10px] font-bold text-blue-accent">
                      {isAr ? "الكل" : "Voir tout"}
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 p-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-blue-accent" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-navy">
                          {isAr ? "الرياضيات" : "Mathématiques"}
                        </div>
                        <div className="text-[9px] text-gray-500">
                          {isAr ? "النهائي" : "Terminale"}
                        </div>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)] mr-1"></div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white border border-gray-100 rounded-2xl shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-navy">
                          {isAr ? "الفيزياء" : "Physique"}
                        </div>
                        <div className="text-[9px] text-gray-500">
                          {isAr ? "النهائي" : "Terminale"}
                        </div>
                      </div>
                      <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)] mr-1"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-bold text-navy">
                      {isAr ? "الدروس المباشرة القادمة" : "Prochains lives"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white border border-orange-100 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop"
                      className="w-9 h-9 rounded-full ml-1"
                    />
                    <div>
                      <div className="text-[11px] font-bold text-navy">
                        {isAr ? "الرياضيات" : "Mathématiques"}
                      </div>
                      <div className="text-[9px] text-gray-500 mt-0.5">
                        {isAr ? "اليوم على 18:00" : "Aujourd'hui à 18:00"}
                      </div>
                    </div>
                    <div className="ml-auto bg-red-50 text-red-600 border border-red-200 text-[8px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-2 z-40 pb-6">
                  <div className="flex flex-col items-center gap-1 text-blue-accent">
                    <Video size={18} />
                    <div className="text-[9px] font-medium">
                      {isAr ? "مباشر" : "Live"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <MessageSquare size={18} />
                    <div className="text-[9px] font-medium">
                      {isAr ? "الدردشة" : "Chat"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Users size={18} />
                    <div className="text-[9px] font-medium">
                      {isAr ? "الفرق" : "Group"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Bell size={18} />
                    <div className="text-[9px] font-medium">
                      {isAr ? "الإعلانات" : "Annoncement"}
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-black rounded-full z-50"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 pb-16 pt-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-6",
            isAr && "flex-row-reverse",
          )}
        >
          {[
            {
              value: "+5,000",
              label: isAr ? "طالب نشط" : "Élèves actifs",
              icon: <Users size={24} className="text-blue-500" />,
              bg: "bg-blue-50",
            },
            {
              value: "+120",
              label: isAr ? "درس مباشر شهرياً" : "Cours en direct/mois",
              icon: <Video size={24} className="text-purple-500" />,
              bg: "bg-purple-50",
            },
            {
              value: "+200",
              label: isAr ? "أستاذ معتمد" : "Professeurs certifiés",
              icon: <Users size={24} className="text-emerald-500" />,
              bg: "bg-emerald-50",
            },
            {
              value: "98%",
              label: isAr ? "نسبة رضا الطلاب" : "Taux de satisfaction",
              icon: (
                <svg
                  className="w-6 h-6 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12A10 10 0 1 1 12 2v10z" />
                </svg>
              ),
              bg: "bg-emerald-50",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 min-w-[200px]"
            >
              <div
                className={cn(
                  "bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                  isAr && "flex-row-reverse",
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                    stat.bg,
                  )}
                >
                  {stat.icon}
                </div>
                <div className={cn(isAr && "text-right")}>
                  <h3 className="text-2xl font-black font-sans text-navy tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-[13px] font-semibold text-gray-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-20 bg-transparent relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/60 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4 tracking-tight">
              {t("nav.programs")}
            </h2>
            <div className="h-1.5 w-16 bg-blue-accent mx-auto rounded-full"></div>
            <p
              className={cn(
                "mt-6 text-navy/60 max-w-2xl mx-auto italic text-lg leading-relaxed",
                isAr && "font-serif",
              )}
            >
              {t("path_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12">
            {programs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card
                  className={cn(
                    "p-0 group border-none bg-transparent relative shadow-none",
                    isAr && "text-right flex flex-col h-full",
                  )}
                >
                  <div
                    className={cn(
                      "h-[400px] flex items-center justify-center transition-colors duration-500 relative rounded-3xl bg-transparent",
                    )}
                  >
                    {/* Bouquet of Images - Emerging Pattern */}
                    <div className="relative w-full h-full flex items-end justify-center z-20 pb-0">
                      {p.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/5 origin-bottom"
                          initial={false}
                          animate={{
                            rotate: idx === 0 ? -15 : idx === 1 ? 0 : 15,
                            x: idx === 0 ? -60 : idx === 1 ? 0 : 60,
                            y: idx === 1 ? -10 : 30,
                            scale: idx === 1 ? 1.05 : 0.9,
                            zIndex: idx === 1 ? 25 : 10,
                          }}
                          whileHover={{
                            rotate: idx === 0 ? -25 : idx === 1 ? 0 : 25,
                            x: idx === 0 ? -100 : idx === 1 ? 0 : 100,
                            y: idx === 1 ? -80 : -40,
                            scale: 1.25,
                            zIndex: 40,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            mass: 0.8,
                          }}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <GlowCard
                    customSize
                    glowColor="blue"
                    className="p-10 pt-16 flex-grow bg-white rounded-3xl -mt-24 relative z-30 shadow-2xl overflow-visible border-transparent"
                  >
                    <h3 className="text-3xl font-serif mb-4 text-navy">
                      {p.level}
                    </h3>
                    <p className="text-navy/60 mb-8 leading-relaxed line-clamp-3 text-lg">
                      {p.desc}
                    </p>

                    <Button
                      onClick={() => handleLearnMore(p.id, p.level, p.icon)}
                      variant="ghost"
                      className={cn(
                        "p-0 group-hover:text-blue-accent flex items-center gap-2 mt-auto w-fit",
                        isAr && "flex-row-reverse ml-auto",
                      )}
                    >
                      {t("learn_more")}
                      <ArrowRight
                        size={18}
                        className={cn(
                          "transition-transform",
                          isAr
                            ? "group-hover:-translate-x-2 rotate-180"
                            : "group-hover:translate-x-2",
                        )}
                      />
                    </Button>
                  </GlowCard>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-linear-to-b from-transparent to-blue-50/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#1a3190_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className={cn("relative", isAr ? "order-last" : "")}>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                  alt="Students at École Nadjah"
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
              <div
                className={cn(
                  "absolute -bottom-10 -right-10 w-64 h-64 bg-navy rounded-3xl -z-0 opacity-10",
                  isAr ? "left-10 right-auto" : "right-10",
                )}
              ></div>
            </div>

            <div className={cn(isAr && "text-right")}>
              <Badge variant="accent">{t("nav.about")}</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-navy mt-6 mb-8">
                {t("about.title")}
              </h2>
              <p className="text-navy/70 text-lg leading-relaxed mb-8">
                {t("about.description1")}
              </p>
              <p className="text-navy/70 text-lg leading-relaxed mb-10">
                {t("about.description2")}
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-navy mb-2">
                    10+
                  </div>
                  <div className="text-sm font-medium text-navy/40 uppercase tracking-widest">
                    {t("about.years_exp")}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-navy mb-2">
                    2000+
                  </div>
                  <div className="text-sm font-medium text-navy/40 uppercase tracking-widest">
                    {t("about.graduates")}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div
          className={cn(
            "absolute top-0 opacity-5 pointer-events-none -translate-y-1/4",
            isAr ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4",
          )}
        >
          <img
            src="/logo.png"
            alt=""
            className="w-[600px] h-[600px] object-contain invert brightness-0"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className={isAr ? "text-right" : "text-left"}>
            <Badge variant="accent">{t("why_us.title")}</Badge>
            <h2 className="text-4xl md:text-5xl font-serif mt-6 mb-8 uppercase tracking-tight text-white">
              {t("why_us.subtitle")}
            </h2>
            <div className="space-y-8">
              {[
                {
                  title: t("digital_learning"),
                  desc: t("digital_learning_desc"),
                  icon: <Monitor className="text-blue-accent" />,
                  link: "https://platform-nadjah.vercel.app",
                },
                {
                  title: t("personalized_teaching"),
                  desc: t("personalized_teaching_desc"),
                  icon: <Users className="text-blue-accent" />,
                },
              ].map((item, i) =>
                item.link ? (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group",
                      isAr ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div className="mt-1 transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-white group-hover:text-blue-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    key={i}
                    className={cn(
                      "flex gap-4 p-4",
                      isAr ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-serif text-white">
                        {item.title}
                      </h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          <div
            className={cn("relative", isAr ? "order-first lg:order-last" : "")}
          >
            <motion.a
              href="https://platform-nadjah.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className={cn(
                "block group rounded-3xl bg-white/10 p-2 border border-white/20 shadow-2xl min-h-[400px] relative overflow-hidden transition-all hover:bg-white/15 hover:border-blue-accent/30",
                isAr ? "-rotate-3" : "rotate-3",
              )}
            >
              {/* Platform UI Mockup */}
              <div className="bg-navy/80 rounded-2xl w-full h-full flex flex-col overflow-hidden">
                <div className="bg-white/10 p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/50 font-mono">
                    platform.nadjah.dz
                  </div>
                </div>
                <div className="flex-grow p-6 flex flex-col gap-6">
                  <div className="w-2/3 h-8 bg-linear-to-r from-blue-accent/40 to-transparent rounded-lg animate-pulse" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-video bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-12 h-12 object-contain opacity-20 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <div className="aspect-video bg-white/5 rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-auto flex justify-center relative">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: [0, -8, 0] }}
                      transition={{
                        opacity: { duration: 0.5 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute -top-10 bg-blue-accent text-white text-[10px] px-3 py-1 rounded-full font-bold whitespace-nowrap shadow-lg z-20"
                    >
                      {isAr ? "إضغط هنا للدخول" : "Click here to enter"}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-accent rotate-45" />
                    </motion.div>
                    <div className="px-6 py-3 bg-blue-accent rounded-xl text-white font-bold text-sm shadow-xl shadow-blue-accent/20 group-hover:scale-110 transition-transform">
                      {isAr ? "دخول المنصة" : "Enter Platform"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-accent/10 blur-3xl rounded-full z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-navy/20 blur-3xl rounded-full z-0"></div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white text-navy relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-gray-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                "text-center mb-16",
                isAr ? "text-right" : "text-left",
              )}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8 text-center tracking-tight">
                {t("contact_us")}
              </h2>
              <div className="h-1.5 w-16 bg-blue-accent mx-auto rounded-full mb-12"></div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    "flex items-center gap-6 group",
                    isAr && "flex-row-reverse",
                  )}
                >
                  <a
                    href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white shrink-0 group-hover:scale-110"
                  >
                    <MapPin size={24} />
                  </a>
                  <a
                    href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors underline-offset-4 hover:underline leading-tight",
                      isAr && "font-serif",
                    )}
                  >
                    {t("school_name")}, {t("location")}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "flex items-start gap-6 group",
                    isAr && "flex-row-reverse",
                  )}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0 group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white group-hover:scale-110">
                    <Phone size={24} />
                  </div>
                  <div
                    className={cn("flex flex-col gap-2", isAr && "text-right")}
                  >
                    <a
                      href="tel:0669812895"
                      className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans"
                      dir="ltr"
                    >
                      0669 81 28 95
                    </a>
                    <div className="flex items-center gap-2 group/wa">
                      <a
                        href="tel:0790356012"
                        className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans"
                        dir="ltr"
                      >
                        0790 35 60 12
                      </a>
                      <a
                        href="https://wa.me/213790356012"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] bg-green-500 text-white px-3 py-1 rounded-full font-bold opacity-0 group-hover/wa:opacity-100 transition-all hover:bg-green-600 shadow-lg translate-y-2 group-hover/wa:translate-y-0"
                      >
                        WhatsApp
                      </a>
                    </div>
                    <a
                      href="tel:045416134"
                      className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans"
                      dir="ltr"
                    >
                      045 41 61 34
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={cn(
                    "flex items-center gap-6 group",
                    isAr && "flex-row-reverse",
                  )}
                >
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ecole.el.nadjah.mosta.27@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white shrink-0 group-hover:scale-110"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ecole.el.nadjah.mosta.27@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors break-all"
                  >
                    ecole.el.nadjah.mosta.27@gmail.com
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <a
                  href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-96 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-center overflow-hidden hover:border-blue-accent/30 transition-all group relative shadow-2xl"
                >
                  <div className="absolute inset-0 z-0 scale-110 group-hover:scale-125 transition-transform duration-1000">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1632.748!2d0.089!3d35.930!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1282036a050e3715%3A0xdc2a35b12a46b33f!2s%C3%A9cole%20el%20nadjah!5e1!3m2!1sfr!2sdz!4v1714821000000!5m2!1sfr!2sdz"
                      className="w-full h-full border-0 pointer-events-none"
                      style={{
                        filter: "contrast(1.1) brightness(0.9) saturate(0.8)",
                      }}
                      title={t("school_name")}
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500"></div>

                  <div className="text-center group-hover:opacity-0 transition-opacity relative z-10 px-6 pointer-events-none">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
                      <MapPin
                        size={48}
                        className="text-blue-accent animate-bounce"
                      />
                    </div>
                    <div className="font-serif text-white font-bold uppercase tracking-[0.2em] text-2xl drop-shadow-2xl">
                      {t("view_google_maps")}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "absolute bottom-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl text-xs font-bold text-navy uppercase tracking-widest z-10 transition-all hover:scale-105 shadow-xl border border-white/20",
                      isAr ? "left-8" : "right-8",
                    )}
                  >
                    {t("open_maps_app")}
                  </div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy text-white/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div
            className={cn(
              "flex items-center gap-4",
              isAr && "flex-row-reverse",
            )}
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain invert brightness-0"
              loading="lazy"
            />
            <span className="text-white font-serif font-bold text-lg">
              {t("school_name")}
            </span>
          </div>
          <div className={cn("text-sm", isAr && "font-serif")}>
            {t("footer_rights")}
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/Ecole.nadjhah.27?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/ecole.nadjah.27/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@ecolenadjahmostaganem304"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
