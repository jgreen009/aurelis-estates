// Phase 6 manual visual review capture (Playwright Test format).
//
// Captures:
//  - Full-page screenshots at the 6 spec breakpoints
//  - Per-section shots at desktop
//  - Interaction states (Modal / Mobile menu / Cinematic)
//  - Reduced-motion desktop pass
//  - Console + network error sweep (printed + written to docs/visual-review/log.txt)

import { test } from '@playwright/test';
import path from 'node:path';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173/';
const OUT  = 'docs/visual-review';
const SHOTS = path.join(OUT, 'shots');
mkdirSync(SHOTS, { recursive: true });

const BREAKPOINTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '768x1024', width: 768,  height: 1024 },
  { name: '390x844',  width: 390,  height: 844 },
  { name: '360x800',  width: 360,  height: 800 },
];

const SECTIONS = [
  { id: 'home',           label: '01-hero' },
  { id: 'showcase',       label: '02-showcase' },
  { id: 'properties',     label: '03-properties' },
  { id: 'cinematic',      label: '04-cinematic' },
  { id: 'services',       label: '05-services' },
  { id: 'neighborhoods', label: '06-neighborhoods' },
  { id: 'map',            label: '07-map-fallback' },
  { id: 'calculator',     label: '08-calculator' },
  { id: 'expertise',      label: '09-expertise' },
  { id: 'testimonials',   label: '10-testimonials' },
  { id: 'contact',        label: '11-contact' },
];

function attach({ page }) {
  const consoleMessages = [];
  const pageErrors = [];
  const networkFails = [];
  page.on('console', (m) => consoleMessages.push(`${m.type()}: ${m.text()}`));
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('requestfailed', (r) => networkFails.push(`${r.url()} -> ${r.failure()?.errorText}`));
  return { consoleMessages, pageErrors, networkFails };
}
const issues = [];

function writeErrors(label, { consoleMessages, pageErrors, networkFails }) {
  const consoleErrors = consoleMessages.filter((m) => /^(error|warning):/i.test(m));
  const all = [
    ...consoleErrors.map((m) => `  console: ${m}`),
    ...pageErrors.map((m) => `  pageerror: ${m}`),
    ...networkFails.map((m) => `  network:  ${m}`),
  ];
  if (all.length) {
    const block = `--- issues for ${label} ---\n` + all.join('\n');
    issues.push(block);
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Phase 6 manual visual review', () => {
  test.beforeAll(async () => {
    test.setTimeout(600_000);
  });

  for (const bp of BREAKPOINTS) {
    test(`full-page ${bp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      const hooks = attach({ page });
      await page.goto(BASE, { waitUntil: 'load', timeout: 30_000 });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(SHOTS, `full-${bp.name}.png`), fullPage: true });
      writeErrors(`full-${bp.name}`, hooks);
    });
  }

  for (const s of SECTIONS) {
    test(`section ${s.label} (desktop)`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const hooks = attach({ page });
      await page.goto(BASE, { waitUntil: 'load' });
      const el = page.locator(`#${s.id}`);
      if (await el.count() > 0) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
      }
      await page.screenshot({ path: path.join(SHOTS, `section-${s.label}.png`), fullPage: false });
      writeErrors(`section-${s.label}`, hooks);
    });
  }

  test('interaction — property Modal (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const hooks = attach({ page });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#properties').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('button[aria-label*="details"]').first().click({ force: true });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(SHOTS, 'interact-modal-desktop.png'), fullPage: false });
    writeErrors('interact-modal-desktop', hooks);
  });

  test('interaction — property Modal (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const hooks = attach({ page });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#properties').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.locator('button[aria-label*="details"]').first().click({ force: true });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(SHOTS, 'interact-modal-mobile.png'), fullPage: false });
    writeErrors('interact-modal-mobile', hooks);
  });

  test('interaction — mobile menu open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const hooks = attach({ page });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /open menu/i }).click({ force: true });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(SHOTS, 'interact-mobile-menu.png'), fullPage: false });
    writeErrors('interact-mobile-menu', hooks);
  });

  test('interaction — cinematic frame (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const hooks = attach({ page });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#cinematic').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(SHOTS, 'interact-cinematic-desktop.png'), fullPage: false });
    writeErrors('interact-cinematic-desktop', hooks);
  });

  // Reduced-motion: use a fresh browser context with the media feature emulated.
  for (const s of SECTIONS) {
    test(`reduce-motion — ${s.label}`, async ({ browser }) => {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: 'reduce',
      });
      const page = await ctx.newPage();
      const hooks = attach({ page });
      await page.goto(BASE, { waitUntil: 'load' });
      await page.locator(`#${s.id}`).scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(SHOTS, `reduce-${s.label}.png`), fullPage: false });
      writeErrors(`reduce-${s.label}`, hooks);
      await ctx.close();
    });
  }

  test.afterAll(async () => {
    writeFileSync(path.join(OUT, 'log.txt'), issues.join('\n\n') || 'No issues captured.', 'utf8');
  });
});
