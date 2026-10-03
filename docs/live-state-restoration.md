# Live-state restoration — 2 October 2026

## Baseline

`https://tadelakt.at/` redirects to `https://www.tadelakt.at/`. The live site is
a Next.js 10 static export served by Apache, with build ID
`hvCHqzkG6CH-9eErERWgW`. It is not the Astro application on `origin/main`.

The homepage and gallery source match commit
`b89e4f3ed1312ff3c0bca759c6cddd70f384538a` (5 January 2021). Evidence includes:

- The homepage chunk `index-8296abf5fa0e4ae2f85b.js` has a last-modified date of
  5 January 2021 and the same content as `pages/index.js`, including the original
  Lehmputz heading without a comma.
- The gallery pages use local `images` arrays and `next-optimized-images`
  thumbnails, rather than the later Sanity `work` data.
- The live navigation uses the original DOM event listener implementation.
- The three homepage listing images, header logo, header background and page
  background are byte-identical to this commit's public assets.

The previous local Astro revision (`b89133b`) is preserved on
`backup/astro-before-live-restore-2026-10-02`. The restoration is committed on
top of that revision so the existing history is retained.

## Reconstructed later changes

- **Fonts:** restore `public/theme/fonts/` and `styles/fonts.scss` from
  `ee2f95c`, import the font faces in `pages/index.module.sass`, and remove the
  Google Fonts links from the HTML head. The live stylesheet
  `f2a88417c81fd6d3fa6e.css` was modified on 4 September 2022 and contains these
  local font declarations, while retaining the January 2021 layout styles.
- **Contact:** use “Jederzeit erreichbar” and add “(externer Link)” to WhatsApp,
  Facebook and Instagram labels. These match the live contact JavaScript,
  modified on 6 September 2022, and its static HTML.
- **Privacy:** restore `pages/datenschutz.js` from `19f9585`, matching the live
  privacy JavaScript, modified on 7 September 2022, including the Hetzner text.

## Live deployment inconsistencies

There is no single Git revision that reproduces all deployed files. In
particular, the static privacy HTML still has the earlier text without Hetzner
and a line break before “Website”, while its JavaScript contains the newer
text. The shared JavaScript also still contains Google Fonts head links even
though the static HTML removes them and the stylesheet defines local fonts.

This working tree reconstructs editable source from the observed assets. It
uses the current privacy JavaScript text and the static HTML's local-font
setup; it does not claim to be a byte-for-byte copy of the inconsistent export.
The homepage, gallery implementation and layout retain their original source.

Fetched live HTML, JavaScript and CSS are retained locally in
`/tmp/opencode/tadelakt-live-investigation/` for comparison.

## Verification

- Production build and static export completed under Node.js 16.20.2.
- The exported homepage, contact, imprint, about, 404 and all four gallery
  pages match the live rendered body after normalizing regenerated thumbnail
  hashes and PageSpeed URL rewrites. The privacy differences are described above.
- All 94 gallery entries and titles match the live page data, and every
  exported gallery image reference resolves to a local file.
- All 10 font files are byte-identical to the live files.
- The rebuilt global stylesheet is byte-identical to
  `db8c7c0dee1d720a7c71.css`; the rebuilt shared layout/page stylesheet is
  byte-identical to `f2a88417c81fd6d3fa6e.css`.
- `git diff --check` passed.

The historical dependency installation reported native mozjpeg and optional
Next.js sharp failures on this ARM host. The installed dependencies nevertheless
supported a successful build and export. The build emitted loader warnings from
the original broad dynamic image imports scanning non-image public files.
