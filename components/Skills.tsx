
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stack = [
    "React.js", "TypeScript", "GSAP", "Three.js", "WebGL", "Next.js", 
    "Tailwind", "SCSS", "Node.js", "Figma", "Redux", "PostgreSQL"
  ];

  return (
    <div ref={containerRef} className="container mx-auto px-8">
      <div className="parallax-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] select-none pointer-events-none">CAPABILITIES</div>

      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">THE <br /> <span className="text-gold">ENGINE</span> ROOM</h2>
          <p className="text-white/40 text-lg uppercase tracking-widest leading-relaxed max-w-md">
            Built on a foundation of performance-first code and cutting-edge visual technologies.
          </p>
          
          <div className="mt-16 flex items-center gap-6 group">
             <div className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center animate-spin-slow">
                <i className="fa-solid fa-gear text-gold"></i>
             </div>
             <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50">Constant Innovation</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {stack.map((tech) => (
            <div key={tech} className="skill-item glass p-8 border border-white/5 rounded-sm hover:border-gold/30 transition-all group flex flex-col justify-between aspect-square">
               <span className="text-gold font-black text-xs">/</span>
               <h4 className="text-sm font-black uppercase tracking-widest group-hover:text-gold transition-colors">{tech}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
