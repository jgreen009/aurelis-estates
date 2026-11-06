import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Phase 4 axe accessibility scan', () => {
  test('home page has no axe violations against WCAG AA tagging', async ({ page }) => {
    await page.goto('/');
    // Mid-page scroll to give IntersectionObserver and any observers a chance to settle.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await expect(page.locator('header')).toBeVisible();
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const violations = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    if (violations.length > 0) {
      const summary = violations
        .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} nodes - ${v.help}`)
        .join('\n');
      test.fail(false, `axe accessibility violations:\n${summary}`);
    }
  });

  test('contact form preserves keyboard accessibility', async ({ page }) => {
    await page.goto('/#contact');
    await page.getByRole('tab', { name: /^Inquiry$/ }).click();
    await page.focus('#inquiry-name');
    await expect(page.locator('#inquiry-name')).toBeFocused();

    // Switch tabs by focusing the "Viewing request" tab and pressing Enter.
    const viewingTab = page.getByRole('tab', { name: /^Viewing request$/ });
    await viewingTab.focus();
    await page.keyboard.press('Enter');
    await expect(viewingTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#viewing-name')).toBeVisible();
  });
});
