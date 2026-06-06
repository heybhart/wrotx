import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { servicesData } from '../data';
import { LucideIcon } from './LucideIcon';

export const Services: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Group services into 4 core pillars
  const pillars = [
    {
      id: 'web',
      title: 'Websites & Platforms',
      icon: 'Globe',
      description: 'Next-generation web applications, frontends, and SaaS platforms engineered for responsiveness, speed, and clean code.',
      services: servicesData.filter(s => s.id === 'web-dev' || s.id === 'saas-platforms' || s.id === 'ui-ux')
    },
    {
      id: 'mobile',
      title: 'Mobile Applications',
      icon: 'Smartphone',
      description: 'Native performance iOS and Android applications built with React Native and Flutter for seamless mobile user experiences.',
      services: servicesData.filter(s => s.id === 'mobile-apps')
    },
    {
      id: 'software',
      title: 'Custom Software',
      icon: 'Code',
      description: 'Tailored enterprise platforms, database integrations, and high-throughput backend APIs built under strict security standards.',
      services: servicesData.filter(s => s.id === 'custom-software' || s.id === 'backend-systems')
    },
    {
      id: 'ai',
      title: 'AI & Automation',
      icon: 'Cpu',
      description: 'Autonomous agent workflows, semantic RAG systems, and low-latency voice integrations to optimize operational costs.',
      services: servicesData.filter(s => s.id === 'ai-automation' || s.id === 'ai-voice')
    }
  ];

  const selectedService = servicesData.find(s => s.id === selectedServiceId);

  return (
    <section 
      id="services" 
      className="relative py-28 bg-[#131313]"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-20 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
            <LucideIcon name="Sparkles" size={10} className="text-rose-400" />
            <span>Capabilities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Our Core <span className="text-rose-500">Disciplines</span>
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed font-normal">
            We deliver production-ready systems and scalable AI pipelines organized around four primary engineering sectors. Select a capability to view technical specifications.
          </p>
        </div>

        {/* Pillars open row list */}
        <div className="divide-y divide-zinc-900/60">
          {pillars.map((pillar, index) => {
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-start transition-all duration-300"
              >
                {/* Left Column: Info */}
                <div className="md:col-span-5 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-sm">
                      <LucideIcon name={pillar.icon} size={16} />
                    </div>
                    <h3 className="font-extrabold text-xl text-white tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
                    {pillar.description}
                  </p>
                </div>

                {/* Right Column: Services List */}
                <div className="md:col-span-7 space-y-2">
                  <span className="font-mono text-[9px] text-zinc-550 uppercase tracking-wider block mb-1">
                    Capabilities Included
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {pillar.services.map((service) => (
                      <button
                        key={service.id}
                        id={`service_trigger_${service.id}`}
                        onClick={() => setSelectedServiceId(service.id)}
                        className="w-full text-left p-3.5 px-4 rounded-lg border border-zinc-900 bg-zinc-950/20 hover:border-rose-500/20 hover:bg-rose-950/5 text-zinc-300 hover:text-rose-450 transition-all flex items-center justify-between group cursor-pointer text-xs"
                      >
                        <span className="font-bold">{service.title}</span>
                        <div className="flex items-center space-x-2 text-zinc-500 group-hover:text-rose-400">
                          <span className="font-mono text-[9px]">Technical Specs</span>
                          <LucideIcon 
                            name="ArrowRight" 
                            size={10} 
                            className="transform group-hover:translate-x-0.5 transition-transform" 
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Specifications Modal */}
        <AnimatePresence>
          {selectedServiceId && selectedService && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedServiceId(null)}
                className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
              />

              {/* Modal Pane */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                id="service_detail_modal"
                className="relative w-full max-w-xl bg-[#131313] border border-white/5 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
              >
                {/* Dismiss Button */}
                <button
                  id="service_dismiss_btn"
                  onClick={() => setSelectedServiceId(null)}
                  className="absolute top-5 right-5 p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-850 transition-colors cursor-pointer"
                >
                  <LucideIcon name="X" size={15} />
                </button>

                {/* Title Section */}
                <div className="flex items-start space-x-3.5 pr-10">
                  <div className="w-10 h-10 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-center justify-center text-rose-500">
                    <LucideIcon name={selectedService.iconName} size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] tracking-wider text-zinc-550 uppercase font-semibold">
                      {selectedService.category} SPECIFICATIONS
                    </span>
                    <h3 className="font-bold text-lg text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Narrative */}
                <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
                  <p className="text-zinc-300 text-xs leading-relaxed font-normal">
                    {selectedService.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Commercial Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                      <LucideIcon name="CheckCircle" className="text-rose-500" size={12} />
                      <span>Commercial Benefits</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-zinc-400">
                          <span className="text-rose-500 mt-0.5 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* System Features */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[10px] text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                      <LucideIcon name="Layers" className="text-rose-500" size={12} />
                      <span>System Capabilities</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedService.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-zinc-400">
                          <span className="text-rose-500 mt-0.5 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                  <span className="text-zinc-550 text-[10px]">
                    SLA protected.
                  </span>
                  <a
                    href="#contact"
                    id="service_modal_contact_btn"
                    onClick={() => setSelectedServiceId(null)}
                    className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 font-sans font-semibold text-xs text-white flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md shadow-rose-950/10"
                  >
                    <span>Request Proposal</span>
                    <LucideIcon name="ArrowRight" size={12} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
