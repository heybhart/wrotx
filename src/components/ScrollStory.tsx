import React, { Component, useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Scene3D } from './Scene3D';
import { LucideIcon } from './LucideIcon';

gsap.registerPlugin(ScrollTrigger);

interface CanvasErrorBoundaryProps {
  children: React.ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  override state: CanvasErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("3D Canvas Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-[#131313] flex flex-col items-center justify-center text-zinc-500 font-mono text-[10px] space-y-2 pointer-events-auto">
          <span>[3D Viewport Offline]</span>
          <span className="text-zinc-600">The website remains fully active.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ScrollStoryProps {
  onOpenConsultation: () => void;
  onViewProjects: () => void;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({
  onOpenConsultation,
  onViewProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [theme, setTheme] = useState<'gold' | 'cyber' | 'glass'>('gold');

  // Track scroll progress and map sections
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create a smooth scroll progress timeline
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smooth follow-up lag (Apple-style inertia)
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setScrollProgress(self.progress);
          
          // Determine active section based on scroll progress
          // 5 sections: 0%, 25%, 50%, 75%, 100%
          const progress = self.progress;
          if (progress < 0.125) {
            setActiveSection(0);
          } else if (progress >= 0.125 && progress < 0.375) {
            setActiveSection(1);
          } else if (progress >= 0.375 && progress < 0.625) {
            setActiveSection(2);
          } else if (progress >= 0.625 && progress < 0.875) {
            setActiveSection(3);
          } else {
            setActiveSection(4);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const sections = [
    {
      num: "01",
      tag: "THE SYNTHESIS",
      title: "Architectural Precision.",
      desc: "WrotX engineers digital ecosystems from the ground up. Combining spatial clarity with hyper-efficient structures, we construct custom digital software built for scale.",
      highlight: "Precision-crafted code.",
    },
    {
      num: "02",
      tag: "AI INTELLIGENCE",
      title: "Intelligent Workflows.",
      desc: "Delve beneath the surface of automation. We embed custom low-latency AI agents, machine learning, and hyper-scalable intelligence directly into your core operations.",
      highlight: "Low-latency automation.",
    },
    {
      num: "03",
      tag: "STRUCTURAL STRENGTH",
      title: "Modular Stability.",
      desc: "We build systems with high-cohesion and low-coupling, guaranteeing long-term flexibility. Scale comfortably on robust foundations that withstand massive transaction volumes.",
      highlight: "Robust modular foundations.",
    },
    {
      num: "04",
      tag: "INTERACTIVE DESIGN",
      title: "Visual Sophistication.",
      desc: "We merge software performance with emotional resonance. By designing immersive user experiences with cinematic motion, your systems captivate users from first interaction.",
      highlight: "Cinematic, smooth animations.",
    },
    {
      num: "05",
      tag: "THE REVEAL",
      title: "Complete Autonomy.",
      desc: "The fully unveiled system. We hand over 100% IP ownership, provide a 99.9% uptime SLA, and ensure sub-600ms latency. The ultimate digital product, shipped.",
      highlight: "100% IP & absolute performance.",
    },
  ];

  // Helper to scroll to a specific section percentage
  const handleScrollToSection = (index: number) => {
    const totalHeight = containerRef.current?.getBoundingClientRect().height ?? 0;
    const windowHeight = window.innerHeight;
    const scrollTarget = ((totalHeight - windowHeight) * index) / 4;
    
    window.scrollTo({
      top: (containerRef.current?.offsetTop ?? 0) + scrollTarget,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#131313] z-10">
      
      {/* 3D Model Sticky Canvas Container (Centers model initially, then scrolls away at bottom) */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-20 flex items-center justify-center overflow-hidden">
        {/* Subtle Backdrop Glow based on theme */}
        <div 
          className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-1000 opacity-50 ${
            theme === 'gold' 
              ? 'bg-rose-900/30' 
              : theme === 'cyber' 
              ? 'bg-cyan-900/30' 
              : 'bg-zinc-800/20'
          }`}
        />
        
        <CanvasErrorBoundary>
          <Suspense fallback={null}>
            <Scene3D scrollProgressRef={scrollProgressRef} theme={theme} />
          </Suspense>
        </CanvasErrorBoundary>
      </div>

      {/* Side Progress Navigation */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-8 items-center">
        <div className="w-[2px] h-32 bg-zinc-800 relative rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-rose-500 transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        
        <div className="flex flex-col space-y-4">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollToSection(idx)}
              className="group flex items-center space-x-3 cursor-pointer"
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                  activeSection === idx 
                    ? 'bg-rose-500 border-rose-500 scale-125 shadow-md shadow-rose-500/50' 
                    : 'border-zinc-700 bg-transparent hover:border-zinc-500'
                }`}
              />
              <span 
                className={`text-[10px] font-mono tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
                  activeSection === idx ? 'text-rose-400 font-bold' : 'text-zinc-500'
                }`}
              >
                {sec.num}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Theme Controller Panel */}
      <div className="fixed bottom-6 right-6 lg:right-auto lg:left-[5vw] z-40 flex items-center bg-[#1a1a1a]/80 backdrop-blur-md border border-zinc-800/80 px-4 py-2.5 rounded-xl shadow-xl shadow-black/40">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-3 hidden sm:inline">Theme:</span>
        <div className="flex space-x-1.5">
          {(['gold', 'cyber', 'glass'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                theme === t
                  ? 'bg-rose-500/25 text-rose-400 border border-rose-500/40 shadow-inner'
                  : 'text-zinc-400 hover:text-white border border-transparent hover:bg-zinc-800/30'
              }`}
            >
              {t === 'gold' ? 'Rose Gold' : t === 'cyber' ? 'Cyberpunk' : 'Ethereal'}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-1.5 pointer-events-none opacity-50">
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Scroll Story</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <LucideIcon name="ChevronDown" size={14} className="text-zinc-500" />
        </motion.div>
      </div>

      {/* Scrolling Text Sections Container (Pulls overlay on top of sticky Canvas) */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 -mt-[100vh]">
        
        {/* Section 1 (Centered Hero - Mannequin is in Center) */}
        <section className="min-h-screen flex items-center justify-center py-20 text-center">
          <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-mono text-[9px] tracking-wide text-zinc-300 font-bold uppercase">
                {sections[0].tag}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.05] text-white">
              We engineer <span className="text-rose-500">custom systems</span> and ship <span className="text-rose-500">faster</span>.
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              {sections[0].desc}
            </p>
            <p className="text-xs font-mono text-rose-400 font-semibold">
              // {sections[0].highlight}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 active:scale-97 cursor-pointer shadow-md shadow-rose-950/10"
              >
                <span>Book a Call</span>
                <LucideIcon name="ArrowRight" size={14} />
              </button>
              <button
                onClick={onViewProjects}
                className="w-full sm:w-auto px-7 py-3.5 bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 text-sm font-semibold rounded-lg hover:bg-zinc-850 active:scale-97 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Services</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2 (Right-Aligned - Mannequin moves to Left) */}
        <section className="min-h-screen flex items-center justify-end py-20">
          <div className="w-full lg:w-[45vw] space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-mono text-[9px] tracking-wide text-zinc-300 font-bold uppercase">
                {sections[1].tag}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Unveiling <span className="text-rose-500">{sections[1].title}</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {sections[1].desc}
            </p>
            <p className="text-xs font-mono text-rose-400 font-semibold">
              // {sections[1].highlight}
            </p>
          </div>
        </section>

        {/* Section 3 (Right-Aligned - Mannequin is Left) */}
        <section className="min-h-screen flex items-center justify-end py-20">
          <div className="w-full lg:w-[45vw] space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-mono text-[9px] tracking-wide text-zinc-300 font-bold uppercase">
                {sections[2].tag}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Solidifying <span className="text-rose-500">{sections[2].title}</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {sections[2].desc}
            </p>
            <p className="text-xs font-mono text-rose-400 font-semibold">
              // {sections[2].highlight}
            </p>
          </div>
        </section>

        {/* Section 4 (Right-Aligned - Mannequin is Left) */}
        <section className="min-h-screen flex items-center justify-end py-20">
          <div className="w-full lg:w-[45vw] space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-mono text-[9px] tracking-wide text-zinc-300 font-bold uppercase">
                {sections[3].tag}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Designing <span className="text-rose-500">{sections[3].title}</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {sections[3].desc}
            </p>
            <p className="text-xs font-mono text-rose-400 font-semibold">
              // {sections[3].highlight}
            </p>
          </div>
        </section>

        {/* Section 5 (Right-Aligned - Mannequin is Left) */}
        <section className="min-h-screen flex items-center justify-end py-20">
          <div className="w-full lg:w-[45vw] space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-mono text-[9px] tracking-wide text-zinc-300 font-bold uppercase">
                {sections[4].tag}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Achieving <span className="text-rose-500">{sections[4].title}</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {sections[4].desc}
            </p>
            <p className="text-xs font-mono text-rose-400 font-semibold">
              // {sections[4].highlight}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2 cursor-pointer shadow-md shadow-rose-950/20"
              >
                <span>Book Free Discovery Call</span>
                <LucideIcon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
