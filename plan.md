# Migration Plan: Next.js (web/) -> Astro 5 (astro/tadelakt.at/)

Goal
- Move the entire current site in `web/` into `astro/tadelakt.at/`.
- Result must look and behave the same (pages, styling, images, SEO metadata, nav state, gallery/lightbox).
- Keep it a totally static site (Astro static output; no server components, no API routes, no SSR-only features).
- Preserve existing URLs and asset paths.

Non-goals
- Visual redesign, content changes, new features.
- Migrating to a different routing structure or changing paths for images/CSS.
- Introducing a backend or runtime server.

Current State (source)
- App framework: Next.js in `web/`.
- Routes (from `web/pages/*`):
  - `/` (`index.js`)
  - `/arbeit` (`arbeit.js`) - image grid + lightbox
  - `/tadelakt` (`tadelakt.js`) - image grid + lightbox
  - `/lehmputz` (`lehmputz.js`) - image grid + lightbox
  - `/herstellung-und-restaurierung` (`herstellung-und-restaurierung.js`) - image grid + lightbox
  - `/ueber-uns` (`ueber-uns.js`)
  - `/kontakt` (`kontakt.js`)
  - `/impressum` (`impressum.js`)
  - `/datenschutz` (`datenschutz.js`)
  - `404` (`404.js`) and `_error.js`
- Styling:
  - Global Sass: `web/styles/globals.sass` (imports `include-media` + `react-image-lightbox` CSS)
  - Variables/mixins/fonts/reset in `web/styles/*`
  - Component/page CSS modules (Sass): `web/components/**/**/*.module.sass`, `web/pages/index.module.sass`
- Assets:
  - `web/public/theme/**` (backgrounds, logos, favicons, etc.)
  - `web/public/images/**` (content images + gallery images)
  - `web/public/robots.txt`, `web/public/sitemap.xml`
- Build-time data:
  - `web/lib/api.js` reads `public/images/<category>` via Node `fs` to create gallery arrays.

Target State (destination)
- Astro 5 project in `astro/tadelakt.at/`.
- `output: 'static'` (Astro config).
- All pages implemented as `.astro` (no React/Next runtime).
- Global Sass + CSS modules preserved to keep visuals identical.
- `public/` contains the same asset paths as today (so existing `<img src="/theme/...">` and `<img src="/images/...">` keep working).

Key Risks / Differences
- Lightbox: current implementation uses `react-image-lightbox` + React state.
  - Plan: replace with a small, dependency-free vanilla JS lightbox component (same UX: open, close, prev/next, caption/title).
  - Avoid bringing React into Astro to keep the site purely static and minimize client JS.
- Sass import quirks:
  - Next allowed `~include-media/...` style imports. Vite/Astro may require updating those import paths.
- Active navigation styling:
  - Next used router-based `activeClass`. In Astro we must compute active path from `Astro.url.pathname`.
- SEO:
  - Next used `next-seo` and JSON-LD helper. In Astro we must output equivalent meta tags and JSON-LD manually.

Migration Strategy
Work in small, verifiable steps: assets -> styles -> layout components -> pages -> galleries -> SEO -> 404/robots/sitemap -> parity checks.

Phase 0: Inventory + Parity Checklist
1) Create a route + content checklist from `web/pages/*.js`.
2) Capture expected behavior:
   - Mobile menu toggle works.
   - Active nav link highlight works.
   - Gallery grids render in same order.
   - Lightbox opens on click, supports next/prev, ESC close, click outside close (match current as closely as feasible).
   - Favicons + theme images load.
   - Robots + sitemap exist and are served.
3) Decide comparison method (recommended):
   - Run `web/` and `astro/tadelakt.at/` locally and compare page-by-page at 2-3 breakpoints.

Phase 1: Configure Astro for Static + Sass
Files: `astro/tadelakt.at/astro.config.mjs`, `astro/tadelakt.at/package.json`
1) Set Astro static output:
   - `export default defineConfig({ output: 'static', site: 'https://www.tadelakt.at' })`
   - (Optional) decide trailing slash behavior to match current hosting; keep default unless mismatch is observed.
2) Add styling deps needed for parity:
   - `sass`
   - `include-media`
3) Create folder structure in `astro/tadelakt.at/src/`:
   - `src/components/` (Astro components)
   - `src/layouts/` (site layout wrapper)
   - `src/styles/` (global Sass + variables)
   - `src/lib/` (build-time gallery builder)

Phase 2: Copy Static Assets (No Path Changes)
Files: `astro/tadelakt.at/public/**`
1) Copy everything from `web/public/` into `astro/tadelakt.at/public/`.
   - Ensure these paths exist unchanged:
     - `/theme/images/*`
     - `/theme/favicons/*` (if present)
     - `/images/*` and `/images/<category>/*`
     - `/robots.txt`
     - `/sitemap.xml`
2) Keep filenames and casing exactly as-is (some galleries include mixed `.JPG.jpg`-like names).

Phase 3: Port Styles (Global + Modules)
1) Copy global styles:
   - `web/styles/*` -> `astro/tadelakt.at/src/styles/*`
2) Update `globals.sass` imports for Vite if needed:
   - Replace `@import ~include-media/dist/_include-media.scss` with a Vite-compatible import.
   - Remove `@import ~react-image-lightbox/style.css` once the new lightbox CSS is in place.
