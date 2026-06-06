import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { techStackData } from '../data';
import { LucideIcon } from './LucideIcon';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'cloud' | 'ai'>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Ecosystem' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Datastores' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'ai', label: 'AI Models' }
  ];

  const filteredTech = techStackData.filter(tech => {
    if (activeCategory === 'all') return true;
    return tech.category === activeCategory;
  });

  // Unique details about why we use these technologies
  const techDetails: Record<string, { purpose: string; stat: string }> = {
    'React': { purpose: 'Modular component rendering and client-side view management.', stat: 'V19 Standard' },
    'Next.js': { purpose: 'Server-side rendering, routing logic, and edge-optimizations.', stat: 'V15 App Router' },
    'Node.js': { purpose: 'Event-driven backend execution and server runtimes.', stat: 'Core V22 Runtime' },
    'Express': { purpose: 'Robust HTTP API routing, middlewares, and server logic.', stat: 'RESTful Architecture' },
    'MongoDB': { purpose: 'NoSQL document storage for unstructured metadata and logs.', stat: 'Document DB' },
    'PostgreSQL': { purpose: 'Relational data structures, transactional queries, and core integrity.', stat: 'SQL Relational' },
    'Firebase': { purpose: 'Real-time synchronization for operational state controls.', stat: 'Serverless Real-time' },
    'Docker': { purpose: 'Containerized software building to run reliably across clusters.', stat: 'Container Standard' },
    'AWS': { purpose: 'Cloud hosting, computational servers, and secure data buckets.', stat: 'Cloud Platforms' },
    'Tailwind CSS': { purpose: 'Utility styling library for atomic, highly-performant layouts.', stat: 'V4 Styling Engine' },
    'TypeScript': { purpose: 'Strict type validation to prevent runtime system failures.', stat: '100% Type Safety' },
    'OpenAI APIs': { purpose: 'Text generation, analytical summaries, and neural workflows.', stat: 'GPT models' },
    'Gemini APIs': { purpose: 'Multimodal analysis, audio streaming, and large-context RAG pipelines.', stat: 'Gemini models' }
  };

  return (
    <section 
      id="tech-stack" 
      className="relative py-28 bg-[#131313]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
            <LucideIcon name="Code" size={10} className="text-rose-500" />
            <span>Tech Ecosystem</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Production <span className="text-rose-500">Stack</span>
          </h2>

          <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-normal">
            We build exclusively with modern, performant, and industry-standard technologies to ensure stable codebases.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-start gap-1 p-1 bg-zinc-950/40 border border-zinc-900 rounded-lg max-w-xl mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tech_cat_${cat.id}`}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTechCat"
                  className="absolute inset-0 bg-rose-950/25 border border-rose-500/20 rounded-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => {
                const isActive = hoveredTech === tech.name;
                return (
                  <motion.div
                    key={tech.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    id={`tech_badge_${tech.name.replace(/\s+/g, '_')}`}
                    className={`p-4 rounded-lg border transition-all duration-200 relative overflow-hidden flex flex-col justify-between h-24 cursor-pointer select-none ${
                      isActive 
                        ? 'border-rose-500/30 bg-rose-950/15 shadow-md shadow-rose-950/5' 
                        : 'bg-zinc-950/20 border-zinc-900/60'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[8px] bg-zinc-950 border border-zinc-900 font-mono text-zinc-500 uppercase tracking-widest">
                        {tech.category}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-rose-500 animate-pulse' : 'bg-zinc-800'}`} />
                    </div>

                    <p className="font-sans font-bold text-white text-base leading-tight">
                      {tech.name}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Explanation Panel */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 border border-white/5 bg-[#1a1a1a]/85 rounded-lg h-[224px] flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                {hoveredTech && techDetails[hoveredTech] ? (
                  <motion.div
                    key={hoveredTech}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                        <h4 className="font-bold text-lg text-white">
                          {hoveredTech}
                        </h4>
                        <span className="p-1 px-2.5 rounded text-[9px] bg-rose-950/20 border border-rose-900/30 text-rose-450 font-mono font-bold uppercase">
                          {techDetails[hoveredTech].stat}
                        </span>
                      </div>

                      <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                        {techDetails[hoveredTech].purpose}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-900 text-[9px] font-mono text-zinc-600 flex justify-between items-center uppercase tracking-wider">
                      <span>WXT Standards Check</span>
                      <span>Approved</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="fallback"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-3 h-full py-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-550 shadow-inner">
                      <LucideIcon name="Compass" size={16} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-zinc-300 text-xs">
                        Hover Ecosystem Badges
                      </h4>
                      <p className="text-zinc-500 text-[11px] max-w-xs leading-relaxed font-normal">
                        Inspect specifications, version parameters, and implementation workflows for our core stack.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
