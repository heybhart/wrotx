import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { PageHead } from './PageHead';
import { getServicePageMeta } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';
import { usePreviewModal } from '../context/PreviewModalContext';
import type { ServicePageData } from '../data/servicePagesData';

interface StartupLandingProps {
  page: ServicePageData;
}

export const StartupLanding: React.FC<StartupLandingProps> = ({ page }) => {
  const { openPreviewModal } = usePreviewModal();
  const meta = getServicePageMeta(page);
  const whatsappUrl = getWhatsappUrl(
    `Hi ${SITE_CONFIG.brandName}! I am interested in Startup Website & Landing Page Development. Let's discuss our project.`
  );

  // Interactive Calculator State in Section 2 (Block 03)
  const [teamSize, setTeamSize] = useState<number>(20);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic plan calculation
  let planName = 'Optimal Plan: Tier 01 (Starter)';
  let estimatedPrice = '₹14,999/mo';
  if (teamSize > 40) {
    planName = 'Optimal Plan: Tier 03 (Enterprise Scale)';
    estimatedPrice = '₹49,999/mo';
  } else if (teamSize > 15) {
    planName = 'Optimal Plan: Tier 02 (Growth Team)';
    estimatedPrice = '₹24,999/mo';
  }

  const scrollToArchitecture = () => {
    const el = document.getElementById('architecture-section');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  const FAQS = [
    {
      q: 'Can you connect our existing payment systems, forms, or automation?',
      a: 'Yes. We integrate Razorpay, Stripe, Cashfree, custom webhooks, HubSpot, Notion, Slack, and Google Sheets natively with zero performance penalty.',
    },
    {
      q: 'Do we get 100% full ownership of our website and files?',
      a: 'Yes. You receive full GitHub repository handover, production build scripts, assets, and documentation. No recurring platform lock-in or builder fees.',
    },
    {
      q: 'How quickly can we launch before our product announcement or investor pitch?',
      a: 'Our standard startup sprint is calendar-guaranteed at 14 days from kickoff to live deployment on your custom domain, with expedited 7-day rush sprints available on request.',
    },
    {
      q: 'Can our marketing team edit text, images, and offerings without a programmer?',
      a: 'Yes. We structure your copy and catalogs through clean markdown, JSON data files, or connected headless workflows so your non-technical team members can publish updates in minutes.',
    },
  ];

  return (
    <>
      <PageHead meta={meta} />
      <article className="pt-28 sm:pt-36 pb-20 relative overflow-hidden">
        {/* Subtle blurred ambient depth spots behind cards for liquid glass refraction */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[8%] -left-[4%] w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#1be66f]/22 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[28%] right-[2%] w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-[#ffe600]/18 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[52%] left-[4%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#00fe66]/15 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[75%] right-[8%] w-[440px] h-[440px] rounded-full bg-gradient-to-r from-[#ffaa6e]/18 to-transparent blur-[85px] transform-gpu" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-20 relative z-10">
          {/* =========================================================
              1. HERO SECTION
             ========================================================= */}
          <section className="space-y-8">
            <div>
              <Breadcrumb
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Services', to: '/website-development-mumbai' },
                  { label: 'Startup Websites' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.06]">
                  Websites That Turn Curious Visitors Into Paying Customers.
                </h1>
              </div>

              <div className="lg:col-span-5 space-y-6 lg:pt-2">
                <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Launch a high-converting web presence built to turn curious visitors into paying customers
                  with instant WhatsApp routing and sub-second load performance.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[46px] bg-[#00fe66] text-[#00280b] font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none shadow-[3px_3px_0px_#00280b] hover:translate-y-[-1px] transition-all"
                  >
                    <MessageCircle size={17} strokeWidth={2.2} />
                    <span>WhatsApp Us</span>
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </a>

                  <button
                    type="button"
                    onClick={scrollToArchitecture}
                    className="inline-flex items-center gap-2 min-h-[46px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-white/20 font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:translate-y-[-1px] transition-all cursor-pointer"
                  >
                    <span>Explore Architecture</span>
                    <span className="text-[#D9480F]">↓</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Velocity & Metrics Strip */}
            <div
              onPointerMove={handlePointerMove}
              className="liquid-glass-card grid grid-cols-1 md:grid-cols-12 gap-4 p-5 sm:p-6 rounded-none items-center"
            >
              <div className="md:col-span-3 space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  DEPLOYMENT VELOCITY
                </span>
                <span className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white block">
                  Enterprise Grade
                </span>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium block">
                  14-Day Delivery Guarantee
                </span>
              </div>

              {/* 3-Step Milestone Tracker */}
              <div className="md:col-span-5 grid grid-cols-3 gap-2 py-2 border-y md:border-y-0 md:border-x border-slate-200/80 dark:border-white/10 md:px-4">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-bold block">
                    Phase 01
                  </span>
                  <span className="font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Strategy Spec
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase text-[#D9480F] font-bold block">
                    Phase 02
                  </span>
                  <span className="font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Engineering
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase text-sky-600 dark:text-sky-400 font-bold block">
                    Phase 03
                  </span>
                  <span className="font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Performance
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 space-y-1 md:text-right">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  INTERACTION LATENCY
                </span>
                <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
                  Sub-second Frontend Cache Engine
                </span>
                <span className="font-mono text-xs text-[#D9480F] font-bold block">
                  &lt;650ms First Load
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. HOW YOUR WEBSITE DRIVES MEASURABLE REVENUE
             ========================================================= */}
          <section id="architecture-section" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  How Your Website Drives Measurable Revenue
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every visual element is engineered to move prospective clients closer to a purchase
                  without unnecessary friction.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Feature Row 01: Interactive Product Walkthroughs */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-none items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-[#D9480F]">01</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      SELF-GUIDED PRODUCT DISCOVERY
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Interactive Product Walkthroughs
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Let prospects experience your software, workflow, or service before booking a call.
                    Visitors can click through key benefits in seconds, eliminating doubt and decreasing
                    friction for sales conversations.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-none bg-emerald-100 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
                      +78% On-Page Engagement
                    </span>
                    <span className="px-3 py-1 rounded-none bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                      Zero Legacy Bloat
                    </span>
                  </div>
                </div>

                {/* Right: SaaS Dashboard Graphic Simulation */}
                <div className="lg:col-span-6">
                  <div
                    onPointerMove={handlePointerMove}
                    className="liquid-glass-well p-5 rounded-none bg-[#0B0F19]/90 text-white border border-slate-800/80 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-none bg-[#D9480F]" />
                        <span className="font-semibold text-slate-300">WrotX Telemetry v2.4</span>
                      </div>
                      <span className="text-emerald-400 font-mono">Active Monitoring</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900/80 border border-slate-800">
                        <div className="font-mono text-[10px] text-slate-400 uppercase">Conversion Rate</div>
                        <div className="font-display text-lg font-bold text-emerald-400 mt-1">4.82%</div>
                        <div className="font-mono text-[10px] text-emerald-500">↑ +1.4% this wk</div>
                      </div>
                      <div className="p-3 bg-slate-900/80 border border-slate-800">
                        <div className="font-mono text-[10px] text-slate-400 uppercase">Avg Session</div>
                        <div className="font-display text-lg font-bold text-sky-400 mt-1">3m 42s</div>
                        <div className="font-mono text-[10px] text-slate-400">Zero drop-off</div>
                      </div>
                      <div className="p-3 bg-slate-900/80 border border-slate-800">
                        <div className="font-mono text-[10px] text-slate-400 uppercase">Qualified Leads</div>
                        <div className="font-display text-lg font-bold text-[#00fe66] mt-1">128</div>
                        <div className="font-mono text-[10px] text-emerald-500">Direct to CRM</div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>Pipeline Conversion Health</span>
                        <span className="text-emerald-400">96.4%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 overflow-hidden flex">
                        <div className="h-full bg-emerald-500" style={{ width: '70%' }} />
                        <div className="h-full bg-sky-400" style={{ width: '26%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Row 02: Automated Lead & Customer Inquiries */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-none items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-[#D9480F]">02</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      CONVERSIONS / CRM ROUTING
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Automated Lead &amp; Customer Inquiries
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Capture buyer intent immediately. Inquiries trigger automatic, instant WhatsApp and
                    email notifications directly to your founder or sales team, ensuring zero lost opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-none bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                      Instant Webhook Dispatch
                    </span>
                    <span className="px-3 py-1 rounded-none bg-emerald-100 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
                      Direct Founder Alert
                    </span>
                  </div>
                </div>

                {/* Right: Live Notification Monitor Card */}
                <div className="lg:col-span-6">
                  <div
                    onPointerMove={handlePointerMove}
                    className="liquid-glass-well p-5 rounded-none space-y-3 shadow-md"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 uppercase font-semibold">LIVE NOTIFICATION MONITOR</span>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                        +12s DELAY
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 border-l-4 border-emerald-500 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-display font-bold text-slate-900 dark:text-white">
                          New qualified inquiry: B2B Fintech SaaS
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">Just now</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
                        "Seeking to launch our enterprise portal before the next funding round. Sent via direct WhatsApp Inquiry button."
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Auto-synced to CRM</span>
                      <span>Webhook active with checksum</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Row 03: Interactive Package & Capacity Calculators */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-none items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-[#D9480F]">03</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      CALCULATORS / ESTIMATION
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Interactive Package &amp; Capacity Calculators
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ambiguous prices lose buyers. We build interactive package calculators and feature
                    matrices with tailored tier toggles that give clients complete clarity to proceed.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-none bg-emerald-100 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
                      Calculates in Real-time
                    </span>
                    <span className="px-3 py-1 rounded-none bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                      Customer Price Clarity
                    </span>
                  </div>
                </div>

                {/* Right: Interactive Team Expansion Calculator Card */}
                <div className="lg:col-span-6">
                  <div
                    onPointerMove={handlePointerMove}
                    className="liquid-glass-well p-5 sm:p-6 rounded-none space-y-5 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-white/10 pb-3">
                      <span className="font-mono text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                        ESTIMATED TEAM EXPANSION
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {planName}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <label htmlFor="team-slider" className="font-semibold text-slate-800 dark:text-slate-200">
                          Active Team Size
                        </label>
                        <span className="font-mono text-base font-bold text-[#D9480F]">
                          {teamSize} Users
                        </span>
                      </div>
                      <input
                        id="team-slider"
                        type="range"
                        min={5}
                        max={80}
                        step={1}
                        value={teamSize}
                        onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer accent-[#D9480F]"
                      />
                      <div className="flex justify-between font-mono text-[11px] text-slate-400">
                        <span>5 Users</span>
                        <span>80 Users</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/10">
                      <span className="font-sans text-xs text-slate-500 dark:text-slate-400">
                        Calculated Estimate
                      </span>
                      <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                        {estimatedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Row 04: High-Trust Comparison & Proof */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-none items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-[#D9480F]">04</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                      STRATEGIC DIFFERENTIATION
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    High-Trust Comparison &amp; Proof
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Position your business decisively ahead of slower legacy alternatives. Side-by-side
                    matrices demonstrate your unique value proposition clearly for prospects evaluating options.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-none bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
                      Tangible Value Drivers
                    </span>
                    <span className="px-3 py-1 rounded-none bg-emerald-100 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
                      Overcome Doubt Faster
                    </span>
                  </div>
                </div>

                {/* Right: Comparison Table Matrix */}
                <div className="lg:col-span-6 overflow-x-auto">
                  <div
                    onPointerMove={handlePointerMove}
                    className="liquid-glass-well p-5 rounded-none"
                  >
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200/70 dark:border-slate-800 text-[10px] font-mono uppercase text-slate-500">
                          <th className="py-2.5 pr-2">PARAMETER</th>
                          <th className="py-2.5 px-2 text-emerald-600 dark:text-emerald-400 font-bold">WROTX SPRINT</th>
                          <th className="py-2.5 pl-2 text-slate-400">OTHER AGENCIES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        <tr>
                          <td className="py-2.5 pr-2 font-semibold text-slate-800 dark:text-slate-200">Execution Velocity</td>
                          <td className="py-2.5 px-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">Rapid Agile Deployment</td>
                          <td className="py-2.5 pl-2 text-slate-500">Slow Legacy Pacing</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-semibold text-slate-800 dark:text-slate-200">Code Ownership</td>
                          <td className="py-2.5 px-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">100% Full Transfer</td>
                          <td className="py-2.5 pl-2 text-slate-500">Platform Lock-in</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-semibold text-slate-800 dark:text-slate-200">Engineering Support</td>
                          <td className="py-2.5 px-2 font-mono font-bold text-emerald-600 dark:text-emerald-400">Direct Line Access</td>
                          <td className="py-2.5 pl-2 text-slate-500">Staged Ticket Queues</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              3. FREQUENTLY ASKED QUESTIONS
             ========================================================= */}
          <section className="space-y-8 max-w-4xl mx-auto w-full">
            <div className="space-y-2 text-center">
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    onPointerMove={handlePointerMove}
                    className="liquid-glass-card rounded-none overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.q}
                      </span>
                      <span className="font-mono text-lg text-slate-400 font-bold shrink-0">
                        {isOpen ? '-' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/10 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* =========================================================
              4. BOTTOM CTA BANNER
             ========================================================= */}
          <section
            onPointerMove={handlePointerMove}
            className="p-8 sm:p-12 rounded-none bg-[#111827] text-white space-y-6 shadow-2xl border border-slate-800"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Ready to Turn Visitors Into Paying Customers?
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                  Get a custom-designed, high-converting digital presence built specifically for your company.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[46px] bg-[#00fe66] text-[#00280b] font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none shadow-[3px_3px_0px_#00280b] hover:translate-y-[-1px] transition-all"
                >
                  <MessageCircle size={17} strokeWidth={2.2} />
                  <span>Have a Project</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </a>

                <button
                  type="button"
                  onClick={() => openPreviewModal('website')}
                  className="inline-flex items-center gap-2 min-h-[46px] bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none border border-slate-700 shadow-[3px_3px_0px_rgba(255,255,255,0.1)] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  <Phone size={15} strokeWidth={2.2} />
                  <span>Book Founder Call</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default StartupLanding;
