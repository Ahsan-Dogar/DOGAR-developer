
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Immersive Multi-Axis Parallax
      gsap.to(imgRef.current, {
        yPercent: 12,
        scale: 1.15,
        rotate: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // 2. Frame Vertical Shift
      gsap.to(frameRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        }
      });

      // 3. Sophisticated Staggered Reveal
      // Refined with expo.inOut for high-end cinematic tension
      gsap.from('.reveal-line', {
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 85%',
        },
        y: 150,
        opacity: 0,
        rotateX: -30,
        transformOrigin: "center top -150px",
        duration: 2.4,
        stagger: 0.1, // Fine-tuned for fluid reading cadence
        ease: 'expo.inOut'
      });

      // 4. Background Ghost Text Parallax
      gsap.to('.parallax-bg-text', {
        x: -180,
        opacity: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // 5. Decorative Line Scale Animation
      gsap.from('.about-line', {
        scaleX: 0,
        opacity: 0,
        duration: 3,
        stagger: 0.6,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-8 relative grid lg:grid-cols-2 gap-24 items-center min-h-[95vh]">
      {/* Deep Layer: Ghost Section Title */}
      <div className="parallax-bg-text absolute top-1/2 left-0 -translate-y-1/2 text-[45vw] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter leading-none z-0">
        ARCHITECT
      </div>

      {/* Profile Image Column */}
      <div className="relative z-10 order-2 lg:order-1">
        <div ref={frameRef} className="relative w-full max-w-lg mx-auto group">
          <div className="relative overflow-hidden rounded-sm aspect-[4/5] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.95)] border border-white/5 bg-[#080808]">
            <img 
              ref={imgRef}
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" 
              alt="Ahsan Dogar" 
              className="w-full h-[145%] object-cover contrast-[1.05] brightness-90 saturate-[0.75] origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-gold/20 m-10 pointer-events-none z-20 transition-all duration-1000 group-hover:m-6 group-hover:border-gold/40"></div>
          </div>
          
          <div className="about-line absolute -bottom-16 -right-16 w-72 h-[1px] bg-gradient-to-r from-gold/60 to-transparent hidden md:block"></div>
          <div className="about-line absolute -top-16 -left-16 w-[1px] h-72 bg-gradient-to-b from-gold/60 to-transparent hidden md:block"></div>
          
          <div className="absolute -bottom-10 -left-14 bg-black/95 backdrop-blur-3xl p-14 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] hidden lg:block animate-float">
             <p className="text-gold font-black uppercase tracking-[0.8em] text-[10px] mb-5">Principal Architect</p>
             <p className="text-white text-xl font-black tracking-[0.3em] uppercase">Ahsan Dogar</p>
             <div className="w-20 h-[2px] bg-gold/50 mt-8 group-hover:w-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Content Column */}
      <div ref={textContainerRef} className="relative z-20 space-y-20 order-1 lg:order-2">
        <div className="space-y-10">
          <div className="overflow-hidden">
            <p className="reveal-line text-gold font-black uppercase tracking-[1em] text-[13px] opacity-100">
              01 — The Philosophy
            </p>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden">
              <h2 className="reveal-line text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.7] text-white">
                PURSUIT
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="reveal-line text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.7] italic font-thin text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold/10">
                OF PURE
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="reveal-line text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.7] text-white">
                MOTION.
              </h2>
            </div>
          </div>
        </div>
        
        <div className="space-y-14 text-white/50 text-base md:text-2xl leading-relaxed font-medium uppercase tracking-[0.22em] max-w-2xl">
          <div className="overflow-hidden">
            <p className="reveal-line block">
              I am Ahsan Dogar, an architect of digital experiences where extreme technical performance merges with high-end aesthetic poetry.
            </p>
          </div>
          <div className="overflow-hidden">
             <p className="reveal-line block text-gold/80 italic font-light">
               I build spaces that breathe, react, and resonate.
             </p>
          </div>
        </div>

        <div className="pt-28 grid grid-cols-2 gap-24 border-t border-white/5">
           <div className="group cursor-default overflow-hidden">
             <div className="reveal-line">
               <span className="block text-8xl font-black text-white group-hover:text-gold transition-all duration-1000 ease-expo">08+</span>
               <span className="text-[11px] uppercase tracking-[0.9em] font-black text-white/30 mt-8 block transition-colors group-hover:text-white/60">
                 Years Mastery
               </span>
             </div>
           </div>
           <div className="group cursor-default overflow-hidden">
             <div className="reveal-line">
               <span className="block text-8xl font-black text-white group-hover:text-gold transition-all duration-1000 ease-expo">120+</span>
               <span className="text-[11px] uppercase tracking-[0.9em] font-black text-white/30 mt-8 block transition-colors group-hover:text-white/60">
                 Global Deployments
               </span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
