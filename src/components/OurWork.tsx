import React from 'react';
import { FadeUp } from './FadeUp';

const checksWeb = [
  'Looks great and opens fast on any phone',
  'Shows up when people search on Google',
  'Change photos, prices and text yourself, no tech help needed',
  'Customers can call, WhatsApp or pay you directly',
  'We train you and support you after launch'
];

const checksApps = [
  'Works on both Android and iPhone',
  'Simple control panel to manage your orders and customers',
  'Safe login, so only the right people see your data',
  'Customers can pay by UPI or card',
  'We put it on Play Store and App Store for you'
];

const checksAi = [
  'Learns your business, your prices and common questions',
  'Replies to customers on WhatsApp, email and your website',
  'Passes the chat to your team when needed',
  'You can read every conversation anytime',
  'Saves hours of work every single day'
];

const checksVoice = [
  'Talks in English, Hindi and Hinglish',
  'Takes enquiries and books appointments',
  'Connects the call to your team when needed',
  'Sends you a short summary of every call',
  'Works on your existing phone number'
];

export const OurWork: React.FC = () => {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  return (
    <section id="work" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle blurred ambient depth spots behind the bento */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[26%] -left-[3%] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#1be66f]/25 to-transparent blur-[70px] transform-gpu"></div>
        <div className="absolute top-[24%] right-[6%] w-[380px] h-[380px] rounded-full bg-gradient-to-bl from-[#ffe600]/22 to-transparent blur-[70px] transform-gpu"></div>
        <div className="absolute bottom-[2%] left-[40%] w-[360px] h-[360px] rounded-full bg-gradient-to-r from-[#ffaa6e]/20 to-transparent blur-[70px] transform-gpu"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3.5 py-1.5 rounded-md bg-[#1be66f] text-[#111a2e] border-2 border-[#111a2e] shadow-[3px_3px_0px_#111a2e]">
                OUR WORK
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-[1.1] max-w-2xl">
              Products We Built for Real Estate, Retail &amp; Banking
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Real systems we designed and built for Indian clients.
            </p>
          </FadeUp>
        </div>

        {/* Asymmetric Bento: One Tall Lead Card, One Wide Card, Two Compact Cards */}
        <div className="work-bento">
          {/* 1. Tall Lead Card: Websites */}
          <div className="work-web">
            <FadeUp delay={40} className="h-full flex flex-col flex-1">
              <article
                className="work-card work-web flex-1"
                onPointerMove={handlePointerMove}
              >
                <div className="work-well">
                  <div className="work-stat">
                    <strong>30<i>+</i></strong>
                    <span>websites delivered in Mumbai</span>
                  </div>
                  <div className="work-stat">
                    <strong>20<i>+</i></strong>
                    <span>more across India</span>
                  </div>
                </div>
                <h3 className="font-display">Websites that bring you customers</h3>
                <p>Like a salesperson who never takes a day off.</p>
                <ul className="work-list">
                  {checksWeb.map((chk, i) => (
                    <li key={i} className="work-item">
                      <span className="work-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>

                {/* View Recent / New Available Templates */}
                <div className="work-templates">
                  <div className="work-templates-header">
                    <span className="work-templates-badge">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12c45a] animate-pulse inline-block" />
                      AVAILABLE TEMPLATES
                    </span>
                    <span className="work-templates-hint">Live interactive previews</span>
                  </div>

                  <div className="work-templates-list">
                    <a
                      href="https://bigbroker-iota.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-template-link group/tpl"
                    >
                      <div className="work-template-left">
                        <span className="work-template-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                          </svg>
                        </span>
                        <div className="work-template-texts">
                          <span className="work-template-name">Real Estate Brokerage &amp; Portal</span>
                          <span className="work-template-desc">Property listings, EMI calculator &amp; WhatsApp inquiries</span>
                        </div>
                      </div>
                      <span className="work-template-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </a>

                    <a
                      href="https://rohankkw.github.io/meena-properties/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-template-link group/tpl"
                    >
                      <div className="work-template-left">
                        <span className="work-template-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </span>
                        <div className="work-template-texts">
                          <span className="work-template-name">Meena Properties &amp; Advisory</span>
                          <span className="work-template-desc">Residential &amp; commercial properties showcase</span>
                        </div>
                      </div>
                      <span className="work-template-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </a>

                    <a
                      href="https://triplio-topaz.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-template-link group/tpl"
                    >
                      <div className="work-template-left">
                        <span className="work-template-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                          </svg>
                        </span>
                        <div className="work-template-texts">
                          <span className="work-template-name">Luxury Travel &amp; Tours Agency</span>
                          <span className="work-template-desc">Destination discovery, tour packages &amp; booking scheduler</span>
                        </div>
                      </div>
                      <span className="work-template-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </a>

                    <a
                      href="https://zivlynfashion.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-template-link group/tpl"
                    >
                      <div className="work-template-left">
                        <span className="work-template-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </span>
                        <div className="work-template-texts">
                          <span className="work-template-name">Fashion &amp; Jewelry E-Commerce</span>
                          <span className="work-template-desc">Curated catalog, instant search &amp; smooth checkout</span>
                        </div>
                      </div>
                      <span className="work-template-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </FadeUp>
          </div>

          {/* 2. Wide Top Card: Apps */}
          <div className="work-apps">
            <FadeUp delay={80} className="h-full flex flex-col flex-1">
              <article
                className="work-card work-apps flex-1"
                onPointerMove={handlePointerMove}
              >
                <div className="work-split">
                  <div>
                    <div className="work-well">
                      <div className="work-stat">
                        <strong>12<i>+</i></strong>
                        <span>apps built and launched</span>
                      </div>
                    </div>
                    <h3 className="font-display">Apps your customers will love using</h3>
                    <p>Your business on your customer’s phone, Android and iPhone both.</p>
                  </div>
                  <ul className="work-list">
                    {checksApps.map((chk, i) => (
                      <li key={i} className="work-item">
                        <span className="work-tick" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeUp>
          </div>

          {/* 3. Bottom Card Left: AI Assistants */}
          <div className="work-ai">
            <FadeUp delay={120} className="h-full flex flex-col flex-1">
              <article
                className="work-card work-ai flex-1"
                onPointerMove={handlePointerMove}
              >
                <div className="work-well">
                  <div className="work-stat">
                    <strong>10<i>+</i></strong>
                    <span>AI assistants running for clients</span>
                  </div>
                </div>
                <h3 className="font-display">AI assistants that work for you 24/7</h3>
                <p>Like a smart staff member who answers customers day and night, and never asks for leave.</p>
                <ul className="work-list">
                  {checksAi.map((chk, i) => (
                    <li key={i} className="work-item">
                      <span className="work-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          </div>

          {/* 4. Bottom Card Right: Voice Assistants */}
          <div className="work-voice">
            <FadeUp delay={160} className="h-full flex flex-col flex-1">
              <article
                className="work-card work-voice flex-1"
                onPointerMove={handlePointerMove}
              >
                <div className="work-well">
                  <div className="work-stat">
                    <strong>8<i>+</i></strong>
                    <span>voice assistants answering calls</span>
                  </div>
                </div>
                <h3 className="font-display">Voice assistants that answer your calls</h3>
                <p>Never miss a customer call again, even at midnight.</p>
                <ul className="work-list">
                  {checksVoice.map((chk, i) => (
                    <li key={i} className="work-item">
                      <span className="work-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

