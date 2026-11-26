import React, { useState, useEffect } from 'react';

export interface LaptopTemplateItem {
  name: string;
  category: string;
  gradient: string;
  accent: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  cards: string[];
  stats: string[];
  url: string;
  iframeUrl?: string;
}

export const TEMPLATES: LaptopTemplateItem[] = [
  {
    name: 'Voyage - Luxury Travel',
    category: 'Travel & tour agency',
    gradient: 'linear-gradient(135deg, #0b3b44, #127a82)',
    accent: '#e8b54a',
    heroTitle: 'Escape the ordinary',
    heroSubtitle: 'Hand-built journeys across India and beyond.',
    heroCta: 'Plan my trip',
    cards: ['Kerala', 'Rajasthan', 'Maldives'],
    stats: ['120+ trips', '4.9 rating', '18 yrs'],
    url: 'https://voyage-travel-hub.vercel.app/',
    iframeUrl: 'https://voyage-travel-hub.vercel.app/',
  },
  {
    name: 'Banking & Finance',
    category: 'Co-operative bank & finance portal',
    gradient: 'linear-gradient(135deg, #0d2457, #2b5fd9)',
    accent: '#34c38f',
    heroTitle: 'Banking built on trust',
    heroSubtitle: 'Loans, deposits and UPI in one secure portal.',
    heroCta: 'Open account',
    cards: ['Home loan', 'Savings', 'Gold loan'],
    stats: ['₹240 Cr', '32 branches', '60k members'],
    url: 'https://bccb.vercel.app/',
    iframeUrl: 'https://bccb.vercel.app/',
  },
  {
    name: 'E-state Enterprise',
    category: 'Real estate & property advisory',
    gradient: 'linear-gradient(135deg, #1c1f2b, #4a3b3a)',
    accent: '#f0480f',
    heroTitle: 'Properties that grow with you',
    heroSubtitle: 'Verified listings, honest advice.',
    heroCta: 'View listings',
    cards: ['Flats', 'Plots', 'Offices'],
    stats: ['800 sold', '12 cities', 'RERA'],
    url: 'https://bholenath-eight.vercel.app/',
    iframeUrl: 'https://bholenath-eight.vercel.app/',
  },
  {
    name: 'Saaranya Properties',
    category: 'Premium real estate showcase',
    gradient: 'linear-gradient(135deg, #2d4a34, #8a9a5b)',
    accent: '#f2e3b3',
    heroTitle: 'Live where it feels like home',
    heroSubtitle: 'Boutique residences with room to breathe.',
    heroCta: 'Book a visit',
    cards: ['Villas', 'Towers', 'Gardens'],
    stats: ['24 acres', '3 phases', 'Ready'],
    url: 'https://saaryana.vercel.app/',
    iframeUrl: 'https://saaryana.vercel.app/',
  },
  {
    name: 'Real E-state (Meena Properties)',
    category: 'Residential & commercial real estate',
    gradient: 'linear-gradient(135deg, #0a0a0b, #1a1a24)',
    accent: '#d4af37',
    heroTitle: 'Architecture Beyond Imagination',
    heroSubtitle: 'Luxury spaces crafted with vision, precision, and modern living.',
    heroCta: 'Explore Residences',
    cards: ['Penthouse', 'Sky Villa', 'Private Estate'],
    stats: ['2,400 homes', 'Palm Jumeirah', '24/7'],
    url: 'https://rohankkw.github.io/meena-properties/',
    iframeUrl: 'https://rohankkw.github.io/meena-properties/',
  },
  {
    name: 'Tour & Travels',
    category: 'Holiday packages & discovery',
    gradient: 'linear-gradient(135deg, #ff6b4a, #ffb347)',
    accent: '#0d3b66',
    heroTitle: 'Holidays, sorted',
    heroSubtitle: 'Packages that fit your budget and your calendar.',
    heroCta: 'See packages',
    cards: ['Goa', 'Himachal', 'Dubai'],
    stats: ['500 tours', 'Group deals', 'Visa help'],
    url: 'https://triplio-topaz.vercel.app/',
    iframeUrl: 'https://triplio-topaz.vercel.app/',
  },
  {
    name: 'Priti Travels Hub',
    category: 'Bespoke Indian tours & concierge agency',
    gradient: 'linear-gradient(135deg, #0b1220, #1a2744)',
    accent: '#ff9933',
    heroTitle: 'Discover Incredible India',
    heroSubtitle: 'Cinema-grade domestic journeys with 24x7 concierge care.',
    heroCta: 'Explore tours',
    cards: ['Rajasthan', 'Kerala', 'Ladakh'],
    stats: ['24x7 care', '40+ circuits', '4.9 rating'],
    url: 'https://priti-mu.vercel.app/',
    iframeUrl: 'https://priti-mu.vercel.app/',
  },
];

