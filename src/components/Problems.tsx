import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp } from './FadeUp';
import { SITE_CONFIG } from '../config/site';

interface ProblemItem {
  key: string;
  color: string;
  pain: string;
  fixDesc: string;
  fixTag: string;
  slug: string;
}

const PROBLEMS_DATA: ProblemItem[] = [
  {
    key: 'slow-site',
    color: '#CDFD2F',
    pain: '“Customers leave because your website is slow.”',
    fixDesc: 'We build your site to load in one second on mobile phones.',
    fixTag: 'Fast website',
    slug: '/website-development-mumbai',
  },
  {
    key: 'monthly-software',
    color: '#7FB8E8',
    pain: '“You pay monthly for software you barely use.”',
    fixDesc: 'We build custom software for your exact team with no monthly fees.',
    fixTag: 'Custom software',
    slug: '/custom-software-development',
  },
  {
    key: 'unanswered-enquiries',
    color: '#9B87FF',
    pain: '“Enquiries go unanswered after 7 PM.”',
    fixDesc: 'Our AI agent answers WhatsApp and calls while you sleep.',
    fixTag: 'AI assistant',
    slug: '/ai-agent-development',
  },
  {
    key: 'disappeared-dev',
    color: '#FFA878',
    pain: '“Your last developer disappeared.”',
    fixDesc: `You get full code, staff training and ${SITE_CONFIG.support.days} days free support.`,
    fixTag: 'Free support and full ownership',
    slug: '/about',
  },
];

export const Problems: React.FC = () => {
  const [pressedCards, setPressedCards] = useState<Set<number>>(new Set());

  const handleCardToggle = (index: number) => {
    setPressedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="problems" className="problems-section pt-6 sm:pt-10 pb-16 sm:pb-24 relative overflow-hidden select-none">
      {/* Subtle blurred soft ambient color glow behind the cards for depth and contrast */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-[540px] h-[460px] rounded-full bg-gradient-to-tr from-sky-200/35 via-cyan-100/25 to-blue-200/20 dark:from-sky-950/20 dark:to-cyan-950/15 blur-[100px] transform-gpu" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-[560px] h-[480px] rounded-full bg-gradient-to-bl from-amber-200/35 via-orange-100/25 to-rose-200/20 dark:from-[#D9480F]/15 dark:to-amber-950/12 blur-[100px] transform-gpu" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[360px] rounded-full bg-gradient-to-r from-emerald-100/25 via-teal-100/20 to-sky-100/20 dark:from-emerald-950/15 dark:to-teal-950/10 blur-[110px] transform-gpu" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <FadeUp>
            <h2>Sound familiar?</h2>
          </FadeUp>
          <FadeUp delay={40}>
            <p className="sub">
              Most Indian businesses lose customers because their tech is slow or broken. Tap a card to see the fix.
            </p>
          </FadeUp>
        </div>

        {/* 4 Interactive Problem Cards */}
        <FadeUp delay={80}>
          <div className="pgrid">
            {PROBLEMS_DATA.map((item, idx) => {
              const isPressed = pressedCards.has(idx);
              return (
                <div
                  key={item.key}
                  role="button"
                  tabIndex={0}
                  className="pcard"
                  aria-pressed={isPressed ? 'true' : 'false'}
                  onClick={() => handleCardToggle(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardToggle(idx);
                    }
                  }}
                  style={{ '--k': item.color } as React.CSSProperties}
                >
                  <span className="q">
                    <b>{item.pain}</b>
                    <small>Hover or tap for the fix</small>
                  </span>
                  <span className="fix">
                    <div className="fix-badge-wrap">
                      <span className="fix-badge">The Fix</span>
                    </div>
                    <p>{item.fixDesc}</p>
                    <Link
                      to={item.slug}
                      className="fix-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{item.fixTag}</span>
                      <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
