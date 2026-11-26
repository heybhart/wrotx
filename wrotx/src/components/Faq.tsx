import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeUp } from './FadeUp';
import { HOME_FAQS_DATA, type FaqItem } from '../data/faqsData';

export type { FaqItem };
export const FAQS_DATA = HOME_FAQS_DATA;

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 hairline-b relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-black border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                FAQ
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Straight answers on pricing, delivery timelines, ownership, and post-launch support.
            </p>
          </FadeUp>
        </div>

        {/* 5 FAQ Items: VisionOS Glass Accordion */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-3">
          {FAQS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeUp key={idx} delay={idx * 30}>
                <div
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? 'border-[#D9480F]/50 dark:border-[#F97316]/50 bg-white/90 dark:bg-white/[0.08] shadow-sm'
                      : 'border-slate-200/70 dark:border-white/10 glass-card hover:border-[#D9480F]/30 dark:hover:border-[#F97316]/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 border border-slate-200/80 dark:border-white/10 ${
                        isOpen
                          ? 'rotate-180 bg-[#D9480F] text-white dark:bg-[#F97316]'
                          : 'bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <ChevronDown size={18} strokeWidth={2} />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className={`px-4 sm:px-5 pb-5 pt-1 text-slate-600 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed ${
                      isOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {item.answer}
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
