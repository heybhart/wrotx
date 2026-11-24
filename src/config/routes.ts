import { SITE_CONFIG } from './site';
import { SERVICE_PAGE_LIST } from '../data/servicePagesData';
import { BLOG_POSTS } from '../data/blogPostsData';

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

const TODAY = new Date().toISOString().slice(0, 10);

export const INDEXABLE_ROUTES: SitemapRoute[] = [
  { path: '/', lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
  ...SERVICE_PAGE_LIST.map((page) => ({
    path: page.slug,
    lastmod: TODAY,
    changefreq: 'weekly' as const,
    priority: '0.9',
  })),
  { path: '/portfolio', lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
  { path: '/work', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  { path: '/about', lastmod: TODAY, changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', lastmod: TODAY, changefreq: 'weekly', priority: '0.8' },
  ...BLOG_POSTS.map((post) => ({
    path: post.path,
    lastmod: post.updatedAt,
    changefreq: 'monthly' as const,
    priority: '0.7',
  })),
];