3) Copy CSS module files used by components/pages:
   - `web/components/**/**/*.module.sass` -> `astro/tadelakt.at/src/components/**/*.module.sass`
   - `web/pages/index.module.sass` -> `astro/tadelakt.at/src/pages/index.module.sass` (or relocate to `src/styles/` and update imports)

Phase 4: Rebuild Shared UI as Astro Components
Implement Astro equivalents (same markup + class names as much as possible):
1) `Layout` (was `web/components/Layout/index.js`)
   - Provide head dependencies (viewport + favicons).
   - Wrap Header + main content + Footer.
   - Include global Sass import once (layout-level) so every page matches current styling.
2) `Header` + `Logo` + `MainNavigation`
   - Support "banner" vs "title bar" behavior (slot present vs not).
   - Implement mobile menu toggle with a tiny inline script (no framework).
   - Add active link class based on `Astro.url.pathname`.
3) `Footer` + `FooterLogo` + `FooterNavigation`
   - Simple markup conversion.
4) `Meta`
   - Replace `next-seo` with:
     - `<title>`
     - `<meta name="description">`
     - OpenGraph tags similar to `web/components/Meta/index.js`
     - JSON-LD `<script type="application/ld+json">...`

Phase 5: Build-Time Gallery Data (Replace getStaticProps)
Files: `astro/tadelakt.at/src/lib/gallery.ts`
1) Port `web/lib/api.js` logic nearly 1:1:
   - Use Node `fs` + `path` at build time.
   - Read from `astro/tadelakt.at/public/images/<category>`.
   - Sort filenames with numeric sorting to match current.
   - Output objects: `{ title, description, imageUrl, thumbnailUrl }`.
2) Expose functions:
   - `getWork('arbeit')`, `getWork('tadelakt')`, etc.

Phase 6: Port Pages One-by-One (Pixel Parity)
Create `.astro` pages in `astro/tadelakt.at/src/pages/` matching existing routes.

Page mapping
- `web/pages/index.js` -> `astro/tadelakt.at/src/pages/index.astro`
- `web/pages/arbeit.js` -> `astro/tadelakt.at/src/pages/arbeit.astro`
- `web/pages/tadelakt.js` -> `astro/tadelakt.at/src/pages/tadelakt.astro`
- `web/pages/lehmputz.js` -> `astro/tadelakt.at/src/pages/lehmputz.astro`
- `web/pages/herstellung-und-restaurierung.js` -> `astro/tadelakt.at/src/pages/herstellung-und-restaurierung.astro`
- `web/pages/ueber-uns.js` -> `astro/tadelakt.at/src/pages/ueber-uns.astro`
- `web/pages/kontakt.js` -> `astro/tadelakt.at/src/pages/kontakt.astro`
- `web/pages/impressum.js` -> `astro/tadelakt.at/src/pages/impressum.astro`
- `web/pages/datenschutz.js` -> `astro/tadelakt.at/src/pages/datenschutz.astro`
- `web/pages/404.js` -> `astro/tadelakt.at/src/pages/404.astro`

Notes
- Keep the existing `index.module.sass` usage consistent across pages (currently many pages import `./index.module.sass`).
- For `/kontakt` icons: replace FontAwesome React components with inline SVGs (either hand-authored or generated at build time) so no framework hydration is required.

Phase 7: Replace Lightbox (Vanilla, Static-Friendly)
Create `astro/tadelakt.at/src/components/Lightbox.astro` + a small CSS file.
Behavior to implement
- Open from clicking a thumbnail.
- Next/prev navigation.
- Close on ESC, close button, and background click.
- Title/caption support (even if caption is empty today).
Integration
- Gallery pages render the grid server-side.
- Add a small script to manage lightbox state in the browser.
- Keep DOM structure + CSS close enough to match current visuals (overlay, arrows, close icon).

Phase 8: SEO + Head Parity
1) Ensure these are present on every page:
   - `viewport` meta.
   - Favicons (all links currently in `HeadDependencies` in Next Layout).
   - `theme-color` + MS tile meta.
2) Ensure per-page:
   - `<title>` matches existing `Meta` titles.
   - `<meta name="description">` matches.
   - OG tags and locale `de_AT` match.
3) Confirm `robots.txt` and `sitemap.xml` are identical by serving from `public/`.

Phase 9: Verification (Functional + Visual)
Local run
1) Start Next site: `cd web && <pkgmgr> run dev`.
2) Start Astro site: `cd astro/tadelakt.at && <pkgmgr> run dev`.
Checklist per page
- Layout matches (header backgrounds, title bar/banner behavior).
- Typography + spacing + colors match.
- Images load (no 404s in devtools).
- Nav active state matches.
- Mobile menu opens/closes.
- Gallery ordering matches file order from `public/images/<category>`.
- Lightbox behavior matches.
Build validation
- `cd astro/tadelakt.at && <pkgmgr> run build && <pkgmgr> run preview`.
- Confirm generated output is static and deployable (no SSR-only warnings).

Phase 10: Cutover Cleanup (After Parity)
1) Decide repo layout:
   - Keep `web/` temporarily for rollback, or remove once Astro is confirmed.
2) Update root docs/scripts to point to Astro as primary.
3) Remove Next-only dependencies and build artifacts once migration is accepted.

Acceptance Criteria
- All routes listed in "Current State" exist in Astro with the same URLs.
- Styling and imagery match the current site (manual visual check at mobile + desktop).
- No server runtime required; Astro builds a static `dist/`.
- `robots.txt` and `sitemap.xml` are present and unchanged.
- Galleries render the same images in the same order, with a working lightbox.
