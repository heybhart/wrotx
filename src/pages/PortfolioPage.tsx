import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { PORTFOLIO_META } from '../config/seo';
import { usePreviewModal } from '../context/PreviewModalContext';

import rec1 from '../assets/recording 1.aac';
import rec2 from '../assets/Recording 2.aac';
import rec3 from '../assets/recording 3.aac';
import rec4 from '../assets/Recording 4.aac';

interface TemplateItem {
  n: string;
  c: string;
  g: string;
  a: string;
  h: string;
  p: string;
  b: string;
  k: string[];
  u: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    n: 'Voyage - Luxury Travel',
    c: 'Travel & tour agency',
    g: 'linear-gradient(135deg, #0b3b44, #127a82)',
    a: '#e8b54a',
    h: 'Escape the ordinary',
    p: 'Hand-built journeys across India and beyond.',
    b: 'Plan my trip',
    k: ['Kerala', 'Rajasthan', 'Maldives'],
    u: 'https://voyage-travel-hub.vercel.app/',
  },
  {
    n: 'Banking & Finance',
    c: 'Co-operative bank & finance portal',
    g: 'linear-gradient(135deg, #0d2457, #2b5fd9)',
    a: '#34c38f',
    h: 'Banking built on trust',
    p: 'Loans, deposits and UPI in one secure portal.',
    b: 'Open account',
    k: ['Home loan', 'Savings', 'Gold loan'],
    u: 'https://bccb.vercel.app/',
  },
  {
    n: 'E-state Enterprise',
    c: 'Real estate & property advisory',
    g: 'linear-gradient(135deg, #1c1f2b, #4a3b3a)',
    a: '#f0480f',
    h: 'Properties that grow with you',
    p: 'Verified listings, honest advice.',
    b: 'View listings',
    k: ['Flats', 'Plots', 'Offices'],
    u: 'https://bholenath-eight.vercel.app/',
  },
  {
    n: 'Saaranya Properties',
    c: 'Premium real estate showcase',
    g: 'linear-gradient(135deg, #2d4a34, #8a9a5b)',
    a: '#f2e3b3',
    h: 'Live where it feels like home',
    p: 'Boutique residences with room to breathe.',
    b: 'Book a visit',
    k: ['Villas', 'Towers', 'Gardens'],
    u: 'https://saaryana.vercel.app/',
  },
  {
    n: 'Real E-state (Meena Properties)',
    c: 'Residential & commercial real estate',
    g: 'linear-gradient(135deg, #0a0a0b, #1a1a24)',
    a: '#ffd166',
    h: 'Architecture Beyond Imagination',
    p: 'Luxury spaces crafted with vision, precision, and modern living.',
    b: 'Explore Residences',
    k: ['Rent', 'Buy', 'Commercial'],
    u: 'https://rohankkw.github.io/meena-properties/',
  },
  {
    n: 'Tour & Travels',
    c: 'Holiday packages & discovery',
    g: 'linear-gradient(135deg, #ff6b4a, #ffb347)',
    a: '#0d3b66',
    h: 'Holidays, sorted',
    p: 'Packages that fit your budget and calendar.',
    b: 'See packages',
    k: ['Goa', 'Himachal', 'Dubai'],
    u: 'https://triplio-topaz.vercel.app/',
  },
];

interface CallSlip {
  t: string;
  a: string;
  l: string;
  s: string;
  d: string;
  n: string;
  audio: string;
}

