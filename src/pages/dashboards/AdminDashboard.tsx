import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, Badge, Button } from '../../components/ui';
import { LayoutDashboard, Users, GraduationCap, BookOpen, TrendingUp, Check, X, Eye } from 'lucide-react';
import { MOCK_REGISTRATIONS } from '../../data/mock';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function AdminDashboard() {
  const sidebarItems = [
    { name: 'Vue d’ensemble', icon: LayoutDashboard, path: '/dashboard/admin' },
    { name: 'Inscriptions', icon: Users, path: '#' },
    { name: 'Étudiants', icon: GraduationCap, path: '#' },
    { name: 'Cours', icon: BookOpen, path: '#' },
    { name: 'Analytiques', icon: TrendingUp, path: '#' },
  ];

  const stats = [
    { label: 'Total Étudiants', value: '1,248', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Cours Actifs', value: '84', change: '+5', icon: BookOpen, color: 'bg-blue-accent/10 text-blue-accent' },
    { label: 'Enseignants', value: '42', change: '0', icon: GraduationCap, color: 'bg-green-50 text-green-600' },
    { label: 'Chiffre d’affaires', value: '2.4M', change: '+18.5%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <DashboardLayout items={sidebarItems}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif text-navy">Tableau de Bord Admin</h1>
          <p className="text-navy/50">Bienvenue, voici un aperçu de l'école aujourd'hui.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-3 rounded-xl", stat.color)}>
                     <stat.icon size={24} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    stat.change.startsWith('+') ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-navy">{stat.value}</div>
                <div className="text-sm font-medium text-navy/40">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-0 overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <h2 className="text-xl font-serif text-navy">Inscriptions Récentes</h2>
                <Button variant="ghost" size="sm" className="text-blue-accent">Tout voir</Button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                         <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">Étudiant</th>
                         <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">Niveau</th>
                         <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">Statut</th>
                         <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40">Date</th>
                         <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-navy/40 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {MOCK_REGISTRATIONS.map((reg) => (
                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="font-bold text-navy">{reg.studentName}</div>
                              <div className="text-xs text-navy/40">{reg.parentName}</div>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant="accent">{reg.level}</Badge>
                           </td>
                           <td className="px-6 py-4">
                              <Badge variant={reg.status === 'APPROVED' ? 'green' : 'navy'}>{reg.status}</Badge>
                           </td>
                           <td className="px-6 py-4 text-sm text-navy/60">{reg.date}</td>
                           <td className="px-6 py-4 text-right space-x-2">
                               <button className="p-2 hover:bg-green-50 text-green-500 rounded-lg transition-colors"><Check size={16} /></button>
                               <button className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"><X size={16} /></button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </Card>

          <Card className="p-6">
             <h2 className="text-xl font-serif text-navy mb-6">Activités Récentes</h2>
             <div className="space-y-6">
                {[
                  { user: 'Prof. Yacine', action: 'a ajouté un nouveau cours', time: 'Il y a 10 min' },
                  { user: 'Admin System', action: 'Mise à jour plan de cours', time: 'Il y a 1 heure' },
                  { user: 'Amira Kaci', action: 'a soumis son inscription', time: 'Il y a 3 heures' },
                  { user: 'Dr. Sarah', action: 'a terminé une session live', time: 'Il y a 5 heures' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 3 && <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-100"></div>}
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                       {act.user.charAt(0)}
                    </div>
                    <div className="pb-4">
                       <p className="text-sm text-navy font-medium"><span className="font-bold">{act.user}</span> {act.action}</p>
                       <p className="text-xs text-navy/40 mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <Button variant="outline" className="w-full mt-6 py-3">Rapport d'activité complet</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
