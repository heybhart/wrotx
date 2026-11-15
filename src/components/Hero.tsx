import React, { useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo-sm.webp';
import { SITE_CONFIG } from '../config/site';

interface HeroProps {
  onQuoteClick: () => void;
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onWorkClick }) => {
  const visualRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = visualRef.current;
    const s = scaleRef.current;
    if (!w || !s) return;

    const fit = () => {
      if (!w || !s) return;
      const scale = w.clientWidth / 540;
      s.style.transform = `scale(${scale})`;
    };

    fit();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fit);
      ro.observe(w);
    } else {
      window.addEventListener('resize', fit);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <section id="hero" className="pt-32 sm:pt-36 pb-12 sm:pb-16 relative select-none">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 flex flex-col gap-10 sm:gap-14 pt-4 sm:pt-6">

        {/* Hero Split: Left Copy & CTAs, Right 3-in-1 Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* Left Column (col-span-7): Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            <h1 className="font-display text-[32px] sm:text-[44px] md:text-[52px] xl:text-[58px] text-slate-900 dark:text-white tracking-tight uppercase leading-[1.03] font-bold">
              Website, Software &amp;{' '}
              <span className="relative inline-block px-2.5 sm:px-3 py-1 mt-1.5 -rotate-1 bg-[#ffe600] text-[#131b2e] dark:bg-[#D9480F] dark:text-white shadow-[3px_3px_0px_#131b2e] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.4)] rounded-sm transition-transform hover:rotate-0">
                AI Agent Development
              </span>{' '}
              in Mumbai
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              We are a Mumbai studio. You talk directly to the engineers who build your website, custom software, or AI assistant, pay in milestones by UPI or bank transfer, and own everything we deliver.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center bg-[#ffe600] hover:bg-[#f2da00] text-[#131b2e] border border-[#131b2e]/15 font-sans text-sm font-semibold px-6 py-3 rounded-lg shadow-xs transition-all cursor-pointer active:translate-y-px"
              >
                Start a project
              </button>

              <button
                type="button"
                onClick={onWorkClick}
                className="inline-flex items-center justify-center bg-white/75 hover:bg-white dark:bg-white/[0.04] dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-300/90 dark:border-white/15 font-sans text-sm font-semibold px-6 py-3 rounded-lg transition-all cursor-pointer active:translate-y-px"
              >
                See live demos
              </button>
            </div>
          </div>

          {/* Right Column (col-span-5): 3-in-1 Hero Visual (Website, AI Assistant, Software Dashboard) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div
              ref={visualRef}
              className="wv"
              id="wv"
              role="img"
              aria-label="WrotX builds websites, AI assistants on WhatsApp and business software dashboards."
            >
              <div ref={scaleRef} className="wv-sc" id="wvsc">
                <i className="wv-o" style={{ left: 20, top: 50, width: 250, height: 250, background: 'radial-gradient(circle at 35% 30%, #fff6, #FFD84D 62%)' }} />
                <i className="wv-o" style={{ right: -10, top: 190, width: 270, height: 270, background: 'radial-gradient(circle at 35% 30%, #fff6, #B7A6FF 62%)' }} />
                <i className="wv-o" style={{ left: 120, top: 330, width: 230, height: 230, background: 'radial-gradient(circle at 35% 30%, #fff6, #8FD3FF 62%)' }} />

                {/* 1. Website Window */}
                <div className="wv-l wv-g wv-br" style={{ '--d': 6 } as React.CSSProperties}>
                  <div className="wv-bar">
                    <i /><i /><i />
                    <span className="wv-url">yourbusiness.in</span>
                  </div>
                  <div className="wv-bd">
                    <div>
                      <h4>2 BHK homes in Mumbai</h4>
                      <p>From ₹55L. Floor plans, EMI calculator and site visits in one place.</p>
                      <span className="wv-btn">Book a site visit</span>
                      <span className="wv-btn w">WhatsApp</span>
                    </div>
                    <div className="wv-img">
                      <svg width="100%" height="100%" viewBox="0 0 160 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        <defs>
                          <linearGradient id="wvg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#FFE9A8" />
                            <stop offset="1" stopColor="#C7D2FE" />
                          </linearGradient>
                          <pattern id="wvw" width="10" height="12" patternUnits="userSpaceOnUse">
                            <rect x="2" y="3" width="5" height="6" rx="1" fill="#fff" fillOpacity="0.75" />
                          </pattern>
                        </defs>
                        <rect width="160" height="150" fill="url(#wvg)" />
                        <rect x="16" y="52" width="52" height="98" rx="3" fill="#4F46E5" />
                        <rect x="16" y="52" width="52" height="98" rx="3" fill="url(#wvw)" />
                        <rect x="74" y="26" width="48" height="124" rx="3" fill="#0F172A" />
                        <rect x="74" y="26" width="48" height="124" rx="3" fill="url(#wvw)" />
                        <rect x="128" y="76" width="32" height="74" rx="3" fill="#6366F1" />
                        <rect x="128" y="76" width="32" height="74" rx="3" fill="url(#wvw)" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 2. Phone / WhatsApp Assistant */}
                <div className="wv-l wv-g wv-ph" style={{ '--d': 14, animationDelay: '0.3s' } as React.CSSProperties}>
                  <div className="wv-ph-h">
                    <span className="wv-av">W</span>
                    <div>
                      Business assistant
                      <small>online</small>
                    </div>
                  </div>
                  <div className="wv-ch">
                    <div className="wv-b i">Hi, is a 2BHK available in Mumbai?</div>
                    <div className="wv-b o">Yes. 3 options under ₹55L. Want a site visit?</div>
                    <div className="wv-b i">Sunday please.</div>
                    <div className="wv-b o">Booked for Sunday, 11 AM.</div>
                  </div>
                </div>

                {/* 3. Dashboard / Custom Software */}
                <div className="wv-l wv-g wv-db" style={{ '--d': 10, animationDelay: '0.5s' } as React.CSSProperties}>
                  <div className="wv-st">
                    <div>
                      <small>This month</small>
                      <b>₹4.2L</b>
                    </div>
                    <div>
                      <small>Payment pending</small>
                      <b>₹38K</b>
                    </div>
                  </div>
                  <div className="wv-bars">
                    <i style={{ height: '35%' }} />
                    <i style={{ height: '52%' }} />
                    <i style={{ height: '44%' }} />
                    <i style={{ height: '68%' }} />
                    <i style={{ height: '60%' }} />
                    <i style={{ height: '84%' }} />
                    <i style={{ height: '100%' }} />
                  </div>
                  <div className="wv-inv">
                    <span>Invoice 204</span>
                    <span className="wv-pill">Paid, GST done</span>
                  </div>
                </div>

                {/* Floating Chips & Tags */}
                <div className="wv-l wv-g wv-chip" style={{ '--d': 18 } as React.CSSProperties}>
                  New lead saved
                  <small>Name, phone, budget</small>
                </div>

                <div className="wv-l wv-g wv-tag" style={{ '--d': 8, left: 96, top: 12, '--c': '#6366f1' } as React.CSSProperties}>
                  <i />Website
                </div>
                <div className="wv-l wv-g wv-tag" style={{ '--d': 16, left: 42, top: 522, '--c': '#16a34a' } as React.CSSProperties}>
                  <i />AI agent
                </div>
                <div className="wv-l wv-g wv-tag" style={{ '--d': 12, left: 300, top: 452, '--c': '#14b8a6' } as React.CSSProperties}>
                  <i />Software
                </div>
              </div>
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
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">GST Invoices Provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
