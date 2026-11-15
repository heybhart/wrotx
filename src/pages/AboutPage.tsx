import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, Users, ArrowUpRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { ABOUT_META } from '../config/seo';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  return (
    <>
      <PageHead meta={ABOUT_META} />
      <article className="pt-32 sm:pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
          <header className="space-y-4">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
            <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#00f0ff] text-[#003840] border-2 border-[#131b2e] shadow-[3px_3px_0px_#131b2e]">
              ABOUT {SITE_CONFIG.brandName}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              An Engineering-First Studio in Mumbai
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              {SITE_CONFIG.brandName} builds websites, custom business software, WhatsApp automation, and AI voice agents for companies across Mumbai and India, with transparent pricing and direct access to the engineers building your product.
            </p>
          </header>

          <section className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Who is behind {SITE_CONFIG.brandName}
            </h2>
            <p className="font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              We started {SITE_CONFIG.brandName} in {SITE_CONFIG.location} to fix a common problem for Indian SMBs: agencies charging high retainers for slow template websites, or disappearing after handover while keeping clients locked into proprietary accounts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="font-mono text-xs text-[#D9480F] dark:text-[#F97316] font-bold uppercase">Leadership &amp; Engineering</div>
                <p className="font-sans text-sm text-slate-700 dark:text-slate-300">
                  [TODO: Add founder / lead engineer name(s), roles, background, and verified headshot photo(s)]
                </p>
              </div>
              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="font-mono text-xs text-[#D9480F] dark:text-[#F97316] font-bold uppercase">Service Area</div>
                <p className="font-sans text-sm text-slate-700 dark:text-slate-300">
                  Operating from {SITE_CONFIG.location}, working with businesses across Mumbai, Thane, Navi Mumbai, and remote clients throughout India.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <Users size={22} className="text-[#D9480F] dark:text-[#F97316]" />
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Talk directly to builders</h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No layers of non-technical account managers. You plan scope and review weekly builds directly with the engineers writing your code.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <Code size={22} className="text-[#D9480F] dark:text-[#F97316]" />
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">You own everything</h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Full source code, repository access, domain, and cloud hosting stay in your company’s name. Zero recurring software license fees from us.
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <ShieldCheck size={22} className="text-[#D9480F] dark:text-[#F97316]" />
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">{SITE_CONFIG.support.days} days free support</h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Every launch includes {SITE_CONFIG.support.label}, team walkthrough training, and official GST tax invoices.
              </p>
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-[#ffe600] text-[#131b2e] font-mono text-xs uppercase font-bold px-5 py-3 rounded-xl shadow-[3px_3px_0px_#131b2e]"
            >
              <span>View Transparent Pricing</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 glass-card px-5 py-3 rounded-xl font-mono text-xs uppercase font-bold text-slate-900 dark:text-white"
            >
              <span>Talk to an Engineer</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

