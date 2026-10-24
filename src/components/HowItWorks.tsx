import React from 'react';
import { FadeUp } from './FadeUp';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tell us',
      timeline: 'Day 1–2',
      description: 'Free call, fixed quote.',
      iconPath: (
        <path d="M13 2a9 9 0 0 1 9 9M13 6a5 5 0 0 1 5 5M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      )
    },
    {
      num: '02',
      title: 'See it',
      timeline: 'Day 3–7',
      description: 'Preview on your phone first.',
      iconPath: (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )
    },
    {
      num: '03',
      title: 'Build',
      timeline: 'Weeks 2–4',
      description: 'Live demo every Friday.',
      iconPath: (
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      )
    },
    {
      num: '04',
      title: 'Launch',
      timeline: 'Weeks 4–6',
      description: 'Training, full code, 60 days free support.',
      iconPath: (
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      )
    }
  ];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 hairline-b relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-black border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                PROCESS
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Live in 4 simple steps
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              From first call to live launch with no surprises.
            </p>
          </FadeUp>
        </div>

        {/* 4 Steps Grid: Liquid Glass Staggered Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start relative z-10">
          {steps.map((step, idx) => {
            const isStaggered = idx % 2 === 1;
            return (
              <FadeUp key={step.num} delay={idx * 50}>
                <div className={`relative pt-7 ${isStaggered ? 'sm:mt-10 lg:mt-14' : 'mt-0'}`}>
                  {/* Oversized number sits behind glass so it is refracted */}
                  <span className="process-num" aria-hidden="true">
                    {step.num}
                  </span>

                  <div
                    className="process-card group"
                    onPointerMove={handlePointerMove}
                  >
                    {/* Floating Orb hanging off top edge */}
                    <span className="process-orb" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[22px] h-[22px] stroke-slate-900 dark:stroke-white fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
                      >
                        {step.iconPath}
                      </svg>
                    </span>

                    {/* Step Title */}
                    <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-[22ch]">
                      {step.description}
                    </p>

                    {/* Timeline Pill */}
                    <div className="mt-auto pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-2 font-mono text-xs font-bold text-[#e8470f] dark:text-[#f97316] tracking-wider uppercase">
                      <span
                        className="w-2 h-2 rounded-full bg-[#e8470f] dark:bg-[#f97316] shadow-[0_0_0_4px_#fde4d8] dark:shadow-[0_0_0_4px_rgba(232,71,15,0.3)] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{step.timeline}</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};
