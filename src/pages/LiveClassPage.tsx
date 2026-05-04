import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { 
  Users, 
  MessageSquare, 
  Send, 
  Mic, 
  Video, 
  Settings, 
  LogOut, 
  Hand, 
  X,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function LiveClassPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { user: 'Sofiane', text: 'Bonjour professeur !', time: '10:01' },
    { user: 'Amira', text: 'Es-ce que le cours sera enregistré ?', time: '10:02' },
    { user: 'Prof. Sarah', text: 'Oui, le replay sera disponible ce soir sur votre espace.', time: '10:03' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { user: 'Moi', text: inputText, time: '10:05' }]);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-navy p-4 flex flex-col lg:flex-row gap-4 overflow-hidden">
      {/* Video Area */}
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex-grow bg-navy-light/20 rounded-3xl relative overflow-hidden group shadow-2xl border border-white/5 flex items-center justify-center">
           <div className="text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                <Video size={48} className="text-blue-accent opacity-40" />
              </div>
              <p className="text-white/20 font-serif text-xl tracking-widest uppercase">Flux Vidéo en Attente</p>
           </div>
           
           {/* Indicators */}
           <div className="absolute top-6 left-6 flex gap-3">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse">
                 <span className="w-2 h-2 bg-white rounded-full"></span> EN DIRECT
              </div>
              <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border border-white/10">
                 <Users size={14} /> 142 Participants
              </div>
           </div>

           <div className="absolute top-6 right-6">
              <button className="p-2 bg-black/40 backdrop-blur-md text-white rounded-xl border border-white/10 hover:bg-black/60 transition-colors">
                 <Maximize2 size={20} />
              </button>
           </div>

           {/* Name Badge */}
           <div className="absolute bottom-24 left-6 py-2 px-4 bg-navy/60 backdrop-blur-md rounded-xl border border-white/10">
              <p className="text-white font-bold text-sm">Dr. Sarah Amine</p>
              <p className="text-blue-accent text-[10px] uppercase font-bold tracking-widest">Enseignant • Mathématiques</p>
           </div>

           {/* Controls Container */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 py-3 px-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"><Mic size={20} /></button>
              <button className="p-3 bg-white/10 text-white rounded-full hover:bg-white hover:text-navy transition-all"><Video size={20} /></button>
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              <button className="p-3 bg-white/10 text-white rounded-full hover:bg-blue-accent hover:text-white transition-all"><Hand size={20} /></button>
              <button className="p-3 bg-white/10 text-white rounded-full hover:bg-white hover:text-navy transition-all"><Settings size={20} /></button>
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              <Link to="/dashboard/student">
                <button className="p-3 bg-red-500 text-white rounded-full px-6 flex items-center gap-2 hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
                   <LogOut size={20} className="rotate-180" /> <span className="font-bold text-xs uppercase tracking-widest">Quitter</span>
                </button>
              </Link>
           </div>
        </div>
        
        {/* Small Participants grid toggle placeholder */}
        <div className="h-20 flex gap-4 overflow-x-auto no-scrollbar">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="aspect-video h-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover rounded-xl" />
             </div>
           ))}
        </div>
      </div>

      {/* Sidebar Chat */}
      <div className="w-full lg:w-96 flex flex-col h-full bg-navy-light/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="text-white font-serif text-xl flex items-center gap-2">
               <MessageSquare size={20} className="text-blue-accent" /> Chat en Direct
            </h3>
            <button className="text-white/40"><X size={20} /></button>
         </div>

         <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }}
                className={cn("max-w-[85%] space-y-1", m.user === 'Moi' ? "ml-auto text-right" : "")}
              >
                 <div className="flex items-center gap-2 mb-1 justify-end" style={{ flexDirection: m.user === 'Moi' ? 'row' : 'row-reverse' }}>
                   <span className="text-[10px] text-white/30">{m.time}</span>
                   <span className="text-xs font-bold text-blue-accent">{m.user}</span>
                 </div>
                 <div className={cn(
                   "p-3 rounded-2xl text-sm leading-relaxed",
                   m.user === 'Moi' ? "bg-blue-accent text-white rounded-tr-none" : "bg-white/10 text-white/80 rounded-tl-none border border-white/5"
                 )}>
                   {m.text}
                 </div>
              </motion.div>
            ))}
         </div>

         <div className="p-6 pt-0">
            <form onSubmit={handleSendMessage} className="relative">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 placeholder="Écrire un message..."
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-14 text-white focus:ring-2 focus:ring-blue-accent outline-none transition-all placeholder:text-white/20"
               />
               <button 
                 type="submit"
                 className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-accent text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-accent/20 hover:scale-105 transition-transform"
               >
                 <Send size={18} />
               </button>
            </form>
         </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
