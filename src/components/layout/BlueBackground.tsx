import React from 'react';
import { motion } from 'motion/react';

export const BlueBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      {/* Dynamic Color Blooms */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-50/80 via-white to-blue-100/40" />

      {/* Modernist "Paintings" - Abstract Floating Shapes */}
      <motion.div
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.9, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] bg-blue-400/5 blur-3xl"
      />

      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-20, 40, -20],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-600/5 blur-3xl opacity-60"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [-10, 10, -10],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-[30vw] h-[30vw] rounded-[30% 70% 50% 50% / 50% 50% 70% 30%] bg-blue-200/10 blur-3xl"
      />

      {/* Stylized Lines and Strokes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-200/20 to-transparent rotate-[15deg] blur-xs" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-blue-300/10 to-transparent -rotate-[12deg] blur-xs" />
      </div>
      
      {/* Organic Grainy Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="brush-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern id="painting-mesh" width="80" height="80" patternUnits="userSpaceOnUse">
             <path d="M 0 40 Q 40 0 80 40 Q 40 80 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-900/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#painting-mesh)" />
        <rect width="100%" height="100%" filter="url(#brush-texture)" />
      </svg>

      {/* Floating Sparkles/Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            y: [0, -100],
            x: [0, (i % 2 === 0 ? 20 : -20)],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Glassmorphism Accents */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-blue-200/10 rounded-full bg-blue-100/5 backdrop-blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-blue-300/10 rounded-full bg-blue-200/5 backdrop-blur-2xl animate-pulse" style={{ animationDuration: '12s' }} />
    </div>
  );
};
