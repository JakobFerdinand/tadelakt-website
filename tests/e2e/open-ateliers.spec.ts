import { expect, test } from '@playwright/test';

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 844, height: 390 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
]) {
  test(`open ateliers fills the screen without clipping at ${viewport.width}×${viewport.height}`, async ({
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
    await page.setViewportSize(viewport);
    expect((await page.goto('/tage-des-offenen-ateliers/'))?.status()).toBe(
      200,
    );
    await expect(page).toHaveTitle(/Tage des offenen Ateliers/);
    await expect(page.locator('header, nav, footer')).toHaveCount(0);
    await expect(page.locator('main section')).toHaveCount(3);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() =>
        [...document.fonts]
          .filter((font) => font.status === 'loaded')
          .map((font) => font.family),
      ),
    ).toEqual(expect.arrayContaining(['Saans Atelier', 'Saans Mono Atelier']));
    expect(
      await page
        .locator('main')
        .evaluate((main) => getComputedStyle(main).color),
    ).toBe('rgb(255, 255, 255)');
    expect(
      await page
        .locator('main')
        .evaluate((main) => getComputedStyle(main).backgroundColor),
    ).toBe('rgb(24, 13, 69)');

    const geometry = await page
      .locator('main section')
      .evaluateAll((sections) =>
        sections.map((section) => {
          const bounds = section.getBoundingClientRect();
          return {
            width: bounds.width,
            height: bounds.height,
            textFits: [...section.querySelectorAll('p, h1, a, address')].every(
              (text) => {
                const box = text.getBoundingClientRect();
                return (
                  box.left >= bounds.left &&
                  box.right <= bounds.right + 1 &&
                  box.top >= bounds.top &&
                  box.bottom <= bounds.bottom + 1 &&
                  text.scrollWidth <= text.clientWidth + 1
                );
              },
            ),
          };
        }),
      );
    for (const section of geometry) {
      expect(section.width).toBe(viewport.width);
      expect(section.height).toBeGreaterThanOrEqual(viewport.height);
      expect(section.textFits).toBe(true);
    }
    expect(
      await page
        .locator('main section')
        .first()
        .evaluate((section) => {
          const event = section.querySelector('h1')?.parentElement;
          const contact = section.querySelector('a');
          return (
            event != null &&
            contact !== null &&
            event.getBoundingClientRect().bottom <=
              contact.getBoundingClientRect().top
          );
        }),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);

    const photographs = page.locator('main section img');
    for (const [index, number] of [31, 24].entries()) {
      const image = photographs.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element: HTMLImageElement) => element.decode());
      await expect(image).toHaveAttribute(
        'src',
        new RegExp(`atelier-${number}-`),
      );
      expect(
        await image.evaluate((element: HTMLImageElement) => ({
          loaded: element.naturalWidth > 0,
          cover: getComputedStyle(element).objectFit,
          fillsSection:
            element.offsetWidth === element.parentElement?.offsetWidth &&
            element.offsetHeight === element.parentElement?.offsetHeight,
        })),
      ).toEqual({ loaded: true, cover: 'cover', fillsSection: true });
    }
    expect(errors).toEqual([]);
  });
}

test('event contact links remain keyboard accessible', async ({ page }) => {
  await page.goto('/tage-des-offenen-ateliers/');
  const phone = page.getByRole('link', { name: '+43 676 6258629' }).first();
  const email = page
    .getByRole('link', { name: 'M.WEGENSCHIMMEL@GMAIL.COM' })
    .first();
  await expect(phone).toHaveJSProperty('tabIndex', 0);
  await expect(email).toHaveJSProperty('tabIndex', 0);
  await phone.focus();
  await expect(phone).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(email).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(phone).toBeFocused();
});
