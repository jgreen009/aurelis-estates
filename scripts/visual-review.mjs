// Phase 6 manual visual review capture harness.
//
// Runs against `vite preview` on port 4173 (must already be running).
// Captures:
//  - Full-page screenshots at the 6 spec breakpoints
//  - Per-section shots at desktop
//  - Interaction states (property Modal open, Mobile menu open, cinematic frame)
//  - Reduced-motion desktop pass (emulates prefers-reduced-motion: reduce)
//  - Console + network error sweep (printed + written to docs/visual-review/log.txt)
//
// Run: npm run preview   (in another terminal)
//      node scripts/visual-review.mjs

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://localhost:4173/';
const OUT = 'docs/visual-review';
const SHOTS = path.join(OUT, 'shots');

const BREAKPOINTS = [
  { name: '1440x900',  width: 1440, height: 900  },
  { name: '1280x800',  width: 1280, height: 800  },
  { name: '1024x768',  width: 1024, height: 768  },
  { name: '768x1024',  width: 768,  height: 1024 },
  { name: '390x844',   width: 390,  height: 844  },
  { name: '360x800',   width: 360,  height: 800  },
];

const SECTIONS = [
  { id: 'home',          label: '01-hero' },
  { id: 'showcase',      label: '02-showcase' },
  { id: 'properties',    label: '03-properties' },
  { id: 'cinematic',     label: '04-cinematic' },
  { id: 'services',      label: '05-services' },
  { id: 'neighborhoods',label: '06-neighborhoods' },
  { id: 'map',           label: '07-map-fallback' },
  { id: 'calculator',    label: '08-calculator' },
  { id: 'expertise',     label: '09-expertise' },
  { id: 'testimonials',  label: '10-testimonials' },
  { id: 'contact',       label: '11-contact' },
  { id: 'final-cta',     label: '12-final-cta' },
  { id: 'footer',        label: '13-footer' },
];

function ts() {
  return new Date().toISOString();
}

async function capture(browser, viewport, name, fn) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const networkFails = [];
  page.on('console', (m) => consoleMessages.push({ type: m.type(), text: m.text() }));
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('requestfailed', (r) => networkFails.push({ url: r.url(), error: r.failure()?.errorText }));
  try {
    await fn(page);
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(SHOTS, name) + '.png', fullPage: true });
  } finally {
    await ctx.close();
  }
  return { consoleMessages, pageErrors, networkFails };
}

