import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Compass, Layers, Cpu, Users } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'experience' | 'tech'>('mission');

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      icon: Rocket,
      text: "We build ultra-high-performance digital systems, custom APIs, and AI automation pipelines. Our focus is eliminating over-engineered technical debt and delivering pure architectural speed.",
      themeColor: '217 91% 25%' // Deep engineering blue
    },
    {
      id: 'vision',
      label: 'Our Vision',
      icon: Compass,
      text: "To establish WrotX as the premier engineering guild for enterprise systems, creating robust, secure, and self-scaling products that redefine software quality.",
      themeColor: '142 70% 15%' // Rich design forest green
    },
    {
      id: 'experience',
      label: 'Ecosystem Experience',
      icon: Layers,
      text: "Leveraging over a decade of deep full-stack engineering expertise, we deploy secure microservices, cluster databases, and design cloud infrastructures that sustain heavy production loads.",
      themeColor: '217 91% 25%' // Deep engineering blue
    },
    {
      id: 'tech',
      label: 'Technology and Innovation',
      icon: Cpu,
      text: "We deploy cutting-edge technologies, cloud infrastructure, and intelligent automation systems. We continuously innovate to keep your codebases modern, scalable, and ahead of the industry curve.",
      themeColor: '270 85% 20%' // Twilight intelligence purple
    }
  ];

  // Auto-play timer for tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex(t => t.id === prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id as any;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(tabs[index].id as any);
  };

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div id="about" className="relative bg-[#0b0b0b] py-20 lg:py-32 border-t border-white/5 overflow-hidden select-none">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/3 blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column 1: Core Title & Tab triggers */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-5">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
                  <Users size={10} className="text-zinc-400" />
                  <span>Executive Positioning</span>
                </div>

                <h2 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-wide text-white uppercase leading-tight">
                  The WrotX <br />
                  Blueprint
                </h2>

                <p className="font-body-md text-[16px] text-zinc-400 leading-relaxed max-w-xl">
                  WrotX was formed in response to the massive over-engineering and downstream fragility plaguing modern web and automation products. We craft proprietary IP assets with absolute speed and rigorous precision.
                </p>
              </div>

              {/* Tab Controllers Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      id={`about_tab_${tab.id}`}
                      onClick={() => handleTabClick(idx)}
                      style={{
                        // @ts-ignore - CSS custom properties are valid
                        "--theme-color": tab.themeColor,
                      } as React.CSSProperties}
                      className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-24 sm:h-28 relative overflow-hidden group cursor-pointer ${
                        isActive 
                          ? 'border-white bg-white/[0.04] shadow-[0_0_30px_-10px_hsl(var(--theme-color)/0.4)]' 
                          : 'bg-zinc-950/20 border-white/5 hover:border-white/15 hover:bg-white/[0.01]'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                          isActive 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 border-white/10 text-zinc-400 group-hover:text-white group-hover:bg-white/10'
                        }`}>
                          <TabIcon size={16} />
                        </div>
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? 'bg-white' : 'bg-zinc-800 group-hover:bg-zinc-650'
                        }`} />
                      </div>

                      <span className={`text-[11px] font-bold font-sans tracking-wider uppercase transition-colors block mt-3 text-left ${
                        isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Details Display (Liquid Glass Card) */}
            <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:mx-0">
              <div 
                style={{
                  // @ts-ignore - CSS custom properties are valid
                  "--theme-color": currentTab.themeColor,
                  boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px -10px hsl(var(--theme-color) / 0.4)`
                } as React.CSSProperties}
                className="p-8 rounded-3xl border border-white/10 bg-zinc-950/50 backdrop-blur-xl relative overflow-hidden min-h-[340px] flex flex-col justify-between transition-all duration-500"
              >
                {/* Colored top gradient highlight matching tab theme color */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--theme-color))] to-purple-500 opacity-80" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3.5 pb-4 border-b border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <currentTab.icon size={18} />
                      </div>
                      <div className="text-left">
                        <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase font-semibold">
                          WXT COMPANY BLUEPRINT
                        </span>
                        <h3 className="font-extrabold text-[17px] text-white uppercase tracking-wider font-sans">
                          {currentTab.label}
                        </h3>
                      </div>
                    </div>

                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-left font-body-md font-medium">
                      {currentTab.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom tag */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span>Verification Index: 1.00</span>
                  <span className="text-emerald-400 font-semibold flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>Verified IP Assets</span>
                  </span>
                </div>

              </div>
            </div>

          </div>
      </div>
    </div>
  );
};
