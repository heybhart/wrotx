import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { InteractiveTravelCard } from './ui/3d-card';
import meenaImg from '../assets/meena properties.jpeg';

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'website' | 'mobile' | 'software' | 'ai'>('all');

  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: 'grid_view' },
    { id: 'website', label: 'Websites', icon: 'language' },
    { id: 'mobile', label: 'Mobile Apps', icon: 'smartphone' },
    { id: 'software', label: 'Software', icon: 'code' },
    { id: 'ai', label: 'AI Agents', icon: 'smart_toy' }
  ] as const;

  // Filter logic matching project categories
  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'website') {
      return project.filterCategories.includes('website') || project.category === 'web';
    }
    if (selectedFilter === 'mobile') {
      return project.category === 'mobile' || project.filterCategories.includes('application');
    }
    if (selectedFilter === 'software') {
      return project.filterCategories.includes('software') || project.category === 'saas';
    }
    if (selectedFilter === 'ai') {
      return project.filterCategories.includes('ai') || project.category === 'ai';
    }
    return true;
  });

  return (
    <section id="portfolio" className="relative py-28 bg-[#0b0b0b] border-t border-white/5 select-none">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 w-full text-center space-y-12">
        
        {/* Title & Leader */}
        <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Case Studies</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-wide text-white uppercase leading-tight">
            Selected Works
          </h2>
          <p className="font-body-md text-[16px] text-zinc-400 max-w-xl">
            We engineer high-performance software products, web platforms, and intelligent agent pipelines. Explore our latest custom releases.
          </p>
        </div>

        {/* Filter Navigation Pill (Mockup design) */}
        <div className="flex justify-center w-full">
          <nav className="nav-pill flex flex-wrap sm:flex-nowrap items-center p-1.5 rounded-full justify-center sm:justify-start gap-1 sm:gap-0 bg-white/[0.02]">
            {filterOptions.map((opt) => {
              const isActive = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`px-5 py-2.5 rounded-full font-label-caps text-[12px] tracking-widest flex items-center space-x-2 cursor-pointer transition-all duration-300 font-semibold ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => {
              // Map dynamic stock images matching the project type
              let imgUrl = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800";
              if (project.id === 'big-broker') {
                imgUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800";
              } else if (project.id === 'meena-properties') {
                imgUrl = meenaImg;
              } else if (project.id === 'food-delivery') {
                imgUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800";
              } else if (project.id === 'recipe-platform') {
                imgUrl = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800";
              } else if (project.id === 'gym-management') {
                imgUrl = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800";
              } else if (project.id === 'voice-support') {
                imgUrl = "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800";
              } else if (project.id === 'ecommerce-platform') {
                imgUrl = "https://images.unsplash.com/photo-1472851294608-062f824d296e?q=80&w=800";
              } else if (project.id === 'crm-dashboard') {
                imgUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800";
              } else if (project.id === 'inventory-system') {
                imgUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800";
              }

              const isWebsite = project.category === 'web' || project.filterCategories.includes('website');

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  style={{ perspective: "1000px" }}
                  className="w-full flex justify-center"
                >
                  <InteractiveTravelCard
                    title={project.title.split(' - ')[0]}
                    subtitle={project.techStack.slice(0, 3).join(' / ')}
                    imageUrl={imgUrl}
                    actionText={isWebsite ? "Launch Live Demo" : undefined}
                    href={project.demoUrl}
                    onActionClick={isWebsite ? () => {
                      if (project.demoUrl !== '#') {
                        window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                      }
                    } : undefined}
                    className="w-full shadow-2xl"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