const CALL_SLIPS: Record<string, { label: string; data: CallSlip }> = {
  re: {
    label: 'Real estate',
    data: {
      t: 'Meta lead · Real estate',
      a: 'Namaste Amit ji! Main WrotX real estate desk se bol raha hoon. Would you like to visit the sample flat this Saturday at 4 PM?',
      l: 'Yes, Saturday 4 PM works. Is parking included?',
      s: 'Booked',
      d: 'Sat, 4:00 PM · site visit',
      n: 'Calendar invite and WhatsApp recap sent',
      audio: rec1,
    },
  },
  dc: {
    label: 'Dental clinic',
    data: {
      t: 'Web form · Dental clinic',
      a: 'Good afternoon Priya, aapne teeth whitening ke liye enquiry ki thi. Kya Thursday 11 baje clinic mein consultation rakh doon?',
      l: 'Haan, 11 baje theek hai. Fees kitni hogi?',
      s: 'Booked',
      d: 'Thu, 11:00 AM · consultation',
      n: 'Reminder and clinic location sent on WhatsApp',
      audio: rec2,
    },
  },
  tr: {
    label: 'Travel agency',
    data: {
      t: 'Inbound call · Travel agency',
      a: 'Hello Rahul, you asked about a Goa trip for four people. Shall I send two package options on WhatsApp right now?',
      l: 'Yes please. Our budget is around ₹60,000.',
      s: 'Qualified',
      d: '₹60,000 budget · 4 travellers',
      n: 'Two packages sent, lead assigned to an agent',
      audio: rec3,
    },
  },
  ed: {
    label: 'Coaching institute',
    data: {
      t: 'Admission form · Coaching institute',
      a: 'Hi, welcome to WrotX Institute. Are you looking for the right classes to help you excel in your studies? I am here to help you with courses, batches, fees, and demo class bookings.',
      l: 'Yes, please share Class 10 batch timings and demo booking.',
      s: 'Booked',
      d: 'Tomorrow, 5:00 PM · demo class',
      n: 'Batch details sent on WhatsApp',
      audio: rec4,
    },
  },
};

interface MobileAppItem {
  n: string;
  d: string;
  color: string;
  title: string;
  sub: string;
  body: React.ReactNode;
  btn: string;
  tabs: string[];
}

const MOBILE_APPS: MobileAppItem[] = [
  {
    n: 'Real estate agent app',
    d: "Leads, site visits and one-tap quotes in the broker's pocket.",
    color: '#f0480f',
    title: "Today's leads",
    sub: '12 new',
    body: (
      <>
        <div className="pf-big">
          Site visits today<br />
          <b style={{ fontSize: '1.6em' }}>3</b>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#0a9d63' }} />
          Amit · Bandra 3BHK
          <small>4 PM</small>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#f0a30f' }} />
          Sana · Thane 2BHK
          <small>6 PM</small>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#2b5fd9' }} />
          Vikram · Andheri shop
          <small>Tomorrow</small>
        </div>
      </>
    ),
    btn: 'Call next lead',
    tabs: ['Leads', 'Visits', 'Quotes', 'Profile'],
  },
  {
    n: 'School management app',
    d: 'Attendance, marks and fee reminders for teachers and parents.',
    color: '#2b5fd9',
    title: 'Class 8-B',
    sub: 'Mon, 24 Nov',
    body: (
      <>
        <div className="pf-big">
          Present today<br />
          <b style={{ fontSize: '1.6em' }}>38 / 41</b>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#0a9d63' }} />
          Aarav Sharma
          <small>Present</small>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#e0483f' }} />
          Diya Patel
          <small>Absent</small>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#f0a30f' }} />
          Fees due
          <small>6 students</small>
        </div>
      </>
    ),
    btn: 'Submit attendance',
    tabs: ['Attendance', 'Marks', 'Fees', 'Parents'],
  },
  {
    n: 'Billing and POS app',
    d: 'Fast GST bills, UPI QR and stock alerts for restaurants and shops.',
    color: '#0a9d63',
    title: 'Bill #1042',
    sub: 'Table 6',
    body: (
      <>
        <div className="pf-r">
          Masala dosa × 2
          <small>₹180</small>
        </div>
        <div className="pf-r">
          Filter coffee × 3
          <small>₹120</small>
        </div>
        <div className="pf-r">
          GST 5%
          <small>₹15</small>
        </div>
        <div className="pf-big">
          Total<br />
          <b style={{ fontSize: '1.6em' }}>₹315</b>
        </div>
      </>
    ),
    btn: 'Show UPI QR',
    tabs: ['Bills', 'Items', 'Stock', 'Reports'],
  },
  {
    n: 'Field staff app',
    d: 'Geo-fenced check-ins, job dispatch and customer sign-off. Works offline.',
    color: '#0d7c8a',
    title: 'Job 204',
    sub: 'AC repair',
    body: (
      <>
        <div className="pf-big">
          Customer is 2.1 km away<br />
          <b style={{ fontSize: '1.6em' }}>ETA 12 min</b>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#0a9d63' }} />
          Checked in 10:02
          <small>Photo added</small>
        </div>
        <div className="pf-r">
          <i className="pf-d" style={{ background: '#f0a30f' }} />
          Next: Job 207
          <small>1:30 PM</small>
        </div>
      </>
    ),
    btn: 'Mark complete',
    tabs: ['Jobs', 'Map', 'Report', 'Profile'],
  },
  {
    n: 'Member and banking app',
    d: 'Balances, EMI payments and deposit alerts for co-operative societies.',
    color: '#0d2457',
    title: 'Hello, Meera',
    sub: '',
    body: (
      <>
        <div className="pf-big">
          Savings balance<br />
          <b style={{ fontSize: '1.6em' }}>₹48,250</b>
        </div>
        <div className="pf-r">
          Next EMI
          <small>5 Dec · ₹4,200</small>
        </div>
        <div className="pf-r">
          Recurring deposit
          <small>Paid</small>
        </div>
      </>
    ),
    btn: 'Pay EMI',
    tabs: ['Home', 'Deposits', 'Loans', 'Profile'],
  },
  {
    n: 'Travel booking app',
    d: 'Packages, bookings and WhatsApp support for travel agencies.',
    color: '#ff6b4a',
    title: 'Goa, 4 nights',
    sub: 'Dec 12-16',
    body: (
      <>
        <div className="pf-big">
          From<br />
          <b style={{ fontSize: '1.6em' }}>₹14,999</b> per person
        </div>
        <div className="pf-r">
          Beach villa
          <small>Breakfast</small>
        </div>
        <div className="pf-r">
          Flights
          <small>Included</small>
        </div>
      </>
    ),
    btn: 'Book now',
    tabs: ['Explore', 'Trips', 'Chat', 'Profile'],
  },
];

