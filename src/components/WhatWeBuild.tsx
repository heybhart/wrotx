import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { FadeUp } from './FadeUp';
import { SERVICES_DATA } from '../data/servicesData';

interface WhatWeBuildProps {
  onQuoteClick?: (serviceName?: string) => void;
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
  const [selectedItem, setSelectedItem] = useState<(typeof SERVICES_DATA)[0] | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedItem]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please enter your name and contact number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service: selectedItem?.name || 'General Inquiry',
          projectDetails: `Inquiry for ${selectedItem?.name} (${selectedItem?.priceRaw || ''}) from What We Build pricing section.`
        })
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || (data && data.success === false)) {
        throw new Error((data && data.message) || 'Failed to submit inquiry. Please try again.');
      }

      setIsSubmitted(true);
      if (onQuoteClick && selectedItem) {
        onQuoteClick(selectedItem.name);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
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
              Clear scope. No hidden cost. You own everything.
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
                        <h3 className="svc-title font-display">
                          <Link to={item.slug} className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        {item.popular && (
                          <span className="svc-pop">★ POPULAR</span>
                        )}
                      </div>
                      <p className="svc-desc">{item.description}</p>

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
                        onClick={() => {
                          setSelectedItem(item);
                          setIsSubmitted(false);
                          setErrorMessage('');
                        }}
                        className="svc-btn cursor-pointer"
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

      {/* Plan Inquiry Modal */}
      {selectedItem && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-modal-title"
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
                  Thanks {name.trim()}. We received your inquiry for {selectedItem.name} and will contact you on {phone.trim()} shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setIsSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 pr-6">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5"
                    style={{
                      backgroundColor: `${selectedItem.accent}20`,
                      color: selectedItem.accent
                    }}
                  >
                    {selectedItem.name}
                  </div>
                  <h3 id="plan-modal-title" className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                    Get Started with {selectedItem.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                    Enter your details and our team will get in touch with scope and milestones.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="plan-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="plan-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1be66f] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="plan-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Contact Number (Phone / WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="plan-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1be66f] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="plan-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-xs font-normal text-slate-400 lowercase">(optional)</span>
                    </label>
                    <input
                      id="plan-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1be66f] transition-all"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-2.5 rounded-lg">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-5 rounded-xl font-bold text-sm text-slate-950 bg-[#1be66f] hover:bg-[#16c75f] active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    No spam. We will only reach out regarding this project inquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

