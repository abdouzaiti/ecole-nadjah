import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui';
import { LogIn } from 'lucide-react';
import { SVGFollower } from './components/SVGFollower';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<'initial' | 'visible' | 'raised'>('initial');

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial delay
      await new Promise(r => setTimeout(r, 100));
      setPhase('visible');
      
      // 2. Wait while logo is visible at center
      await new Promise(r => setTimeout(r, 600));
      setPhase('raised');
    };

    sequence();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,49,144,0.03)_0%,rgba(255,255,255,1)_100%)] z-0" />
      
      <div className="absolute inset-0 z-0">
        <SVGFollower />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-full pointer-events-none">
        {/* Logo Animation */}
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ 
            opacity: phase === 'initial' ? 0 : 1,
            scale: phase === 'initial' ? 0.5 : (phase === 'raised' ? 0.3 : 1),
            y: phase === 'raised' ? "-32vh" : 0
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-96 md:w-[32rem] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
          />
        </motion.div>

        {/* School Name (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ 
              opacity: phase === 'initial' ? 0 : 1,
              y: phase === 'raised' ? -40 : 200 
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="text-center"
          >
            <div className="flex flex-col items-center max-w-2xl px-6">
              <motion.h1 
                initial={{ letterSpacing: "0.4em" }}
                animate={{ letterSpacing: "0.15em" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-packard font-extrabold text-white [text-shadow:_-2px_-2px_0_#1a3190,_2px_-2px_0_#1a3190,_-2px_2px_0_#1a3190,_2px_2px_0_#1a3190] mb-2"
              >
                ECOLE NADJAH
              </motion.h1>
              
              <div className="flex items-center gap-4 w-full mb-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#1a3190]/20" />
                <span className="text-sm md:text-base font-outfit uppercase tracking-[0.6em] text-[#1a3190]/60 font-medium">
                  AC
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#1a3190]/20" />
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'raised' ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl font-serif italic text-blue-900/40 tracking-wide"
              >
                L'excellence éducative au service de vos enfants
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Enter Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {phase === 'raised' && (
              <motion.div
                className="pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9, y: 180 }}
                animate={{ opacity: 1, scale: 1, y: 180 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              >
                <Button
                  onClick={onEnter}
                  size="lg"
                  className="relative group overflow-hidden bg-gradient-to-br from-[#1a3190] via-[#1a3190] to-blue-800 text-white rounded-full px-12 py-8 text-2xl font-outfit shadow-[0_20px_50px_rgba(26,49,144,0.3)] flex items-center gap-4 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(26,49,144,0.4)] hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10 font-bold tracking-wide">Discovery</span>
                  <motion.div
                    className="relative z-10 bg-white/10 p-2 rounded-full"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <LogIn className="w-6 h-6" />
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
