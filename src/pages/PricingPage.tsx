import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { PRICING_META } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';

export const PricingPage: React.FC = () => {
  const { prices, support, brandName } = SITE_CONFIG;
  const lastUpdated = '12 November 2026';

  const plans = [
    {
      name: prices.websites.name,
      price: prices.websites.fromLabel,
      timeline: prices.websites.timelineLabel,
      to: '/website-development-mumbai',
      summary: 'Fast mobile-first business websites designed to bring enquiries on Google and WhatsApp.',
      items: ['Responsive mobile-first design', 'WhatsApp & direct call buttons', 'Technical SEO & schema markup', '100% source code & domain ownership'],
    },
    {
      name: prices.software.name,
      price: prices.software.fromLabel,
      timeline: prices.software.timelineLabel,
      to: '/custom-software-development',
      summary: 'Custom CRMs, internal portals, and GST billing software with zero per-user monthly fees.',
      items: ['Role-based staff permissions', 'GST invoicing & PDF quotes', 'Tally & Excel/CSV exports', 'Hosted on your own cloud account'],
    },
    {
      name: prices.aiAssistants.name,
      price: prices.aiAssistants.fromLabel,
      timeline: prices.aiAssistants.timelineLabel,
      to: '/whatsapp-automation',
      summary: '24/7 AI chat assistants and official WhatsApp bots trained on your prices and services.',
      items: ['English, Hindi & Hinglish replies', 'Instant lead capture to CRM/Sheets', 'Appointment booking integration', 'Seamless human handoff'],
    },
    {
      name: prices.aiCalling.name,
      price: prices.aiCalling.fromLabel,
      timeline: prices.aiCalling.timelineLabel,
      to: '/ai-calling-agents',
      summary: 'Natural Indian-accent voice agents answering inbound calls and qualifying leads automatically.',
      items: ['Hindi & Indian English speech', 'Works with Indian telephony', 'Live transfer to your team', 'WhatsApp summary of every call'],
    },
    {
      name: prices.automation.name,
      price: prices.automation.formatted,
      timeline: prices.automation.timelineLabel,
      to: '/contact',
      summary: 'Tailored workflow automation linking Razorpay, UPI alerts, spreadsheets, and internal tools.',
      items: ['Automated payment reminders', 'UPI & invoice status matching', 'Team alerts on WhatsApp/Email', 'Scoped clearly before starting'],
    },
  ];

  return (
    <>
      <PageHead meta={PRICING_META} />
      <article className="pt-32 sm:pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-10">
          <header className="space-y-4">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]} />
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-[#131b2e] border-2 border-[#131b2e] shadow-[3px_3px_0px_#131b2e]">
                TRANSPARENT PRICING
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Last updated: <time dateTime="2026-11-12">{lastUpdated}</time>
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Clear Starting Prices &amp; Timelines
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Fixed quotes agreed upfront. Every project includes {support.label}, official GST invoices, and 100% source code ownership.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <section key={plan.name} className="glass-panel p-6 rounded-3xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h2>
                    <span className="font-mono text-[11px] uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 shrink-0">
                      {plan.timeline}
                    </span>
                  </div>
                  <div className="font-display text-3xl font-bold text-[#D9480F] dark:text-[#F97316]">
                    {plan.price}
                  </div>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.summary}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 size={16} className="text-[#006e27] dark:text-[#00fe66] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={plan.to}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#ffe600] text-[#131b2e] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-xl shadow-[2px_2px_0px_#131b2e] hover:translate-y-[-1px] transition-all"
                >
                  <span>Explore {plan.name}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </section>
            ))}
          </div>

          <section className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Need an exact quote for your business?
              </h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300">
                Milestone payments accepted via UPI, NEFT, RTGS, Razorpay, and bank transfer with GST invoice.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={getWhatsappUrl(`Hi ${brandName}! Please send an exact quote for my project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] bg-[#00fe66] text-[#00280b] font-mono text-xs uppercase font-bold px-5 py-3 rounded-xl shadow-[2px_2px_0px_#00280b]"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Quote</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 min-h-[44px] glass-card px-5 py-3 rounded-xl font-mono text-xs uppercase font-bold text-slate-900 dark:text-white"
              >
                <span>Open Contact Form</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

