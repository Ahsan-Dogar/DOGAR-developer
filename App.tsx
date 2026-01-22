
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import AIChat from './components/AIChat';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
    
    sections.forEach((sectionId) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    // Custom Parallax for section bg numbers
    gsap.utils.toArray('.parallax-bg-text').forEach((el: any) => {
      gsap.to(el, {
        y: -150,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: `#${sectionId}`, autoKill: false },
      ease: 'expo.inOut'
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-[#050505] text-white selection:bg-gold selection:text-black">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <main>
        <section id="home" className="min-h-screen">
          <Hero scrollToSection={scrollToSection} />
        </section>

        <section id="about" className="py-40 relative overflow-hidden">
          <About />
        </section>

        <section id="skills" className="py-40 bg-black relative">
          <Skills />
        </section>

        <section id="projects" className="py-40 relative">
          <Projects />
        </section>

        <section id="services" className="py-40 bg-black relative">
          <Services />
        </section>

        <section id="contact" className="py-40 bg-[#080808] relative">
          <Contact />
        </section>
      </main>

      <footer className="py-16 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left">
            <h3 className="text-gold font-bold tracking-tighter text-xl mb-2">AHSAN DOGAR</h3>
            <p className="text-white/30 max-w-xs">Crafting elite digital environments with motion and performance.</p>
          </div>
          <div className="flex gap-8 font-semibold uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-gold transition-all">Instagram</a>
            <a href="#" className="hover:text-gold transition-all">Dribbble</a>
            <a href="#" className="hover:text-gold transition-all">GitHub</a>
          </div>
          <button 
            onClick={() => scrollToSection('home')}
            className="group flex flex-col items-center gap-2 text-gold font-bold uppercase tracking-[0.3em] text-[9px]"
          >
            <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
               <i className="fa-solid fa-arrow-up"></i>
            </div>
            Top
          </button>
        </div>
      </footer>

      <AIChat />
    </div>
  );
};

export default App;
