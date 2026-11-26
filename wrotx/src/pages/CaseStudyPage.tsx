import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { getCaseStudyMeta } from '../config/seo';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';

export const CaseStudyPage: React.FC = () => {
  const { slug = 'sample-case-study' } = useParams();

  const [price, setPrice] = useState(55); // in Lakhs
  const [years, setYears] = useState(20);

  const loan = price * 100000 * 0.8;
  const r = 0.085 / 12;
  const n = years * 12;
  const emi = Math.round(loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  const formattedEmi = emi.toLocaleString('en-IN');
  const loanLakhs = (price * 0.8).toFixed(0);

  const emiWhatsappMessage = `Hi, I am interested in a property priced ₹${price}L. My EMI estimate is ₹${formattedEmi} per month for ${years} years.`;
  const emiWhatsappUrl = getWhatsappUrl(emiWhatsappMessage);

  const ctaWhatsappUrl = getWhatsappUrl('Hi WrotX, I saw the real estate portal. I want something similar.');

  return (
    <>
      <PageHead meta={getCaseStudyMeta(slug)} />
      <article className="pt-32 sm:pt-36 pb-20 relative">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-12">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Our Work', to: '/work' },
              { label: 'Real estate brokerage portal' },
            ]}
          />

          {/* Hero Header */}
          <header className="space-y-4">
            <span className="cs-st">Demo build</span>
            <h1 className="cs-h1">Real estate brokerage portal</h1>
            <p className="cs-sum">
              A fast property website for a Vasai-Virar broker. Visitors browse homes, check their EMI and message the broker on WhatsApp, all from their phone.
            </p>
            <div className="cs-row">
              <a
                className="cs-btn"
                href="https://bigbroker-iota.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open live demo
              </a>
              <a className="cs-btn cs-btn-g" href="#try">
                Try the EMI calculator
              </a>
            </div>
          </header>

          {/* At a Glance */}
          <div className="cs-g cs-glance">
            <div>
              <small>Client type</small>
              <b>Real estate broker, Vasai-Virar</b>
            </div>
            <div>
              <small>What we built</small>
              <b>Website, EMI tool, WhatsApp enquiries</b>
            </div>
            <div>
              <small>Status</small>
              <b>Live demo</b>
            </div>
            <div>
              <small>Timeline</small>
              <b><span className="cs-cf">Confirm: build time</span></b>
            </div>
          </div>

          {/* The Brief */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">The brief</h2>
              <p className="cs-sub">Property buyers decide on their phone and ask on WhatsApp. A broker’s site should make both easy.</p>
            </div>
            <div className="cs-steps">
              <div className="cs-g cs-step">
                <b>1</b>
                <h3>Find a home</h3>
                <p>Clear listings that open fast on mobile data.</p>
              </div>
              <div className="cs-g cs-step">
                <b>2</b>
                <h3>Check the EMI</h3>
                <p>Buyers see a monthly figure before they call.</p>
              </div>
              <div className="cs-g cs-step">
                <b>3</b>
                <h3>Message the broker</h3>
                <p>One tap opens WhatsApp with the property already written in.</p>
              </div>
            </div>
          </section>

          {/* What We Built & Calculator */}
          <section id="try" className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">What we built</h2>
              <p className="cs-sub">Three tools that match how buyers actually behave. Try the calculator on the right.</p>
            </div>
            <div className="cs-two">
              <div className="space-y-0">
                <div className="cs-feat">
                  <i>1</i>
                  <div>
                    <b>Property listings</b>
                    <span>Clean cards with price, area and location, made to scan quickly on a phone.</span>
                  </div>
                </div>
                <div className="cs-feat">
                  <i>2</i>
                  <div>
                    <b>EMI calculator</b>
                    <span>Buyers move the price and loan period and see the monthly EMI instantly.</span>
                  </div>
                </div>
                <div className="cs-feat">
                  <i>3</i>
                  <div>
                    <b>WhatsApp enquiries</b>
                    <span>Every property has a button that opens WhatsApp with the details filled in.</span>
                  </div>
                </div>
              </div>

              {/* EMI Calculator */}
              <div className="cs-g cs-calc">
                <h3>Try the EMI calculator</h3>
                <p>A sample of the tool. 20% down payment and an 8.5% sample rate.</p>

                <div className="cs-fld">
                  <label htmlFor="price-range">
                    <span>Property price</span>
                    <span className="font-bold">₹{price}L</span>
                  </label>
                  <input
                    id="price-range"
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

                <div className="cs-fld">
                  <label htmlFor="years-range">
                    <span>Loan period</span>
                    <span className="font-bold">{years} years</span>
                  </label>
                  <input
                    id="years-range"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </div>

                <div className="cs-emi">
                  <small>Your EMI</small>
                  <b>₹{formattedEmi} per month</b>
                  <span>Loan amount ₹{loanLakhs}L</span>
                </div>

                <a
                  className="cs-wa"
                  href={emiWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask about this on WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Result */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Result</h2>
            <div className="cs-g cs-res">
              <p style={{ margin: 0, color: 'var(--mut)' }}>
                This is a demo build, so there are no client numbers yet. We would rather show you nothing than invent figures. When a broker goes live on it, the real results are added here.
              </p>
              <ul>
                <li>How many WhatsApp enquiries came from the website each week</li>
                <li>How the site scores on a mobile speed test</li>
                <li>How many visitors used the EMI calculator</li>
              </ul>
            </div>
          </section>

          {/* Built With */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Built with</h2>
            <div className="cs-chips">
              <span>Mobile-first website</span>
              <span>EMI calculator</span>
              <span>WhatsApp links</span>
              <span className="cs-cf">Confirm: framework and hosting</span>
            </div>
          </section>

          {/* Banner CTA */}
          <section>
            <div className="cs-g cs-band">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Want a site like this for your business?</h2>
              <p>Tell us what you sell and who your customers are. We reply with a plan and a price.</p>
              <div className="cs-row">
                <a
                  className="cs-btn"
                  href={ctaWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start a project
                </a>
                <a
                  className="cs-btn cs-btn-g"
                  href={`tel:${SITE_CONFIG.phones[0].tel}`}
                >
                  Call {SITE_CONFIG.phones[0].display}
                </a>
              </div>
            </div>
          </section>

          {/* More of our work */}
          <section className="cs-more space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">More of our work</h2>
            <a href="https://rohankkw.github.io/meena-properties/" target="_blank" rel="noopener noreferrer">
              <div>
                <b>Meena Properties and Advisory</b>
                <br />
                <span>Residential and commercial property showcase</span>
              </div>
              <em>View live demo</em>
            </a>
            <a href="https://triplio-topaz.vercel.app/" target="_blank" rel="noopener noreferrer">
              <div>
                <b>Luxury travel and tours</b>
                <br />
                <span>Tour packages and a booking scheduler</span>
              </div>
              <em>View live demo</em>
            </a>
            <a href="https://zivlynfashion.vercel.app/" target="_blank" rel="noopener noreferrer">
              <div>
                <b>Fashion and jewellery store</b>
                <br />
                <span>Product catalogue, search and checkout</span>
              </div>
              <em>View live demo</em>
            </a>
          </section>

          {/* Footnote and Back Link */}
          <div className="pt-4 space-y-4">
            <p className="cs-foot">Dashed “Confirm” tags mark facts only the WrotX team can fill in. Remove them before publishing.</p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#D9480F] dark:text-[#F97316] hover:underline"
            >
              <ArrowLeft size={15} />
              <span>Back to Our Work</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};
