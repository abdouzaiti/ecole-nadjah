import React from 'react';
import { motion } from 'motion/react';

export const BlueBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      {/* Soft Base Gradients - Static for performance */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 via-white to-blue-100/30" />

      {/* Large Soft Blobs - Slower, simpler animations */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-blue-400/5 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-3xl"
      />

      {/* Static Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="painting-mesh" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M 0 50 Q 50 0 100 50 Q 50 100 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-900" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#painting-mesh)" />
      </svg>
    </div>
  );
};
