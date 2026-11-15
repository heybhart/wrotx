import React from 'react';

const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.top}px`);
};

export const WebsiteWhoItIsFor: React.FC = () => {
  return (
    <div className="who-grid">
      {/* Card A: Local service businesses */}
      <article className="who-card a" onPointerMove={handlePointerMove}>
        <div>
          <h3>Local service businesses and clinics across Mumbai</h3>
          <p>
            Doctors, CA firms, salons, gyms and repair studios that want to show up on Google, list services clearly and take bookings on WhatsApp.
          </p>
        </div>
        <div className="who-chipbox">
          <p className="who-lbl">Book a slot today</p>
          <div className="who-row">
            <span className="who-pill">10:30 AM</span>
            <span className="who-pill on">11:00 AM</span>
            <span className="who-pill">11:30 AM</span>
            <span className="who-pill wa">Book on WhatsApp</span>
          </div>
        </div>
      </article>

      {/* Card B: Manufacturers & B2B traders */}
      <article className="who-card b" onPointerMove={handlePointerMove}>
        <div>
          <h3>Manufacturers, wholesalers and B2B traders</h3>
          <p>
            Businesses in MIDC, Andheri, Bhiwandi and Navi Mumbai that show product catalogues, ISO certificates and bulk enquiry forms.
          </p>
        </div>
        <div className="who-chipbox">
          <p className="who-lbl">Bulk enquiry</p>
          <div className="who-row">
            <span className="who-pill">Catalogue PDF</span>
            <span className="who-pill">ISO certificate</span>
            <span className="who-pill on">500 units</span>
          </div>
        </div>
      </article>

      {/* Card C: Real estate */}
      <article className="who-card c" onPointerMove={handlePointerMove}>
        <div>
          <h3>Real estate brokers and builders</h3>
          <p>
            Developers and advisory teams that need project microsites, floor-plan galleries, EMI tools and site-visit booking.
          </p>
        </div>
        <div className="who-chipbox who-mini">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="56" height="56" rx="4" />
            <path d="M4 30h26M30 4v26M30 44h30M44 30v30M30 30v14" />
          </svg>
          <div className="who-big">
            ₹41,200
            <small>EMI per month, sample</small>
          </div>
          <span className="who-pill on" style={{ marginLeft: 'auto' }}>
            Site visit
          </span>
        </div>
      </article>

      {/* Card D: Companies replacing slow template sites */}
      <article className="who-card d" onPointerMove={handlePointerMove}>
        <div>
          <h3>Companies replacing slow template sites</h3>
          <p>
            Owners tired of slow WordPress or Wix sites that fail mobile speed checks and waste paid ad clicks.
          </p>
        </div>
        <div className="who-chipbox">
          <div className="who-gauges">
            <div className="who-g">
              <div className="who-ring">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity=".15"
                    strokeWidth="7"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="62 163"
                  />
                </svg>
                <span>38</span>
              </div>
              <div>
                <b>Slow template site</b>
                Mobile score
              </div>
            </div>

            <div className="who-g">
              <div className="who-ring">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity=".15"
                    strokeWidth="7"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="155 163"
                  />
                </svg>
                <span>95</span>
              </div>
              <div>
                <b>Custom-built site</b>
                Mobile score
              </div>
            </div>
          </div>
          <p className="who-cap">Example scores for illustration</p>
        </div>
      </article>
    </div>
  );
};

