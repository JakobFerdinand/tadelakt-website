# Agent memory

German-language portfolio for mao’s mineral plaster and restoration work at tadelakt.at, built with Next.js 10 and exported for Apache.

## Commands

Use Node.js 16 and Yarn 1.

- Install: `yarn install --frozen-lockfile`.
- Develop: `yarn dev`.
- Build and export: `yarn build` followed by `yarn export`.
- Lint: `yarn lint` (rewrites files with `--fix`).

## Map

- Live-site fidelity: consult `docs/live-state-restoration.md` before reconciling deployed HTML, JavaScript, fonts or privacy text.
- Content and SEO: start at `pages/index.js`, `pages/kontakt.js`, `pages/impressum.js`, `pages/datenschutz.js` and `components/Meta/index.js`.
- Shell and navigation: start at `components/Layout/index.js`, `components/Header/index.js`, `components/Footer/index.js`, `components/MainNavigation/index.js`, `components/FooterNavigation/index.js` and `components/Link/index.js`.
- Styling and fonts: start at `pages/_app.js`, `styles/globals.sass`, `styles/variables.sass`, `pages/index.module.sass`, `styles/fonts.scss` and `public/theme/fonts/`.
- Galleries and images: see `pages/arbeit.js`, `pages/tadelakt.js`, `pages/lehmputz.js`, `pages/herstellung-und-restaurierung.js`, `public/images/` and `next.config.js`; broad dynamic imports can emit loader warnings for non-image public files even when build and export succeed.
- Hosting and errors: treat `apache/.htaccess`, `pages/404.js` and the export script in `package.json` as one contract, and verify routing against the Apache static export.

## Maintenance

- Agent: update this file in the same change set whenever a change invalidates a line or teaches a costly lesson; prefer deleting over adding, pointers over prose, one sentence per bullet, current state only, no history.
