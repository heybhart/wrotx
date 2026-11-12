import path from 'path';
import fs from 'fs';
import { Writable } from 'stream';
import { fileURLToPath, pathToFileURL } from 'url';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { build } from 'vite';
import { INDEXABLE_ROUTES, getCanonicalUrl } from '../src/config/routes';
import {
  ABOUT_META,
  BLOG_META,
  CONTACT_META,
  HOME_META,
  NOT_FOUND_META,
  PRICING_META,
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

function renderRouteHtml(App: React.ComponentType, routePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const stream = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    stream.on('finish', () => resolve(html));
    stream.on('error', reject);

    const { pipe } = renderToPipeableStream(
      React.createElement(StaticRouter, { location: routePath }, React.createElement(App)),
      {
        onAllReady() {
          pipe(stream);
        },
        onError(err) {
          reject(err);
        },
      }
    );
  });
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
    PRICING_META,
    CONTACT_META,
    BLOG_META,
    ...SERVICE_PAGE_LIST.map(getServicePageMeta),
    ...BLOG_POSTS.map(getBlogPostMeta),
    getCaseStudyMeta('sample-case-study'),
    NOT_FOUND_META,
  ];
  for (const meta of targets) {
    const renderedAppHtml = await renderRouteHtml(App, meta.path);
    const outHtml = templateHtml
      .replace('<!--SEO_HEAD-->', buildHeadHtml(meta))
      .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);
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
  console.log(`✓ Generated dist/sitemap.xml (${INDEXABLE_ROUTES.length} URLs)`);

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