async function main() {
  await mkdir(SHOTS, { recursive: true });
  const log = [];

  const browser = await chromium.launch();
  log.push(`${ts()} browser launched`);

  // ---------------- Full-page at 6 breakpoints ----------------
  for (const bp of BREAKPOINTS) {
    const ctx = await browser.newContext({ viewport: { width: bp.width, height: bp.height }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const consoleMessages = [];
    const pageErrors = [];
    const networkFails = [];
    page.on('console', (m) => consoleMessages.push(`${m.type()}: ${m.text()}`));
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('requestfailed', (r) => networkFails.push(`${r.url()} -> ${r.failure()?.errorText}`));
    await page.goto(BASE, { waitUntil: 'load', timeout: 30_000 });
    // Let observers / ScrollTrigger settle; nudge to mid then back to top so
    // ScrollTrigger batch + SectionReveals register.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(SHOTS, `full-${bp.name}.png`), fullPage: true });
    log.push(`${ts()} FULL ${bp.name} captured`);
    writeErrors(log, `full-${bp.name}`, consoleMessages, pageErrors, networkFails);
    await ctx.close();
  }

  // ---------------- Per-section at desktop ----------------
  const desktop = { width: 1440, height: 900 };
  for (const s of SECTIONS) {
    const r = await capture(browser, desktop, `section-${s.label}`, async (page) => {
      await page.goto(BASE, { waitUntil: 'load' });
      const el = page.locator(`#${s.id}`);
      // If the section doesn't exist, fail loudly via the screenshot being the homepage
      if (await el.count() > 0) {
        await el.scrollIntoViewIfNeeded();
        // Wait for any GSAP reveal to land it in the "shown" state.
        await page.waitForTimeout(600);
      }
    });
    log.push(`${ts()} SECTION ${s.label} captured`);
    writeErrors(log, `section-${s.label}`, r.consoleMessages, r.pageErrors, r.networkFails);
  }

  // ---------------- Interaction states ----------------
  // Property Modal open (desktop)
  {
    const r = await capture(browser, desktop, `interact-modal-desktop`, async (page) => {
      await page.goto(BASE, { waitUntil: 'load' });
      await page.locator('#properties').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      // Open the first property card's hidden trigger button (sr-only "Open … details").
      await page.locator('button[aria-label*="details"]').first().click({ force: true });
      await page.waitForTimeout(900);
    });
    log.push(`${ts()} INTERACT modal-desktop captured`);
    writeErrors(log, `interact-modal-desktop`, r.consoleMessages, r.pageErrors, r.networkFails);
  }
  // Property Modal open (mobile)
  {
    const r = await capture(browser, { width: 390, height: 844 }, `interact-modal-mobile`, async (page) => {
      await page.goto(BASE, { waitUntil: 'load' });
      await page.locator('#properties').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.locator('button[aria-label*="details"]').first().click({ force: true });
      await page.waitForTimeout(900);
    });
    log.push(`${ts()} INTERACT modal-mobile captured`);
    writeErrors(log, `interact-modal-mobile`, r.consoleMessages, r.pageErrors, r.networkFails);
  }
  // Mobile menu open (mobile)
  {
    const r = await capture(browser, { width: 390, height: 844 }, `interact-mobile-menu`, async (page) => {
      await page.goto(BASE, { waitUntil: 'load' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.getByRole('button', { name: /open menu/i }).click({ force: true });
      await page.waitForTimeout(700);
    });
    log.push(`${ts()} INTERACT mobile-menu captured`);
    writeErrors(log, `interact-mobile-menu`, r.consoleMessages, r.pageErrors, r.networkFails);
  }
  // Cinematic frame (desktop, scrolled into view, mid-clip)
  {
    const r = await capture(browser, desktop, `interact-cinematic-desktop`, async (page) => {
      await page.goto(BASE, { waitUntil: 'load' });
      await page.locator('#cinematic').scrollIntoViewIfNeeded();
      await page.waitForTimeout(2500);
    });
    log.push(`${ts()} INTERACT cinematic-desktop captured`);
    writeErrors(log, `interact-cinematic-desktop`, r.consoleMessages, r.pageErrors, r.networkFails);
  }

  // ---------------- Reduced-motion pass ----------------
  for (const s of SECTIONS) {
    const ctx = await browser.newContext({
      viewport: desktop,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator(`#${s.id}`).scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(SHOTS, `reduce-${s.label}.png`), fullPage: false });
    log.push(`${ts()} REDUCE ${s.label} captured`);
    await ctx.close();
  }

  await browser.close();
  log.push(`${ts()} browser closed`);

  await writeFile(path.join(OUT, 'capture-log.txt'), log.join('\n') + '\n', 'utf8');
  console.log(log.join('\n'));
}

function writeErrors(log, label, consoleMessages, pageErrors, networkFails) {
  const issues = [
    ...consoleMessages.filter((m) => typeof m === 'string' ? /^(error|warning):/i.test(m) : m.type === 'error' || m.type === 'warning')
      .map((m) => `  console: ${typeof m === 'string' ? m : m.type + ': ' + m.text}`),
    ...pageErrors.map((m) => `  pageerror: ${m}`),
    ...networkFails.map((m) => `  network:  ${typeof m === 'string' ? m : m.url + ' -> ' + m.error}`),
  ];
  if (issues.length) log.push(`--- issues for ${label} ---\n` + issues.join('\n'));
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
