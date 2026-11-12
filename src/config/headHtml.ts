import { SITE_CONFIG, getHomeMetaDescription } from './site';
import { HOME_FAQS_DATA } from '../data/faqsData';

const escapeHtml = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildHomeHeadHtml(): string {
  const { domain, brandName, legalName, email, phones, sameAs, prices } = SITE_CONFIG;
  const title = `${brandName} | Website, Software & AI Agent Development in Mumbai`;
  const description = getHomeMetaDescription();
  const canonicalUrl = `${domain}/`;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${domain}/#organization`,
    name: brandName,
    legalName,
    url: canonicalUrl,
    logo: `${domain}/logo.png`,
    image: `${domain}/og-image.png`,
    description,
    email,
    telephone: phones.map((p) => p.schema),
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'Country', name: 'India' },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, NEFT, RTGS, Credit Card, Razorpay',
    openingHours: 'Mo-Sa 09:00-20:00',
    sameAs,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    url: canonicalUrl,
    name: brandName,
    description: `Mumbai studio building websites, custom software & AI agents for Indian businesses.`,
    publisher: { '@id': `${domain}/#organization` },
    inLanguage: 'en-IN',
  };

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${domain}/#service-websites`,
        name: 'Website Design & Development',
        serviceType: 'Web Development',
        provider: { '@id': `${domain}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        description: `Fast business websites built for mobile, with WhatsApp integration, SEO, and full code handover. Delivered in ${prices.websites.timeline}.`,
        offers: {
          '@type': 'Offer',
          price: String(prices.websites.amount),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${domain}/#services`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${domain}/#service-software`,
        name: 'Custom Software & Web Application Development',
        serviceType: 'Software Development',
        provider: { '@id': `${domain}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        description: `Tailored software systems, CRM workflows, and GST invoice portals with zero monthly licensing fees. Delivered in ${prices.software.timeline}.`,
        offers: {
          '@type': 'Offer',
          price: String(prices.software.amount),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${domain}/#services`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${domain}/#service-ai`,
        name: 'AI Assistants & WhatsApp Automation',
        serviceType: 'AI Automation',
        provider: { '@id': `${domain}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        description: `24/7 WhatsApp conversational bots and AI assistants supporting English and Hindi. Delivered in ${prices.aiAssistants.timeline}.`,
        offers: {
          '@type': 'Offer',
          price: String(prices.aiAssistants.amount),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${domain}/#services`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${domain}/#service-ai-calling`,
        name: 'AI Calling Agents',
        serviceType: 'AI Voice Automation',
        provider: { '@id': `${domain}/#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        description: `24/7 Hindi, Hinglish, and English voice calling agents that qualify leads and book appointments. Delivered in ${prices.aiCalling.timeline}.`,
        offers: {
          '@type': 'Offer',
          price: String(prices.aiCalling.amount),
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${domain}/#services`,
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${domain}/#faq`,
    mainEntity: HOME_FAQS_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="${escapeHtml(brandName)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#FFFFFF" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(brandName)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${domain}/og-image.png" />
    <meta property="og:image:secure_url" content="${domain}/og-image.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(brandName)} - Website, Software &amp; AI Agent Development Studio in Mumbai" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${domain}/og-image.png" />
    <meta name="twitter:image:alt" content="${escapeHtml(brandName)} - Website, Software &amp; AI Agent Development Studio in Mumbai" />
    <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(servicesSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
  `.trim();
}
