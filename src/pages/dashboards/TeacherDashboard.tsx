import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../../components/ui';
import { Video, Calendar, BookOpen, Users, Plus, Play, MoreVertical } from 'lucide-react';
import { MOCK_COURSES, MOCK_LIVES } from '../../data/mock';
import { motion } from 'motion/react';

export default function TeacherDashboard() {
  const sidebarItems = [
    { name: 'Mon Espace', icon: Video, path: '/dashboard/teacher' },
    { name: 'Mes Cours', icon: BookOpen, path: '#' },
    { name: 'Emploi du temps', icon: Calendar, path: '#' },
    { name: 'Étudiants', icon: Users, path: '#' },
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif text-navy">Espace Enseignant</h1>
            <p className="text-navy/50">Préparez vos sessions et gérez vos ressources éducatives.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="flex items-center gap-2">
                <Calendar size={18} /> Planifier Session
             </Button>
             <Button variant="accent" className="flex items-center gap-2">
                <Plus size={18} /> Nouveau Cours
             </Button>
          </div>
        </div>

        {/* Live Now Card */}
        <Card className="bg-navy overflow-hidden relative border-none">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Video size={200} className="text-white" />
           </div>
           <div className="relative z-10 p-8 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-xl text-center md:text-left">
                 <Badge variant="accent">Session Live Détectée</Badge>
                 <h2 className="text-3xl font-serif text-white mt-4 mb-4">Révisions Bac: Algèbre Linéaire</h2>
                 <p className="text-white/60 mb-6 font-sans">
                    Votre session de révision intensive commence maintenant. 124 élèves sont déjà en attente dans la salle.
                 </p>
                 <div className="flex gap-4 justify-center md:justify-start">
                    <Button variant="accent" className="flex items-center gap-2 px-8">
                       <Play size={18} fill="currentColor" /> Lancer le Direct
                    </Button>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                       <Users size={16} /> 124 en attente
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-64 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                  <div className="text-4xl font-serif text-white font-bold mb-2">00:15</div>
                  <div className="text-xs uppercase tracking-widest text-white/40">Durée recommandée</div>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Library section */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-serif text-navy">Mes Cours Récents</h2>
                 <Button variant="ghost" className="text-sm">Gérer tout</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_COURSES.slice(0, 2).map((course, i) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                       <Card className="p-0 overflow-hidden group">
                          <div className="aspect-video relative overflow-hidden">
                             <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                             <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors"></div>
                             <div className="absolute top-3 left-3">
                                <Badge variant="accent">{course.subject}</Badge>
                             </div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="accent" size="sm" className="rounded-full w-12 h-12 p-0"><Play size={20} fill="currentColor" /></Button>
                             </div>
                          </div>
                          <div className="p-5">
                             <h4 className="font-serif text-lg text-navy mb-2 line-clamp-1">{course.title}</h4>
                             <div className="flex justify-between items-center text-xs text-navy/40">
                                <span>{course.duration}</span>
                                <span>{course.level}</span>
                             </div>
                          </div>
                       </Card>
                    </motion.div>
                 ))}
              </div>
           </div>

           {/* Schedule section */}
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-serif text-navy">Aujourd'hui</h2>
              </div>
              <div className="space-y-4">
                 {MOCK_LIVES.map((live, i) => (
                    <Card key={live.id} className="p-4 flex gap-4 border-l-4 border-l-blue-accent">
                       <div className="shrink-0 text-center px-3 border-r border-gray-100">
                          <div className="text-xs font-bold text-navy/40 uppercase">Mai</div>
                          <div className="text-2xl font-serif text-navy">04</div>
                       </div>
                       <div>
                          <h5 className="font-bold text-navy text-sm">{live.title}</h5>
                          <p className="text-xs text-navy/40 mt-1">{live.subject} • {live.level}</p>
                          <div className="flex items-center gap-2 mt-3">
                             <Badge variant={live.status === 'LIVE' ? 'red' : 'navy'}>{live.status}</Badge>
                             <span className="text-[10px] text-navy/40 font-bold">14:30</span>
                          </div>
                       </div>
                    </Card>
                 ))}
              </div>
              <Card className="bg-blue-accent/5 border-blue-accent/10 p-6 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-blue-accent/10 text-blue-accent rounded-full flex items-center justify-center mb-4">
                    <Users size={24} />
                 </div>
                 <h4 className="font-serif text-navy mb-2">Conseil Pédagogique</h4>
                 <p className="text-xs text-navy/60 leading-relaxed">
                    Les sessions du matin ont un taux d'engagement 30% plus élevé. Envisagez de planifier vos révisions clés avant midi.
                 </p>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
