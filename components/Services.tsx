
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal each card with a sophisticated 3D rotate
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        rotateX: -15,
        stagger: 0.15,
        duration: 1.8,
        ease: 'expo.out'
      });

      // Animated Section Background Text
      gsap.to('.services-bg-text', {
        xPercent: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const serviceList = [
    {
      id: "01",
      icon: "fa-laptop-code",
      title: "FRONT-END ARCHITECTURE",
      desc: "Robust, scalable React foundations optimized for cinematic performance and ultra-clean state management.",
      tags: ["React", "TypeScript", "Next.js"]
    },
    {
      id: "02",
      icon: "fa-bezier-curve",
      title: "UI / UX IMPLEMENTATION",
      desc: "Pixel-perfect translations of luxury design concepts into fluid, responsive, and functional digital experiences.",
      tags: ["Figma", "Design Systems", "UX"]
    },
    {
      id: "03",
      icon: "fa-film",
      title: "MOTION ORCHESTRATION",
      desc: "Sophisticated interaction design utilizing GSAP and native CSS to breathe life into static interfaces.",
      tags: ["GSAP", "Lottie", "SVG"]
    },
    {
      id: "04",
      icon: "fa-cube",
      title: "IMMERSIVE 3D SCENES",
      desc: "Advanced WebGL and Three.js integration for spatial browsing and high-end visual storytelling.",
      tags: ["Three.js", "WebGL", "Shaders"]
    }
  ];

  return (
    <div ref={containerRef} className="container mx-auto px-8 relative overflow-hidden">
       {/* Cinematic Background Layer */}
       <div className="services-bg-text absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        EXPERTISE EXPERTISE EXPERTISE
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
        <div className="space-y-6">
          <p className="text-gold font-black uppercase tracking-[0.8em] text-[10px] opacity-80">
            Specialized Craft
          </p>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            PREMIUM <br /> <span className="text-gold italic font-thin">SERVICES.</span>
          </h2>
        </div>
        <div className="max-w-md text-right hidden md:block">
           <div className="h-[1px] w-24 bg-gold ml-auto mb-8"></div>
           <p className="text-white/30 text-base uppercase tracking-[0.2em] font-bold leading-relaxed">
             Bespoke technical solutions at the intersection of extreme performance and high-end aesthetic value.
           </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
        {serviceList.map((service, idx) => (
          <div key={idx} className="service-card group relative bg-[#050505] p-20 min-h-[500px] flex flex-col justify-between transition-all duration-1000 ease-expo hover:bg-gold/95 overflow-hidden cursor-default">
            
            {/* Massive Background ID */}
            <div className="absolute -bottom-16 -right-16 text-[18rem] font-black text-white/[0.02] group-hover:text-black/5 transition-all duration-1000 pointer-events-none select-none">
              {service.id}
            </div>

            <div className="relative z-10 space-y-12">
              <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-black/20 group-hover:scale-125 transition-all duration-700">
                <i className={`fa-solid ${service.icon} text-3xl text-gold group-hover:text-black transition-colors duration-500`}></i>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter group-hover:text-black transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-white/40 text-lg leading-relaxed group-hover:text-black/80 transition-colors duration-500 font-medium max-w-sm">
                  {service.desc}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-4 mt-12">
               {service.tags.map(tag => (
                 <span key={tag} className="px-5 py-2 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:border-black/20 group-hover:text-black transition-all duration-500">
                   {tag}
                 </span>
               ))}
            </div>

            {/* Top Shine/Line Effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/0 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"></div>
          </div>
        ))}
      </div>
      
      {/* Bottom CTA Indicator */}
      <div className="mt-32 flex flex-col items-center gap-8 opacity-20">
         <p className="text-[10px] font-black uppercase tracking-[1em]">Tailored To Perfection</p>
         <div className="w-[1px] h-32 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Services;
