import { motion } from 'motion/react';
import { Button, Card, Badge } from '../components/ui';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Monitor, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center pt-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge variant="accent">Inscriptions Ouvertes 2026-2027</Badge>
            <h1 className="text-5xl md:text-7xl font-serif text-navy mt-6 mb-6 leading-[1.1]">
              École Nadjah: <br />
              <span className="text-blue-accent italic">Former les leaders</span> de demain
            </h1>
            <p className="text-xl text-navy/60 mb-10 font-sans max-w-xl">
              Une institution d'excellence dédiée à l'épanouissement intellectuel et personnel de chaque élève. 
              Une éducation moderne, des valeurs fortes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" variant="navy" className="w-full sm:w-auto px-10">S'inscrire Maintenant</Button>
              </Link>
              <a href="#programs">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Découvrir l’École</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 mb-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Élèves", value: "1,200+", icon: <Users size={24} /> },
            { label: "Réussite au Bac", value: "98%", icon: <GraduationCap size={24} /> },
            { label: "Enseignants", value: "85", icon: <CheckCircle2 size={24} /> },
            { label: "Cours en Ligne", value: "500+", icon: <Monitor size={24} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="flex items-center gap-4 py-8 border-gray-50">
                <div className="w-12 h-12 rounded-full bg-navy/5 text-navy flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-navy">{stat.value}</div>
                  <div className="text-sm font-medium text-navy/50 uppercase tracking-wider">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4">Nos Programmes</h2>
            <div className="h-1 w-20 bg-navy mx-auto"></div>
            <p className="mt-6 text-navy/60 max-w-2xl mx-auto italic text-lg">
              Un parcours éducatif complet, du premier pas à l'université.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                level: "Primaire", 
                desc: "Poser les bases d'un apprentissage solide avec une pédagogie bienveillante.",
                icon: <GraduationCap size={48} className="text-blue-accent" />,
                color: "bg-blue-accent/5"
              },
              { 
                level: "Moyen", 
                desc: "Accompagner la transition vers l'adolescence et renforcer les acquis académiques.",
                icon: <CheckCircle2 size={48} className="text-blue-accent" />,
                color: "bg-navy/5"
              },
              { 
                level: "Secondaire", 
                desc: "Préparer l'excellence pour le Baccalauréat et l'orientation universitaire.",
                icon: <ShieldCheck size={48} className="text-blue-accent" />,
                color: "bg-blue-accent/5"
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-0 overflow-hidden group border-gray-100">
                  <div className={cn("h-48 flex items-center justify-center transition-colors duration-500", p.color)}>
                    <div className="group-hover:scale-110 transition-transform duration-500">
                      {p.icon}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif mb-4 text-navy">{p.level}</h3>
                    <p className="text-navy/60 mb-6 leading-relaxed">{p.desc}</p>
                    <Button variant="ghost" className="p-0 group-hover:text-blue-accent flex items-center gap-2">
                      En savoir plus <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none -translate-y-1/4 translate-x-1/4">
          <img src="/logo.png" alt="" className="w-[600px] h-[600px] object-contain invert brightness-0" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="accent">Pourquoi Nous Choisir ?</Badge>
            <h2 className="text-4xl md:text-5xl font-serif mt-6 mb-8 uppercase tracking-tight text-white">Une Éducation de Prestige</h2>
            <div className="space-y-8">
              {[
                { title: "Infrastructures Modernes", desc: "Salles de classe connectées, laboratoires de pointe et espaces sportifs.", icon: <ShieldCheck className="text-blue-accent" /> },
                { title: "Digital Learning", desc: "Plateforme interactive intégrée pour un suivi hybride efficace.", icon: <Monitor className="text-blue-accent" /> },
                { title: "Enseignement Personnalisé", desc: "Des classes réduites pour une attention dédiée à chaque élève.", icon: <Users className="text-blue-accent" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-xl font-serif text-white">{item.title}</h4>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
            <div className="relative">
              <div className="rounded-3xl bg-white/5 backdrop-blur-sm p-12 border border-white/10 rotate-3 scale-95 shadow-2xl flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-md border border-white/10">
                      <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 w-32 bg-white/20 rounded-full mx-auto"></div>
                       <div className="h-2 w-24 bg-white/10 rounded-full mx-auto"></div>
                       <div className="h-2 w-40 bg-white/5 rounded-full mx-auto"></div>
                    </div>
                  </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-accent/10 blur-3xl rounded-full z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-navy/20 blur-3xl rounded-full z-0"></div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif text-navy mb-8">Nous Contacter</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-navy shadow-inner group-hover:bg-blue-accent/10 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <a 
                    href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-navy/70 hover:text-blue-accent transition-colors underline-offset-4 hover:underline"
                  >
                    École Nadjah, Mostaganem, Algérie
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-navy shadow-inner">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg text-navy/70">+213 (0) 45 70 00 00</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-navy shadow-inner">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg text-navy/70">contact@elnadjah-dz.com</span>
                </div>
              </div>
              
            <a 
              href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-10 h-64 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden hover:border-blue-accent/50 transition-all group relative"
            >
                <div className="absolute inset-0 z-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1632.748!2d0.089!3d35.930!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1282036a050e3715%3A0xdc2a35b12a46b33f!2s%C3%A9cole%20el%20nadjah!5e1!3m2!1sfr!2sdz!4v1714821000000!5m2!1sfr!2sdz"
                    className="w-full h-full border-0 pointer-events-none scale-150"
                    style={{ filter: 'contrast(1.1) brightness(0.9)' }}
                    title="Vue Satellite École Nadjah"
                  />
                </div>
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
                
                <div className="text-center group-hover:opacity-0 transition-opacity relative z-10 px-6 pointer-events-none">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <MapPin size={32} className="text-blue-accent" />
                  </div>
                  <div className="font-serif text-white font-bold uppercase tracking-widest text-xl drop-shadow-xl">Voir sur Google Maps</div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-navy uppercase tracking-tighter z-10 transition-transform group-hover:translate-x-1">Ouvrir l'application Maps</div>
              </a>
            </div>
            
            <Card className="bg-cream border-none p-10">
              <h3 className="text-3xl font-serif mb-6 text-navy">Envoyez un message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nom" className="bg-white border-none rounded-xl p-4 w-full focus:ring-2 focus:ring-navy outline-none" />
                  <input type="email" placeholder="Email" className="bg-white border-none rounded-xl p-4 w-full focus:ring-2 focus:ring-navy outline-none" />
                </div>
                <input type="text" placeholder="Sujet" className="bg-white border border-gray-100 rounded-xl p-4 w-full focus:ring-2 focus:ring-navy outline-none" />
                <textarea placeholder="Message" rows={4} className="bg-white border border-gray-100 rounded-xl p-4 w-full focus:ring-2 focus:ring-navy outline-none" />
                <Button variant="navy" className="w-full py-4 text-white uppercase tracking-widest font-bold">Envoyer le Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy text-white/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain invert brightness-0" />
             <span className="text-white font-serif font-bold text-lg">École Nadjah</span>
          </div>
          <div className="text-sm">
            © 2026 École Nadjah. Tous droits réservés. Design by Excellence.
          </div>
          <div className="flex gap-6 text-sm uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors text-white/40">Mentions Légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