interface SoftwareItem {
  t: string;
  g: string;
  f: string[];
  k: string;
  e: string;
}

const SOFTWARE_ITEMS: SoftwareItem[] = [
  {
    t: 'Real estate brokerage CRM and inventory ERP',
    g: 'Real estate and advisory',
    f: [
      'Instant lead sync from Meta ads, 99acres and website forms',
      'EMI and stamp duty calculator that makes a customer PDF quote in one click',
      'Role-based access for agents, telecallers and sales directors, with commission ledgers',
      'Encrypted repository for RERA filings, 7/12 extracts and layout blueprints',
    ],
    k: 'React · Node.js · PostgreSQL · WhatsApp Cloud API',
    e: 'Zero monthly user seat fees',
  },
  {
    t: 'GST invoicing, billing and inventory portal',
    g: 'Retail and distribution',
    f: [
      'GST invoices in under 200 ms, with thermal and A4 PDF printing',
      'e-Way Bill JSON and automatic GSTR-1 summaries',
      'Low-stock alerts to the warehouse manager on WhatsApp',
      'Dynamic UPI QR on every bill for instant counter payment',
    ],
    k: 'Next.js · TypeScript · PostgreSQL · Prisma · Redis',
    e: 'Self-hosted on your cloud',
  },
  {
    t: 'Multi-role operations and field staff portal',
    g: 'Field services and logistics',
    f: [
      'Geo-fenced mobile attendance with photo proof of work',
      'Live Kanban dispatch board that auto-assigns by staff location',
      'Customer digital signature on the phone screen at completion',
      'Daily operations report emailed to executives automatically',
    ],
    k: 'React PWA · Node.js · Supabase · Mapbox SDK',
    e: 'Works offline and syncs online',
  },
  {
    t: 'Co-operative credit society and banking portal',
    g: 'Fintech and banking',
    f: [
      'Member savings, FD and RD ledger',
      'Loan interest computation and EMI repayment tracking',
      'SMS and WhatsApp alert after every deposit',
      'Multi-factor authentication and tamper-proof audit trails',
    ],
    k: 'React · Python FastAPI · PostgreSQL · AES-256 encryption',
    e: 'Built for strict regulatory audits',
  },
];

const RenderMiniSite: React.FC<{ template: TemplateItem }> = ({ template: t }) => {
  return (
    <div className="pf-site">
      <div className="pf-nav">
        <i>{t.n.split(' ')[0]}</i>
        <em>Home</em>
        <em>About</em>
        <u style={{ background: t.a, color: '#111' }}>Enquire</u>
      </div>
      <div className="pf-hero2" style={{ background: t.g }}>
        <h4>{t.h}</h4>
        <p>{t.p}</p>
        <b style={{ background: t.a, color: '#111' }}>{t.b}</b>
      </div>
      <div className="pf-row">
        {t.k.map((x, i) => (
          <div key={i} style={{ background: t.g, filter: `hue-rotate(${i * 18}deg)` }}>
            {x}
          </div>
        ))}
      </div>
      <div className="pf-row">
        {t.k.map((x, i) => (
          <div key={i} style={{ background: '#e6e9f2', color: '#1c2333' }}>
            {x}
          </div>
        ))}
      </div>
      <div className="pf-foot">© {t.n}</div>
    </div>
  );
};

