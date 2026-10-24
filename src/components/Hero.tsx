import React from 'react';
import { ArrowUpRight, MessageCircle, Play, CheckCircle2 } from 'lucide-react';
import { FadeUp } from './FadeUp';
import logoImg from '../assets/logo.webp';

interface HeroProps {
  onQuoteClick: () => void;
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onWorkClick }) => {
  const whatsappUrl = `https://wa.me/919322208664?text=${encodeURIComponent(
    "Hi WrotX! We would like to get a free quote on WhatsApp for our project."
  )}`;

  return (
    <section id="hero" className="pt-32 sm:pt-36 pb-12 sm:pb-16 relative select-none">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 flex flex-col gap-10 sm:gap-14 pt-4 sm:pt-6">

        {/* Hero Asymmetric Headline & Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">

          {/* Left Column (col-span-8): Headline */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <FadeUp delay={60}>
              <h1 className="font-display text-[36px] sm:text-[52px] md:text-[60px] lg:text-[66px] text-slate-900 dark:text-white tracking-tight uppercase leading-[0.98] font-bold">
                Get more customers online. <br />
                <span className="relative inline-block px-2.5 sm:px-3 py-1 mt-1.5 -rotate-1 bg-[#ffe600] text-[#131b2e] dark:bg-[#D9480F] dark:text-white shadow-[3px_3px_0px_#131b2e] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.4)] rounded-sm transition-transform hover:rotate-0">
                  Do less manual work.
                </span>
              </h1>
            </FadeUp>
          </div>

          {/* Right Column (col-span-4): Subcopy & CTA Cluster */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:pl-4">
            <FadeUp delay={90}>
              <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Fast websites, custom software and AI assistants for businesses in Mumbai and across India. No hidden cost. You own everything.
              </p>
            </FadeUp>

            {/* CTA Cluster */}
            <FadeUp delay={120}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ffe600] text-[#131b2e] dark:bg-[#D9480F] dark:text-white font-mono text-xs sm:text-sm uppercase font-bold px-5 py-3 rounded shadow-[3px_3px_0px_#131b2e] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#131b2e] active:translate-y-[0px] active:shadow-[1px_1px_0px_#131b2e] transition-all cursor-pointer"
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  <span>Get a free quote</span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </a>

                <button
                  onClick={onWorkClick}
                  className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/10 backdrop-blur-[24px] text-slate-900 dark:text-white font-mono text-xs sm:text-sm uppercase font-semibold px-5 py-3 rounded-full shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_4px_12px_rgba(0,0,0,0.04)] hover:bg-white/80 dark:hover:bg-white/20 border-[1.5px] border-white/90 dark:border-white/15 transition-all cursor-pointer"
                >
                  <Play size={15} strokeWidth={2} className="text-[#006e27] dark:text-[#00fe66] fill-[#006e27] dark:fill-[#00fe66]" />
                  <span>See our work</span>
                </button>
              </div>
            </FadeUp>
          </div>

        </div>

        {/* WrotX gives strip at bottom of hero */}
        <FadeUp delay={160}>
          <div className="glass-panel w-full p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-2.5">
                <img
                  src={logoImg}
                  alt="WrotX - Mumbai Website, Software and AI Agent Development Studio"
                  width={140}
                  height={32}
                  fetchPriority="high"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
                <span className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  Gives
                </span>
              </div>
              <span className="h-4 w-[1px] bg-slate-300 dark:bg-white/20 hidden md:inline-block"></span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto flex-1 md:pl-6">
              {/* Metric 1 */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">
                    ₹0
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                  Surprise fees
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">
                    60
                  </span>
                  <span className="font-display text-lg text-[#006e27] dark:text-[#00fe66] font-bold">Days</span>
                </div>
                <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                  Free support after launch
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">
                    100
                  </span>
                  <span className="font-display text-lg text-slate-900 dark:text-white font-bold">%</span>
                </div>
                <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                  Yours, we hand over everything
                </span>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-lg text-[#D9480F] dark:text-[#F97316] font-bold">&lt;</span>
                  <span className="font-display text-2xl sm:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">
                    1
                  </span>
                  <span className="font-display text-lg text-slate-900 dark:text-white font-bold uppercase ml-0.5">s</span>
                </div>
                <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                  Opens on mobile 4G
                </span>
              </div>
            </div>

            {/* Verification Stamp */}
            <div className="hidden xl:flex items-center gap-3 pl-6 border-l border-slate-200/80 dark:border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#00fe66] flex items-center justify-center text-[#002107] shadow-sm">
                <CheckCircle2 size={18} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">Mumbai Based</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">GST Invoices Provided</span>
              </div>
            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
};
