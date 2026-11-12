import { SITE_CONFIG } from './site';

export interface SitemapRoute {
  path: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
}

export function getCanonicalUrl(routePath: string): string {
  const clean = routePath === '/' ? '/' : `/${routePath.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_CONFIG.domain}${clean}`;
}

export const INDEXABLE_ROUTES: SitemapRoute[] = [
  {
    path: '/',
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'weekly',
    priority: '1.0',
  },
];
