import React from 'react';
import { Gauge, Layers, Moon, UserX, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { FadeUp } from './FadeUp';

export const Problems: React.FC = () => {
  const problems = [
    {
      num: '01',
      icon: Gauge,
      pain: 'Customers leave because your website is slow.',
      fix: 'Fast website',
      detail: 'We build your site to load in one second on mobile phones.',
      highlightClass: 'bg-[#ffe600] text-[#131b2e] dark:bg-[#ffe600] dark:text-[#131b2e] -rotate-1'
    },
    {
      num: '02',
      icon: Layers,
      pain: 'You pay monthly for software you barely use.',
      fix: 'Custom software',
      detail: 'We build custom software for your exact team with no monthly fees.',
      highlightClass: 'bg-[#38bdf8] text-[#082f49] dark:bg-[#38bdf8] dark:text-[#082f49] rotate-1'
    },
    {
      num: '03',
      icon: Moon,
      pain: 'Enquiries go unanswered after 7 PM.',
      fix: 'AI assistant',
      detail: 'Our AI agent answers WhatsApp and calls while you sleep.',
      highlightClass: 'bg-[#fb923c] text-[#431407] dark:bg-[#fb923c] dark:text-[#431407] -rotate-1'
    },
    {
      num: '04',
      icon: UserX,
      pain: 'Your last developer disappeared.',
      fix: 'Free support and full ownership',
      detail: 'You get full code, staff training and two months free support.',
      highlightClass: 'bg-[#4ade80] text-[#052e16] dark:bg-[#4ade80] dark:text-[#052e16] rotate-1'
    }
  ];

  return (
    <section id="problems" className="pt-6 sm:pt-10 pb-16 sm:pb-24 relative overflow-hidden">
      {/* Subtle blurred soft ambient color glow behind the cards for depth and contrast */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-[540px] h-[460px] rounded-full bg-gradient-to-tr from-sky-200/35 via-cyan-100/25 to-blue-200/20 dark:from-sky-950/20 dark:to-cyan-950/15 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-[560px] h-[480px] rounded-full bg-gradient-to-bl from-amber-200/35 via-orange-100/25 to-rose-200/20 dark:from-[#D9480F]/15 dark:to-amber-950/12 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[360px] rounded-full bg-gradient-to-r from-emerald-100/25 via-teal-100/20 to-sky-100/20 dark:from-emerald-950/15 dark:to-teal-950/10 blur-[110px] transform-gpu"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ff6b00] text-white border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                PROBLEMS WE FIX
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Sound familiar?
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Most Indian businesses lose customers because their tech is slow or broken.
            </p>
          </FadeUp>
        </div>

        {/* 4 Problems: Frosted Glassmorphism Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.num} delay={idx * 50}>
                <div className="glass-card relative p-6 sm:p-7 rounded-2xl group h-full flex flex-col justify-between before:content-[''] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/95 before:to-transparent before:pointer-events-none">
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200/80 dark:border-white/15 flex items-center justify-center text-slate-900 dark:text-white group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] shadow-2xs transition-colors">
                        <Icon size={20} strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#D9480F] dark:text-[#ffb5a0] px-2.5 py-1 rounded-md bg-[#D9480F]/10 dark:bg-[#D9480F]/20 border border-[#D9480F]/20 dark:border-[#D9480F]/30">
                        {item.num}
                      </span>
                    </div>

                    {/* Problem Statement with Hero-style Color Highlight */}
                    <h3 className="font-display text-base sm:text-lg md:text-xl font-bold leading-snug mb-3">
                      <span className={`relative inline-block max-w-full px-2.5 py-1 rounded-sm shadow-[3px_3px_0px_#131b2e] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.4)] transition-transform hover:rotate-0 ${item.highlightClass}`}>
                        "{item.pain}"
                      </span>
                    </h3>
                    <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                      {item.detail}
                    </p>
                  </div>

                  {/* Fix Pill */}
                  <div className="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center">
                    <div className="flex items-center gap-2">
                      <ArrowRight size={15} strokeWidth={2} className="text-[#D9480F] dark:text-[#F97316]" />
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {item.fix}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Before / After Visual Comparison in Glass Panel */}
        <FadeUp delay={160}>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-4 font-semibold">
              Real Impact: Typical Agency Template vs WrotX
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Before */}
              <div className="p-5 rounded-2xl border border-red-200/70 dark:border-red-500/20 bg-red-50/50 dark:bg-red-950/25 backdrop-blur-md flex items-start gap-3.5 shadow-2xs">
                <XCircle size={20} strokeWidth={1.75} className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-display text-sm font-bold text-red-950 dark:text-red-200">Slow WordPress site (6.8s load)</div>
                  <div className="font-sans text-xs sm:text-sm text-red-900/80 dark:text-red-300/80">Visitors drop off before the phone number loads. High monthly hosting and plugin crashes.</div>
                </div>
              </div>

              {/* After */}
              <div className="p-5 rounded-2xl border border-emerald-200/70 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/25 backdrop-blur-md flex items-start gap-3.5 shadow-2xs">
                <CheckCircle2 size={20} strokeWidth={1.75} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-display text-sm font-bold text-emerald-950 dark:text-emerald-200">WrotX fast site (0.8s load)</div>
                  <div className="font-sans text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-300/80">Opens instantly on 4G phones with direct WhatsApp chat and zero monthly software fees.</div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};
