import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/arbeit',
  '/tadelakt',
  '/lehmputz',
  '/herstellung-und-restaurierung',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];

for (const route of pages) {
  test(`${route} renders without browser errors or broken local assets`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', (response) => {
      if (
        new URL(response.url()).origin === new URL(page.url()).origin &&
        response.status() >= 400
      )
        errors.push(`${response.status()} ${response.url()}`);
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('#main')).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /\S/,
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'mao | mineralische architektur oberflächen',
    );
    const structuredData = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(JSON.parse(structuredData ?? '')).toMatchObject({
      '@type': 'Organization',
      name: 'mao | mineralische architektur oberflächen',
      url: 'https://www.tadelakt.at',
    });
    await page.locator('img').evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) =>
          image instanceof HTMLImageElement
            ? image.decode()
            : Promise.resolve(),
        ),
      );
    });
    await page.evaluate(() => document.fonts.ready);
    expect(errors).toEqual([]);
  });
}

for (const [route, count] of [
  ['arbeit', 56],
  ['tadelakt', 14],
  ['lehmputz', 10],
  ['herstellung-und-restaurierung', 14],
] as const) {
  test(`${route}: keyboard opening, lightbox navigation and close restore focus`, async ({
    page,
  }) => {
    await page.goto(`/${route}`);
    const thumbnails = page.getByRole('button', { name: /vergrößern/ });
    await expect(thumbnails).toHaveCount(count);
    const first = thumbnails.first();
    await first.focus();
    await page.keyboard.press('Enter');
    const current = page.locator('.yarl__slide_current img');
    await expect(current).toHaveAttribute(
      'src',
      new RegExp(`/images/${route}/`),
    );
    const firstSrc = await current.getAttribute('src');
    await page.getByRole('button', { name: 'Weiter', exact: true }).click();
    await expect(current).not.toHaveAttribute('src', firstSrc ?? '');
    await page.getByRole('button', { name: 'Zurück', exact: true }).click();
    await expect(current).toHaveAttribute('src', firstSrc ?? '');
    const zoomOut = page.getByRole('button', {
      name: 'Verkleinern',
      exact: true,
    });
    await expect(zoomOut).toBeDisabled();
    await page.getByRole('button', { name: 'Vergrößern', exact: true }).click();
    await expect(zoomOut).toBeEnabled();
    await zoomOut.click();
    await expect(zoomOut).toBeDisabled();
    await page
      .locator('.yarl__root')
      .evaluate((root) =>
        Promise.all(
          root
            .getAnimations({ subtree: true })
            .map((animation) => animation.finished.catch(() => undefined)),
        ),
      );
    await page
      .locator('.yarl__slide_current')
      .click({ position: { x: 5, y: 100 } });
    await expect(page.locator('.yarl__root')).toHaveCount(0);
    await expect(first).toBeFocused();
    await first.click();
    await expect(current).toHaveAttribute('src', firstSrc ?? '');
    await page.keyboard.press('Escape');
    await expect(page.locator('.yarl__root')).toHaveCount(0);
    await expect(first).toBeFocused();
  });
}

test('mobile menu remains usable after client-side navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menü', exact: true });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page
    .locator('#main-navigation')
    .getByRole('link', { name: 'Arbeit', exact: true })
    .click();
  await expect(page).toHaveURL(/\/arbeit$/);
  await expect(
    page.getByRole('heading', { name: 'Ein Ausschnitt', exact: true }),
  ).toBeVisible();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page
    .locator('#main-navigation')
    .getByRole('link', { name: 'Kontakt', exact: true })
    .click();
  await expect(page).toHaveURL(/\/kontakt$/);
  await expect(page.getByText('Jederzeit erreichbar')).toBeVisible();
});

test('missing routes return 404 and provide a working homepage link', async ({
  page,
}) => {
  expect((await page.goto('/missing-page'))?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: '404', exact: true }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Zur Startseite' }).click();
  await expect(page).toHaveURL('/');
});

for (const code of [403, 404, 500, 503]) {
  test(`Apache error query ${code} is rendered after hydration`, async ({
    page,
  }) => {
    await page.goto(`/404?code=${code}`);
    await expect(
      page.getByRole('heading', { name: String(code), exact: true }),
    ).toBeVisible();
  });
}
