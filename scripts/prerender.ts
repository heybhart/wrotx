import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { build } from 'vite';
import { INDEXABLE_ROUTES, getCanonicalUrl } from '../src/config/routes';
import {
  ABOUT_META,
  BLOG_META,
  CONTACT_META,
  HOME_META,
  NOT_FOUND_META,
  PORTFOLIO_META,
  WORK_META,
  buildHeadHtml,
  getBlogPostMeta,
  getCaseStudyMeta,
  getServicePageMeta,
  type RouteSeoMeta,
} from '../src/config/seo';
import { SERVICE_PAGE_LIST } from '../src/data/servicePagesData';
import { BLOG_POSTS } from '../src/data/blogPostsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distSsrDir = path.join(rootDir, 'dist-ssr');
const ssrEntryFile = path.join(distSsrDir, 'entry-ssr.js');

function renderRouteHtml(App: React.ComponentType, routePath: string): string {
  return renderToString(React.createElement(StaticRouter, { location: routePath }, React.createElement(App)));
}

function getFontPreloadLinks(): string {
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) return '';
  return fs
    .readdirSync(assetsDir)
    .filter((file) => file.endsWith('.woff2') && file.startsWith('bricolage-grotesque-latin-600-normal-'))
    .map(
      (file) =>
        `<link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`
    )
    .join('\n    ');
}

function getOutputPath(routePath: string): string {
  if (routePath === '/') return path.join(distDir, 'index.html');
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  return path.join(distDir, `${clean}.html`);
}

async function prerender() {
  console.log('⚡ Starting build-time pre-rendering...');

  // 1. Build an SSR bundle of App.tsx
  await build({
    configFile: false,
    root: rootDir,
    base: '/',
    build: {
      ssr: path.join(rootDir, 'src', 'App.tsx'),
      outDir: distSsrDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'entry-ssr.js',
          format: 'esm',
          inlineDynamicImports: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    plugins: [
      (await import('@vitejs/plugin-react')).default(),
      (await import('@tailwindcss/vite')).default(),
    ],
  });

  // 2. Import the built SSR bundle
  const moduleUrl = pathToFileURL(ssrEntryFile).href;
  const { default: App } = await import(moduleUrl);

  // 3. Load HTML shell template
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found at ${templatePath}. Run vite build first.`);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  // 4. Prerender every route with its unique head meta + schema
  const targets: RouteSeoMeta[] = [
    HOME_META,
    WORK_META,
    ABOUT_META,
    PORTFOLIO_META,
    CONTACT_META,
    BLOG_META,
    ...SERVICE_PAGE_LIST.map(getServicePageMeta),
    ...BLOG_POSTS.map(getBlogPostMeta),
    getCaseStudyMeta('sample-case-study'),
    NOT_FOUND_META,
  ];
  const fontPreloads = getFontPreloadLinks();
  // Prioritize stylesheet download ahead of modulepreload/scripts in <head>
  const cssLinkMatch = templateHtml.match(/<link rel="stylesheet"[^>]+>/);
  let orderedTemplateHtml = templateHtml;
  if (cssLinkMatch) {
    orderedTemplateHtml = templateHtml
      .replace(cssLinkMatch[0], '')
      .replace('<!--SEO_HEAD-->', `${cssLinkMatch[0]}\n    <!--SEO_HEAD-->`);
  }
  for (const meta of targets) {
    const renderedAppHtml = renderRouteHtml(App, meta.path);
    let outHtml = orderedTemplateHtml
      .replace('<!--SEO_HEAD-->', buildHeadHtml(meta))
      .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);
    if (fontPreloads) {
      outHtml = outHtml.replace('</head>', `    ${fontPreloads}\n  </head>`);
    }
    const outPath = getOutputPath(meta.path);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, outHtml, 'utf-8');
    console.log(`✓ Pre-rendered ${meta.path} -> ${path.relative(rootDir, outPath)}`);
  }

  // 5. Generate sitemap.xml automatically for all indexable routes
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_ROUTES.map(
  (r) => `  <url>
    <loc>${getCanonicalUrl(r.path)}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`✓ Generated dist/sitemap.xml and public/sitemap.xml (${INDEXABLE_ROUTES.length} URLs)`);

  // 6. Cleanup temporary SSR build folder
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup error
  }
}

prerender().catch((err) => {
  console.error('Pre-rendering error:', err);
  process.exit(1);
});
