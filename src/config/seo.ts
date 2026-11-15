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

export function getBreadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function getFaqSchema(id: string, faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
            url: `${domain}/website-development-mumbai`,
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
            url: `${domain}/custom-software-development`,
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
            url: `${domain}/whatsapp-automation`,
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
            url: `${domain}/ai-calling-agents`,
          },
        },
      ],
    },
    getFaqSchema(`${domain}/#faq`, HOME_FAQS_DATA),
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
  schemas: [
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Our Work', path: '/work' },
    ]),
  ],
};

export const ABOUT_META: RouteSeoMeta = {
  path: '/about',
  title: `About ${SITE_CONFIG.brandName} | Mumbai Engineering Studio`,
  description: `Meet the Mumbai engineering team behind ${SITE_CONFIG.brandName}. Direct engineer access, 100% source code ownership, and ${SITE_CONFIG.support.days}-day free support.`,
  ogType: 'website',
  schemas: [
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ],
};

export const PRICING_META: RouteSeoMeta = {
  path: '/pricing',
  title: `Pricing & Timelines | ${SITE_CONFIG.brandName} Mumbai`,
  description: `Websites from ${SITE_CONFIG.prices.websites.formatted}, software from ${SITE_CONFIG.prices.software.formatted}, WhatsApp AI from ${SITE_CONFIG.prices.aiAssistants.formatted}, calling agents from ${SITE_CONFIG.prices.aiCalling.formatted}.`,
  ogType: 'website',
  schemas: [
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  ],
};

export const CONTACT_META: RouteSeoMeta = {
  path: '/contact',
  title: `Contact ${SITE_CONFIG.brandName} | Talk to a Mumbai Engineer`,
  description: `Request a fixed project quote from ${SITE_CONFIG.brandName} in Mumbai. Reach us via form, WhatsApp, phone, or email for websites, software, and AI.`,
  ogType: 'website',
  schemas: [
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ],
};

export const BLOG_META: RouteSeoMeta = {
  path: '/blog',
  title: `Blog & Guides for Indian Businesses | ${SITE_CONFIG.brandName}`,
  description: `Practical guides on website pricing in India, WhatsApp automation API rules, and custom software ownership from ${SITE_CONFIG.brandName}.`,
  ogType: 'website',
  schemas: [
    getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ],
};

export function getServicePageMeta(page: ServicePageData): RouteSeoMeta {
  const { domain, brandName } = SITE_CONFIG;
  const canonicalUrl = getCanonicalUrl(page.slug);
  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: page.title,
    serviceType: page.title,
    url: canonicalUrl,
    description: page.metaDescription,
    provider: {
      '@type': 'Organization',
      '@id': `${domain}/#organization`,
      name: brandName,
      url: `${domain}/`,
    },
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'Country', name: 'India' },
    ],
    ...(page.priceAmount !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: String(page.priceAmount),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
          },
        }
      : {}),
  };

  return {
    path: page.slug,
    title: page.metaTitle,
    description: page.metaDescription,
    ogType: 'website',
    schemas: [
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: page.title, path: page.slug },
      ]),
      serviceSchema,
      ...(page.slug !== '/website-development-mumbai' && page.faqs && page.faqs.length > 0
        ? [getFaqSchema(`${canonicalUrl}#faq`, page.faqs)]
        : []),
    ],
  };
}

export function getBlogPostMeta(post: BlogPost): RouteSeoMeta {
  const { domain, brandName } = SITE_CONFIG;
  const canonicalUrl = getCanonicalUrl(post.path);
  return {
    path: post.path,
    title: post.metaTitle,
    description: post.metaDescription,
    ogType: 'article',
    schemas: [
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: post.path },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        image: `${domain}/og-image.png`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: 'en-IN',
        author: {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
          name: post.author,
          url: `${domain}/about`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
          name: brandName,
          url: `${domain}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${domain}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
    ],
  };
}

export function getCaseStudyMeta(slug: string): RouteSeoMeta {
  const isDemo = slug === 'sample-case-study' || slug === 'real-estate-brokerage-portal';
  return {
    path: `/work/${slug}`,
    title: isDemo ? `Real estate brokerage portal | ${SITE_CONFIG.brandName} case study` : `Case Study Template | ${SITE_CONFIG.brandName}`,
    description: isDemo
      ? `A fast property website for a Vasai-Virar broker with listings, an EMI calculator and WhatsApp enquiries. A ${SITE_CONFIG.brandName} demo build.`
      : `Case study on ${SITE_CONFIG.brandName}.`,
    ogType: 'website',
    robots: 'noindex, nofollow',
    schemas: [
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Our Work', path: '/work' },
        { name: isDemo ? 'Real estate brokerage portal' : slug, path: `/work/${slug}` },
      ]),
    ],
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
