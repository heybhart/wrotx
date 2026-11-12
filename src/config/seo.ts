import { SITE_CONFIG, getHomeMetaDescription } from './site';
import { getCanonicalUrl } from './routes';
import { HOME_FAQS_DATA } from '../data/faqsData';
import type { ServicePageData } from '../data/servicePagesData';
import type { BlogPost } from '../data/blogPostsData';

export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  robots?: string;
  schemas?: Record<string, unknown>[];
}

const escapeHtml = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function getOrganizationSchema(): Record<string, unknown> {
  const { domain, brandName, legalName, email, phones, sameAs } = SITE_CONFIG;
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${domain}/#organization`,
    name: brandName,
    legalName,
    url: `${domain}/`,
    logo: `${domain}/logo.png`,
    image: `${domain}/og-image.png`,
    description: getHomeMetaDescription(),
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
}

export function getHomeSchemas(): Record<string, unknown>[] {
  const { domain, brandName, prices } = SITE_CONFIG;
  return [
    getOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${domain}/#website`,
      url: `${domain}/`,
      name: brandName,
      description: 'Mumbai studio building websites, custom software & AI agents for Indian businesses.',
      publisher: { '@id': `${domain}/#organization` },
      inLanguage: 'en-IN',
    },
    {
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
    },
    {
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
    },
  ];
}

export const HOME_META: RouteSeoMeta = {
  path: '/',
  title: `${SITE_CONFIG.brandName} | Website, Software & AI Agent Studio Mumbai`,
  description: getHomeMetaDescription(),
  ogType: 'website',
  schemas: getHomeSchemas(),
};

export const NOT_FOUND_META: RouteSeoMeta = {
  path: '/404',
  title: `Page Not Found | ${SITE_CONFIG.brandName}`,
  description: `The page you requested could not be found on ${SITE_CONFIG.brandName}. Explore our website, software, and AI development services.`,
  ogType: 'website',
  robots: 'noindex, nofollow',
};

export const WORK_META: RouteSeoMeta = {
  path: '/work',
  title: `Our Work & Live Demos | ${SITE_CONFIG.brandName} Mumbai`,
  description: `Live website, app, and AI agent projects built by ${SITE_CONFIG.brandName} in Mumbai for real estate, retail, and Indian service businesses.`,
  ogType: 'website',
};

export const ABOUT_META: RouteSeoMeta = {
  path: '/about',
  title: `About ${SITE_CONFIG.brandName} | Mumbai Engineering Studio`,
  description: `Meet the Mumbai engineering team behind ${SITE_CONFIG.brandName}. Direct engineer access, 100% source code ownership, and ${SITE_CONFIG.support.days}-day free support.`,
  ogType: 'website',
};

export const PRICING_META: RouteSeoMeta = {
  path: '/pricing',
  title: `Pricing & Timelines | ${SITE_CONFIG.brandName} Mumbai`,
  description: `Websites from ${SITE_CONFIG.prices.websites.formatted}, software from ${SITE_CONFIG.prices.software.formatted}, WhatsApp AI from ${SITE_CONFIG.prices.aiAssistants.formatted}, calling agents from ${SITE_CONFIG.prices.aiCalling.formatted}.`,
  ogType: 'website',
};

export const CONTACT_META: RouteSeoMeta = {
  path: '/contact',
  title: `Contact ${SITE_CONFIG.brandName} | Talk to a Mumbai Engineer`,
  description: `Request a fixed project quote from ${SITE_CONFIG.brandName} in Mumbai. Reach us via form, WhatsApp, phone, or email for websites, software, and AI.`,
  ogType: 'website',
};

export const BLOG_META: RouteSeoMeta = {
  path: '/blog',
  title: `Blog & Guides for Indian Businesses | ${SITE_CONFIG.brandName}`,
  description: `Practical guides on website pricing in India, WhatsApp automation API rules, and custom software ownership from ${SITE_CONFIG.brandName}.`,
  ogType: 'website',
};

export function getServicePageMeta(page: ServicePageData): RouteSeoMeta {
  return {
    path: page.slug,
    title: page.metaTitle,
    description: page.metaDescription,
    ogType: 'website',
  };
}

export function getBlogPostMeta(post: BlogPost): RouteSeoMeta {
  return {
    path: post.path,
    title: post.metaTitle,
    description: post.metaDescription,
    ogType: 'article',
  };
}

export function getCaseStudyMeta(slug: string): RouteSeoMeta {
  return {
    path: `/work/${slug}`,
    title: `Case Study Template | ${SITE_CONFIG.brandName}`,
    description: `Unpublished case study template on ${SITE_CONFIG.brandName}.`,
    ogType: 'website',
    robots: 'noindex, nofollow',
  };
}

export function buildHeadHtml(meta: RouteSeoMeta): string {
  const { domain, brandName } = SITE_CONFIG;
  const canonicalUrl = getCanonicalUrl(meta.path);
  const ogType = meta.ogType || 'website';
  const robots = meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const schemasHtml = (meta.schemas || [])
    .map((s) => `<script type="application/ld+json" data-seo-schema="true">${JSON.stringify(s)}</script>`)
    .join('\n    ');

  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="author" content="${escapeHtml(brandName)}" />
    <meta name="robots" content="${escapeHtml(robots)}" />
    <meta name="theme-color" content="#FFFFFF" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${escapeHtml(brandName)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${domain}/og-image.png" />
    <meta property="og:image:secure_url" content="${domain}/og-image.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${domain}/og-image.png" />
    <meta name="twitter:image:alt" content="${escapeHtml(meta.title)}" />
    ${schemasHtml}
  `.trim();
}
