import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { processSteps } from '../data';
import { LucideIcon } from './LucideIcon';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section 
      id="process" 
      className="relative py-28 bg-[#131313]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-20 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-[#222222]/40 text-zinc-300 font-mono text-[9px] tracking-wider uppercase">
            <LucideIcon name="Rocket" size={10} className="text-rose-500" />
            <span>Workflow</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            How We <span className="text-rose-500">Build</span>
          </h2>

          <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-normal">
            We follow strict operational milestones to guide custom systems from spec phase to production deployment.
          </p>
        </div>

        {/* Timeline Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Block: Steps rail */}
          <div className="lg:col-span-4 space-y-3">
            {processSteps.map((step) => {
              const fontActive = activeStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  id={`process_step_trigger_${step.stepNumber}`}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`w-full text-left p-4 rounded-lg border flex items-center space-x-4 transition-all duration-200 relative group cursor-pointer ${
                    fontActive 
                      ? 'border-rose-500/30 bg-rose-950/15' 
                      : 'bg-zinc-950/20 border-zinc-900/60 hover:border-zinc-800'
                  }`}
                >
                  {/* Step counter badge */}
                  <div className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center border transition-colors ${
                    fontActive 
                      ? 'bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-500/10' 
                      : 'bg-zinc-950 border-zinc-900 text-zinc-650 group-hover:text-zinc-400 group-hover:border-zinc-800'
                  }`}>
                    0{step.stepNumber}
                  </div>

                  <div className="truncate">
                    <h4 className={`text-sm font-bold transition-colors ${fontActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {step.title}
                    </h4>
                    <span className="font-mono text-[9px] text-zinc-500 font-semibold tracking-wider uppercase block mt-0.5">
                      {step.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Deliverables */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 border border-white/5 bg-[#1a1a1a]/85 rounded-lg min-h-[380px] flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                {processSteps.map((step) => {
                  if (activeStep !== step.stepNumber) return null;
                  return (
                    <motion.div
                      key={step.stepNumber}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        {/* Step title & dynamic visual cue */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-900 text-rose-500 flex items-center justify-center shadow-md">
                              <LucideIcon name={step.iconName} size={18} />
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-zinc-550 font-bold tracking-widest uppercase block">
                                Phase 0{step.stepNumber} / {step.duration}
                              </span>
                              <h3 className="font-bold text-base text-white">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          
                          <span className="px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-full text-[9px] text-zinc-400 font-mono font-bold self-start sm:self-center uppercase tracking-wider">
                            {step.stepNumber === 6 ? 'Operations' : 'Active Execution'}
                          </span>
                        </div>

                        {/* Complete verbal workflow description */}
                        <p className="text-zinc-400 text-xs leading-relaxed max-w-2xl font-normal">
                          {step.description}
                        </p>

                        {/* Step detailed deliverables list */}
                        <div className="space-y-3.5 pt-2">
                          <h4 className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center space-x-1.5">
                            <LucideIcon name="CheckCircle" className="text-rose-500" size={12} />
                            <span>Phase Deliverables:</span>
                          </h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {step.deliverables.map((item, i) => (
                              <div 
                                key={i}
                                className="p-3 bg-zinc-950/60 border border-zinc-900 rounded-lg flex items-center space-x-2.5 hover:border-zinc-800 transition-colors"
                              >
                                <div className="w-4 h-4 rounded bg-rose-950/20 border border-rose-900/30 flex items-center justify-center">
                                  <LucideIcon name="Check" className="text-rose-500" size={10} />
                                </div>
                                <span className="text-xs text-zinc-300 font-normal leading-normal">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Timeline bottom progress tracker */}
                      <div className="pt-6 border-t border-zinc-900 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                        <div className="flex items-center space-x-1">
                          <span className="text-zinc-550">Progression:</span>
                          <span className="text-white font-bold">{Math.round((step.stepNumber / 6) * 100)}% Complete</span>
                        </div>

                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <div 
                              key={num} 
                              className={`w-4 h-1.5 rounded-full transition-all duration-300 ${
                                num <= step.stepNumber ? 'bg-rose-600' : 'bg-zinc-900'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
