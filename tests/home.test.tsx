// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import Home from '../pages/index';

vi.mock('next/router', () => ({ useRouter: () => ({ asPath: '/' }) }));

afterEach(cleanup);

test('home page links each service teaser and the footer navigation', () => {
  render(<Home />);
  for (const [name, href] of [
    [/Tadelakt - Kalkputztechnik aus Marokko/, '/tadelakt'],
    [/Lehmputz - Feuchtigkeitsregulierend/, '/lehmputz'],
    [
      /Herstellung und Restaurierung mineralischer/,
      '/herstellung-und-restaurierung',
    ],
    ['Kontakt', '/kontakt'],
    ['Impressum', '/impressum'],
    ['Datenschutz', '/datenschutz'],
  ] as const) {
    const links = screen.getAllByRole('link', { name });
    expect(links.map((link) => link.getAttribute('href'))).toContain(href);
  }
  expect(screen.getByRole('img', { name: 'Tadelakt' })).toBeDefined();
});
