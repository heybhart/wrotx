export const SITE_CONFIG = {
  domain: 'https://wrotx.in',
  brandName: 'WrotX',
  // [TODO: Replace with registered legal/trade name if applicable, otherwise keep "WrotX"]
  legalName: 'WrotX',
  location: 'Mumbai, Maharashtra, India',
  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'IN',
  // [TODO: Confirm if a different backend address is behind Cloudflare Email Obfuscation]
  email: 'work@wrotx.in',
  phones: [
    {
      display: '+91 9322208664',
      tel: '+919322208664',
      schema: '+91-9322208664',
      whatsapp: '919322208664',
    },
    {
      display: '+91 9967478623',
      tel: '+919967478623',
      schema: '+91-9967478623',
      whatsapp: '919967478623',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/wrotx',
    // [TODO: Add Instagram, GitHub, X, Clutch, GoodFirms, Google Business Profile URLs when available]
  ],
  prices: {
    websites: {
      name: 'Websites',
      amount: 6999,
      formatted: '₹6,999',
      rawDisplay: '₹ 6,999',
      fromLabel: 'From ₹6,999',
      timeline: '1 week',
      timelineLabel: '1 Week',
    },
    software: {
      name: 'Software & Apps',
      amount: 14999,
      formatted: '₹14,999',
      rawDisplay: '₹ 14,999',
      fromLabel: 'From ₹14,999',
      timeline: '2–3 weeks',
      timelineLabel: '2–3 weeks',
    },
    aiAssistants: {
      name: 'AI Assistants & WhatsApp Automation',
      amount: 14999,
      formatted: '₹14,999',
      rawDisplay: '₹ 14,999',
      fromLabel: 'From ₹14,999',
      timeline: '15–20 days',
      timelineLabel: '15–20 Days',
    },
    aiCalling: {
      name: 'AI Calling Agents',
      amount: 19999,
      formatted: '₹19,999',
      rawDisplay: '₹ 19,999',
      fromLabel: 'From ₹19,999',
      timeline: '15–20 days',
      timelineLabel: '15–20 Days',
    },
    automation: {
      name: 'Automation',
      amount: null,
      formatted: 'Custom quote',
      rawDisplay: 'Ask for a quote',
      fromLabel: 'Custom quote',
      timeline: 'Custom timeline',
      timelineLabel: 'Custom timeline',
    },
  },
  support: {
    days: 60,
    label: '60 days free post-launch support',
  },
  // [TODO: Replace with real GA4 Measurement ID (e.g. G-XXXXXXXXXX)]
  gaMeasurementId: '[TODO: G-XXXXXXX]',
} as const;

export function getWhatsappUrl(
  message = `Hi ${SITE_CONFIG.brandName}! We would like to get a free quote for our project.`
): string {
  return `https://wa.me/${SITE_CONFIG.phones[0].whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getHomeMetaDescription(): string {
  const { prices, support } = SITE_CONFIG;
  return `Mumbai studio building websites, custom software & AI agents for Indian businesses. Websites from ${prices.websites.formatted} in ${prices.websites.timeline}. ${support.days}-day support, you own everything.`;
}
