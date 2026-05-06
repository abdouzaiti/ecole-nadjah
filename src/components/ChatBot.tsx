import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Minus, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

// Types
interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export const ChatBot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: t('chatbot.welcome_msg', 'Hello! I am your École Nadjah assistant. How can I help you today?') }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemInstruction = `
        You are a helpful and professional school assistant for École Nadjah (Nadjah School).
        Your goal is to help users understand the website and provide information about the school, programs, and inscriptions.
        
        School Information:
        - Name: École Nadjah (Nadjah School)
        - Levels: Primary (Primaire), Middle (Moyen), High (Secondaire), Formation, and Specialized Courses.
        - Statistics: Over 500 students, 98% BAC success rate, more than 20 expert teachers, and 30+ online courses.
        - Location: They should check the contact section or the map on the landing page for the exact address.
        - Registration: Users can register online through the "Register Now" or "Inscription" buttons.
        - Features: The school offers both in-person and online learning (Live classes and Replays).
        - Dashboards: There are dedicated dashboards for Admins, Teachers, and Students.
        
        Guidelines:
        - Be polite, helpful, and professional.
        - Keep responses concise but informative.
        - If you don't know the answer, suggest they contact the school directly via the phone or email provided on the website.
        - Respond in the language the user is using (support Arabic and French/English as the website does).
        - The current language of the website is ${i18n.language}.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const modelMessage: Message = {
        role: 'model',
        parts: [{ text: response.text || "I'm sorry, I couldn't process that. Please try again." }]
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('ChatBot Error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: "Sorry, I'm having some trouble connecting. Please try again later." }]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isAr = i18n.language === 'ar';

  return (
    <div className={cn("fixed bottom-6 z-[100] flex flex-col items-end gap-4", isAr ? "left-6" : "right-6")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "bg-white shadow-2xl rounded-2xl overflow-hidden border border-navy/10 flex flex-col transition-all duration-300",
              isMinimized ? "h-14 w-72" : "h-[500px] w-[350px] sm:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold">{t('chatbot.name', 'Assistant Nadjah')}</span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-grow overflow-y-auto p-4 space-y-4 bg-cream/30"
                >
                  {messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex",
                        m.role === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                          m.role === 'user' 
                            ? "bg-blue-accent text-white rounded-br-none" 
                            : "bg-white text-navy shadow-sm border border-navy/5 rounded-bl-none"
                        )}
                        dir={isAr ? 'rtl' : 'ltr'}
                      >
                        {m.parts[0].text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-navy/5">
                        <Loader2 size={16} className="animate-spin text-blue-accent" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-navy/5">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t('chatbot.placeholder', 'Type your message...')}
                      className={cn(
                        "flex-grow bg-navy/5 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-accent transition-all",
                        isAr && "text-right"
                      )}
                      disabled={isLoading}
                    />
                    <button 
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-navy text-white p-2 rounded-xl hover:bg-blue-accent transition-colors disabled:opacity-50"
                    >
                      <Send size={18} className={isAr ? "rotate-180" : ""} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-navy text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-accent transition-all duration-300 relative group"
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};
