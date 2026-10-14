// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import TageDesOffenenAteliers from '../pages/tage-des-offenen-ateliers';

afterEach(cleanup);

test('event has three standalone sections in poster order', () => {
  const { container } = render(<TageDesOffenenAteliers />);
  expect(container.querySelector('header, nav, footer')).toBeNull();
  const sections = screen.getAllByRole('region');
  expect(sections).toHaveLength(3);
  expect(
    within(sections[0]).getByRole('heading', {
      level: 1,
      name: 'Tage des offenen Ateliers',
    }),
  ).toBeDefined();
  expect(sections[0].querySelectorAll('time')).toHaveLength(2);
  expect(sections[0].textContent).toContain('Samstag 17.');
  expect(sections[0].textContent).toContain('& Sonntag 18.10.2026');
  expect(
    [...sections[0].querySelectorAll('time')].map((time) =>
      time.getAttribute('datetime'),
    ),
  ).toEqual(['2026-10-17', '2026-10-18']);
  expect(sections[0].textContent).toContain('10:00 - 12:00 Uhr');
  expect(sections[0].textContent).toContain('14:00 - 18:00 Uhr');
  expect(sections[1].querySelector('img')?.getAttribute('src')).toContain(
    'atelier-31-',
  );
  expect(sections[2].querySelector('img')?.getAttribute('src')).toContain(
    'atelier-24-',
  );
  for (const section of sections) {
    const poster = within(section);
    expect(poster.getByText('Atelier Manfred Wegenschimmel')).toBeDefined();
    expect(poster.getByText('KIRCHENPLATZ 5 | 4943 GEINBERG')).toBeDefined();
    expect(poster.getByText('EINTRITT FREI')).toBeDefined();
    expect(
      poster
        .getByRole('link', { name: '+43 676 6258629' })
        .getAttribute('href'),
    ).toBe('tel:+436766258629');
    expect(
      poster
        .getByRole('link', { name: 'M.WEGENSCHIMMEL@GMAIL.COM' })
        .getAttribute('href'),
    ).toBe('mailto:m.wegenschimmel@gmail.com');
  }
  expect(screen.getAllByRole('heading')).toHaveLength(1);
});
