import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distSsrDir = path.join(rootDir, 'dist-ssr');
const ssrEntryFile = path.join(distSsrDir, 'entry-ssr.js');

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
        },
      },
    },
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    // We include react plugin and tailwindcss for JSX and styles
    plugins: [
      (await import('@vitejs/plugin-react')).default(),
      (await import('@tailwindcss/vite')).default(),
    ],
  });

  // 2. Import the built SSR bundle
  const moduleUrl = pathToFileURL(ssrEntryFile).href;
  const { default: App } = await import(moduleUrl);

  // 3. Render <App /> to HTML string
  const renderedAppHtml = renderToString(React.createElement(App));

  // 4. Inject rendered HTML into dist/index.html
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`dist/index.html not found at ${indexPath}. Run vite build first.`);
  }

  let indexHtml = fs.readFileSync(indexPath, 'utf-8');
  indexHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedAppHtml}</div>`
  );

  fs.writeFileSync(indexPath, indexHtml, 'utf-8');
  console.log('✓ Successfully pre-rendered full semantic HTML into dist/index.html');

  // 5. Cleanup temporary SSR build folder
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch (err) {
    // Ignore cleanup error
  }
}

prerender().catch((err) => {
  console.error('Pre-rendering error:', err);
  process.exit(1);
});
