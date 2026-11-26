import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Code2,
  Headphones,
  Landmark,
  Building2,
  TrendingUp,
  Receipt,
  CheckCircle2,
  Calculator,
  ChevronDown,
  MessageCircle,
  Calendar,
  ArrowUpRight,
  Shield,
  Monitor,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { PageHead } from './PageHead';
import { getServicePageMeta } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';
import { usePreviewModal } from '../context/PreviewModalContext';
import type { ServicePageData } from '../data/servicePagesData';

interface BankingFinanceLandingProps {
  page: ServicePageData;
}

function formatINR(val: number): string {
  return '₹' + Math.round(val).toLocaleString('en-IN');
}

export const BankingFinanceLanding: React.FC<BankingFinanceLandingProps> = ({ page }) => {
  const { openPreviewModal } = usePreviewModal();
  const meta = getServicePageMeta(page);
  const whatsappUrl = getWhatsappUrl(
    `Hi ${SITE_CONFIG.brandName}! I am interested in Banking & Finance Website Development. Please share a quote and demo preview.`
  );

  // Calculator state
  const [calcMode, setCalcMode] = useState<'emi' | 'fd'>('emi');
  const [calcAmount, setCalcAmount] = useState<number>(2500000);
  const [calcRate, setCalcRate] = useState<number>(8.75);
  const [calcTenure, setCalcTenure] = useState<number>(20);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  // Calculations
  let primaryOutputLabel = 'Monthly EMI';
  let primaryOutputValue = '₹0';
  let sub1Label = 'Principal Amount';
  let sub1Value = formatINR(calcAmount);
  let sub2Label = 'Total Interest';
  let sub2Value = '₹0';
  let principalPct = 50;
  let interestPct = 50;

  if (calcMode === 'emi') {
    const monthlyRate = calcRate / 12 / 100;
    const months = calcTenure * 12;
    const emi =
      (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = Math.max(0, totalPayment - calcAmount);

    primaryOutputLabel = 'Monthly EMI';
    primaryOutputValue = formatINR(emi);
    sub1Label = 'Principal Amount';
    sub1Value = formatINR(calcAmount);
    sub2Label = 'Total Interest';
    sub2Value = formatINR(totalInterest);

    principalPct = Math.round((calcAmount / totalPayment) * 100);
    interestPct = 100 - principalPct;
  } else {
    // Quarterly compounding Fixed Deposit
    const n = 4;
    const maturity = calcAmount * Math.pow(1 + calcRate / 100 / n, n * calcTenure);
    const interestEarned = Math.max(0, maturity - calcAmount);

    primaryOutputLabel = 'Maturity Value';
    primaryOutputValue = formatINR(maturity);
    sub1Label = 'Deposit Amount';
    sub1Value = formatINR(calcAmount);
    sub2Label = 'Interest Earned';
    sub2Value = formatINR(interestEarned);

    principalPct = Math.round((calcAmount / maturity) * 100);
    interestPct = 100 - principalPct;
  }

  const FAQS = [
    {
      q: 'Can our staff update FD & loan interest rates without a developer?',
      a: 'Yes. We integrate a secure, easy-to-use staff portal or structured sheet workflow so your branch officers can update daily FD, RD, and loan interest rates, tender notices, and circulars in seconds without touching code.',
    },
    {
      q: 'Do we get 100% source code ownership for our bank IT team?',
      a: "Absolutely. Upon launch, WrotX hands over 100% of the clean, documented source code and repository access to your institution's IT or compliance team with zero vendor lock-in.",
    },
    {
      q: 'Are the calculators and forms compliant with RBI/SEBI guidelines?',
      a: 'Yes. Our layouts include dedicated statutory disclosure sections for Citizen Charters, KYC/AML notices, SEBI/RBI disclaimers, and audited financial reports, alongside strict HTTPS and CSP security headers.',
    },
    {
      q: 'How fast can you launch a co-operative bank website?',
      a: 'Our typical timeline is 1 week from content and scheme sign-off. You receive an interactive preview by Day 3-4, followed by security hardening and live deployment on Day 7.',
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

        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 sm:space-y-24 relative z-10">
          {/* =========================================================
              1. HERO SECTION (Split-Screen Institutional Layout)
             ========================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Institutional Copy & Metrics */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Breadcrumb
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Services', to: '/website-development-mumbai' },
                  { label: 'Banking & Finance' },
                ]}
              />

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                  Banking, NBFC &amp; Finance Website Development in Mumbai
                </h1>
                <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Secure, compliant, and trustworthy websites for co-operative banks, credit societies,
                  NBFCs, and financial consultancies, starting from ₹6,999, delivered in 1 week.
                </p>
              </div>

              {/* Key Strip */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-none"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                    Industry Focus
                  </span>
                  <span className="font-display text-sm sm:text-base text-slate-900 dark:text-white font-bold mt-0.5 leading-snug">
                    Banking &amp; Finance
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                    Our Approach
                  </span>
                  <span className="font-display text-sm sm:text-base text-slate-900 dark:text-white font-bold mt-0.5 leading-snug">
                    Built Around Your Needs
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400 font-medium">
                    What We Deliver
                  </span>
                  <span className="font-display text-sm sm:text-base text-slate-900 dark:text-white font-bold mt-0.5 leading-snug">
                    Modern Digital Presence
                  </span>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
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

                <Link
                  to="/website-development-mumbai#available-templates"
                  className="inline-flex items-center gap-2 min-h-[46px] bg-[#ffe600] text-[#131b2e] font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none shadow-[3px_3px_0px_#131b2e] hover:translate-y-[-1px] transition-all"
                >
                  <Monitor size={17} strokeWidth={2.2} />
                  <span>View Templates</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Loan EMI & Fixed Deposit Calculator Widget */}
            <div className="lg:col-span-6 w-full">
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 sm:p-7 rounded-none space-y-6"
              >
                {/* Widget Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                      <Calculator size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        Interactive Rate &amp; EMI Preview
                      </h2>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                        Live module built for banking &amp; NBFC portals
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold">
                    <Shield size={13} className="text-emerald-600 dark:text-emerald-400" />
                    <span>256-Bit SSL/TLS</span>
                  </div>
                </div>

                {/* Mode Switcher */}
                <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-none liquid-glass-well">
                  <button
                    type="button"
                    onClick={() => setCalcMode('emi')}
                    className={`py-2 px-3 rounded-none font-sans text-xs sm:text-sm font-semibold transition-all ${
                      calcMode === 'emi'
                        ? 'bg-white dark:bg-[#1a2238] text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Loan EMI Calculator
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode('fd')}
                    className={`py-2 px-3 rounded-none font-sans text-xs sm:text-sm font-semibold transition-all ${
                      calcMode === 'fd'
                        ? 'bg-white dark:bg-[#1a2238] text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Fixed Deposit (FD)
                  </button>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  {/* Amount Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <label htmlFor="calc-amount" className="font-medium text-slate-600 dark:text-slate-300">
                        {calcMode === 'emi' ? 'Loan Amount' : 'Deposit Amount'}
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {formatINR(calcAmount)}
                      </span>
                    </div>
                    <input
                      id="calc-amount"
                      type="range"
                      min={100000}
                      max={10000000}
                      step={50000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer accent-[#D9480F]"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      <span>₹1L</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <label htmlFor="calc-rate" className="font-medium text-slate-600 dark:text-slate-300">
                        Interest Rate (% p.a.)
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {calcRate.toFixed(2)}%
                      </span>
                    </div>
                    <input
                      id="calc-rate"
                      type="range"
                      min={5}
                      max={18}
                      step={0.05}
                      value={calcRate}
                      onChange={(e) => setCalcRate(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer accent-[#D9480F]"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      <span>5.00%</span>
                      <span>18.00%</span>
                    </div>
                  </div>

                  {/* Tenure Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <label htmlFor="calc-tenure" className="font-medium text-slate-600 dark:text-slate-300">
                        Tenure (Years)
                      </label>
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {calcTenure} {calcTenure === 1 ? 'Year' : 'Years'}
                      </span>
                    </div>
                    <input
                      id="calc-tenure"
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={calcTenure}
                      onChange={(e) => setCalcTenure(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-none appearance-none cursor-pointer accent-[#D9480F]"
                    />
                    <div className="flex justify-between font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      <span>1 Yr</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Output Summary Card */}
                <div className="liquid-glass-well rounded-none p-5 space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-xs uppercase text-slate-600 dark:text-slate-400 tracking-wider">
                      {primaryOutputLabel}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-[#00fe66]">
                      {primaryOutputValue}
                    </span>
                  </div>

                  {/* Visual Ratio Bar */}
                  <div className="w-full h-2.5 rounded-none bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-sky-500 transition-all duration-300"
                      style={{ width: `${principalPct}%` }}
                      title={`${sub1Label}: ${principalPct}%`}
                    />
                    <div
                      className="h-full bg-[#00fe66] transition-all duration-300"
                      style={{ width: `${interestPct}%` }}
                      title={`${sub2Label}: ${interestPct}%`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1 text-xs sm:text-sm border-t border-slate-200/60 dark:border-white/10">
                    <div>
                      <span className="flex items-center gap-1.5 font-sans text-slate-500 dark:text-slate-400 text-xs">
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span>{sub1Label}</span>
                      </span>
                      <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-white mt-0.5 block">
                        {sub1Value}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="flex items-center justify-end gap-1.5 font-sans text-slate-500 dark:text-slate-400 text-xs">
                        <span className="w-2 h-2 rounded-full bg-[#00fe66]" />
                        <span>{sub2Label}</span>
                      </span>
                      <span className="font-mono text-sm sm:text-base font-semibold text-emerald-600 dark:text-[#00fe66] mt-0.5 block">
                        {sub2Value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. WHY WROTX BUILDS THIS DIFFERENTLY
             ========================================================= */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-2">
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Why WrotX Builds Finance Websites Differently
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Depositors and loan applicants judge a bank's trustworthiness by its website speed, clarity
                  of FD rates, and transparent EMI calculators. We engineer zero-bloat institutional
                  platforms without insecure plugins or third-party trackers.
                </p>
              </div>
            </div>

            {/* 3-Column Institutional Trust Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 rounded-none space-y-3"
              >
                <div className="w-10 h-10 rounded-none bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Zero-Bloat Security
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No vulnerable CMS plugins, no third-party ad trackers, and strict Content Security Policy
                  (CSP) headers enforced by default.
                </p>
              </div>

              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 rounded-none space-y-3"
              >
                <div className="w-10 h-10 rounded-none bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Code2 size={22} strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  100% Source Code Ownership
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full repository and asset handover to your bank's IT or compliance team. No proprietary
                  vendor lock-in or recurring platform fees.
                </p>
              </div>

              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 rounded-none space-y-3"
              >
                <div className="w-10 h-10 rounded-none bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Headphones size={22} strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  60 Days Free Post-Launch Support
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dedicated engineering support for rate table updates, statutory circular uploads, and staff
                  onboarding after your site goes live.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================
              3. WHO WE BUILD FINANCE WEBSITES FOR (4-Quadrant Grid)
             ========================================================= */}
          <section className="space-y-8">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Who We Build Finance Websites For
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Tailored digital architecture for regulated financial entities, lending intermediaries, and
                advisory practices across Mumbai and India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quadrant 1 */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 sm:p-7 rounded-none space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-none bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                      <Landmark size={22} strokeWidth={2.2} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      01 / BANKING
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Co-operative Banks &amp; Credit Societies
                  </h3>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Digital branch presence with daily deposit rate charts, loan scheme breakdowns, annual
                    report downloads, and tender notices.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    Deposit rate tables
                  </span>
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    Branch &amp; ATM locator
                  </span>
                  <span className="px-3 py-1 rounded-none bg-emerald-100/80 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Statutory disclosure ready
                  </span>
                </div>
              </div>

              {/* Quadrant 2 */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 sm:p-7 rounded-none space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-none bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Building2 size={22} strokeWidth={2.2} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      02 / LENDING
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    NBFCs &amp; Direct Selling Agents (DSAs)
                  </h3>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    High-converting loan intake funnels for home loans, business loans, and loan against
                    property (LAP) with instant EMI tools.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    Interactive EMI calculator
                  </span>
                  <span className="px-3 py-1 rounded-none bg-emerald-100/80 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Pre-qualified lead intake
                  </span>
                </div>
              </div>

              {/* Quadrant 3 */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 sm:p-7 rounded-none space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-none bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                      <TrendingUp size={22} strokeWidth={2.2} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      03 / WEALTH
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Wealth Managers &amp; Investment Advisors
                  </h3>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Authoritative websites showcasing mutual fund advisory, portfolio management services
                    (PMS), and retirement planning.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    SIP &amp; lumpsum calculators
                  </span>
                  <span className="px-3 py-1 rounded-none bg-emerald-100/80 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    SEBI compliance disclaimers
                  </span>
                </div>
              </div>

              {/* Quadrant 4 */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-6 sm:p-7 rounded-none space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-none bg-amber-600 text-white flex items-center justify-center shadow-sm">
                      <Receipt size={22} strokeWidth={2.2} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      04 / ADVISORY
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Chartered Accountants &amp; Tax Consultants
                  </h3>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Professional portals with GST/TDS calculators, audit service guides, and secure client
                    document submission links.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    GST &amp; tax calculation tools
                  </span>
                  <span className="px-3 py-1 rounded-none bg-slate-100/80 dark:bg-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                    Direct consultation calendar
                  </span>
                  <span className="px-3 py-1 rounded-none bg-emerald-100/80 dark:bg-emerald-950/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Encrypted lead intake
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              4. BUILT-IN FEATURES (Technical Specifications)
             ========================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Built-in Features for Banking &amp; Finance Websites
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Every WrotX financial build ships with precision-engineered modules designed for regulatory
                clarity, mobile speed, and effortless rate management.
              </p>

              {/* Performance Callout Card */}
              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card p-5 rounded-none space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Core Performance Target
                  </span>
                  <span className="font-mono text-base font-bold text-emerald-600 dark:text-[#00fe66]">99+ Lighthouse</span>
                </div>
                <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sub-second page loads on 4G mobile networks across Maharashtra and India.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'Interactive loan EMI, SIP investment, and fixed deposit interest calculators',
                'Mobile-responsive interest rate charts for FD, RD, gold loans, and home loans',
                'Branch and ATM locator with Google Maps directions and direct branch phone extensions',
                'Dedicated statutory disclosure sections for Citizen Charters, KYC guidelines, and annual audited financials',
                'Bank-grade frontend security: strict Content Security Policy (CSP), HTTPS enforcement, and zero tracker bloat',
                'Easy staff portal or sheet integration to update daily interest rates and notices without a web developer',
              ].map((feat, i) => (
                <div
                  key={i}
                  onPointerMove={handlePointerMove}
                  className="liquid-glass-card p-4 rounded-none flex items-start gap-3"
                >
                  <CheckCircle2 size={19} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-slate-700 dark:text-slate-200 leading-snug">
                    {feat}
                  </span>
                </div>
              ))}

              <div
                onPointerMove={handlePointerMove}
                className="liquid-glass-card highlight p-4 rounded-none flex items-start gap-3 sm:col-span-2"
              >
                <CheckCircle2 size={19} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-sans text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  Full source code handover and 60 days free post-launch support
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              5. HOW YOUR BANKING WEBSITE GOES LIVE (1-Week Delivery)
             ========================================================= */}
          <section className="space-y-8">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                How Your Banking Website Goes Live
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: '01',
                  time: 'Day 1-2',
                  title: 'Scheme Architecture & Compliance Plan',
                  desc: 'We map your deposit schemes, loan products, regulatory disclosures, and branch directory into a clear institutional sitemap.',
                },
                {
                  step: '02',
                  time: 'Day 3-4',
                  title: 'Interactive Calculator & Rate UX Preview',
                  desc: 'Management tests loan calculators, rate tables, and inquiry flows on mobile and desktop before launch.',
                },
                {
                  step: '03',
                  time: 'Day 5-6',
                  title: 'Security Hardening & Routing',
                  desc: 'SSL/TLS encryption, strict CSP header security, and private client submission routing are configured and audited.',
                },
                {
                  step: '04',
                  time: 'Day 7',
                  title: 'Launch & Training',
                  desc: 'Delivered in 1 week with staff training on rate updates, full source code handover, and 60 days free support.',
                  highlight: true,
                },
              ].map((st, i) => (
                <div
                  key={i}
                  onPointerMove={handlePointerMove}
                  className={`liquid-glass-card p-6 rounded-none space-y-3 ${
                    st.highlight ? 'highlight' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-2xl font-bold ${
                        st.highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#D9480F]'
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                      {st.time}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {st.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              6. FREQUENTLY ASKED QUESTIONS (Accordion)
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
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#D9480F]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-white/10 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* =========================================================
              7. BOTTOM CTA BANNER
             ========================================================= */}
          <section
            onPointerMove={handlePointerMove}
            className="liquid-glass-card p-8 sm:p-12 rounded-none space-y-6"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Ready to Upgrade Your Financial Institution's Digital Presence?
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Get a free interactive preview tailored to your bank, NBFC, or advisory practice - starting from ₹6,999.
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
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </a>

                <button
                  type="button"
                  onClick={() => openPreviewModal('website')}
                  className="inline-flex items-center gap-2 min-h-[46px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none shadow-[3px_3px_0px_rgba(0,0,0,0.2)] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  <Calendar size={17} strokeWidth={2.2} />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default BankingFinanceLanding;
