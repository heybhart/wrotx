import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, X, CheckCircle2, Loader2 } from 'lucide-react';
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
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isDemoOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDemoOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isDemoOpen]);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName.trim() || !demoPhone.trim()) {
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
          name: demoName.trim(),
          phone: demoPhone.trim(),
          service: 'AI Voice Demo',
          projectDetails: 'User requested an AI voice demo call from the Live demo CTA on the Voice Assistants card.'
        })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || (data && data.success === false)) {
        throw new Error((data && data.message) || 'Failed to submit demo request. Please try again.');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
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

                {/* Devices Mockup Preview Block */}
                <div className="site-preview" aria-hidden="true">
                  <div className="dev laptop">
                    <div className="scr">
                      <div className="sp-bar">
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="sp-url">yourbusiness.com</div>
                      </div>
                      <div className="sp-body">
                        <div className="sp-hero"></div>
                        <div className="sp-line w70"></div>
                        <div className="sp-line w45"></div>
                        <div className="sp-grid">
                          <i></i>
                          <i></i>
                          <i></i>
                        </div>
                      </div>
                    </div>
                    <div className="base"></div>
                  </div>

                  <div className="dev tablet">
                    <div className="pad">
                      <div className="sp-hero"></div>
                      <div className="sp-line w70"></div>
                      <div className="sp-line w45"></div>
                      <div className="sp-grid">
                        <i></i>
                        <i></i>
                      </div>
                    </div>
                  </div>

                  <div className="dev phone">
                    <div className="pad">
                      <div className="sp-hero small"></div>
                      <div className="sp-line w70"></div>
                      <div className="sp-btn">Call</div>
                    </div>
                  </div>
                </div>

                <Link
                  className="tpl-btn"
                  to="/website-development-mumbai#available-templates"
                >
                  <span>Open templates</span>
                  <span aria-hidden="true">→</span>
                </Link>
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

                <div className="mt-auto pt-6 border-t border-dashed border-[var(--work-hair)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDemoOpen(true);
                      setIsSubmitted(false);
                      setErrorMessage('');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-slate-950 bg-[#1be66f] hover:bg-[#16c75f] active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(27,230,111,0.3)] cursor-pointer"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-70"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
                    </span>
                    <span>Request Live Demo</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </article>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Voice Demo Request Modal */}
      {isDemoOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDemoOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="voice-demo-modal-title"
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setIsDemoOpen(false)}
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
                  Demo Request Sent!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
                  Thanks {demoName.trim()}. We received your request for an AI voice demo and will connect with you on {demoPhone.trim()} shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsDemoOpen(false);
                    setDemoName('');
                    setDemoPhone('');
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    AI Voice Demo
                  </div>
                  <h3 id="voice-demo-modal-title" className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                    Experience Our Voice Assistant Live
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                    Share your name and contact number. We will set up a live interactive voice call demonstration on your phone.
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="voice-demo-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="voice-demo-name"
                      type="text"
                      required
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1be66f] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="voice-demo-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Contact Number (Phone / WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="voice-demo-phone"
                      type="tel"
                      required
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
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
                        <span>Sending request...</span>
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>Request Live Demo</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    No spam. We will only contact you for this AI voice demo.
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

