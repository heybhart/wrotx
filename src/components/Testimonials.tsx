import React from 'react';
import { SITE_CONFIG } from '../config/site';

export const Testimonials: React.FC = () => {
  return (
    <section className="wt hairline-b" id="reviews" aria-labelledby="wt-h">
      <div className="wt-in">
        {/* Left Column: Heading, Subtitle & Stats (Preserved unchanged) */}
        <div>
          <span className="wt-lab">Client reviews</span>
          <h2 id="wt-h">What our clients say</h2>
          <p className="wt-p">
            Straight talk from business owners we have built for. No jargon and no surprises.
          </p>
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
        </div>

        {/* Right Column: Redesigned 2-Column Cards Grid */}
        <div className="rc-col2" role="region" aria-label="Client review highlights">
          {/* Column 1 */}
          <div className="rc-col">
            {/* WhatsApp Chat Card */}
            <article className="rc-card">
              <div className="rc-who">
                <div
                  className="rc-av"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  aria-hidden="true"
                >
                  RM
                </div>
                <div>
                  <b>Rahul Mehta</b>
                  <small>Real estate broker, Vasai</small>
                </div>
              </div>

              <div className="rc-chat">
                <span className="rc-dt">Thu, 20 Nov</span>
                <div className="rc-b rc-in">
                  Bhai site mast bani hai 👌 phone pe bhi ekdum smooth
                  <time>9:12 pm</time>
                </div>
                <div className="rc-b rc-in">
                  Kal hi 2 enquiry aayi WhatsApp pe, ek ne to visit bhi fix kar li
                  <time>9:13 pm</time>
                </div>
                <div className="rc-b rc-out">
                  Great sir! Listing photos bhej do toh aur add kar dete hain
                  <time>
                    9:20 pm <i aria-hidden="true">✓✓</i>
                  </time>
                </div>
              </div>

              <div className="rc-pj">Real estate website · live in 6 days</div>
            </article>

            {/* Client Review Card */}
            <article className="rc-card">
              <div className="rc-who">
                <div
                  className="rc-av"
                  style={{ background: 'linear-gradient(135deg, #0ea5a4, #34d399)' }}
                  aria-hidden="true"
                >
                  KR
                </div>
                <div>
                  <b>Dr. Kavita Rao</b>
                  <small>Dental clinic, Thane</small>
                </div>
              </div>

              <div className="rc-vn">
                <p className="rc-tr !mt-0">
                  "Pehle receptionist din bhar phone uthati thi, ab appointment seedha calendar mein aa jaata hai. Ek-do baar agent ne naam galat bola, woh bas theek kar do."
                </p>
              </div>

              <div className="rc-pj">AI calling agent</div>
            </article>
          </div>

          {/* Column 2 */}
          <div className="rc-col">
            {/* Plain Quote */}
            <div className="rc-q">
              <p>
                "Pehle sab Excel mein likhte the. Ab <mark>GST invoice ek click mein</mark> ban jaata hai."
              </p>
              <small>
                <b className="font-semibold text-slate-900 dark:text-slate-100">Priya Nair</b> · CA firm, Andheri
              </small>
              <small className="text-slate-500 dark:text-slate-400 mt-0.5">GST billing portal</small>
            </div>

            {/* Google Style Review */}
            <article className="rc-card">
              <div className="rc-who">
                <div
                  className="rc-av"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb7185)' }}
                  aria-hidden="true"
                >
                  SM
                </div>
                <div>
                  <b>Sneha M.</b>
                  <small>3 weeks ago</small>
                </div>
              </div>

              <div className="rc-gr">
                <div className="rc-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>
                  Price and timeline were told upfront and they stuck to both. I saw the preview on my phone within 3 days. Only wish the logo options had come a bit earlier.
                </p>
              </div>

              <div className="rc-pj">Travel agency website</div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