const MiniSite: React.FC<{ template: LaptopTemplateItem }> = ({ template }) => {
  return (
    <div className="lap-site">
      <div className="nav">
        <i>{template.name.split(' ')[0]}</i>
        <em>Home</em>
        <em>About</em>
        <em>Contact</em>
        <u style={{ background: template.accent, color: '#111' }}>Enquire</u>
      </div>
      <div className="hero" style={{ background: template.gradient }}>
        <h4>{template.heroTitle}</h4>
        <p>{template.heroSubtitle}</p>
        <b style={{ background: template.accent, color: '#111' }}>{template.heroCta}</b>
      </div>
      <div className="row">
        {template.cards.map((x, i) => (
          <div
            key={i}
            style={{
              background: template.gradient,
              filter: `hue-rotate(${i * 18}deg)`,
            }}
          >
            {x}
          </div>
        ))}
      </div>
      <div className="stats">
        {template.stats.map((x, i) => {
          const parts = x.split(' ');
          return (
            <span key={i}>
              <b>{parts[0]}</b>
              {parts.slice(1).join(' ')}
            </span>
          );
        })}
      </div>
      <div className="row">
        {template.cards.map((x, i) => (
          <div key={i} style={{ background: '#e6e9f2', color: '#1c2333' }}>
            {x}
          </div>
        ))}
      </div>
      <div className="foot">
        © {template.name} · Contact us · WhatsApp
      </div>
    </div>
  );
};

const LaptopScreenContent: React.FC<{
  template: LaptopTemplateItem;
  isModal?: boolean;
  isHovered?: boolean;
}> = ({ template, isModal, isHovered = false }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(isModal ? 0.625 : 0.26);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasHovered, setHasHovered] = useState(Boolean(isModal));

  useEffect(() => {
    if (isHovered || isModal) {
      setHasHovered(true);
    }
  }, [isHovered, isModal]);

  useEffect(() => {
    if (!template.iframeUrl || !hasHovered) return;
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth || el.offsetWidth;
      if (w > 0) {
        setScale(w / 1280);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [template.iframeUrl, hasHovered]);

  const showIframe = Boolean(isModal ? iframeLoaded : (isHovered && iframeLoaded));

  return (
    <div ref={containerRef} className="lap-screen-inner">
      <div className={`lap-placeholder-wrap ${showIframe ? 'lap-hidden' : 'lap-visible'}`}>
        <MiniSite template={template} />
      </div>

      {(hasHovered || isModal) && template.iframeUrl && (
        <div className={`lap-iframe-container ${showIframe ? 'lap-visible' : 'lap-hidden'}`}>
          <div
            className="lap-iframe-scale"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: '0 0',
            }}
          >
            <div className="lap-iframe-scroll">
              <iframe
                src={template.iframeUrl}
                title={template.name}
                className="lap-iframe"
                loading={isModal ? 'eager' : 'lazy'}
                onLoad={() => setIframeLoaded(true)}
                tabIndex={-1}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LaptopCard: React.FC<{
  template: LaptopTemplateItem;
}> = ({ template }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={template.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="lap-card group text-center block cursor-pointer"
      aria-label={`Open live demo of ${template.name}`}
    >
      <div className="lap-glow" style={{ background: template.accent }} />
      <div className="lap-device">
        <div className="lap-lid">
          <div className="lap-screen">
            <LaptopScreenContent template={template} isHovered={isHovered} />
            <div className="lap-hint">
              <span>Click to preview</span>
            </div>
          </div>
        </div>
        <div className="lap-base" />
      </div>
      <div className="lap-meta">
        <b>{template.name}</b>
        <small>{template.category}</small>
      </div>
    </a>
  );
};

export const AvailableTemplates: React.FC = () => {
  return (
    <section id="available-templates" className="space-y-8 sm:space-y-10 scroll-mt-24">
      <div>
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#006e27] dark:text-[#00fe66] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00fe66] animate-pulse" />
          Live Demos
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Available Templates
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Pick a laptop, see the site. Click any template to explore live interactive designs built for Indian businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-14">
        {TEMPLATES.map((tpl) => (
          <LaptopCard
            key={tpl.name}
            template={tpl}
          />
        ))}
      </div>
    </section>
  );
};
