import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo-sm.webp';
import { SITE_CONFIG } from '../config/site';

interface HeroProps {
  onQuoteClick?: () => void;
  onWorkClick: () => void;
}

interface SlabItem {
  key: string;
  variant: 'v' | 'g' | 'c';
  title: string;
  desc: string;
}

const HERO_SLABS: SlabItem[] = [
  {
    key: 'websites',
    variant: 'v',
    title: 'A website that books the call',
    desc: 'Fast pages, a lead form that saves to your sheet, WhatsApp built in.',
  },
  {
    key: 'ai-agents',
    variant: 'g',
    title: 'An AI agent that answers at 2 AM',
    desc: 'Replies to customers, qualifies the lead, hands you the hot ones.',
  },
  {
    key: 'software',
    variant: 'c',
    title: 'Software that sends the invoice',
    desc: 'Billing, GST and dashboards tailored to how your team works.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onWorkClick }) => {
  const [positions, setPositions] = useState<number[]>([0, 1, 2]);

  const handleShuffle = () => {
    setPositions((prev) => prev.map((p) => (p + 1) % 3));
  };

  return (
    <section id="hero" className="bold-hero pt-32 sm:pt-36 pb-12 sm:pb-16 relative select-none">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col gap-12 sm:gap-16 pt-2 sm:pt-4">

        {/* Hero Split: Left Copy & CTAs, Right Bold Slab Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* Left Column (col-span-7): Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col">
            <h1>
              <span className="u-v">Websites</span>,{' '}
              <span className="u-c">software</span> and{' '}
              <span className="u-g">AI agents</span>, built in{' '}
              <span className="mumbai-badge">Mumbai</span>.
            </h1>

            <p className="font-sans text-base sm:text-lg sm:text-[1.125rem] text-[#4A5070] dark:text-[#A7ADCF] leading-relaxed max-w-xl mb-7 sm:mb-8">
              You talk directly to the engineers who build your website, custom software, or AI assistant. Pay in milestones by UPI or bank transfer, and own everything we deliver.
            </p>

            {/* CTA & Global Live Presence */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onWorkClick}
                className="hero-cta-btn shrink-0"
              >
                See live demos
              </button>

              {/* Worldwide Live Trust Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center shrink-0 pl-1">
                  {/* US */}
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-[#0E1330] shadow-sm -ml-2 first:ml-0 shrink-0 overflow-hidden" viewBox="0 0 32 32" aria-label="United States">
                    <rect width="32" height="32" fill="#B22234" />
                    <path d="M0,4.5h32 M0,9.5h32 M0,14.5h32 M0,19.5h32 M0,24.5h32 M0,29.5h32" stroke="#FFFFFF" strokeWidth="2.4" />
                    <rect width="14" height="16" fill="#3C3B6E" />
                    <circle cx="4" cy="4" r="0.9" fill="#FFF" />
                    <circle cx="10" cy="4" r="0.9" fill="#FFF" />
                    <circle cx="7" cy="8" r="0.9" fill="#FFF" />
                    <circle cx="4" cy="12" r="0.9" fill="#FFF" />
                    <circle cx="10" cy="12" r="0.9" fill="#FFF" />
                  </svg>

                  {/* UK */}
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-[#0E1330] shadow-sm -ml-2 shrink-0 overflow-hidden" viewBox="0 0 32 32" aria-label="United Kingdom">
                    <rect width="32" height="32" fill="#012169" />
                    <path d="M0,0 L32,32 M32,0 L0,32" stroke="#FFFFFF" strokeWidth="5.5" />
                    <path d="M0,0 L32,32 M32,0 L0,32" stroke="#C8102E" strokeWidth="2.8" />
                    <path d="M16,0 V32 M0,16 H32" stroke="#FFFFFF" strokeWidth="8" />
                    <path d="M16,0 V32 M0,16 H32" stroke="#C8102E" strokeWidth="4.8" />
                  </svg>

                  {/* UAE */}
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-[#0E1330] shadow-sm -ml-2 shrink-0 overflow-hidden" viewBox="0 0 32 32" aria-label="United Arab Emirates">
                    <rect width="32" height="10.67" fill="#00732F" />
                    <rect y="10.67" width="32" height="10.67" fill="#FFFFFF" />
                    <rect y="21.33" width="32" height="10.67" fill="#000000" />
                    <rect width="9.6" height="32" fill="#FF0000" />
                  </svg>

                  {/* India */}
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-[#0E1330] shadow-sm -ml-2 shrink-0 overflow-hidden" viewBox="0 0 32 32" aria-label="India">
                    <rect width="32" height="10.67" fill="#FF9933" />
                    <rect y="10.67" width="32" height="10.67" fill="#FFFFFF" />
                    <rect y="21.33" width="32" height="10.67" fill="#138808" />
                    <circle cx="16" cy="16" r="3.4" fill="none" stroke="#000080" strokeWidth="1" />
                    <circle cx="16" cy="16" r="0.8" fill="#000080" />
                  </svg>

                  {/* Singapore */}
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-[#0E1330] shadow-sm -ml-2 shrink-0 overflow-hidden" viewBox="0 0 32 32" aria-label="Singapore">
                    <rect width="32" height="16" fill="#EF3340" />
                    <rect y="16" width="32" height="16" fill="#FFFFFF" />
                    <path d="M7.5,4.5 a4.5,4.5 0 1,0 0,7 a3.6,3.6 0 1,1 0,-7" fill="#FFFFFF" />
                    <circle cx="10" cy="5.5" r="0.6" fill="#FFF" />
                    <circle cx="11.5" cy="7" r="0.6" fill="#FFF" />
                    <circle cx="11.5" cy="9" r="0.6" fill="#FFF" />
                    <circle cx="10" cy="10.5" r="0.6" fill="#FFF" />
                    <circle cx="8.5" cy="8" r="0.6" fill="#FFF" />
                  </svg>
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white leading-tight">
                    Built in Mumbai, live worldwide
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    Serving clients across India, UAE, US, UK & Singapore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (col-span-5): 3-Slab Interactive Shuffle Stack */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div
              className="hero-stack"
              role="region"
              aria-label="What we build. Click to shuffle."
            >
              {HERO_SLABS.map((slab, i) => (
                <div
                  key={slab.key}
                  className={`hero-slab ${slab.variant}`}
                  data-p={positions[i]}
                  tabIndex={0}
                  role="button"
                  aria-label={`${slab.title}. Click to shuffle.`}
                  onClick={handleShuffle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleShuffle();
                    }
                  }}
                >
                  <b>{slab.title}</b>
                  <p>{slab.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* WrotX Gives Metric Strip: in one line after hero section */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            {/* Logo + Gives */}
            <div className="flex items-center gap-2.5 shrink-0">
              <img
                src={logoImg}
                alt="WrotX"
                width={80}
                height={22}
                className="h-5 sm:h-6 w-auto object-contain"
              />
              <span className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10">
                Gives
              </span>
              <span className="h-4 w-[1px] bg-slate-300 dark:bg-white/20 ml-1 hidden lg:inline-block" />
            </div>

            {/* Metrics: 2-col on mobile, 3-col on tablet, single continuous flex row on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-x-6 gap-y-4 sm:gap-6 xl:gap-8 flex-1">
              {/* Metric 1 */}
              <div className="flex flex-col min-w-0">
                <span className="font-display text-xl sm:text-2xl text-slate-900 dark:text-white font-bold tracking-tight leading-tight">
                  ₹0
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
                  Surprise fees
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1 leading-tight">
                  <span className="font-display text-xl sm:text-2xl text-slate-900 dark:text-white font-bold tracking-tight">
                    {SITE_CONFIG.support.days}
                  </span>
                  <span className="font-display text-sm text-[#006e27] dark:text-[#00fe66] font-bold">Days</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
                  Free support after launch
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-0.5 leading-tight">
                  <span className="font-display text-xl sm:text-2xl text-slate-900 dark:text-white font-bold tracking-tight">
                    100
                  </span>
                  <span className="font-display text-sm text-slate-900 dark:text-white font-bold">%</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
                  Yours, we hand over everything
                </span>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-0.5 leading-tight">
                  <span className="font-display text-sm text-[#D9480F] dark:text-[#F97316] font-bold">&lt;</span>
                  <span className="font-display text-xl sm:text-2xl text-slate-900 dark:text-white font-bold tracking-tight">
                    1
                  </span>
                  <span className="font-display text-sm text-slate-900 dark:text-white font-bold uppercase ml-0.5">s</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
                  Opens on mobile 4G
                </span>
              </div>

              {/* Verification Stamp */}
              <div className="col-span-2 sm:col-span-1 lg:col-span-auto flex items-center gap-2.5 lg:pl-4 lg:border-l border-slate-200/80 dark:border-white/10 shrink-0">
                <div className="w-6 h-6 rounded-full bg-[#00fe66] flex items-center justify-center text-[#002107] shrink-0 shadow-xs">
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white leading-tight">Mumbai Based</span>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Engineering Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
