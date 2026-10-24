import React from 'react';
import { FadeUp } from './FadeUp';
import { SERVICES_DATA } from '../data/servicesData';

interface WhatWeBuildProps {
  onQuoteClick: (serviceName?: string) => void;
}

const renderLensIcon = (id: string) => {
  switch (id) {
    case 'websites':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'software-apps':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'ai-assistants':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4M8 16h.01M16 16h.01" />
        </svg>
      );
    case 'automation':
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
  }
};

export const WhatWeBuild: React.FC<WhatWeBuildProps> = ({ onQuoteClick }) => {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  const handleChoosePlan = (serviceName: string) => {
    onQuoteClick(serviceName);
    const el = document.getElementById('quote');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle blurred soft color blobs behind the glass for depth - preserving main theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[550px] h-[460px] rounded-full bg-gradient-to-tr from-[#FFB4A2]/35 via-[#FFCDB2]/25 to-rose-300/20 dark:from-[#D9480F]/20 dark:to-pink-600/10 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-[580px] h-[480px] rounded-full bg-gradient-to-bl from-[#BDE0FE]/40 via-[#A2D2FF]/25 to-sky-200/25 dark:from-sky-600/15 dark:to-indigo-600/12 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/3 left-1/3 w-[520px] h-[360px] rounded-full bg-gradient-to-r from-pink-200/20 via-purple-100/15 to-sky-200/20 dark:from-purple-900/15 dark:to-sky-900/10 blur-[110px] transform-gpu"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-[#111a2e] border-2 border-[#111a2e] shadow-[3px_3px_0px_#111a2e]">
                SERVICES
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-[1.08]">
              What we build for you
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Clear prices. No hidden cost. You own everything.
            </p>
          </FadeUp>
        </div>

        {/* 2x2 Bento Services Grid */}
        <ul className="svc-grid">
          {SERVICES_DATA.map((item, idx) => (
            <li
              key={item.id}
              className="svc-item"
              style={{ '--a': item.accent } as React.CSSProperties}
            >
              <FadeUp delay={idx * 50}>
                <div className="relative h-full">
                  <i className="svc-glow" aria-hidden="true" />
                  <article
                    className="svc-card group"
                    onPointerMove={handlePointerMove}
                  >
                    {/* Left Tile */}
                    <div className="svc-tile" aria-hidden="true">
                      <span className="svc-lens">
                        {renderLensIcon(item.id)}
                      </span>
                      <b className="svc-chip svc-c1">{item.chips[0]}</b>
                      <b className="svc-chip svc-c2">{item.chips[1]}</b>
                    </div>

                    {/* Right Body */}
                    <div className="svc-body">
                      <div className="svc-top">
                        <h3 className="svc-title font-display">{item.name}</h3>
                        {item.popular && (
                          <span className="svc-pop">★ POPULAR</span>
                        )}
                      </div>
                      <p className="svc-desc">{item.description}</p>

                      <div className="svc-price">
                        <div>
                          <small>{item.priceLabel || 'STARTING FROM'}</small>
                          <strong className={item.isQuote ? 'q' : ''}>
                            {item.priceRaw}
                          </strong>
                        </div>
                        <span className="svc-time">{item.timeline}</span>
                      </div>

                      <ul className="svc-list">
                        {item.ticks.map((tick, tIdx) => (
                          <li key={tIdx} className="svc-ck">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            <span>{tick}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => handleChoosePlan(item.name)}
                        className="svc-btn"
                      >
                        <span>{item.btnText}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </button>
                    </div>
                  </article>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

