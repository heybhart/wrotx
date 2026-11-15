import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronDown, MessageCircle, Phone, Clock, IndianRupee } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProcessStepsGrid } from '../components/HowItWorks';
import { WebsiteWhoItIsFor } from '../components/WebsiteWhoItIsFor';
import { AvailableTemplates } from '../components/AvailableTemplates';
import { PageHead } from '../components/PageHead';
import { getServicePageMeta } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';
import type { ServicePageData } from '../data/servicePagesData';

const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.top}px`);
};

export const ServiceLandingPage: React.FC<{ page: ServicePageData }> = ({ page }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const whatsappUrl = getWhatsappUrl(`Hi ${SITE_CONFIG.brandName}! I am interested in ${page.title}. Please share a quote.`);
  const meta = getServicePageMeta(page);

  return (
    <>
      <PageHead meta={meta} />
      <article className="pt-32 sm:pt-36 pb-20 relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12 sm:space-y-16">
          {/* Hero Block */}
          <header className="space-y-6">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: page.title }]} />

            <div>
              <span
                className={`inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm border-2 border-[#131b2e] shadow-[3px_3px_0px_#131b2e] ${page.badgeBgClass}`}
              >
                {page.badge}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl">
              {page.h1}
            </h1>

            <p className="font-sans text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {page.lead}
            </p>

            {/* Price & Timeline Strip + CTAs */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#D9480F] dark:text-[#F97316]">
                    <IndianRupee size={18} />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400">Starting Price</div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{page.priceFrom}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#006e27] dark:text-[#00fe66]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase text-slate-500 dark:text-slate-400">Typical Timeline</div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{page.timeline}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[46px] bg-[#00fe66] text-[#00280b] font-mono text-xs sm:text-sm uppercase font-bold px-5 py-3 rounded-xl shadow-[3px_3px_0px_#00280b] hover:translate-y-[-1px] transition-all"
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  <span>WhatsApp Us</span>
                  <ArrowUpRight size={15} strokeWidth={2} />
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phones[0].tel}`}
                  className="inline-flex items-center gap-2 min-h-[46px] bg-[#ffe600] text-[#131b2e] font-mono text-xs sm:text-sm uppercase font-bold px-5 py-3 rounded-xl shadow-[3px_3px_0px_#131b2e] hover:translate-y-[-1px] transition-all"
                >
                  <Phone size={15} strokeWidth={2} />
                  <span>Call {SITE_CONFIG.phones[0].display}</span>
                </a>
              </div>
            </div>
          </header>

          {page.slug === '/website-development-mumbai' ? (
            <>
              {/* Who This Is For */}
              <section className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {page.whoItIsForTitle}
                  </h2>
                  <p className="font-sans text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                    Four kinds of businesses we build for most often. Find yours below.
                  </p>
                </div>
                <WebsiteWhoItIsFor />
              </section>

              {/* Practical Overview */}
              <section className="glass-panel p-6 sm:p-9 rounded-3xl space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Why {SITE_CONFIG.brandName} builds this differently
                </h2>
                <div className="space-y-4 font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {page.introParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Practical Overview */}
              <section className="glass-panel p-6 sm:p-9 rounded-3xl space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Why {SITE_CONFIG.brandName} builds this differently
                </h2>
                <div className="space-y-4 font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {page.introParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Who This Is For */}
              <section className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {page.whoItIsForTitle}
                  </h2>
                  <p className="font-sans text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                    Four kinds of businesses we build for most often. Find yours below.
                  </p>
                </div>

                <div className="who-grid">
                  {page.whoItIsFor.map((item, idx) => {
                    const variant = ['a', 'b', 'c', 'd'][idx % 4];
                    return (
                      <article
                        key={item.title}
                        className={`who-card ${variant}`}
                        onPointerMove={handleCardPointerMove}
                      >
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.detail}</p>
                        </div>
                        {item.chips && item.chips.length > 0 && (
                          <div className="who-chipbox">
                            {item.chipsLabel && <p className="who-lbl">{item.chipsLabel}</p>}
                            <div className="who-row">
                              {item.chips.map((chip) => (
                                <span
                                  key={chip.label}
                                  className={`who-pill ${chip.active ? 'on' : ''} ${chip.variant === 'wa' ? 'wa' : ''}`}
                                >
                                  {chip.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {/* What You Get */}
          <section className="glass-panel p-6 sm:p-9 rounded-3xl space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {page.whatYouGetTitle}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {page.whatYouGet.map((point) => (
                <li key={point} className="flex items-start gap-3 font-sans text-sm sm:text-base text-slate-700 dark:text-slate-200">
                  <CheckCircle2 size={18} className="text-[#006e27] dark:text-[#00fe66] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Process */}
          <section className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {page.processTitle}
            </h2>
            <ProcessStepsGrid
              steps={page.processSteps.map((st) => ({
                num: st.step,
                title: st.title,
                description: st.detail,
              }))}
            />
          </section>

          {/* Available Templates (Website Development Mumbai) */}
          {page.slug === '/website-development-mumbai' && <AvailableTemplates />}

          {/* Service-Specific FAQs */}
          {page.slug !== '/website-development-mumbai' && (
            <section className="space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-3">
                {page.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.question}
                      className={`rounded-2xl border transition-all ${
                        isOpen
                          ? 'border-[#D9480F]/50 dark:border-[#F97316]/50 bg-white/90 dark:bg-white/[0.08]'
                          : 'border-slate-200/70 dark:border-white/10 glass-card'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <span className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#D9480F]' : 'text-slate-500'}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Services & Internal Links */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Explore related services &amp; guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.relatedLinks.map((rel) => (
                <Link
                  key={rel.to}
                  to={rel.to}
                  className="glass-card p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-[#D9480F]/60 dark:hover:border-[#F97316]/60 group"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-[#D9480F] dark:group-hover:text-[#F97316]">
                      {rel.label}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {rel.description}
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-slate-400 group-hover:text-[#D9480F]" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

