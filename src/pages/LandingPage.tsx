import { motion } from 'motion/react';
import { Button, Card, Badge } from '../components/ui';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Monitor, MapPin, Phone, Mail, GraduationCap, Facebook, Instagram, Youtube, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '../components/GlowCard';
import { useState, ReactNode } from 'react';
import { ProgramModal } from '../components/ProgramModal';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

interface DetailedProgram {
  id: string;
  title: string;
  items: string[];
  icon: ReactNode;
}

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  
  const [selectedProgram, setSelectedProgram] = useState<DetailedProgram | null>(null);

  const programs = [
    { 
      id: 'primary',
      level: t('levels.primary'), 
      desc: t('levels.primary_desc'),
      icon: <GraduationCap size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: [
        "/primaire/primaire1.jpg",
        "/primaire/primaire2.jpg",
        "/primaire/primaire3.jpg"
      ]
    },
    { 
      id: 'middle',
      level: t('levels.middle'), 
      desc: t('levels.middle_desc'),
      icon: <CheckCircle2 size={48} className="text-blue-accent" />,
      color: "bg-navy/5",
      images: [
        "/cem/cem1.jpg",
        "/cem/cem2.jpg",
        "/cem/cem3.jpg"
      ]
    },
    { 
      id: 'high',
      level: t('levels.high'), 
      desc: t('levels.high_desc'),
      icon: <ShieldCheck size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: [
        "/lycee/lycee1.jpg",
        "/lycee/lycee2.jpg",
        "/lycee/lycee3.jpg"
      ]
    },
    { 
      id: 'formation',
      level: t('levels.formation'), 
      desc: t('levels.formation_desc'),
      icon: <Monitor size={48} className="text-blue-accent" />,
      color: "bg-navy/5",
      images: [
        "/formation/formation1.jpg",
        "/formation/formation2.jpg",
        "/formation/formation3.jpg"
      ]
    },
    { 
      id: 'courses',
      level: t('levels.courses'), 
      desc: t('levels.courses_desc'),
      icon: <BookOpen size={48} className="text-blue-accent" />,
      color: "bg-blue-accent/5",
      images: [
        "/dawarat/dawra1.jpg",
        "/dawarat/dawra2.jpg",
        "/dawarat/dawra3.jpg"
      ]
    },
  ];

  const handleLearnMore = (id: string, levelName: string, icon: ReactNode) => {
    // Access details from i18n
    const details = t(`levels.details.${id}`, { returnObjects: true }) as string[];
    if (Array.isArray(details)) {
      setSelectedProgram({
        id,
        title: levelName,
        items: details,
        icon
      });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <ProgramModal 
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title || ""}
        items={selectedProgram?.items || []}
        icon={selectedProgram?.icon}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-transparent">
        {/* Abstract Background Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a3190_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className={cn(
          "absolute top-0 w-[40%] h-full bg-linear-to-br from-blue-600/5 to-transparent -skew-x-12 translate-x-20 z-0",
          isAr ? "left-0" : "right-0"
        )}></div>
        <div className={cn(
          "absolute top-20 w-96 h-96 bg-[#1a3190]/5 rounded-full blur-[100px] z-0",
          isAr ? "right-10" : "left-10"
        )}></div>
        <div className={cn(
          "absolute bottom-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[80px] z-0",
          isAr ? "left-20" : "right-20"
        )}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className={cn("max-w-3xl", isAr ? "text-right ml-auto" : "text-left mr-auto")}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Badge variant="accent" className="px-4 py-1.5 text-sm uppercase tracking-widest bg-[#1a3190]/10 text-[#1a3190] border-none">
                {t('enrollment_open')}
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-serif text-navy mt-8 mb-8 leading-[1.05] tracking-tight"
            >
              {t('hero_title')} <br />
              <span className="text-blue-accent italic font-medium">{t('hero_subtitle').split(' ')[0]}</span> {t('hero_subtitle').split(' ').slice(1).join(' ')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className={cn("text-xl md:text-2xl text-navy/50 mb-12 font-sans max-w-2xl leading-relaxed", isAr && "mr-0 ml-auto")}
            >
              {t('hero_description')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className={cn("flex flex-col sm:flex-row gap-6", isAr && "justify-end")}
            >
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto px-12 py-8 text-lg bg-gradient-to-r from-[#1a3190] to-blue-700 hover:to-blue-600 text-white rounded-full shadow-[0_15px_35px_rgba(26,49,144,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_45px_rgba(26,49,144,0.4)]">
                  {t('register_now')}
                </Button>
              </Link>
              <a href="#programs">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg rounded-full border-2 border-[#1a3190]/20 text-[#1a3190] hover:bg-[#1a3190]/5 transition-all duration-300">
                   {t('discover_school')}
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#1a3190]/10 via-[#1a3190]/40 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 mt-12 mb-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
            { label: t('stats.students'), value: "+500", icon: <Users size={24} /> },
            { label: t('stats.bac_success'), value: "98%", icon: <GraduationCap size={24} /> },
            { label: t('stats.teachers'), value: "+20", icon: <CheckCircle2 size={24} /> },
            { label: t('stats.online_courses'), value: "+30", icon: <Monitor size={24} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <GlowCard 
                customSize 
                glowColor="blue"
                className={cn("flex items-center gap-4 py-8 px-6 h-full border-transparent", isAr ? "flex-row-reverse text-right" : "flex-row")}
              >
                <div className="w-12 h-12 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-navy">{stat.value}</div>
                  <div className="text-sm font-medium text-navy/50 uppercase tracking-wider">{stat.label}</div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-white/60 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4 tracking-tight">{t('nav.programs')}</h2>
            <div className="h-1.5 w-16 bg-blue-accent mx-auto rounded-full"></div>
            <p className={cn("mt-6 text-navy/60 max-w-2xl mx-auto italic text-lg leading-relaxed", isAr && "font-serif")}>
              {t('path_subtitle')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-12">
            {programs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card className={cn("p-0 group border-none bg-transparent relative shadow-none", isAr && "text-right flex flex-col h-full")}>
                  <div className={cn("h-[400px] flex items-center justify-center transition-colors duration-500 relative rounded-3xl bg-transparent")}>
                    {/* Bouquet of Images - Emerging Pattern */}
                    <div className="relative w-full h-full flex items-end justify-center z-20 pb-0">
                      {p.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/5 origin-bottom"
                          initial={false}
                          animate={{
                            rotate: idx === 0 ? -15 : idx === 1 ? 0 : 15,
                            x: idx === 0 ? -60 : idx === 1 ? 0 : 60,
                            y: idx === 1 ? -10 : 30, 
                            scale: idx === 1 ? 1.05 : 0.9,
                            zIndex: idx === 1 ? 25 : 10
                          }}
                          whileHover={{
                            rotate: idx === 0 ? -25 : idx === 1 ? 0 : 25,
                            x: idx === 0 ? -100 : idx === 1 ? 0 : 100,
                            y: idx === 1 ? -80 : -40,
                            scale: 1.25,
                            zIndex: 40
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <GlowCard 
                    customSize 
                    glowColor="blue"
                    className="p-10 pt-16 flex-grow bg-white rounded-3xl -mt-24 relative z-30 shadow-2xl overflow-visible border-transparent"
                  >
                    <h3 className="text-3xl font-serif mb-4 text-navy">{p.level}</h3>
                    <p className="text-navy/60 mb-8 leading-relaxed line-clamp-3 text-lg">{p.desc}</p>
                    
                    <Button 
                      onClick={() => handleLearnMore(p.id, p.level, p.icon)}
                      variant="ghost" 
                      className={cn("p-0 group-hover:text-blue-accent flex items-center gap-2 mt-auto w-fit", isAr && "flex-row-reverse ml-auto")}
                    >
                      {t('learn_more')} 
                      <ArrowRight size={18} className={cn("transition-transform", isAr ? "group-hover:-translate-x-2 rotate-180" : "group-hover:translate-x-2")} />
                    </Button>
                  </GlowCard>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-linear-to-b from-transparent to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#1a3190_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className={cn("relative", isAr ? "order-last" : "")}>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" 
                  alt="Students at École Nadjah" 
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
              <div className={cn(
                "absolute -bottom-10 -right-10 w-64 h-64 bg-navy rounded-3xl -z-0 opacity-10",
                isAr ? "left-10 right-auto" : "right-10"
              )}></div>
            </div>
            
            <div className={cn(isAr && "text-right")}>
              <Badge variant="accent">{t('nav.about')}</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-navy mt-6 mb-8">{t('about.title')}</h2>
              <p className="text-navy/70 text-lg leading-relaxed mb-8">
                {t('about.description1')}
              </p>
              <p className="text-navy/70 text-lg leading-relaxed mb-10">
                {t('about.description2')}
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-navy mb-2">10+</div>
                  <div className="text-sm font-medium text-navy/40 uppercase tracking-widest">{t('about.years_exp')}</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-navy mb-2">2000+</div>
                  <div className="text-sm font-medium text-navy/40 uppercase tracking-widest">{t('about.graduates')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className={cn(
          "absolute top-0 opacity-5 pointer-events-none -translate-y-1/4",
          isAr ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"
        )}>
          <img src="/logo.png" alt="" className="w-[600px] h-[600px] object-contain invert brightness-0" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className={isAr ? "text-right" : "text-left"}>
            <Badge variant="accent">{t('why_us.title')}</Badge>
            <h2 className="text-4xl md:text-5xl font-serif mt-6 mb-8 uppercase tracking-tight text-white">{t('why_us.subtitle')}</h2>
            <div className="space-y-8">
              {[
                { 
                  title: t('digital_learning'), 
                  desc: t('digital_learning_desc'), 
                  icon: <Monitor className="text-blue-accent" />,
                  link: "https://platform-nadjah.vercel.app"
                },
                { title: t('personalized_teaching'), desc: t('personalized_teaching_desc'), icon: <Users className="text-blue-accent" /> },
              ].map((item, i) => (
                item.link ? (
                  <a 
                    key={i} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn("flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group", isAr ? "flex-row-reverse" : "flex-row")}
                  >
                    <div className="mt-1 transition-transform group-hover:scale-110">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-serif text-white group-hover:text-blue-accent transition-colors">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </a>
                ) : (
                  <div key={i} className={cn("flex gap-4 p-4", isAr ? "flex-row-reverse" : "flex-row")}>
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-xl font-serif text-white">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
            <div className={cn("relative", isAr ? "order-first lg:order-last" : "")}>
              <motion.a 
                href="https://platform-nadjah.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className={cn(
                  "block group rounded-3xl bg-white/10 p-2 border border-white/20 shadow-2xl min-h-[400px] relative overflow-hidden transition-all hover:bg-white/15 hover:border-blue-accent/30",
                  isAr ? "-rotate-3" : "rotate-3"
                )}
              >
                  {/* Platform UI Mockup */}
                  <div className="bg-navy/80 rounded-2xl w-full h-full flex flex-col overflow-hidden">
                    <div className="bg-white/10 p-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/50 font-mono">platform.nadjah.dz</div>
                    </div>
                    <div className="flex-grow p-6 flex flex-col gap-6">
                      <div className="w-2/3 h-8 bg-linear-to-r from-blue-accent/40 to-transparent rounded-lg animate-pulse" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-video bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain opacity-20 group-hover:opacity-100 transition-opacity" loading="lazy" />
                        </div>
                        <div className="aspect-video bg-white/5 rounded-xl" />
                      </div>
                      <div className="space-y-3">
                         <div className="h-2 w-full bg-white/10 rounded-full" />
                         <div className="h-2 w-full bg-white/10 rounded-full" />
                         <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                      </div>
                      <div className="mt-auto flex justify-center relative">
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: [0, -8, 0] }}
                           transition={{ 
                             opacity: { duration: 0.5 },
                             y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                           }}
                           className="absolute -top-10 bg-blue-accent text-white text-[10px] px-3 py-1 rounded-full font-bold whitespace-nowrap shadow-lg z-20"
                         >
                           {isAr ? "إضغط هنا للدخول" : "Click here to enter"}
                           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-accent rotate-45" />
                         </motion.div>
                         <div className="px-6 py-3 bg-blue-accent rounded-xl text-white font-bold text-sm shadow-xl shadow-blue-accent/20 group-hover:scale-110 transition-transform">
                            {isAr ? "دخول المنصة" : "Enter Platform"}
                         </div>
                      </div>
                    </div>
                  </div>
              </motion.a>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-accent/10 blur-3xl rounded-full z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-navy/20 blur-3xl rounded-full z-0"></div>
            </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white text-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-gray-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn("text-center mb-16", isAr ? "text-right" : "text-left")}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-navy mb-8 text-center tracking-tight">{t('contact_us')}</h2>
              <div className="h-1.5 w-16 bg-blue-accent mx-auto rounded-full mb-12"></div>
              
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={cn("flex items-center gap-6 group", isAr && "flex-row-reverse")}
                >
                  <a 
                    href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white shrink-0 group-hover:scale-110"
                  >
                    <MapPin size={24} />
                  </a>
                  <a 
                    href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors underline-offset-4 hover:underline leading-tight", isAr && "font-serif")}
                  >
                    {t('school_name')}, {t('location')}
                  </a>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className={cn("flex items-start gap-6 group", isAr && "flex-row-reverse")}
                >
                  <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] shrink-0 group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white group-hover:scale-110">
                    <Phone size={24} />
                  </div>
                  <div className={cn("flex flex-col gap-2", isAr && "text-right")}>
                    <a href="tel:0669812895" className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans" dir="ltr">0669 81 28 95</a>
                    <div className="flex items-center gap-2 group/wa">
                      <a href="tel:0790356012" className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans" dir="ltr">0790 35 60 12</a>
                      <a 
                        href="https://wa.me/213790356012" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-green-500 text-white px-3 py-1 rounded-full font-bold opacity-0 group-hover/wa:opacity-100 transition-all hover:bg-green-600 shadow-lg translate-y-2 group-hover/wa:translate-y-0"
                      >
                        WhatsApp
                      </a>
                    </div>
                    <a href="tel:045416134" className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors font-sans" dir="ltr">045 41 61 34</a>
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 }}
                   className={cn("flex items-center gap-6 group", isAr && "flex-row-reverse")}
                >
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ecole.el.nadjah.mosta.27@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center text-navy shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:bg-blue-accent transition-all duration-300 group-hover:text-white shrink-0 group-hover:scale-110"
                  >
                    <Mail size={24} />
                  </a>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ecole.el.nadjah.mosta.27@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl text-navy/70 hover:text-blue-accent transition-colors break-all"
                  >
                    ecole.el.nadjah.mosta.27@gmail.com
                  </a>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <a 
                  href="https://www.google.com/maps/place/%C3%A9cole+el+nadjah/@35.9299739,0.0905572,855m/data=!3m1!1e3!4m6!3m5!1s0x1282036a050e3715:0xdc2a35b12a46b33f!8m2!3d35.9301282!4d0.090025!16s%2Fg%2F11j7vq8llv?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-96 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-center overflow-hidden hover:border-blue-accent/30 transition-all group relative shadow-2xl"
                >
                    <div className="absolute inset-0 z-0 scale-110 group-hover:scale-125 transition-transform duration-1000">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1632.748!2d0.089!3d35.930!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1282036a050e3715%3A0xdc2a35b12a46b33f!2s%C3%A9cole%20el%20nadjah!5e1!3m2!1sfr!2sdz!4v1714821000000!5m2!1sfr!2sdz"
                        className="w-full h-full border-0 pointer-events-none"
                        style={{ filter: 'contrast(1.1) brightness(0.9) saturate(0.8)' }}
                        title={t('school_name')}
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500"></div>
                    
                    <div className="text-center group-hover:opacity-0 transition-opacity relative z-10 px-6 pointer-events-none">
                      <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
                        <MapPin size={48} className="text-blue-accent animate-bounce" />
                      </div>
                      <div className="font-serif text-white font-bold uppercase tracking-[0.2em] text-2xl drop-shadow-2xl">
                         {t('view_google_maps')}
                      </div>
                    </div>
                    
                    <div className={cn(
                      "absolute bottom-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl text-xs font-bold text-navy uppercase tracking-widest z-10 transition-all hover:scale-105 shadow-xl border border-white/20",
                      isAr ? "left-8" : "right-8"
                    )}>
                      {t('open_maps_app')}
                    </div>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy text-white/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={cn("flex items-center gap-4", isAr && "flex-row-reverse")}>
             <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain invert brightness-0" loading="lazy" />
             <span className="text-white font-serif font-bold text-lg">{t('school_name')}</span>
          </div>
          <div className={cn("text-sm", isAr && "font-serif")}>
            {t('footer_rights')}
          </div>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/Ecole.nadjhah.27?locale=fr_FR" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/ecole.nadjah.27/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/@ecolenadjahmostaganem304" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
