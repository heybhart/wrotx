import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/site';

interface Review {
  n: string;
  r: string;
  t: string;
  k: string;
  c: string;
  i: string;
  p?: string;
}

const REVIEWS: Review[] = [
  { n: 'Rahul Mehta', r: 'Real estate broker, Vasai', t: 'Website ek hafte mein ready ho gayi. Ab har enquiry seedha WhatsApp par aati hai.', k: 'Website', c: '#6366f1', i: 'RM' },
  { n: 'Priya Nair', r: 'CA firm, Andheri', t: 'Pehle sab Excel mein likhte the. Ab GST invoice ek click mein ban jaata hai.', k: 'Software', c: '#0d9488', i: 'PN' },
  { n: 'Amit Shah', r: 'Distributor, Bhiwandi', t: 'Har Friday demo dikhaya, toh koi surprise nahi mila. Price bhi wahi raha jo bola tha.', k: 'Software', c: '#d97706', i: 'AS' },
  { n: 'Sneha Kulkarni', r: 'Property advisor, Pune', t: 'AI assistant raat ko bhi customers ko reply kar deta hai. Site visit booking aasaan ho gayi.', k: 'AI agent', c: '#16a34a', i: 'SK' },
  { n: 'Vikram Singh', r: 'Manufacturer, Navi Mumbai', t: 'Dealers ab portal par order daalte hain. Phone calls kaafi kam ho gaye.', k: 'Software', c: '#ea580c', i: 'VS' },
  { n: 'Farah Khan', r: 'Boutique owner, Bandra', t: 'Simple language mein samjhaya, no jargon. Launch ke baad support bhi free mila.', k: 'Website', c: '#db2777', i: 'FK' },
  { n: 'Karan Patel', r: 'Clinic owner, Thane', t: 'Mobile par site bahut fast khulti hai. Ab patients seedha WhatsApp par appointment lete hain.', k: 'Website', c: '#2563eb', i: 'KP' },
  { n: 'Meera Iyer', r: 'Travel agency, Mumbai', t: 'Code aur logins sab hamare paas hain. Yeh baat sabse zyada pasand aayi.', k: 'Website', c: '#7c3aed', i: 'MI' },
  { n: 'Sandeep Joshi', r: 'Wholesaler, Vashi', t: 'Tally export seedha ho jaata hai. Accountant bhi khush hai.', k: 'Automation', c: '#0891b2', i: 'SJ' },
  { n: 'Neha Verma', r: 'Salon owner, Andheri', t: 'Quote se pehle poori baat clear ki. Engineers se seedha baat hui, koi middleman nahi.', k: 'AI agent', c: '#c026d3', i: 'NV' }
];

const ReviewCard: React.FC<{ item: Review }> = ({ item }) => (
  <article
    className="wt-card"
    style={{ ['--c' as string]: item.c }}
  >
    <div className="wt-who">
      {item.p ? (
        <img
          src={item.p}
          alt={item.n}
          width={42}
          height={42}
          loading="lazy"
          className="wt-av"
        />
      ) : (
        <span className="wt-av" aria-hidden="true">
          {item.i}
        </span>
      )}
      <div>
        <span className="wt-n">{item.n}</span>
        <span className="wt-r">{item.r}</span>
      </div>
    </div>
    <p className="wt-t">{item.t}</p>
    <span className="wt-k">{item.k}</span>
  </article>
);

export const Testimonials: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const colA = REVIEWS.slice(0, 5);
  const colB = REVIEWS.slice(5);

  return (
    <section className={`wt hairline-b ${isPaused ? 'wt-paused' : ''}`} id="reviews" aria-labelledby="wt-h">
      <div className="wt-in">
        <div>
          <span className="wt-lab">Client reviews</span>
          <h2 id="wt-h">What our clients say</h2>
          <p className="wt-p">Straight talk from business owners we have built for. No jargon and no surprises.</p>
          <div className="wt-stats">
            <div>
              <b>{SITE_CONFIG.support.days} days</b>
              <span>Free support after launch</span>
            </div>
            <div>
              <b>100%</b>
              <span>Code and data are yours</span>
            </div>
          </div>
          <button
            className="wt-pause"
            type="button"
            aria-pressed={isPaused}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? 'Resume scrolling' : 'Pause scrolling'}
          </button>
        </div>

        <div className="wt-cols" role="region" aria-label="Client reviews">
          {/* Column A: Scrolls downward */}
          <div className="wt-col d">
            <div className="wt-run">
              <div className="wt-set">
                {colA.map((rev) => (
                  <ReviewCard key={rev.n} item={rev} />
                ))}
              </div>
              <div className="wt-set" aria-hidden="true">
                {colA.map((rev) => (
                  <ReviewCard key={`dup-${rev.n}`} item={rev} />
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Scrolls upward */}
          <div className="wt-col">
            <div className="wt-run">
              <div className="wt-set">
                {colB.map((rev) => (
                  <ReviewCard key={rev.n} item={rev} />
                ))}
              </div>
              <div className="wt-set" aria-hidden="true">
                {colB.map((rev) => (
                  <ReviewCard key={`dup-${rev.n}`} item={rev} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
