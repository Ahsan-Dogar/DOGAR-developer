
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
            LET'S BUILD <br /> SOMETHING <span className="text-gold">GRAND</span>.
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-md leading-relaxed">
            I'm currently available for exclusive projects and full-time senior architecture roles. Reach out and let's start the conversation.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                <i className="fa-solid fa-envelope text-white group-hover:text-black transition-colors"></i>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40 font-bold tracking-widest mb-1">Email</p>
                <p className="text-xl font-medium">hello@ahsandogar.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                <i className="fa-solid fa-location-dot text-white group-hover:text-black transition-colors"></i>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40 font-bold tracking-widest mb-1">Location</p>
                <p className="text-xl font-medium">London, UK (Global Remote)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-2xl border-white/5">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Name</label>
              <input 
                type="text" 
                placeholder="Your full name"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-all"
              />
            </div>
          </div>
          <div className="space-y-2 mb-12">
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Project Details</label>
            <textarea 
              placeholder="Tell me about your project visions..."
              className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-all min-h-[150px] resize-none"
            ></textarea>
          </div>

          <button className="group relative w-full py-5 bg-gold text-black font-black uppercase tracking-[0.3em] text-xs rounded-sm overflow-hidden transition-all hover:bg-white">
            <span className="relative z-10">Send Message</span>
            <div className="absolute top-0 -left-full w-full h-full bg-white transition-all duration-500 group-hover:left-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
