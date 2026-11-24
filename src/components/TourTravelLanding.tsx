import React, { useState } from 'react';
import {
  MessageCircle,
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { PageHead } from './PageHead';
import { getServicePageMeta } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';
import { usePreviewModal } from '../context/PreviewModalContext';
import type { ServicePageData } from '../data/servicePagesData';

interface TourTravelLandingProps {
  page: ServicePageData;
}

interface Waypoint {
  day: string;
  name: string;
  elevation: string;
  desc: string;
  cx: number;
  cy: number;
}

interface ShowcaseItem {
  id: string;
  tag: string;
  location: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  linkText: string;
}

export const TourTravelLanding: React.FC<TourTravelLandingProps> = ({ page }) => {
  const { openPreviewModal } = usePreviewModal();
  const meta = getServicePageMeta(page);
  const whatsappUrl = getWhatsappUrl(
    `Hi ${SITE_CONFIG.brandName}! I am interested in Tour & Travel Website Development for our travel agency/retreat. Let's discuss our project.`
  );

  // Hero Interactive Trail Waypoints
  const WAYPOINTS: Waypoint[] = [
    {
      day: 'Day 01',
      name: 'Valley Basecamp',
      elevation: '1,450m',
      desc: 'Acclimatization, gear inspection and briefing.',
      cx: 50,
      cy: 160,
    },
    {
      day: 'Day 02',
      name: 'Forest Plateau',
      elevation: '2,280m',
      desc: 'Alpine pine trails and river crossing.',
      cx: 120,
      cy: 130,
    },
    {
      day: 'Day 03',
      name: 'Glacial Ridge Pass',
      elevation: '3,340m',
      desc: 'High-elevation scree traverse and ridge camp.',
      cx: 210,
      cy: 85,
    },
    {
      day: 'Day 04',
      name: 'Summit Peak (Japan)',
      elevation: '4,120m',
      desc: 'Sunrise alpine push and panoramic crater views.',
      cx: 300,
      cy: 45,
    },
  ];

  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(3);
  const currentWaypoint = WAYPOINTS[activeWaypointIndex];

  // Flagship Architectural Showcases Data (Matches Mockup 5-Card Deck)
  const SHOWCASES: ShowcaseItem[] = [
    {
      id: 'alpine',
      tag: 'EXPEDITIONS',
      location: 'SWISS ALPS • HIGH PASSES',
      title: 'Alpine & Trekking',
      subtitle: 'Interactive altitude profiles & hut bookings with live telemetry.',
      desc: 'Dynamic elevation diagrams, hut-to-hut gear manifests, and automated mountain pass weather telemetry.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      linkText: 'Explore Expedition Deck',
    },
    {
      id: 'safari',
      tag: 'PRIVATE LODGES',
      location: 'SERENGETI • PRIVATE RESERVES',
      title: 'Safari & Sanctuaries',
      subtitle: '360 suite tours & direct ranger inquiries with migration maps.',
      desc: 'Solar-powered reserve lodges, migration tracker overlays, and seamless WhatsApp concierge intake.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',
      linkText: 'View Lodge Architecture',
    },
    {
      id: 'machu-picchu',
      tag: 'FLAGSHIP BLUEPRINT',
      location: 'PERU • CUSTOM ITINERARY ARCHITECTURE',
      title: 'MACHU PICCHU - PERU',
      subtitle: 'Geocoded route simulation, private train connections, and guest dossier.',
      desc: 'Geocoded route simulation, private train connections, and guest dossier generation in real-time.',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80',
      linkText: 'Experience Live Architecture',
    },
    {
      id: 'yachting',
      tag: 'CHARTERS',
      location: 'CYCLADES • ARCHIPELAGO CHARTERS',
      title: 'Sailing & Yachting',
      subtitle: 'Cabin block & tender bookings with live vessel berths.',
      desc: 'Catamaran private charters, marine conservation itineraries, and tidal reef booking desks.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      linkText: 'Open Charter System',
    },
    {
      id: 'culinary',
      tag: 'CULTURAL TRAILS',
      location: 'KYOTO & TUSCANY • TASTING TRAILS',
      title: 'Culinary & Heritage',
      subtitle: 'Sommelier cellars & private guide booking with bespoke windows.',
      desc: 'Hidden gastronomic paths, sommelier cellars, and heritage ryokan stays with bespoke booking windows.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
      linkText: 'Browse Heritage Blueprint',
    },
  ];

  const [activeShowcase, setActiveShowcase] = useState<number>(2);

  const prevShowcase = () => {
    setActiveShowcase((prev) => (prev === 0 ? SHOWCASES.length - 1 : prev - 1));
  };

  const nextShowcase = () => {
    setActiveShowcase((prev) => (prev === SHOWCASES.length - 1 ? 0 : prev + 1));
  };

  // Common Operator Questions (FAQ)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'Can our non-technical tour managers easily add dates and daily itineraries?',
      a: 'Yes. We configure user-friendly markdown or visual sheet editors where non-technical staff can update departures, prices, and daily inclusions in seconds without touching code or breaking layouts.',
    },
    {
      q: 'Can the website connect to our existing reservation software like FareHarbor or PeekPro?',
      a: 'Yes. We natively integrate with FareHarbor, PeekPro, Rezdy, Bokun, Checkfront, or custom webhook calendars so your live capacity and availability stays synchronized with zero double-bookings.',
    },
    {
      q: 'How does the WhatsApp concierge integration function for international guests?',
      a: 'Every package and tour page features pre-parameterized WhatsApp trigger links that pre-fill the traveler chosen travel dates, party size, and itinerary code directly into your WhatsApp chat for immediate conversion.',
    },
    {
      q: 'Do you optimize our website for remote locations with slower satellite connections?',
      a: 'Yes. We engineer ultra-lean frontend bundles under 120KB with adaptive WebP/AVIF progressive image compression and offline-capable edge caching so pages load instantly on 3G and remote resort Wi-Fi.',
    },
  ];

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  const scrollToArchitectures = () => {
    const el = document.getElementById('flagship-showcases');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageHead meta={meta} />
      <article className="pt-28 sm:pt-36 pb-20 relative overflow-hidden">
        {/* Subtle blurred ambient depth spots behind cards for liquid glass refraction */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[8%] -left-[4%] w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#d9480f]/18 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[28%] right-[2%] w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-[#ff922b]/16 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[52%] left-[4%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#e03131]/14 to-transparent blur-[85px] transform-gpu" />
          <div className="absolute top-[75%] right-[8%] w-[440px] h-[440px] rounded-full bg-gradient-to-r from-[#fab005]/16 to-transparent blur-[85px] transform-gpu" />
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-24 relative z-10">
          {/* =========================================================
              1. HERO SECTION (Wanderlust Split Architecture)
             ========================================================= */}
          <section className="space-y-8">
            <div>
              <Breadcrumb
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Services', to: '/website-development-mumbai' },
                  { label: 'Tour & Travel Websites' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Editorial Headline & Actions */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-4">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                    Tour &amp; Travel<br />
                    <span className="text-[#c92a2a] italic font-serif">Websites That Inspire</span><br />
                    Pure Wanderlust.
                  </h1>
                  <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                    We design immersive digital architectures, interactive day-by-day itineraries, and
                    frictionless direct-booking portals for expedition outfitters, luxury safari lodges, and
                    curated retreat creators.
                  </p>
                </div>

                {/* Rounded Header Buttons (matches user reference mockup) */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={scrollToArchitectures}
                    className="inline-flex items-center gap-2 min-h-[48px] bg-[#c92a2a] hover:bg-[#a61e1e] text-white font-sans text-sm font-semibold px-7 py-3 rounded-full shadow-[0_10px_25px_-5px_rgba(201,42,42,0.45)] hover:translate-y-[-1px] transition-all cursor-pointer"
                  >
                    <span>Explore Travel Blueprint</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openPreviewModal('website')}
                    className="inline-flex items-center gap-2.5 min-h-[48px] text-slate-700 dark:text-slate-200 hover:text-[#c92a2a] dark:hover:text-[#ff8787] font-sans text-sm font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] pl-0.5">
                      ▶
                    </span>
                    <span>See Live Demos</span>
                  </button>
                </div>

                {/* Social Proof Metric Strip */}
                <div className="flex items-center gap-3.5 pt-3">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=90&h=90&q=80"
                      alt="Traveler avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=90&h=90&q=80"
                      alt="Traveler avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=90&h=90&q=80"
                      alt="Traveler avatar"
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center text-[#c92a2a] text-xs font-bold tracking-wider">
                      ★★★★★
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-bold uppercase tracking-tight">
                      100K+ TRAVELERS BOOKED VIA OUR CLIENT SYSTEMS
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mountain Route Card with Sparkles */}
              <div className="lg:col-span-6 relative">
                {/* Decorative 4-point sparkle accents */}
                <span className="absolute -top-3 left-6 text-[#c92a2a] text-xl font-bold select-none z-20" aria-hidden="true">
                  ✦
                </span>
                <span className="absolute -bottom-3 right-6 text-slate-400 dark:text-slate-500 text-xl font-bold select-none z-20" aria-hidden="true">
                  ✦
                </span>

                <div
                  onPointerMove={handlePointerMove}
                  className="relative rounded-[32px] sm:rounded-[36px] overflow-hidden border-[3px] border-slate-900/90 dark:border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] bg-slate-900"
                >
                  {/* Photo-Driven Mountain Backdrop Container */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
                      alt="Alpine Mountain Trail"
                      className="w-full h-full object-cover opacity-85 transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Top Right Waypoint Tag */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1 rounded-full text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-white/10 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                      <span className="text-[#c92a2a] text-xs">▲</span>
                      <span>SUMMIT TRAIL • 4,820M</span>
                    </div>

                    {/* Interactive SVG Route Trace */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 360 220"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Trail Path */}
                      <path
                        d="M 50 180 Q 130 160 170 120 T 260 75 T 320 40"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />

                      {/* Waypoint Dots */}
                      <circle cx="50" cy="180" r="5" fill="#c92a2a" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="170" cy="120" r="6" fill="#c92a2a" stroke="#ffffff" strokeWidth="2.5" className="animate-pulse" />
                      <circle cx="260" cy="75" r="5" fill="#c92a2a" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="320" cy="40" r="6" fill="#c92a2a" stroke="#ffffff" strokeWidth="2.5" />
                    </svg>

                    {/* Bottom Status Floating Card */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-[#0B0F19]/90 backdrop-blur-md border border-slate-200/80 dark:border-white/15 flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#c92a2a] text-white flex items-center justify-center shrink-0 shadow-md">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>Summit Peak (Apex)</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950/60 text-[#c92a2a] dark:text-rose-300">
                              4,820m
                            </span>
                          </div>
                          <div className="font-sans text-xs text-slate-600 dark:text-slate-300">
                            Final summit ridge &amp; descent route
                          </div>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-md bg-[#d3f9d8] dark:bg-emerald-950/70 text-[#2b8a3e] dark:text-emerald-400 font-mono text-[10px] font-bold tracking-wider uppercase shrink-0">
                        LIVE MODULE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. FLAGSHIP ARCHITECTURAL SHOWCASES (3D Overlapping Deck)
             ========================================================= */}
          <section id="flagship-showcases" className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-wider text-[#D9480F] font-bold block">
                ARCHITECTURAL SHOWCASES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Flagship Travel Websites We Engineer
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Explore purpose-built UI systems crafted specifically for high-end outfitters, expedition lines,
                and bespoke journey planners.
              </p>
            </div>

            {/* 3D Overlapping Fan Deck */}
            <div className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[540px] flex items-center justify-center overflow-hidden sm:overflow-visible">
              {SHOWCASES.map((item, idx) => {
                const total = SHOWCASES.length;
                let diff = (idx - activeShowcase + total) % total;
                if (diff > total / 2) diff -= total; // e.g. -2, -1, 0, 1, 2

                const isCenter = diff === 0;
                let positionClasses = 'opacity-0 pointer-events-none scale-75';
                let zIndex = 0;

                if (isCenter) {
                  zIndex = 30;
                  positionClasses = 'translate-x-0 scale-100 opacity-100 z-30 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/30';
                } else if (diff === -1) {
                  zIndex = 20;
                  positionClasses = '-translate-x-[48%] sm:-translate-x-[56%] md:-translate-x-[64%] scale-[0.90] opacity-80 z-20 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.5)] hover:opacity-95';
                } else if (diff === 1) {
                  zIndex = 20;
                  positionClasses = 'translate-x-[48%] sm:translate-x-[56%] md:translate-x-[64%] scale-[0.90] opacity-80 z-20 shadow-[0_15px_35px_-8px_rgba(0,0,0,0.5)] hover:opacity-95';
                } else if (diff === -2) {
                  zIndex = 10;
                  positionClasses = '-translate-x-[90%] sm:-translate-x-[108%] md:-translate-x-[120%] scale-[0.80] opacity-50 z-10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] hover:opacity-80';
                } else if (diff === 2) {
                  zIndex = 10;
                  positionClasses = 'translate-x-[90%] sm:translate-x-[108%] md:translate-x-[120%] scale-[0.80] opacity-50 z-10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] hover:opacity-80';
                }

                return (
                  <article
                    key={item.id}
                    onClick={() => setActiveShowcase(idx)}
                    onPointerMove={handlePointerMove}
                    style={{ zIndex }}
                    className={`absolute w-[280px] sm:w-[330px] md:w-[360px] h-[440px] sm:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none border border-white/20 dark:border-white/10 ${positionClasses}`}
                  >
                    {/* Full Photo Background */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay matching image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      {item.tag === 'FLAGSHIP BLUEPRINT' ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-[#c92a2a] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase shadow-md">
                          {item.tag}
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono font-bold tracking-wider uppercase">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Bottom Content Area */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1.5 text-left">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-amber-200/90 font-bold block">
                        {item.location}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      {isCenter ? (
                        <>
                          <p className="font-sans text-xs text-slate-200/90 leading-relaxed pt-1 line-clamp-3">
                            {item.desc}
                          </p>
                          <div className="pt-2">
                            <span className="text-[#ff6b6b] hover:text-white font-sans text-xs font-semibold inline-flex items-center gap-1 transition-colors">
                              {item.linkText} ↗
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="font-sans text-xs text-slate-300/80 line-clamp-2 pt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Carousel Navigation Indicator */}
            <div className="flex items-center justify-center gap-4 pt-3">
              <button
                type="button"
                onClick={prevShowcase}
                aria-label="Previous showcase"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D9480F] hover:scale-105 transition-all cursor-pointer"
              >
                <ChevronLeft size={19} />
              </button>

              <div className="flex items-center gap-1.5">
                {SHOWCASES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveShowcase(dotIdx)}
                    aria-label={`Go to showcase ${dotIdx + 1}`}
                    className={`h-2 transition-all cursor-pointer ${
                      activeShowcase === dotIdx
                        ? 'w-7 rounded-full bg-[#c92a2a]'
                        : 'w-2 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextShowcase}
                aria-label="Next showcase"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D9480F] hover:scale-105 transition-all cursor-pointer"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </section>

          {/* =========================================================
              3. COMMON OPERATOR QUESTIONS (FAQ Accordion)
             ========================================================= */}
          <section className="space-y-8 max-w-4xl mx-auto w-full">
            <div className="space-y-2 text-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#D9480F] font-bold block">
                CLARITY &amp; COMPLIANCE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Common Operator Questions
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
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
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
              6. BOTTOM CTA BANNER (Luxury Expedition Theme)
             ========================================================= */}
          <section
            onPointerMove={handlePointerMove}
            className="p-8 sm:p-12 rounded-none bg-gradient-to-r from-[#170e11] via-[#231217] to-[#111622] text-white space-y-6 shadow-2xl border border-rose-950/80"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-wider text-[#D9480F] font-bold block">
                  SCALE YOUR EXPEDITIONS
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Ready to Turn Casual Browsers Into Confirmed Bookings?
                </h2>
                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed">
                  Tell us about your destinations and guest journeys. We will construct a free interactive
                  wireframe preview tailored to your flagship tour.
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
                  <span>WhatsApp Concierge</span>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </a>

                <button
                  type="button"
                  onClick={() => openPreviewModal('website')}
                  className="inline-flex items-center gap-2 min-h-[46px] bg-[#D9480F] hover:bg-[#c23e0c] text-white font-mono text-xs sm:text-sm uppercase font-bold px-6 py-3 rounded-none border border-rose-700 shadow-[3px_3px_0px_rgba(255,255,255,0.1)] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                  <span>Request Free Preview →</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default TourTravelLanding;
