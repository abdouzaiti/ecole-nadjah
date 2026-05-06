import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Button } from './ui';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export function ProgramModal({ isOpen, onClose, title, items, icon }: ProgramModalProps) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-20"
          >
            <div className="p-8">
              <div className={cn("flex justify-between items-start mb-8", isAr && "flex-row-reverse")}>
                <div className={cn("flex items-center gap-4", isAr && "flex-row-reverse")}>
                   <div className="w-12 h-12 rounded-2xl bg-blue-accent/10 flex items-center justify-center text-blue-accent">
                      {icon}
                   </div>
                   <h3 className="text-2xl font-serif text-navy">{title}</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-navy/40" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-accent/30 hover:bg-white hover:shadow-lg transition-all group",
                      isAr && "flex-row-reverse text-right"
                    )}
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-accent/10 flex items-center justify-center text-blue-accent group-hover:bg-blue-accent group-hover:text-white transition-colors shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-lg text-navy/80 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button 
                  onClick={onClose}
                  variant="navy" 
                  className="w-full py-4 text-white uppercase tracking-widest font-bold"
                  style={{ backgroundColor: '#230d8b' }}
                >
                  {t('close')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
