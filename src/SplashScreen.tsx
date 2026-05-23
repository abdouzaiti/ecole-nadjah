import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Star,
  Users,
  GraduationCap,
  Heart,
  BarChart2,
  MessageSquare,
  Play,
  Video,
  Home,
  FileText,
  Calendar,
  LucideIcon,
  LogOut,
  Bell,
  Megaphone,
} from "lucide-react";
import { cn } from "./lib/utils";
import { useTranslation } from "react-i18next";

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  useEffect(() => {
    // Small delay to allow elements to animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] bg-[#f8fbff] flex flex-col items-center justify-center overflow-hidden h-[100dvh] touch-none overscroll-none font-sans",
        isAr && "rtl",
      )}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: "easeInOut" },
      }}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3b82f6]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3b82f6]/10 blur-[120px]" />

        {/* Dashed Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full border border-dashed border-blue-200/60" />

        {/* Dot grids */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom_right,transparent,black)] opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 h-full">
        {/* Logo Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          {/* Logo Glow */}
          <div className="absolute inset-0 bg-[#0e44eb] rounded-full blur-2xl opacity-20 transform scale-150" />

          <img
            src="/logo.png"
            alt="École Nadjah"
            className="w-[100px] h-[100px] md:w-[170px] md:h-[150px] relative z-10 object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Bienvenue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 text-blue-500 tracking-[0.25em] font-medium text-[10px] sm:text-xs uppercase mb-6"
        >
          <div className="w-6 sm:w-10 h-[1px] bg-blue-200" />
          BIENVENUE DANS
          <div className="w-6 sm:w-10 h-[1px] bg-blue-200" />
        </motion.div>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center text-center mb-6"
        >
          <span
            className="text-4xl sm:text-6xl md:text-7xl font-sans font-light tracking-[0.25em] text-transparent mb-1 sm:mb-2 ml-[0.25em]"
            style={{ WebkitTextStroke: "1px #0e44eb" }}
          >
            ÉCOLE
          </span>
          <span className="text-6xl sm:text-8xl md:text-[8rem] font-sans font-black text-[#042ca0] tracking-tight leading-none drop-shadow-sm">
            NADJAH
          </span>
        </motion.div>

        {/* Subtitle & Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col items-center mb-10 max-w-2xl px-4"
        >
          <h2 className="text-lg sm:text-xl md:text-3xl font-serif italic text-blue-600/90 mb-4 text-center">
            L'excellence éducative au service de vos enfants
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center leading-relaxed font-medium">
            Un environnement d'apprentissage moderne, collaboratif et sécurisé
            pour accompagner chaque élève vers la réussite.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
          className="relative z-50 pointer-events-auto"
        >
          <button
            onClick={onEnter}
            className="group flex items-center gap-3 bg-[#0e44eb] hover:bg-[#0a31b4] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-base transition-all shadow-[0_10px_25px_rgba(14,68,235,0.3)] hover:shadow-[0_15px_35px_rgba(14,68,235,0.4)] hover:-translate-y-1"
          >
            Découvrir la plateforme
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      </div>

      {/* Floating Elements (Badges & Mockups) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block max-w-[1600px] mx-auto">
        {/* Top Left Badge: +1500 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="absolute top-[18%] left-[5%] xl:left-[10%] bg-white rounded-2xl p-4 pr-6 flex items-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-50"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center -ml-8 shadow-sm">
            <Users className="text-[#0e44eb]" size={20} />
          </div>
          <div>
            <div className="text-xl font-black text-[#042ca0]">+1500</div>
            <div className="text-[11px] font-medium text-gray-500">
              Élèves accompagnés
            </div>
          </div>
        </motion.div>

        {/* Top Right Badge: 4.9/5 */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
          className="absolute top-[22%] right-[5%] xl:right-[10%] bg-white rounded-2xl p-4 pr-6 flex items-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-50"
        >
          <div className="w-12 h-12 flex items-center justify-center -ml-8">
            <Star
              className="text-[#0e44eb] fill-[#0e44eb] drop-shadow-md"
              size={32}
            />
          </div>
          <div>
            <div className="text-xl font-black text-[#042ca0]">4.9/5</div>
            <div className="flex gap-0.5 my-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={10}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="text-[11px] font-medium text-gray-500">
              Avis des parents
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-[38%] left-[18%] w-12 h-12 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex items-center justify-center rotate-[-12deg]"
        >
          <GraduationCap className="text-[#0e44eb]" size={22} />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute top-[48%] right-[22%] w-10 h-10 bg-white rounded-[14px] shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex items-center justify-center rotate-[8deg]"
        >
          <Heart className="text-[#0e44eb] fill-[#0e44eb]" size={16} />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute top-[10%] right-[30%] w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center opacity-60"
        ></motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute top-[70%] right-[5%] w-8 h-8 rounded-full border-2 border-dashed border-blue-200 opacity-60"
        ></motion.div>

        {/* Left Dashboard Mockup */}
        <motion.div
          initial={{ y: 100, x: -50, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="absolute bottom-[5%] left-[-10%] lg:left-[-5%] xl:left-[2%] w-[450px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transform rotate-[15deg] overflow-hidden border-4 border-white/50 backdrop-blur-sm"
          style={{ perspective: "1000px", rotateX: "10deg", rotateY: "-15deg" }}
        >
          <div className="flex h-[320px]">
            <div className="w-[120px] bg-[#f8fbff] p-4 flex flex-col gap-2 border-r border-blue-50/50">
              <img
                src="/logo.png"
                alt="École Nadjah"
                className="w-16 h-auto mb-6 object-contain"
              />
              <div className="flex items-center gap-2 text-[#0e44eb] bg-white px-2 py-1.5 rounded-lg shadow-sm">
                <Home size={12} />
                <span className="text-[9px] font-bold">Home</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 px-2 py-1">
                <Megaphone size={12} />
                <span className="text-[9px]">Announcement</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 px-2 py-1">
                <Users size={12} />
                <span className="text-[9px]">Group chat</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 px-2 py-1">
                <MessageSquare size={12} />
                <span className="text-[9px]">Chat</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 px-2 py-1">
                <Video size={12} />
                <span className="text-[9px]">Live</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center gap-2 text-red-500 px-2 py-1 mt-auto">
                <LogOut size={12} />
                <span className="text-[9px]">Log out</span>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white shrink-0">
              <div className="text-[10px] font-bold text-[#042ca0] mb-1">
                Tableau de bord
              </div>
              <div className="text-lg font-black text-gray-800 flex items-center gap-1 mb-1">
                Bonjour, Samir 👋
              </div>
              <div className="text-[8px] text-gray-400 mb-6">
                Prêt pour une nouvelle journée d'apprentissage ?
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-[2] bg-[#f0f5ff] rounded-xl p-3">
                  <div className="text-[8px] text-gray-400 mb-1">
                    Cours du jour
                  </div>
                  <div className="text-[10px] font-bold text-[#042ca0] mb-0.5">
                    Mathématiques
                  </div>
                  <div className="text-[8px] text-blue-500 mb-2">
                    10:00 - 11:30
                  </div>
                  <div className="bg-blue-200 text-blue-600 text-[8px] font-bold px-2 py-0.5 rounded inline-block">
                    En direct
                  </div>
                </div>
                <div className="flex-1 bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex flex-col justify-center items-center">
                  <div className="text-[8px] text-gray-400">Devoirs</div>
                  <div className="text-xl font-bold text-gray-800">2</div>
                  <div className="text-[7px] text-gray-400">à remettre</div>
                </div>
                <div className="flex-1 bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex flex-col justify-center items-center">
                  <div className="text-[8px] text-gray-400">Résultats</div>
                  <div className="text-xl font-bold text-[#0e44eb]">85%</div>
                  <div className="text-[7px] text-gray-400">Moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Video / Book Mockup */}
        <motion.div
          initial={{ y: 100, x: 50, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, type: "spring" }}
          className="absolute bottom-[10%] right-[-5%] lg:right-[0%] xl:right-[5%] flex items-center transform rotate-[-12deg]"
        >
          {/* Blue Book */}
          <div className="w-[140px] h-[220px] bg-gradient-to-br from-[#1650f0] to-[#042ca0] rounded-r-2xl rounded-l-md shadow-[0_20px_40px_rgba(4,44,160,0.4)] border-l-4 border-white/20 transform skew-y-[15deg] relative z-10">
            {/* Bookmark */}
            <div className="absolute top-auto bottom-0 left-6 w-4 h-12 bg-white/20 rounded-b" />
          </div>

          {/* Video Player Card */}
          <div className="w-[280px] bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 p-6 -ml-16 mt-20 relative z-20">
            <div className="w-full aspect-video bg-[#f0f5ff] rounded-xl flex items-center justify-center mb-4 inner-shadow">
              <div className="w-12 h-12 bg-[#0e44eb] rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(14,68,235,0.4)] cursor-pointer hover:scale-110 transition-transform">
                <Play className="fill-white text-white ml-1" size={20} />
              </div>
            </div>
            <div className="w-1/3 h-2.5 bg-gray-200 rounded-full mb-3"></div>
            <div className="w-full h-8 bg-blue-50 rounded-lg flex items-center px-3 gap-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="w-3/4 h-1.5 bg-blue-200 rounded-full"></div>
                <div className="w-1/2 h-1 bg-blue-200/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 w-full hidden sm:flex justify-center flex-wrap gap-x-12 gap-y-4 px-4 z-20 text-xs sm:text-sm font-semibold text-gray-500"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-[#0e44eb]" />
          Apprentissage interactif
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-[#0e44eb]" />
          Suivi personnalisé
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-[#0e44eb]" />
          Communication facilitée
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
