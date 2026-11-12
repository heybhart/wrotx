import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';
import { getCanonicalUrl } from '../config/routes';
import type { RouteSeoMeta } from '../config/seo';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const PageHead: React.FC<{ meta: RouteSeoMeta }> = ({ meta }) => {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(meta.path);
    const robots =
      meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:type', meta.ogType || 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:image', `${SITE_CONFIG.domain}/og-image.png`);
    upsertMeta('property', 'og:image:alt', meta.title);
    upsertMeta('name', 'twitter:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', `${SITE_CONFIG.domain}/og-image.png`);
    upsertMeta('name', 'twitter:image:alt', meta.title);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Replace route JSON-LD blocks cleanly so stale schemas never linger across client navigations
    document.head.querySelectorAll('script[data-seo-schema="true"]').forEach((n) => n.remove());
    (meta.schemas || []).forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [meta]);

  return null;
};
