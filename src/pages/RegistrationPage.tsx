import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { motion } from 'motion/react';
import { CheckCircle, Info, User, Mail, Phone, Calendar, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-white">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-md text-center p-12 bg-white premium-shadow border-none">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-serif text-navy mb-4">Demande Envoyée !</h2>
            <p className="text-navy/60 mb-8 leading-relaxed">
              Votre demande d'inscription a bien été reçue. Notre équipe administrative étudiera votre dossier et vous contactera par téléphone d'ici 48 heures.
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full">Retour à l'accueil</Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-6 object-contain" />
          <Badge variant="navy">Étape 1 sur 2</Badge>
          <h1 className="text-4xl md:text-5xl font-serif text-navy mt-4 mb-4">Inscription Étudiant</h1>
          <p className="text-navy/60 italic">Veuillez remplir le formulaire ci-dessous avec les informations exactes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-xl font-serif text-navy mb-6 flex items-center gap-2">
                    <User size={20} className="text-blue-accent" /> Informations de l'Élève
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Nom</label>
                      <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Prénom</label>
                      <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Date de Naissance</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20" />
                        <input type="date" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Niveau Souhaité</label>
                      <div className="relative">
                        <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20" />
                        <select className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none appearance-none">
                          <option>Primaire</option>
                          <option>Moyen</option>
                          <option>Secondaire</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                <div>
                  <h3 className="text-xl font-serif text-navy mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-blue-accent" /> Parent / Tuteur
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Nom Complet du Parent</label>
                      <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Email de Contact</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20" />
                        <input type="email" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-navy/40 px-1">Numéro de Téléphone</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/20" />
                        <input type="tel" placeholder="0..." required className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-navy outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="navy" className="w-full py-5 text-white font-bold uppercase tracking-[0.2em] shadow-xl shadow-navy/20">
                  Soumettre mon dossier
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-navy text-white p-8">
              <h4 className="text-xl font-serif text-white mb-4">Informations Importantes</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <Info size={24} className="text-blue-accent shrink-0" />
                  <span>Le dossier complet doit être déposé physiquement après acceptation préliminaire.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-blue-accent shrink-0" />
                  <span>Les places sont limitées par niveau.</span>
                </li>
              </ul>
            </Card>
            
            <Card className="p-8 border-navy/10 border-2 dashed">
              <h4 className="text-lg font-serif text-navy mb-4">Aide à l'inscription?</h4>
              <p className="text-sm text-navy/60 mb-6 font-sans">
                Besoin d'assistance pour remplir le formulaire ou de renseignements sur nos tarifs ?
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Nous Contacter
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
