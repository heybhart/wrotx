import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { LucideIcon } from './LucideIcon';

export const Portfolio: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = projectsData.find(p => p.id === selectedProjectId);

  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'application' | 'software' | 'ai'>('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'website', label: 'Websites' },
    { id: 'application', label: 'Applications' },
    { id: 'software', label: 'Custom Software' },
    { id: 'ai', label: 'AI & Automation' }
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.filterCategories.includes(activeFilter);
  });

  // Interactive Live Product Simulator render core
  const renderProductSimulator = (project: typeof projectsData[0]) => {
    const isMobile = project.category === 'mobile';
    
    return (
      <div className="w-full h-full relative flex items-center justify-center p-4 overflow-hidden group/sim select-none">
        {/* Background gradient/glow tailored to each project */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/10 via-transparent to-indigo-950/10 opacity-60" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-rose-500/5 blur-[50px] group-hover:bg-rose-500/10 transition-all duration-300" />
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-all duration-300" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {isMobile ? (
          /* Sleek Phone Frame */
          <div className="w-[125px] h-[190px] bg-zinc-950 border border-white/10 rounded-[20px] p-2 flex flex-col justify-between relative shadow-2xl transition-transform duration-300 group-hover/sim:scale-[1.03]">
            {/* Camera notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-zinc-900 rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </div>
            
            {/* Screen Content */}
            <div className="flex-1 mt-3 rounded-[12px] bg-[#131313] border border-white/5 p-2.5 flex flex-col justify-between text-left overflow-hidden">
              <span className="text-[8px] font-mono text-rose-500 uppercase tracking-widest font-bold leading-none">App</span>
              <div className="my-auto space-y-1">
                <span className="text-[11px] font-extrabold text-white tracking-tight leading-tight block">
                  {project.title.split(' - ')[0]}
                </span>
                <span className="text-[7px] text-zinc-550 leading-none block font-mono">
                  {project.category.toUpperCase()} SYSTEM
                </span>
              </div>
              <div className="flex items-center space-x-1 text-[7px] font-mono text-emerald-450 font-bold leading-none">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        ) : (
          /* Sleek Browser Frame */
          <div className="w-full max-w-[210px] h-[120px] bg-zinc-950 border border-white/10 rounded-lg flex flex-col justify-between relative shadow-2xl transition-transform duration-300 group-hover/sim:scale-[1.03]">
            {/* Browser Dots */}
            <div className="h-4 bg-zinc-950 border-b border-white/5 px-2 flex items-center space-x-1">
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </div>
            
            {/* Screen Content */}
            <div className="flex-1 bg-[#131313] p-2.5 flex flex-col justify-between text-left overflow-hidden">
              <span className="text-[7px] font-mono text-rose-500 uppercase tracking-widest font-bold leading-none">
                {project.category === 'ai' ? 'AI Agent' : project.category.toUpperCase()}
              </span>
              <div className="my-auto space-y-0.5">
                <span className="text-[12px] font-extrabold text-white tracking-tight leading-tight block">
                  {project.title.split(' - ')[0]}
                </span>
                <span className="text-[7px] text-zinc-500 font-mono tracking-wider uppercase block">
                  {project.techStack[0]} • {project.techStack[1]}
                </span>
              </div>
              <div className="flex items-center justify-between text-[6.5px] text-zinc-500 font-mono border-t border-zinc-900 pt-1 leading-none">
                <span>VERIFIED SYSTEM</span>
                <span className="text-rose-450 font-bold">99.9% SLA</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      id="portfolio" 
      className="relative py-28 bg-[#131313]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
            <LucideIcon name="Layers" size={10} className="text-rose-400" />
            <span>Proven Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Case <span className="text-rose-500">Studies</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            A selective showcase of production software assets, native apps, and automation models engineered by our team.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-start gap-1 p-1 bg-zinc-950/40 border border-zinc-900 rounded-lg max-w-2xl mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeFilter === filter.id 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeFilter === filter.id && (
                <motion.div
                  layoutId="activePortfolioFilter"
                  className="absolute inset-0 bg-rose-950/25 border border-rose-500/20 rounded-lg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                id={`project_card_${project.id}`}
                className="flex flex-col bg-zinc-950/20 border border-zinc-900 rounded-lg overflow-hidden group transition-all duration-300 hover:border-rose-500/20 hover:bg-[#1e1e1e]/40 shadow-xl"
              >
                {/* Visual simulator / model representation (Aspect Video container) */}
                <div className="w-full aspect-video bg-[#111111] border-b border-zinc-900/60 flex-shrink-0 relative overflow-hidden">
                  {renderProductSimulator(project)}
                </div>

                {/* Metadata & Description */}
                <div className="flex-1 p-5 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-550 uppercase">
                      <span className="font-bold text-rose-500">{project.category} SPEC</span>
                      <span>Verified Stack</span>
                    </div>

                    <h4 className="font-sans font-extrabold text-lg text-white group-hover:text-rose-500 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-zinc-400 text-[11.5px] leading-relaxed">
                      {project.problemSolved}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 rounded text-[8px] bg-zinc-950/60 border border-zinc-900 text-zinc-450 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card triggers / action links */}
                  <div className="pt-3.5 border-t border-zinc-900 flex items-center justify-between mt-auto">
                    <button
                      id={`project_spec_btn_${project.id}`}
                      onClick={() => setSelectedProjectId(project.id)}
                      className="text-xs font-bold text-zinc-400 hover:text-rose-500 transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Case Specs</span>
                      <LucideIcon name="ArrowRight" size={11} />
                    </button>

                    {project.demoUrl && project.demoUrl !== '#' ? (
                      <a
                        href={project.demoUrl}
                        id={`project_demo_btn_${project.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-900 text-[10px] font-semibold hover:border-rose-900/50 hover:text-rose-400 transition-all flex items-center space-x-1 text-zinc-400"
                      >
                        <LucideIcon name="ExternalLink" size={10} />
                        <span>Live Launch</span>
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-zinc-650">Enterprise SLA</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Spec Modal Overlay */}
        <AnimatePresence>
          {selectedProjectId && selectedProject && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProjectId(null)}
                className="absolute inset-0 bg-[#000000]/85 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                id="project_detail_modal_pane"
                className="relative w-full max-w-2xl bg-[#131313] border border-white/5 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  id="project_dismiss_btn"
                  onClick={() => setSelectedProjectId(null)}
                  className="absolute top-5 right-5 p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-850 transition-colors cursor-pointer"
                >
                  <LucideIcon name="X" size={15} />
                </button>

                {/* Title */}
                <div className="space-y-1.5 pr-10">
                  <span className="font-mono text-[9px] tracking-wider text-zinc-550 uppercase font-semibold block">
                    {selectedProject.category} CORE ARCHITECTURE SPECIFICATIONS
                  </span>
                  <h3 className="font-bold text-xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Problem Box */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900 space-y-1.5">
                    <h4 className="text-[10px] font-bold font-mono text-rose-500 uppercase tracking-wider flex items-center space-x-1.5">
                      <LucideIcon name="ShieldAlert" size={12} className="text-rose-500" />
                      <span>THE BOTTLENECK CHALLENGE</span>
                    </h4>
                    <p className="text-zinc-350 text-xs leading-relaxed font-normal">
                      {selectedProject.problemSolved}
                    </p>
                  </div>

                  {/* Capabilities Developed */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-wider font-mono">
                      SYSTEM CAPABILITIES DEVELOPED
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-3 text-xs text-zinc-400 p-2.5 rounded bg-zinc-950/30 border border-zinc-900">
                          <span className="w-5 h-5 rounded bg-zinc-950 border border-zinc-900 text-[10px] flex items-center justify-center font-bold text-rose-500 flex-shrink-0 mt-0.5">
                            {i+1}
                          </span>
                          <span className="leading-relaxed font-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-emerald-450 uppercase tracking-wider font-mono">
                      MEASURABLE KEY RESULTS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {selectedProject.results.map((result, i) => (
                        <div key={i} className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-lg space-y-1">
                          <LucideIcon name="CheckCircle" className="text-emerald-400" size={12} />
                          <p className="text-[11.5px] font-bold text-white leading-snug">
                            {result}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="pt-4 border-t border-zinc-900 space-y-2">
                    <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                      DEVELOPMENT STACK:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 font-mono text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                  <span className="text-zinc-550 text-[10px]">
                    SLA Protected IP.
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      id="project_modal_dismiss"
                      onClick={() => setSelectedProjectId(null)}
                      className="px-4 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-900/50 font-sans font-semibold text-xs text-zinc-400 transition-colors cursor-pointer"
                    >
                      Dismiss Specs
                    </button>
                    {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 font-sans font-semibold text-xs text-white flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md shadow-rose-950/10"
                      >
                        <span>Interactive Preview</span>
                        <LucideIcon name="ExternalLink" size={12} />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
