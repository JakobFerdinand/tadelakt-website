import { expect, test } from '@playwright/test';

test('infosheet maps both printed sheets without clipped or broken assets', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.setViewportSize({ width: 1920, height: 1080 });
  expect((await page.goto('/infosheet/'))?.status()).toBe(200);
  await expect(page).toHaveTitle(/Infosheet/);
  await expect(page.locator('header, nav, footer')).toHaveCount(0);
  await expect(page.locator('main > section')).toHaveCount(2);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      [...document.fonts]
        .filter((font) => font.status === 'loaded')
        .map((font) => font.family),
    ),
  ).toEqual(
    expect.arrayContaining(['Saans Infosheet', 'Saans Mono Infosheet']),
  );
  expect(
    await page.locator('main').evaluate((main) => getComputedStyle(main).color),
  ).toBe('rgb(28, 39, 148)');
  expect(
    await page
      .locator('main')
      .evaluate((main) => getComputedStyle(main).backgroundColor),
  ).toBe('rgb(255, 255, 255)');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);

  // Every embedded photograph must decode, in flyer order: sheet one first.
  const sources = [
    'atelier-portrait',
    'materialethik-1',
    'materialethik-2',
    'materialethik-3',
    'grosse-goettin-1',
    'grosse-goettin-2',
    'i-ging-1',
    'i-ging-2',
    'labyrinth-1',
    'labyrinth-2',
    'empoert-euch-1',
    'empoert-euch-2',
    'empoert-euch-3',
    'empoert-euch-4',
  ];
  const images = page.locator('main img');
  await expect(images).toHaveCount(sources.length);
  for (const [index, name] of sources.entries()) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element: HTMLImageElement) => element.decode());
    expect(await image.getAttribute('src')).toContain(`/infosheet/${name}`);
    expect(
      await image.evaluate(
        (element: HTMLImageElement) => element.naturalWidth > 0,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('infosheet stacks its columns on small screens without overflow', async ({
  page,
}) => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 820, height: 1180 },
  ]) {
    await page.setViewportSize(viewport);
    expect((await page.goto('/infosheet/'))?.status()).toBe(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const name of [
      'grosse-goettin-1',
      'i-ging-1',
      'labyrinth-1',
      'empoert-euch-4',
    ]) {
      const image = page.locator(`img[src*="${name}"]`);
      await image.scrollIntoViewIfNeeded();
      const box = await image.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.x).toBeGreaterThanOrEqual(0);
      expect(box && box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    }
  }
});

test('infosheet contact links remain keyboard accessible', async ({ page }) => {
  await page.goto('/infosheet/');
  const phone = page.getByRole('link', { name: '0043 676 6258629' });
  const email = page.getByRole('link', { name: 'M.WEGENSCHIMMEL@GMAIL.COM' });
  await expect(phone).toHaveJSProperty('tabIndex', 0);
  await phone.focus();
  await expect(phone).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(email).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(phone).toBeFocused();
});
