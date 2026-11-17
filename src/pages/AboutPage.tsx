import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { ABOUT_META } from '../config/seo';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHead meta={ABOUT_META} />
      <article className="pt-32 sm:pt-36 pb-20 select-none">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-12">
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

          {/* Who is behind WrotX - Paper Pledge Design */}
          <section
            ref={sectionRef}
            className={`about-paper-block ${isInView ? 'in' : ''}`}
            id="about"
          >
            <div className="paper-wrap">
              <div className="left">
                <h2>
                  Who is behind <em>{SITE_CONFIG.brandName}</em>
                </h2>
                <p className="story">
                  We started {SITE_CONFIG.brandName} in Mumbai, Maharashtra, India to fix a common problem for Indian SMBs: agencies charging{' '}
                  <span className="x" style={{ '--d': '.3s' } as React.CSSProperties}>high retainers</span> for{' '}
                  <span className="x" style={{ '--d': '.7s' } as React.CSSProperties}>slow template websites</span>, or{' '}
                  <span className="x" style={{ '--d': '1.1s' } as React.CSSProperties}>disappearing after handover</span> while keeping clients{' '}
                  <span className="x" style={{ '--d': '1.5s' } as React.CSSProperties}>locked into proprietary accounts</span>.
                </p>
              </div>

              <div className="paper">
                <div className="paper-head">
                  <h3>Our promise to you</h3>
                  <div className="stamp">
                    Mumbai<br />India
                  </div>
                </div>

                <div className="clause">
                  <div className="tick">
                    <svg viewBox="0 0 36 36" aria-hidden="true">
                      <path d="M6 19l8 8L30 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>Talk directly to builders</h4>
                    <p>
                      No layers of non-technical account managers. You plan scope and review weekly builds directly with the engineers writing your code.
                    </p>
                  </div>
                </div>

                <div className="clause">
                  <div className="tick">
                    <svg viewBox="0 0 36 36" aria-hidden="true">
                      <path d="M6 19l8 8L30 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>You own everything</h4>
                    <p>
                      Full source code, repository access, domain, and cloud hosting stay in your company's name. Zero recurring licence fees.
                    </p>
                  </div>
                </div>

                <div className="clause">
                  <div className="tick">
                    <svg viewBox="0 0 36 36" aria-hidden="true">
                      <path d="M6 19l8 8L30 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>{SITE_CONFIG.support.days} days free support</h4>
                    <p>
                      Every launch includes {SITE_CONFIG.support.days} days free post-launch support, team walkthrough training, and official GST invoices.
                    </p>
                  </div>
                </div>

                <div className="sign">
                  <div>
                    <div className="sig">Bharat Chaudhary</div>
                    <div className="cap">
                      <b>Bharat Chaudhary</b>, Founder
                    </div>
                  </div>
                  <div>
                    <div className="sig">Rohan Kumawat</div>
                    <div className="cap">
                      <b>Rohan Kumawat</b>, Founder
                    </div>
                  </div>
                </div>

                <div className="paper-area">
                  <b>Service area.</b> Operating from Mumbai, Maharashtra, India, working with businesses across Mumbai, Thane, Navi Mumbai, and remote clients throughout India.
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap gap-3 pt-4">
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
              <span>Talk to Team</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};
