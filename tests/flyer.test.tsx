// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import Flyer from '../pages/flyer';

afterEach(cleanup);

test('flyer maps both printed sheets in reading order', () => {
  const { container } = render(<Flyer />);
  expect(container.querySelector('header, nav, footer')).toBeNull();
  const sheets = screen.getAllByRole('region');
  expect(sheets).toHaveLength(2);

  const first = within(sheets[0]);
  expect(
    first.getByRole('heading', {
      level: 1,
      name: 'Atelier Manfred Wegenschimmel',
    }),
  ).toBeDefined();
  expect(
    first.getByRole('heading', {
      name: 'Zwischen Wandlung und tätiger Hoffnung',
    }),
  ).toBeDefined();
  expect(
    first.getByRole('heading', {
      name: 'Über Atelier Manfred Wegenschimmel',
    }),
  ).toBeDefined();
  expect(first.getByRole('heading', { name: 'Materialethik' })).toBeDefined();
  expect(
    first.getByRole('heading', { name: 'Cooperation Partners' }),
  ).toBeDefined();
  expect(sheets[0].textContent).toContain(
    'Wandlung ist das Wesen der Materie.',
  );
  expect(sheets[0].textContent).toContain('Panta rhei');
  expect(first.getByText('KIRCHENPLATZ 5, 4943 GEINBERG')).toBeDefined();
  expect(
    first.getByRole('link', { name: '0043 676 6258629' }).getAttribute('href'),
  ).toBe('tel:+436766258629');
  expect(
    first
      .getByRole('link', { name: 'M.WEGENSCHIMMEL@GMAIL.COM' })
      .getAttribute('href'),
  ).toBe('mailto:m.wegenschimmel@gmail.com');

  const second = within(sheets[1]);
  const workTitles = second
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent);
  expect(workTitles).toEqual([
    expect.stringContaining('Die Große Göttin'),
    expect.stringContaining('I Ging – das Buch der Wandlungen'),
    expect.stringContaining('Das Labyrinth'),
    expect.stringContaining('Empört euch – Indignez-vous'),
  ]);
  expect(sheets[1].textContent).toContain('„Die Weiße Göttin“');
  expect(sheets[1].textContent).toContain('„EMPÖRT EUCH!“');
});

test('flyer embeds all fourteen photographs', () => {
  render(<Flyer />);
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(14);
  for (const image of images) {
    const src = image.getAttribute('src');
    expect(src).toMatch(/^\/flyer\/.+\.webp$/);
    expect(image.getAttribute('alt')).toBeTruthy();
    expect(image.getAttribute('width')).toBe(image.getAttribute('width'));
  }
  const sources = images.map((image) => image.getAttribute('src'));
  expect(sources).toContain('/flyer/atelier-portrait.webp');
  expect(sources).toContain('/flyer/grosse-goettin-1.webp');
  expect(sources).toContain('/flyer/grosse-goettin-2.webp');
  expect(sources).toContain('/flyer/i-ging-1.webp');
  expect(sources).toContain('/flyer/i-ging-2.webp');
  expect(sources).toContain('/flyer/labyrinth-1.webp');
  expect(sources).toContain('/flyer/labyrinth-2.webp');
  expect(sources.filter((src) => src?.includes('empoert-euch-'))).toHaveLength(
    4,
  );
  expect(sources.filter((src) => src?.includes('materialethik-'))).toHaveLength(
    3,
  );
});
