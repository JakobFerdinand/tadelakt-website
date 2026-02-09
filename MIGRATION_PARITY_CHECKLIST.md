# Migration Parity Checklist (Phase 0)

Goal: verify the Astro site matches the legacy Next.js site (content + behavior) without changing URLs or assets.

Astro in `astro/tadelakt.at/` is the primary site; `web/` is kept for rollback/reference.

Source of truth for this checklist: `web/pages/*.js` and referenced components/assets.

## Route Checklist (from `web/pages/`)

- [ ] `/` (`web/pages/index.js`)
- [ ] `/arbeit` (`web/pages/arbeit.js`)
- [ ] `/tadelakt` (`web/pages/tadelakt.js`)
- [ ] `/lehmputz` (`web/pages/lehmputz.js`)
- [ ] `/herstellung-und-restaurierung` (`web/pages/herstellung-und-restaurierung.js`)
- [ ] `/ueber-uns` (`web/pages/ueber-uns.js`)
- [ ] `/kontakt` (`web/pages/kontakt.js`)
- [ ] `/impressum` (`web/pages/impressum.js`)
- [ ] `/datenschutz` (`web/pages/datenschutz.js`)
- [ ] `/404` (`web/pages/404.js`) (static 404 route)
- [ ] `/_error` (`web/pages/_error.js`) (Next internal error handler)

Non-route Next.js special case:

- [ ] `_app` wrapper imports global styles (`web/pages/_app.js` -> `web/styles/globals.sass`)

## Route Table (content + key dependencies)

| Path | Next source | Key content sections (structural) |
| --- | --- | --- |
| `/` | `web/pages/index.js` | Meta title/description; header in "banner" mode with centered `/theme/images/header-logo.png`; layout renders page content without the default header (`renderHeader={false}`); 3 listing cards linking to `/tadelakt`, `/lehmputz`, `/herstellung-und-restaurierung` using `/images/tadelakt.jpg`, `/images/lehmputz.jpg`, `/images/herstellung-und-restaurierung.jpg`. |
| `/arbeit` | `web/pages/arbeit.js` | Meta; header title bar "Arbeit und Projekte" with background `#7b2614 url("/theme/images/alternative-header-background.png")`; intro text + note that images are clickable; gallery grid populated at build time from `public/images/arbeit/*`; lightbox opens on thumbnail click. |
| `/tadelakt` | `web/pages/tadelakt.js` | Meta; header title bar "Tadelakt" with background `#365678 url("/theme/images/alternative-header-background.png")`; back link to `/` (chevron icon); intro text; gallery grid from `public/images/tadelakt/*`; lightbox behavior as in source. |
| `/lehmputz` | `web/pages/lehmputz.js` | Meta; header title bar "Lehmputz" with background `#8e6031 url("/theme/images/alternative-header-background.png")`; back link to `/` (chevron icon); intro text; gallery grid from `public/images/lehmputz/*`; lightbox behavior as in source. |
| `/herstellung-und-restaurierung` | `web/pages/herstellung-und-restaurierung.js` | Meta; header title bar "Herstellung und Restaurierung" with background `#7d8387 url("/theme/images/alternative-header-background.png")`; back link to `/` (chevron icon); intro text; gallery grid from `public/images/herstellung-und-restaurierung/*`; lightbox behavior as in source. |
| `/ueber-uns` | `web/pages/ueber-uns.js` | Meta; header title bar "Ueber uns" with background `#7b2614 url("/theme/images/alternative-header-background.png")`; two-person section with `/images/manfred.jpg` and `/images/reinhold.jpg`; contact/address lines; divider element at end. |
| `/kontakt` | `web/pages/kontakt.js` | Meta; header title bar "Kontakt" with background `#7b2614 url("/theme/images/alternative-header-background.png")`; left column image `/images/arbeit.png` + headings; right column icon rows with links: `tel:+436766258629`, `mailto:manfred.wegenschimmel@gmail.com`, `https://wa.me/436766258629`, Facebook profile, Instagram profile. |
| `/impressum` | `web/pages/impressum.js` | Meta; header title bar "Impressum" with background `#7b2614 url("/theme/images/alternative-header-background.png")`; static legal/contact text. |
| `/datenschutz` | `web/pages/datenschutz.js` | Meta; header title bar "Datenschutz" with background `#7b2614 url("/theme/images/alternative-header-background.png")`; privacy policy text with multiple headings; explicitly states no cookies. |
| `/404` | `web/pages/404.js` | Next `Error` component with status code from query (default 404); prominent link back to `/` (absolute positioning). No site `Layout` header/footer used here. |
| `/_error` | `web/pages/_error.js` | Next `Error` component with status code from query (default 500); prominent link back to `/` (absolute positioning). No site `Layout` header/footer used here. |

