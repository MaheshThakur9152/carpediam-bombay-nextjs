import { test, expect } from '@playwright/test';

test.describe('Carpediam Bombay Customer Journeys', () => {
  test('1. Homepage loads directly with hero video and header', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Carpediam Bombay/);

    const video = page.locator('video');
    await expect(video).toBeVisible();

    const categoryHeading = page.locator('h2', { hasText: 'Shop by Category' });
    await expect(categoryHeading).toBeVisible();
  });

  test('2. Direct navigation to Category page with filters', async ({ page }) => {
    await page.goto('/jewelry');
    await expect(page).toHaveTitle(/Fine Jewelry/);

    const title = page.locator('h1', { hasText: 'Fine Jewelry' });
    await expect(title).toBeVisible();

    // Verify product cards are displayed
    const cards = page.locator('h3');
    await expect(cards.first()).toBeVisible();
  });

  test('3. Direct navigation to Subcategory page', async ({ page }) => {
    await page.goto('/jewelry/necklaces-pendants');
    await expect(page).toHaveTitle(/Necklaces & Pendants/);

    const heading = page.locator('h1', { hasText: 'Necklaces & Pendants' });
    await expect(heading).toBeVisible();
  });

  test('4. Product Detail Page loads and changes variant dynamically', async ({ page }) => {
    await page.goto('/products/smile-pendant-gold');
    await expect(page).toHaveTitle(/Carpediam T Smile Pendant/);

    const price = page.locator('p.font-serif.text-2xl.font-semibold');
    await expect(price).toHaveText('$1,350');

    // Select Rose Gold variant
    const rgBtn = page.locator('button', { hasText: '18k Rose Gold' });
    await rgBtn.click();
    await expect(rgBtn).toHaveClass(/bg-neutral-900/);

    // Verify Add to Bag works
    const addBtn = page.locator('button[data-testid="add-to-bag-button"]');
    await addBtn.click();

    // Verify Drawer opens
    const drawer = page.locator('div[role="dialog"][aria-label="Shopping Bag"]');
    await expect(drawer).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Shopping Bag' })).toBeVisible();
  });

  test('5. Unknown product handle returns 404 Not Found', async ({ page }) => {
    const res = await page.goto('/products/unknown-luxury-item');
    expect(res?.status()).toBe(404);

    const notFoundText = page.locator('h1', { hasText: 'Page Not Found' });
    await expect(notFoundText).toBeVisible();
  });

  test('6. Legacy hash/path redirect /product/:handle -> /products/:handle', async ({ page }) => {
    await page.goto('/product/smile-pendant-gold');
    await page.waitForURL('**/products/smile-pendant-gold');
    expect(page.url()).toContain('/products/smile-pendant-gold');
  });

  test('7. Search overlay opens, filters live, and escapes with Escape key', async ({ page }) => {
    await page.goto('/');
    const searchBtn = page.locator('button[aria-label="Search Catalog"]');
    await searchBtn.click();

    const searchInput = page.locator('input[aria-label="Search query"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('HardWear');
    const resultItem = page.locator('h4', { hasText: 'Carpediam HardWear' });
    await expect(resultItem).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press('Escape');
    await expect(searchInput).not.toBeVisible();
  });

  test('8. Cart Drawer opens, updates quantities, and respects Escape key', async ({ page }) => {
    await page.goto('/products/smile-pendant-gold');
    const addBtn = page.locator('button[data-testid="add-to-bag-button"]');
    await addBtn.click();

    const drawer = page.locator('div[role="dialog"][aria-label="Shopping Bag"]');
    await expect(drawer).toBeVisible();

    // Increase quantity
    const plusBtn = page.locator('button[aria-label="Increase quantity"]');
    await plusBtn.click();
    await expect(page.locator('span.font-serif.text-sm.font-semibold', { hasText: '$2,700' })).toBeVisible();

    // Escape closes drawer
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });

  test('9. Mobile viewport renders without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Open mobile menu
    const menuBtn = page.locator('button[aria-label="Menu"]');
    await menuBtn.click();

    const mobileMenu = page.locator('div[role="dialog"][aria-label="Mobile Navigation"]');
    await expect(mobileMenu).toBeVisible();
  });
});
