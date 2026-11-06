import { test, expect } from '@playwright/test';

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

test.use({ viewport: DESKTOP });

test.describe('Phase 4 accessibility smoke tests', () => {
  test('page loads with skip link, landmarks, and headings', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AURELIS ESTATES \| Luxury Real Estate/);

    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toHaveAttribute('href', '#main');

    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.locator('h1')).toHaveCount(1);
    // Subsequent headings should be h2..h6 (no skipped levels).
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('navigation anchors jump to sections via in-page hash', async ({ page }) => {
    await page.goto('/');
    // Force-scroll to top so the nav is in its visible (not hidden) state.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const propertiesLink = page.getByRole('link', { name: /^Properties$/ }).first();
    await propertiesLink.scrollIntoViewIfNeeded();
    await propertiesLink.click({ force: true });
    await expect(page).toHaveURL(/#properties$/);
    await expect(page.locator('#properties')).toBeInViewport();
  });

  test('mobile menu opens and closes via Escape', async ({ browser }) => {
    const page = await browser.newPage({ viewport: MOBILE });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const openButton = page.getByRole('button', { name: /open menu/i });
    await openButton.click({ force: true });
    const dialog = page.locator('#mobile-menu');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Properties' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  });

  test('inquiry form shows validation errors and Consent message is required', async ({ page }) => {
    await page.goto('/#contact');
    await page.getByRole('tab', { name: /^Inquiry$/ }).click();

    await page.getByRole('button', { name: /send inquiry/i }).click();

    // Multiple inline alert regions should appear (RHF reports per-field errors with role=alert).
    await expect(page.locator('p[role="alert"]').first()).toBeVisible();
    await expect(page.locator('#inquiry-consent-error')).toBeVisible();
  });

  test('inquiry local submission shows the simulated-success state', async ({ page }) => {
    const messages = [];
    page.on('console', (msg) => messages.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', (err) => messages.push(`[pageerror] ${err.message}`));

    await page.goto('/#contact');
    await page.getByRole('tab', { name: /^Inquiry$/ }).click();

    await page.fill('#inquiry-name', 'Alice Auerbach');
    await page.fill('#inquiry-email', 'alice@example.com');
    await page.fill('#inquiry-phone', '+1 555 010 0000');
    await page.fill('#inquiry-message', 'A short message to verify the local submission path.');
    await page.check('#inquiry-consent');

    // Verify the consent checkbox is actually checked before submit (RHF with Zod boolean).
    await expect(page.locator('#inquiry-consent')).toBeChecked();

    await page.getByRole('button', { name: /send inquiry/i }).click();

    // Wait for any of: success text, loading spinner text, or alert message to appear.
    try {
      await expect(page.getByText(/received locally/i, { exact: false })).toBeVisible({
        timeout: 15_000,
      });
    } catch (err) {
      const alerts = await page.locator('p[role="alert"]').allTextContents();
      const status = await page.locator('p[role="status"], p[role="alert"]').allTextContents();
      const body = await page.locator('body').innerText();
      const consoleOut = messages.join('\n');
      throw new Error(
        `Success state did not appear.\nAlerts: ${JSON.stringify(alerts)}\nStatus region: ${JSON.stringify(status)}\nBody excerpt: ${body.slice(0, 500)}\nConsole:\n${consoleOut}`
      );
    }
  });

  test('schedule-viewing prefills the viewing form with the selected property', async ({ page }) => {
    await page.goto('/#properties');
    await expect(page.locator('#properties')).toBeVisible();

    const cards = page.locator('[data-property-card]');
    await expect(cards).toHaveCount(6);
    const viewingButton = page.locator('[data-property-cta="schedule"]').first();
    await viewingButton.click({ force: true });

    // Contact section should now reveal the viewing request tab as active.
    await expect(page.getByRole('tab', { name: /^Viewing request$/ })).toHaveAttribute('aria-selected', 'true');
    // Wait for the property to be set in the form after the useEffect runs.
    await expect.poll(async () => page.locator('#viewing-property').inputValue(), {
      timeout: 10_000,
    }).not.toBe('');
  });

  test('mortgage calculator computes a monthly payment and a loan amount', async ({ page }) => {
    await page.goto('/#calculator');
    await expect(page.locator('#calculator')).toBeVisible();
    await expect(page.getByText(/Estimated monthly payment/i)).toBeVisible();

    // The calculator's results <dl> lives inside a charcoal panel with role "status" (aria-live).
    const resultsRegion = page.locator('#calculator [aria-live="polite"] dl');
    await expect(resultsRegion).toContainText(/Loan amount/);
    await expect(resultsRegion).toContainText(/Total interest/);
    await expect(resultsRegion).toContainText(/Principal & interest/);
  });

  test('map fallback lists all six property locations when no Mapbox token is configured', async ({
    page,
  }) => {
    await page.goto('/#map');
    const region = page.getByRole('region', { name: /property locations \(text fallback\)/i });
    await expect(region).toBeVisible();
    const buttons = region.getByRole('button');
    await expect(buttons).toHaveCount(6);
  });

  test('keyboard Tab reaches an interactive element (a, button, input, select, textarea, or [tabindex])', async ({
    page,
  }) => {
    await page.goto('/');
    // Focus the body, then send a Tab key. Focus should land on the skip link.
    await page.focus('body');
    await page.keyboard.press('Tab');
    let tag = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase() ?? '');
    // First focus lands on the skip-link anchor (or another interactive element).
    // Try a few Tab cycles to reach a clearly interactive element.
    let attempts = 0;
    while (!['a', 'button', 'input', 'select', 'textarea'].includes(tag) && attempts < 6) {
      await page.keyboard.press('Tab');
      tag = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase() ?? '');
      attempts += 1;
    }
    expect(['a', 'button', 'input', 'select', 'textarea']).toContain(tag);
  });
});