## Behavior Checklist (functional + visual parity)

Navigation + layout

- [ ] Main nav entries match (Startseite, Arbeit, Ueber uns, Kontakt) and point to the same paths.
- [ ] Active nav highlight matches source logic: active class applies only when the current path exactly equals the link href (see `web/components/Link/index.js`).
- [ ] Mobile menu toggle matches source:
  - [ ] On small screens, tapping the "Menu" toggle opens/closes the full-screen nav overlay (CSS class toggle on the nav root; see `web/components/MainNavigation/index.js`).
  - [ ] Open state shows an "x" close affordance (CSS `:after` content on the toggle).
  - [ ] After clicking a nav link while the overlay is open, resulting open/closed state matches what Next does today.
- [ ] Header modes match:
  - [ ] Home page uses "banner" header background (`/theme/images/header-background.jpg`) with the header-logo image and the "simple" logo.
  - [ ] Other pages show the title bar with their per-page background color + `/theme/images/alternative-header-background.png`.
- [ ] Footer renders on all normal pages (not on `/404` and `/_error`), uses `/theme/images/footer-background.jpg`, and shows the same contact/menu entries.
- [ ] Site background image `/theme/images/background.png` is present.

Galleries + lightbox

- [ ] Gallery pages load images from the same folders and in the same order as Next:
  - [ ] Ordering is filename sort using `localeCompare(..., { numeric: true })` (see `web/lib/api.js`).
  - [ ] Filenames/casing remain unchanged (some files include mixed patterns like `...JPG.jpg`).
- [ ] Clicking a gallery thumbnail opens the lightbox at the clicked index.
- [ ] Next/prev navigation wraps around from last->first and first->last.
- [ ] Close interactions match as closely as feasible:
  - [ ] Close button works.
  - [ ] ESC closes.
  - [ ] Background click closes if it does in the current site.
- [ ] Lightbox title uses the filename-derived title and caption is empty string (no "undefined" / "null").

Head/SEO + static assets

- [ ] Per-page meta title and description exist (source uses `web/components/Meta/index.js`).
- [ ] OpenGraph tags and JSON-LD equivalent output exist (organization profile; locale `de_AT`).
- [ ] Favicons/manifest/theme metadata match `HeadDependencies` in `web/components/Layout/index.js`:
  - [ ] `/theme/favicons/favicon.ico` (shortcut + icon)
  - [ ] Apple touch icons (various sizes)
  - [ ] `/theme/favicons/manifest.json`
  - [ ] `/theme/favicons/favicon-192.png`
  - [ ] `theme-color` and ms tile meta present
- [ ] Theme images load with identical paths: `/theme/images/*`.
- [ ] `robots.txt` served at `/robots.txt` and matches `web/public/robots.txt`.
- [ ] `sitemap.xml` served at `/sitemap.xml` and matches `web/public/sitemap.xml`.

Source quirks to be aware of (parity may mean preserving quirks)

- [ ] `msapplication-TileImage` meta currently points to `favicon-144.png` (no leading `/theme/favicons/`); that file does not exist under `web/public/`.
- [ ] OpenGraph image URL is `https://www.tadelakt.at/media/images/website_image.jpg` (not present in this repo).

## Comparison Method (recommended)

Run both sites locally and compare the same routes at a few breakpoints.

1) Start Next (source)

```
cd web
yarn install
yarn dev
```

2) Start Astro (target)

```
cd astro/tadelakt.at
pnpm install
pnpm dev
```

Notes:

- Default dev ports are typically Next `http://localhost:3000` and Astro `http://localhost:4321`.

3) Compare pages

- [ ] For each route in the Route Checklist, open Next and Astro side-by-side.
- [ ] Check at (at least) these viewport widths:
  - [ ] ~375px wide (mobile)
  - [ ] ~768px wide (tablet)
  - [ ] >= 1280px wide (desktop)
- [ ] Use devtools Network tab to confirm there are no missing assets (404s) and that gallery images load.
