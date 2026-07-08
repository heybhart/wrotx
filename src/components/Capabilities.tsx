import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data';
import { Service } from '../types';
import { X, Check, ArrowRight } from 'lucide-react';

interface CapabilitiesProps {
  onOpenConsultation: () => void;
}

const serviceTechStack: Record<string, string[]> = {
  'web-dev': ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  'mobile-apps': ['React Native', 'Flutter', 'iOS', 'Swift'],
  'ai-automation': ['LangChain', 'OpenAI API', 'Python', 'Vector DBs'],
  'ai-voice': ['VAPI', 'Twilio', 'ElevenLabs', 'Deepgram'],
  'custom-software': ['Golang', 'Docker', 'Kubernetes', 'gRPC'],
  'saas-platforms': ['Stripe Billing', 'NextAuth', 'Prisma', 'PostgreSQL'],
  'ui-ux': ['Figma', 'Storybook', 'Design Tokens', 'Framer'],
  'backend-systems': ['GraphQL', 'Node.js', 'Redis Cache', 'AWS Cloud']
};

const headingWordVariants = {
  hidden: {
    opacity: 0,
    y: -40,
    filter: 'blur(8px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  })
};

const subtextWordVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1.2 + i * 0.04,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  })
};

const subtextText = "We don't build websites. We build digital infrastructure for the next generation of market leaders.";
const subtextWords = subtextText.split(' ');

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section 
      id="capabilities" 
      className="relative bg-[#131313] py-32 overflow-hidden select-none text-left"
    >
      {/* Background Watermark */}
      <div className="watermark-text">ENGINEERED</div>

      {/* Grid Content Wrapper */}
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header Title Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-[0.9] mb-8">
            <span className="inline-block overflow-hidden">
              <motion.span 
                custom={0}
                variants={headingWordVariants}
                className="inline-block"
              >
                ENGINEERED
              </motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              <motion.span 
                custom={1}
                variants={headingWordVariants}
                className="inline-block"
              >
                TO
              </motion.span>
            </span>
            {" "}
            <span className="inline-block overflow-hidden">
              <motion.span 
                custom={2}
                variants={headingWordVariants}
                className="inline-block"
              >
                SCALE
              </motion.span>
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
            {subtextWords.map((word, i) => (
              <React.Fragment key={i}>
                <motion.span
                  custom={i}
                  variants={subtextWordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {i < subtextWords.length - 1 && " "}
              </React.Fragment>
            ))}
          </p>
        </motion.div>

        {/* Services Grid (2 Columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter">
          {servicesData.map((service, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            return (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="service-card py-10 flex justify-between items-center group cursor-pointer"
              >
                <div className="service-content">
                  <span className="font-label-caps text-[10px] text-accent-gold mb-2 block">
                    {indexNumber}
                  </span>
                  <h3 className="font-display text-4xl text-primary group-hover:text-accent-gold transition-colors uppercase">
                    {service.title}
                  </h3>
                </div>
                <span className="material-symbols-outlined service-arrow text-primary">
                  north_east
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Expanded Spec Sheets Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Pane */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-xl bg-[#131313] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 text-left"
            >
              {/* Dismiss Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Title Section */}
              <div className="flex items-start space-x-3.5 pr-10">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] tracking-wider text-accent-gold uppercase font-semibold">
                    {selectedService.category} SPECIFICATIONS
                  </span>
                  <h3 className="font-display text-3xl text-white uppercase tracking-wider">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Narrative */}
              <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-900">
                <p className="font-body text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedService.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Commercial Benefits */}
                <div className="space-y-2">
                  <h4 className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                    <span>Commercial Benefits</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedService.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-zinc-400 font-body font-light">
                        <span className="text-accent-gold mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* System Features */}
                <div className="space-y-2">
                  <h4 className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                    <span>System Capabilities</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-zinc-400 font-body font-light">
                        <span className="text-accent-gold mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech stack */}
              <div className="space-y-2 pt-2">
                <h4 className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(serviceTechStack[selectedService.id] || []).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-[10px] font-mono rounded bg-white/5 text-zinc-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                <span className="text-zinc-500 text-[10px]">
                  SLA protected.
                </span>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenConsultation();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-accent-gold hover:bg-yellow-600 font-sans font-semibold text-xs text-background flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <span>Request Proposal</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
