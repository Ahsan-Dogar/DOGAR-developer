
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- THREE.JS SPACE SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const starGroups = new THREE.Group();
    scene.add(starGroups);

    // Function to create star layers
    const createStarLayer = (count: number, size: number, color: number, range: number) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * range;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ 
        size: size, 
        color: color, 
        transparent: true, 
        opacity: 0.8,
        blending: THREE.AdditiveBlending 
      });
      return new THREE.Points(geometry, material);
    };

    // Layer 1: Dense distant stars
    const layer1 = createStarLayer(8000, 0.015, 0xffffff, 2000);
    starGroups.add(layer1);

    // Layer 2: Gold-tinted mid-range stars
    const layer2 = createStarLayer(2000, 0.03, 0xD4AF37, 1000);
    starGroups.add(layer2);

    // Layer 3: Bright near stars
    const layer3 = createStarLayer(500, 0.06, 0xffffff, 500);
    starGroups.add(layer3);

    // Add a faint nebula glow (using a large sphere with gradient)
    const nebulaGeo = new THREE.SphereGeometry(20, 32, 32);
    const nebulaMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    scene.add(nebula);

    camera.position.z = 5;

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5);
      mouseY = (event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Constant drifting rotation
      starGroups.rotation.y += 0.0003;
      starGroups.rotation.x += 0.0001;
      
      // Smooth mouse parallax
      const targetX = mouseX * 2;
      const targetY = -mouseY * 2;
      
      starGroups.position.x += (targetX - starGroups.position.x) * 0.02;
      starGroups.position.y += (targetY - starGroups.position.y) * 0.02;
      
      // Sublte breathing effect on nebula
      const time = Date.now() * 0.001;
      nebula.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);

      renderer.render(scene, camera);
    };
    animate();

    // Responsive handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // GSAP Intro Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.hero-mask span', {
        y: '100%',
        duration: 1.8,
        stagger: 0.15,
        ease: 'expo.out'
      })
      .from('.hero-cta', {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.2');

      // Scroll interaction: Fly deeper into space
      gsap.to(camera.position, {
        z: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.to(starGroups.rotation, {
        z: Math.PI * 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]">
      {/* 3D Space Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Ambient Vignette Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]"></div>

      <div className="relative z-10 text-center px-6">
        <p className="hero-mask overflow-hidden text-gold uppercase tracking-[1em] text-[9px] md:text-[11px] font-black mb-6">
          <span className="inline-block">Architect of the Digital Infinite</span>
        </p>
        
        <h1 className="hero-mask overflow-hidden text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none mb-8">
          <span className="inline-block translate-y-2">AHSAN</span> <br />
          <span className="inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-white/10">DOGAR</span>
        </h1>

        <p className="hero-mask overflow-hidden text-white/30 max-w-2xl mx-auto text-xs md:text-sm tracking-[0.4em] font-bold uppercase mb-16 leading-loose">
          <span className="inline-block">Engineering high-performance luxury across the digital frontier.</span>
        </p>

        <div className="hero-cta flex flex-wrap justify-center gap-10">
          <button 
            onClick={() => scrollToSection('projects')}
            className="group relative px-14 py-6 bg-gold text-black font-black uppercase tracking-[0.4em] text-[10px] overflow-hidden transition-all shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:shadow-[0_25px_50px_rgba(212,175,55,0.25)]"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Gallery</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo"></div>
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="group relative px-14 py-6 border border-white/10 hover:border-gold/50 text-white font-black uppercase tracking-[0.4em] text-[10px] transition-all overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-gold transition-colors duration-500">Initiate</span>
            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-expo"></div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-40 group cursor-pointer" onClick={() => scrollToSection('about')}>
        <span className="text-[8px] uppercase tracking-[1em] font-black group-hover:text-gold transition-colors">Descent</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-gold via-gold/50 to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-white/50 -translate-y-full animate-[scroll-line_2s_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
