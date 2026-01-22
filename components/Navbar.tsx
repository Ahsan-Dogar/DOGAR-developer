
import React, { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-2xl py-5' : 'bg-transparent py-10'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div 
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold tracking-tighter cursor-pointer group flex items-center gap-3"
        >
          <div className="relative w-10 h-10 border border-gold flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110">
             <span className="text-gold font-black z-10">A</span>
             <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             <span className="absolute text-black font-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">A</span>
          </div>
          <span className="text-white group-hover:text-gold transition-colors font-black tracking-[0.2em] text-sm">DOGAR</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`relative text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:text-gold ${activeSection === link.id ? 'text-gold' : 'text-white/40'}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute -bottom-3 left-0 w-full h-[2px] bg-gold shadow-[0_0_10px_#D4AF37]"></span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-2 z-[60] bg-white/5 rounded-full"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-4 h-0.5 bg-gold transition-all ml-auto ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.9,0,0.1,1)] ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <ul className="text-center flex flex-col gap-10">
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`text-6xl font-black uppercase tracking-tighter hover:text-gold transition-all ${activeSection === link.id ? 'text-gold italic' : 'text-white'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
