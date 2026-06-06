import React from 'react';
import { motion } from 'motion/react';
import { InteractiveRobotSpline } from './ui/interactive-3d-robot';

interface HeroProps {
  onOpenConsultation: () => void;
  onViewProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onViewProjects }) => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-12 overflow-hidden bg-black select-none"
    >
      {/* Grayscale Background Portrait */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Cinematic Portrait of Tyrone Brooks"
          className="w-full h-full object-cover grayscale opacity-50 contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnda3ykf3T6F5twI3nPx6V4w-HUl-TSPPxe6jrT3elPI4UmAMUdqIh_ufN1vfauV6OsBuDmY2zHFVU6TxTNnKze0DeNFrmYSOxOcW7An8b-L6UVvN_RwmJfFJTHBojBKQstQmyHW52G3bV-KNQY_bN7uRz2JQQuD4QSF19MoeM0If7YbucpD9YG4ZB6d4eVu3bNPbq-1cImqbLEtgGo1Zfhb9c91sEOSdZqANtG_MjEd71KwbEDbssczdPWdO1WHyp7AbpYs9tGRQ"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* Central Obsidian Glass Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-30 w-[92%] max-w-[1100px] aspect-[16/10] md:aspect-[21/9] lg:aspect-[16/8] glass-panel p-6 md:p-12 lg:p-16 flex flex-col justify-between overflow-hidden"
      >
        {/* 3D Robot model inside the card on the right */}
        <div
          className="absolute right-[-2%] md:right-[2%] lg:right-[6%] bottom-[-8%] top-[-8%] w-[85%] md:w-[48%] lg:w-[44%] h-[120%] pointer-events-none z-10"
        >
          <div className="w-full h-full pointer-events-none">
            <InteractiveRobotSpline
              scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Top Section: Status & CTA */}
        <div className="relative z-20 flex justify-between items-start">
          {/* Status Glow */}
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-glow animate-pulse"></span>
            <span className="font-label-caps text-[12px] text-white tracking-widest uppercase">Available for projects</span>
          </div>

          {/* Initiate Project button */}
          <button
            onClick={onOpenConsultation}
            className="hidden md:flex items-center space-x-2 border border-white/20 bg-transparent px-5 py-2 group hover:bg-white hover:text-black transition-all duration-500 active:scale-95 cursor-pointer"
          >
            <span className="font-label-caps text-[12px] uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors">Initiate Project</span>
            <span className="material-symbols-outlined text-[16px] text-white group-hover:text-black transition-colors group-hover:translate-x-1 transition-transform">arrow_outward</span>
          </button>
        </div>

        {/* Middle Section: Visual Anchor */}
        <div className="relative z-20 flex flex-col space-y-2">
          <h3 className="font-label-caps text-[12px] text-zinc-400 tracking-[0.4em] uppercase opacity-60">Product Architect</h3>
          <h1 className="font-display-xl text-5xl sm:text-6xl md:text-7xl lg:text-[100px] uppercase leading-none tracking-tighter text-white">
            WROTX
          </h1>
        </div>

        {/* Bottom Section: Info */}
        <div className="relative z-20 flex justify-between items-end w-full mt-4">
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 w-full md:w-auto text-left">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=work@wrotx.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">mail</span>
              <span className="font-body-md text-[14px] text-zinc-400 group-hover:text-white transition-colors">work@wrotx.in</span>
            </a>

            <a
              href="tel:+919322208664"
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">call</span>
              <span className="font-body-md text-[14px] text-zinc-400 group-hover:text-white transition-colors">+91 9322208664</span>
            </a>

            <div className="flex items-center space-x-3 group cursor-pointer">
              <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">schedule</span>
              <span className="font-body-md text-[14px] text-zinc-400 group-hover:text-white transition-colors">Response Time: &lt; 24h</span>
            </div>

            <div className="flex items-center space-x-3 group cursor-pointer">
              <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">location_on</span>
              <span className="font-body-md text-[14px] text-zinc-400 group-hover:text-white transition-colors">Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Gradient Elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
      </motion.div>

      {/* Centered Navigation Pill centered below the card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-8 flex justify-center w-full"
      >
        <nav className="nav-pill flex items-center p-1.5 rounded-full">
          <a
            onClick={(e) => handleScrollTo(e, 'top')}
            className="bg-white text-black px-6 py-2 rounded-full font-label-caps text-[12px] tracking-widest flex items-center space-x-2 hover:bg-zinc-200 transition-all cursor-pointer font-semibold animate-none"
            href="#"
          >
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </a>
          <a
            onClick={(e) => handleScrollTo(e, 'portfolio')}
            className="px-5 py-2 text-zinc-400 hover:text-white transition-all font-label-caps text-[12px] tracking-widest flex items-center space-x-2 cursor-pointer"
            href="#portfolio"
          >
            <span className="material-symbols-outlined text-[14px]">work_history</span>
            <span>Works</span>
          </a>
          <a
            onClick={(e) => handleScrollTo(e, 'capabilities')}
            className="px-5 py-2 text-zinc-400 hover:text-white transition-all font-label-caps text-[12px] tracking-widest flex items-center space-x-2 cursor-pointer"
            href="#capabilities"
          >
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            <span>Capabilities</span>
          </a>
        </nav>
      </motion.div>
    </section>
  );
};