const RenderLaptop: React.FC<{ template: TemplateItem; showHint?: boolean }> = ({ template, showHint }) => {
  return (
    <div className="pf-lap">
      <div className="pf-lid">
        <div className="pf-screen">
          <RenderMiniSite template={template} />
          {showHint && (
            <div className="pf-hint">
              <span>Preview</span>
            </div>
          )}
        </div>
      </div>
      <div className="pf-base" />
    </div>
  );
};

export const PortfolioPage: React.FC = () => {
  const { openPreviewModal } = usePreviewModal();
  const [activeCallKey, setActiveCallKey] = useState<string>('re');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [openLedgerIndex, setOpenLedgerIndex] = useState<number | null>(0);
  const [activeAppIndex, setActiveAppIndex] = useState<number>(0);

  // Audio state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const trkRef = useRef<HTMLDivElement>(null);
  const isAppScrollingRef = useRef<boolean>(false);

  const activeSlip = CALL_SLIPS[activeCallKey]?.data || CALL_SLIPS.re.data;
  const words = activeSlip.a.split(' ');

  const handleLangChange = (key: string) => {
    if (key === activeCallKey) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAudioProgress(0);
    setCurrentWordIndex(-1);

    setActiveCallKey(key);
    setIsPrinting(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration || 1;
    const cur = audioRef.current.currentTime;
    const p = Math.min(1, Math.max(0, cur / dur));
    setAudioProgress(p);

    const total = words.length;
    const wIdx = Math.min(total - 1, Math.floor(p * total));
    setCurrentWordIndex(wIdx);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(1);
    setCurrentWordIndex(words.length);
  };

  useEffect(() => {
    if (isPrinting) {
      const timer = setTimeout(() => setIsPrinting(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isPrinting]);

  const scrollShelf = (offset: number) => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const goToApp = (idx: number) => {
    if (!trkRef.current) return;
    isAppScrollingRef.current = true;
    setActiveAppIndex(idx);
    trkRef.current.scrollTo({
      left: idx * trkRef.current.clientWidth,
      behavior: 'smooth',
    });
    setTimeout(() => {
      isAppScrollingRef.current = false;
    }, 800);
  };

  const handleTrkScroll = () => {
    if (isAppScrollingRef.current || !trkRef.current) return;
    const w = trkRef.current.clientWidth;
    if (w > 0) {
      const idx = Math.round(trkRef.current.scrollLeft / w);
      if (idx !== activeAppIndex && idx >= 0 && idx < MOBILE_APPS.length) {
        setActiveAppIndex(idx);
      }
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTemplate) {
        setSelectedTemplate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemplate]);

  return (
    <div className="pf-page pt-20 sm:pt-24">
      <PageHead meta={PORTFOLIO_META} />

      {/* Hidden audio element for synchronized playback */}
      <audio
        ref={audioRef}
        src={activeSlip.audio}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Hero Section */}
      <header className="pf-hero">
        <div className="pf-wrap">
          <div className="mb-2.5">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Portfolio' }]} />
          </div>
          <span className="pf-live pf-mono">Live in production</span>
          <h1>Things we've built, and how they behave on a Monday morning.</h1>
          <nav className="pf-jump" aria-label="Portfolio sections">
            <a href="#voice">Voice agents</a>
            <a href="#sites">Website templates</a>
            <a href="#apps">Mobile apps</a>
            <a href="#auto">Automations</a>
            <a href="#soft">Enterprise software</a>
          </nav>
        </div>
      </header>

      {/* Voice Agents Section */}
      <section id="voice">
        <div className="pf-wrap pf-voice">
          <div>
            <h2>Natural AI calling in Hindi, Indian English and Hinglish.</h2>
            <p className="pf-mut" style={{ marginTop: '18px', maxWidth: '44ch' }}>
              Our agents answer inbound enquiries and dial new web and Meta leads within seconds. They check inventory, confirm budgets and book visits straight into Google Calendar and your CRM.
            </p>
            <div className="pf-facts">
              <span><b>Under 650 ms</b> to reply</span>
              <span>Stops when the caller cuts in</span>
              <span>Books on Google Calendar or Cal.com</span>
              <span>Recording and summary on WhatsApp</span>
            </div>
            <button
              type="button"
              onClick={() => openPreviewModal('voice')}
              className="pf-cta"
              style={{ marginTop: '30px' }}
            >
              Request live call demo
            </button>
          </div>

          <div>
            <div className="pf-lang" role="group" aria-label="Business type">
              {Object.entries(CALL_SLIPS).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={activeCallKey === key}
                  onClick={() => handleLangChange(key)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pf-slipw">
              <div
                className={`pf-slip pf-slip-clickable ${isPrinting ? 'print' : ''}`}
                aria-live="polite"
                onClick={togglePlayPause}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePlayPause();
                  }
                }}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} sample call recording`}
              >
                <div className="pf-top pf-mono flex items-center justify-between">
                  <span>Sample call · {activeSlip.t}</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f0480f] select-none">
                    {isPlaying ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[#f0480f] animate-ping" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#f0480f]">▶</span>
                        <span>Click to play</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Audio Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-200 h-1 rounded-full overflow-hidden mt-3 mb-1">
                  <div
                    className="bg-[#f0480f] h-full transition-all duration-100"
                    style={{ width: `${Math.round(audioProgress * 100)}%` }}
                  />
                </div>

                <p className={`pf-ag pf-ag-sync ${isPlaying || audioProgress > 0 ? 'sync-active' : ''}`}>
                  <small className="pf-mono">AI agent</small>
                  "{words.map((word, wIdx) => {
                    let cls = '';
                    if (isPlaying || audioProgress > 0) {
                      if (wIdx < currentWordIndex || audioProgress >= 1) {
                        cls = 'on';
                      } else if (wIdx === currentWordIndex) {
                        cls = 'cur';
                      }
                    }
                    return (
                      <span key={wIdx} className={cls}>
                        {word}{' '}
                      </span>
                    );
                  })}"
                </p>
                <p className="pf-ld">"{activeSlip.l}"</p>
                <div className="pf-end">
                  <span className="pf-stamp">{activeSlip.s}</span>
                  <span>
                    <b>{activeSlip.d}</b>
                    <br />
                    <span className="pf-mut">{activeSlip.n}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Templates Shelf */}
      <section id="sites">
        <div className="pf-wrap">
          <div className="pf-head">
            <div>
              <span className="pf-live pf-mono">Live demos</span>
              <h2>Website templates, ready to open.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
              <p className="pf-mut">Tap any laptop for a full preview built for Indian businesses.</p>
              <div className="pf-ctrl">
                <button
                  type="button"
                  onClick={() => scrollShelf(-312)}
                  aria-label="Previous templates"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollShelf(312)}
                  aria-label="Next templates"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="pf-shelf" ref={shelfRef}>
            {TEMPLATES.map((t, idx) => (
              <button
                key={idx}
                type="button"
                className="pf-it"
                aria-label={`Preview ${t.n}`}
                onClick={() => setSelectedTemplate(t)}
              >
                <RenderLaptop template={t} showHint />
                <b>{t.n}</b>
                <small>{t.c}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section id="apps">
        <div className="pf-wrap pf-apps">
          <div>
            <h2>Mobile apps people keep on their home screen.</h2>
            <p className="pf-mut" style={{ margin: '18px 0 30px', maxWidth: '46ch' }}>
              We design and build Android, iOS and installable web apps, from a booking app for your customers to an offline-first tool for your field staff.
            </p>
            <div className="pf-al" id="al">
              {MOBILE_APPS.map((a, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={activeAppIndex === i}
                  onClick={() => goToApp(i)}
                >
                  <b>{a.n}</b>
                  <span>{a.d}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openPreviewModal('website')}
              className="pf-cta"
              style={{ marginTop: '34px' }}
            >
              Plan my app
            </button>
          </div>

          <div className="pf-ph">
            <div className="pf-dev">
              <div className="pf-scr" id="scr">
                <div
                  className="pf-trk"
                  ref={trkRef}
                  onScroll={handleTrkScroll}
                  tabIndex={0}
                  aria-label="Sample apps, swipe to browse"
                >
                  {MOBILE_APPS.map((app, i) => (
                    <div
                      key={i}
                      className="pf-ap"
                      style={{ '--c': app.color } as React.CSSProperties}
                    >
                      <div className="pf-sb">
                        <span>9:41</span>
                        <span>5G</span>
                      </div>
                      <div className="pf-hd">
                        <h5>{app.title}</h5>
                        <small>{app.sub}</small>
                      </div>
                      {app.body}
                      <div className="pf-bt">{app.btn}</div>
                      <div className="pf-tb">
                        {app.tabs.map((tab, ti) => (
                          <span key={ti} className={ti === 0 ? 'on' : ''}>
                            {tab}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pf-dots" aria-hidden="true">
              {MOBILE_APPS.map((_, i) => (
                <i
                  key={i}
                  className={activeAppIndex === i ? 'on' : ''}
                  onClick={() => goToApp(i)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>

            <p className="pf-mono pf-mut" style={{ textAlign: 'center', marginTop: '16px', position: 'relative' }}>
              Swipe to browse · sample screens
            </p>
          </div>
        </div>
      </section>

      {/* Automations Flow */}
      <section id="auto">
        <div className="pf-wrap">
          <div className="pf-head">
            <div>
              <h2>One enquiry, handled from first message to payment.</h2>
            </div>
            <p className="pf-mut">
              AI and WhatsApp automations that connect your tools, databases and channels, then run around the clock without anyone minding them.
            </p>
          </div>

          <div className="pf-flow">
            <div className="pf-st">
              <div className="pf-m">&lt;30s</div>
              <h3>Speed-to-lead router</h3>
              <p>A new Meta or website enquiry gets an intro WhatsApp message and is assigned to the right sales executive.</p>
            </div>
            <div className="pf-st">
              <div className="pf-m">24/7</div>
              <h3>WhatsApp AI concierge</h3>
              <p>Chats in Hindi or English, shares catalogue PDFs, answers pricing and hands over when buying intent is high.</p>
            </div>
            <div className="pf-st">
              <div className="pf-m">99.2%</div>
              <h3>KYC and document OCR</h3>
              <p>Aadhaar, PAN or bank statements sent on WhatsApp are read and verified against records in under 5 seconds.</p>
            </div>
            <div className="pf-st">
              <div className="pf-m">35%</div>
              <h3>Payment follow-up bot</h3>
              <p>Sends reminders with UPI links before and on due dates, and reconciles receipts automatically. Collection is 35% faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Software Ledger */}
      <section id="soft">
        <div className="pf-wrap">
          <div className="pf-head">
            <div>
              <span className="pf-live pf-mono">Production systems</span>
              <h2>Custom software you own completely.</h2>
            </div>
            <p className="pf-mut">
              Built around your exact business logic. No per-seat licence fees, and you hold the code, the data schema and the infrastructure.
            </p>
          </div>

          <div id="ledger">
            {SOFTWARE_ITEMS.map((s, i) => {
              const isOpen = openLedgerIndex === i;
              return (
                <div key={i} className="pf-row-l">
                  <button
                    type="button"
                    className="pf-tg"
                    aria-expanded={isOpen}
                    aria-controls={`pf-p${i}`}
                    onClick={() => setOpenLedgerIndex(isOpen ? null : i)}
                  >
                    <h3>{s.t}</h3>
                    <span className="pf-tag pf-mono">{s.g}</span>
                    <span className="pf-pl" />
                  </button>
                  <div className={`pf-pn ${isOpen ? 'on' : ''}`} id={`pf-p${i}`}>
                    <div>
                      <div className="pf-pi">
                        <ul>
                          {s.f.map((feature, fi) => (
                            <li key={fi}>{feature}</li>
                          ))}
                        </ul>
                        <div>
                          <p className="pf-stack pf-mono">{s.k}</p>
                          <p className="pf-edge pf-mono">{s.e}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <p className="pf-mut" style={{ marginBottom: '14px' }}>
              Want one of these shaped around your business?
            </p>
            <button
              type="button"
              onClick={() => openPreviewModal('website')}
              className="pf-cta"
            >
              Get free preview
            </button>
          </div>
        </div>
      </section>

      {/* Modal Preview for Templates */}
      {selectedTemplate && (
        <div
          className="pf-modal on"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedTemplate.n} preview`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedTemplate(null);
            }
          }}
        >
          <div className="pf-mi">
            <RenderLaptop template={selectedTemplate} />
            <h3>{selectedTemplate.n}</h3>
            <p>{selectedTemplate.c}</p>
            <a
              className="pf-cta"
              href={selectedTemplate.u}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live demo
            </a>
            <button
              type="button"
              className="pf-cta pf-ghost"
              onClick={() => setSelectedTemplate(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
