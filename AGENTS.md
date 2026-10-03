# Agent memory

German-language portfolio for mao’s mineral plaster and restoration work at tadelakt.at, built with Next.js 16 Pages Router and TypeScript 7, statically exported for Apache.

## Commands

Use Node.js 24+ and npm 11.

- Install: `npm ci`.
- Develop: `npm run dev`.
- Build and export: `npm run build` generates thumbnails, exports to `out/` and copies Apache configuration.
- Validate: `npm run check` runs Biome, TypeScript, Node tests, build and Chromium e2e; install the browser with `npx playwright install chromium` first.
- Format: `npm run format` rewrites files; `npm run biome` and `npm run lint` are read-only.

## Map

- Live-site fidelity: consult `docs/live-state-restoration.md` before reconciling deployed HTML, JavaScript, fonts or privacy text.
- Next.js APIs: read the relevant version-matched guide in `node_modules/next/dist/docs/` before editing framework code; alias pages identify their shared source in frontmatter.
- Dependency migrations: consult `docs/dependency-upgrade.md` for major-version notes and the TypeScript 7 compatibility decision.
- Content and SEO: start at `pages/index.tsx`, `pages/kontakt.tsx`, `pages/impressum.tsx`, `pages/datenschutz.tsx` and `components/Meta/index.tsx`.
- Shell and navigation: start at `components/Layout/index.tsx`, `components/Header/index.tsx`, `components/Footer/index.tsx`, `components/MainNavigation/index.tsx`, `components/FooterNavigation/index.tsx` and `components/Link/index.tsx`.
- Styling and fonts: start at `pages/_app.tsx`, `styles/globals.sass`, `styles/variables.sass`, `styles/media.sass`, `pages/index.module.sass`, `styles/fonts.scss` and `public/theme/fonts/`.
- Galleries and images: see the four gallery pages, `lib/gallery.ts`, `components/GalleryLightbox/index.tsx` and `scripts/generate-thumbnails.mjs`; generated `public/thumbnails/` files are ignored by Git.
- Hosting and errors: treat `apache/.htaccess`, `pages/404.tsx` and `scripts/finalize-export.mjs` as one contract, and verify routing against the Apache static export using the instructions in `docs/dependency-upgrade.md`.

## Maintenance

- Agent: update this file in the same change set whenever a change invalidates a line or teaches a costly lesson; prefer deleting over adding, pointers over prose, one sentence per bullet, current state only, no history.
