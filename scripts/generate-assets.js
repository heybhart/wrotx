import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function main() {
  console.log('Generating SEO images...');

  // 1. Generate apple-touch-icon.png (180x180) from favicon.png
  const faviconPath = path.join(rootDir, 'public', 'favicon.png');
  const appleTouchPath = path.join(rootDir, 'public', 'apple-touch-icon.png');
  if (fs.existsSync(faviconPath)) {
    await sharp(faviconPath)
      .resize(180, 180, { fit: 'contain', background: { r: 9, g: 13, b: 22, alpha: 1 } })
      .toFile(appleTouchPath);
    console.log('✓ Generated apple-touch-icon.png (180x180)');
  }

  // 2. Convert website.png to website.webp and software.png to software.webp
  const assetsDir = path.join(rootDir, 'src', 'assets');
  const websitePng = path.join(assetsDir, 'website.png');
  const websiteWebp = path.join(assetsDir, 'website.webp');
  if (fs.existsSync(websitePng)) {
    await sharp(websitePng).webp({ quality: 85 }).toFile(websiteWebp);
    console.log('✓ Converted website.png -> website.webp');
  }

  const softwarePng = path.join(assetsDir, 'software.png');
  const softwareWebp = path.join(assetsDir, 'software.webp');
  if (fs.existsSync(softwarePng)) {
    await sharp(softwarePng).webp({ quality: 85 }).toFile(softwareWebp);
    console.log('✓ Converted software.png -> software.webp');
  }

  // Convert logo.png to logo.webp in src/assets
  const logoPng = path.join(assetsDir, 'logo.png');
  const logoWebp = path.join(assetsDir, 'logo.webp');
  if (fs.existsSync(logoPng)) {
    await sharp(logoPng).webp({ quality: 90 }).toFile(logoWebp);
    console.log('✓ Converted logo.png -> logo.webp');
  }

  // 3. Generate OG image (1200x630) in public/og-image.png
  // Prepare resized logo buffer
  const logoResizedBuffer = await sharp(logoPng)
    .resize(240, 60, { fit: 'inside' })
    .toBuffer();

  const svgOverlay = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="0.8" cy="0.2" r="0.6">
          <stop offset="0%" stop-color="#D9480F" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#090D16" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="0.15" cy="0.85" r="0.6">
          <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#090D16" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="yellowPill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffe600"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="#090D16"/>
      <rect width="1200" height="630" fill="url(#glow1)"/>
      <rect width="1200" height="630" fill="url(#glow2)"/>

      <!-- Border frame -->
      <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#222b3d" stroke-width="2"/>

      <!-- Category Pill -->
      <g transform="translate(80, 80)">
        <rect width="320" height="38" rx="6" fill="#ffe600"/>
        <text x="16" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900" fill="#131b2e" letter-spacing="1.5">MUMBAI SOFTWARE &amp; AI STUDIO</text>
      </g>

      <!-- Main Headline -->
      <text x="80" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="800" fill="#ffffff" letter-spacing="-1">
        GET MORE CUSTOMERS ONLINE.
      </text>
      <g transform="translate(80, 245)">
        <rect width="640" height="68" rx="6" fill="#D9480F"/>
        <text x="18" y="50" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="48" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
          DO LESS MANUAL WORK.
        </text>
      </g>

      <!-- Subtext -->
      <text x="80" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500" fill="#cbd5e1">
        Fast Websites from ₹24,999 • Custom Software • AI Calling Agents &amp; WhatsApp Bots
      </text>
      <text x="80" y="420" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94a3b8">
        100% Code Handover • 60 Days Free Support • GST Tax Invoices
      </text>

      <!-- Footer Info -->
      <line x1="80" y1="480" x2="1120" y2="480" stroke="#334155" stroke-width="1.5"/>

      <text x="80" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#00f0ff">
        https://wrotx.in
      </text>
      <text x="320" y="535" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500" fill="#94a3b8">
        |   Mumbai, Maharashtra, India   |   work@wrotx.in
      </text>
    </svg>
  `;

  const ogImagePath = path.join(rootDir, 'public', 'og-image.png');
  await sharp(Buffer.from(svgOverlay))
    .composite([
      {
        input: logoResizedBuffer,
        top: 75,
        left: 880,
      }
    ])
    .png({ quality: 90 })
    .toFile(ogImagePath);

  console.log('✓ Generated public/og-image.png (1200x630)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
