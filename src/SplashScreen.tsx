import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui';
import { LogIn } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

type AnimationPhase = 'initial' | 'logo-partial' | 'text-appears' | 'merging' | 'completed' | 'raised';

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<AnimationPhase>('initial');

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial delay
      await new Promise(r => setTimeout(r, 500));
      setPhase('logo-partial');
      
      // 2. Text appears below
      await new Promise(r => setTimeout(r, 1200));
      setPhase('text-appears');
      
      // 3. Merging E and N
      await new Promise(r => setTimeout(r, 1000));
      setPhase('merging');
      
      // 4. Animation completion
      await new Promise(r => setTimeout(r, 1000));
      setPhase('completed');
      
      // 5. Raise to top
      await new Promise(r => setTimeout(r, 800));
      setPhase('raised');
    };

    sequence();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Main Logo Container */}
        <motion.div
          className="relative z-20"
          animate={{ 
            scale: phase === 'raised' ? 0.35 : 1,
            y: phase === 'raised' ? -window.innerHeight / 2 + 100 : 0
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Base Logo (Incomplete) */}
          <div className="relative">
            <motion.img 
              src="/logo.png" 
              alt="Logo" 
              className="w-64 md:w-80 h-auto"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: phase === 'initial' ? 0 : 1,
                filter: (phase === 'logo-partial' || phase === 'text-appears') ? 'grayscale(100%) opacity(0.3)' : 'grayscale(0%) opacity(1)'
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Simulation of "missing" parts - masking the area where E/N might be */}
            <AnimatePresence>
              {(phase === 'logo-partial' || phase === 'text-appears' || phase === 'merging') && (
                <motion.div 
                  className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Visual hint that something is missing */}
                  <div className="text-navy/20 font-serif font-black text-8xl blur-[4px]">
                    ??
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Letters E and N that merge */}
          <AnimatePresence>
            {phase === 'merging' && (
              <>
                {/* E from ECOLE */}
                <motion.div
                  className="absolute z-30 text-navy font-serif font-bold text-6xl md:text-7xl"
                  initial={{ x: -100, y: 150, opacity: 1 }}
                  animate={{ x: -30, y: 0, opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                >
                  E
                </motion.div>
                {/* N from NADJAH */}
                <motion.div
                  className="absolute z-30 text-navy font-serif font-bold text-6xl md:text-7xl"
                  initial={{ x: 60, y: 150, opacity: 1 }}
                  animate={{ x: 30, y: 0, opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                >
                  N
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Text "ECOLE NADJAH" */}
        <AnimatePresence>
          {(phase === 'text-appears' || phase === 'merging') && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex gap-4 text-4xl md:text-5xl font-serif font-bold text-navy tracking-widest">
                <div className="flex">
                  <motion.span 
                    animate={{ 
                      opacity: phase === 'merging' ? 0 : 1,
                      y: phase === 'merging' ? -50 : 0,
                      scale: phase === 'merging' ? 1.5 : 1
                    }}
                  >E</motion.span>
                  <span>COLE</span>
                </div>
                <div className="flex">
                  <motion.span 
                    animate={{ 
                      opacity: phase === 'merging' ? 0 : 1,
                      y: phase === 'merging' ? -50 : 0,
                      scale: phase === 'merging' ? 1.5 : 1
                    }}
                  >N</motion.span>
                  <span>ADJAH</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enter Button (Final Phase) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {phase === 'raised' && (
            <motion.div
              className="pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Button
                onClick={onEnter}
                size="lg"
                className="bg-navy text-white hover:bg-navy/90 rounded-full px-12 py-8 text-2xl font-serif shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all duration-300"
              >
                <span>Enter the Website</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <LogIn className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated subtle background gradients */}
      <AnimatePresence>
        {phase === 'raised' && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-sky/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-light/5 rounded-full blur-3xl -ml-48 -mb-48" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SplashScreen;
