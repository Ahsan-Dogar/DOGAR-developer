
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  { id: 1, title: "ORION MANSION", category: "Real Estate Luxury", image: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?q=80&w=2000", year: "2024" },
  { id: 2, title: "NOVA WATCHES", category: "E-Commerce Premium", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000", year: "2023" },
  { id: 3, title: "AETHER STUDIO", category: "3D Portfolio", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000", year: "2024" },
  { id: 4, title: "LUMINA AUTO", category: "Interactive Configurator", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000", year: "2023" }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal shift on project info
      gsap.utils.toArray('.project-info').forEach((info: any) => {
        gsap.to(info, {
          x: 40,
          scrollTrigger: {
            trigger: info,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      });

      // Individual project card reveal
      gsap.utils.toArray('.project-card').forEach((card: any, i: number) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 150,
          opacity: 0,
          duration: 2,
          ease: 'expo.out',
          delay: i % 2 === 0 ? 0 : 0.2
        });
      });

      // Scale effect on images
      gsap.utils.toArray('.project-img').forEach((img: any) => {
        gsap.to(img, {
          scale: 1.15,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-8 relative">
      <div className="parallax-bg-text absolute bottom-0 left-0 text-[20vw] font-black text-white/[0.015] select-none pointer-events-none uppercase tracking-tighter">
        Archive
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-40">
        <div className="overflow-hidden">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 leading-none">
            GALLERY <br /> <span className="text-gold italic font-light opacity-90">WORKS</span>
          </h2>
          <div className="h-[2px] w-40 bg-gradient-to-r from-gold to-transparent"></div>
        </div>
        <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold max-w-[200px] text-right">
          A collection of selective digital artifacts 2021—2024
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-24 gap-y-48">
        {projects.map((project, idx) => (
          <div key={project.id} className="project-card group relative">
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[4/5] bg-neutral-900 rounded-sm">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-expo"
              />
              {/* Overlay with Year */}
              <div className="absolute top-10 left-10 overflow-hidden">
                <span className="inline-block text-[10px] font-black tracking-[0.5em] text-white/40 group-hover:text-gold transition-colors duration-500">
                  {project.year}
                </span>
              </div>
            </div>
            
            <div className="project-info mt-12 flex justify-between items-end">
              <div className="space-y-4">
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-black block translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                  {project.category}
                </span>
                <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter group-hover:scale-105 origin-left transition-transform duration-700">
                  {project.title}
                </h3>
              </div>
              <div className="hidden lg:block">
                <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                  <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 group-hover:text-black transition-all"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
