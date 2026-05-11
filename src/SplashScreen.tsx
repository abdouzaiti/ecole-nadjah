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
            scale: phase === 'initial' ? 0.5 : (phase === 'raised' ? 0.35 : 1),
            y: phase === 'raised' ? "-30vh" : 0
          }}
          transition={{ 
            opacity: { duration: 0.4 },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-96 md:w-[32rem] h-auto drop-shadow-sm"
          />
        </motion.div>

        {/* School Name (Centered) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: phase === 'initial' ? 0 : 1,
              y: phase === 'raised' ? -40 : 180 
            }}
            transition={{ 
              opacity: { duration: 0.4 },
              y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-navy tracking-[0.2em] drop-shadow-sm">
              ÉCOLE NADJAH
            </h1>
            <p className="text-xl md:text-2xl font-serif font-extrabold text-navy tracking-[0.5em] mt-2">
              AC
            </p>
          </motion.div>
        </div>

        {/* Enter Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence>
            {phase === 'raised' && (
              <motion.div
                className="pointer-events-auto"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 150 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <Button
                  onClick={onEnter}
                  size="lg"
                  className="bg-[#1a3190] text-white hover:bg-[#1a3190]/90 rounded-full px-12 py-8 text-2xl font-outfit shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all duration-300"
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
      </div>
    </motion.div>
  );
};

export default SplashScreen;
