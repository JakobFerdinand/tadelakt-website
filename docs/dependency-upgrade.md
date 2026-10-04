# Dependency upgrade — 3 October 2026

## Versions and migration sources

The npm registry's stable `latest` tags were checked before editing configuration.
All retained direct dependencies are pinned to those versions in `package.json`;
`package-lock.json` records the resolved dependency graph. `npm outdated` is empty
and `npm audit` reports zero vulnerabilities.

Major-version migration notes were read before changing config:

| Dependency | Migration sources and applicable changes |
| --- | --- |
| Next.js 10 → 16.3.8 | [11](https://nextjs.org/docs/pages/guides/upgrading/version-11), [12](https://nextjs.org/docs/pages/guides/upgrading/version-12), [13](https://nextjs.org/docs/pages/guides/upgrading/version-13), [14](https://nextjs.org/docs/pages/guides/upgrading/version-14), [15](https://nextjs.org/docs/app/guides/upgrading/version-15), [16](https://nextjs.org/docs/app/guides/upgrading/version-16): Webpack image plugins give way to static assets; links render their own anchors; `output: 'export'` replaces `next export`; Turbopack becomes the default; lint runs separately from build; Node 20.9+ is required. The Pages Router remains supported. |
| React / React DOM 17 → 19.3.0 | [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide): function component `propTypes` are ignored, legacy rendering/context APIs are removed, and the modern JSX transform is required. Components now use TypeScript props and React state for navigation. Next.js handles the rendering entry point. |
| Font Awesome core/icons 1.x/5.x → 7.3.1; React binding 0.1.x → 3.5.0 | [v6 changes](https://docs.fontawesome.com/v6/web/setup/upgrade/whats-changed), [v7 changes](https://docs.fontawesome.com/web/setup/upgrade/whats-changed), [React binding 3.0 release](https://github.com/FortAwesome/react-fontawesome/releases/tag/3.0.0): old icon names have aliases, v7 has fixed-width icons and decorative accessibility defaults, and binding v3 requires modern React/Node/Font Awesome. The core stylesheet is explicitly imported and automatic CSS insertion is disabled for consistent SSR. |
| next-seo 4 → 7.3.0 | [Pages Router migration](https://github.com/garmeeh/next-seo/blob/main/src/pages/README.md), [JSON-LD components](https://github.com/garmeeh/next-seo): use `generateNextSeo` from `next-seo/pages` inside `next/head`, camel-case `siteName`, and `OrganizationJsonLd` for the existing organization data. |
| include-media 1 → 2.0.0 | [2.0 release](https://github.com/eduardoboucas/include-media/releases/tag/2.0.0): Dart Sass and `@use` replace legacy Sass imports, with unchanged generated media queries. `styles/media.sass` configures the original breakpoints once and forwards the mixins. |

Sharp 0.26 → 0.35.5 also required checking the
[0.35 release notes](https://sharp.pixelplumbing.com/changelog/v0.35.0/): Node 20.9+
and platform-specific prebuilt packages are required. Thumbnail generation now
uses its current `resize`/`toFile` API directly. Sass was updated to 1.105.1;
local division and color-unit deprecations were fixed. `quietDeps` only silences
deprecations inside the current include-media dependency.

### TypeScript 7 support

The [Next.js TypeScript documentation](https://nextjs.org/docs/pages/api-reference/config/typescript#using-typescript-7)
explicitly supports TypeScript 7 using the project-local `tsc` CLI by default.
This is also confirmed by the installed version's bundled guide at
`node_modules/next/dist/docs/01-app/03-api-reference/05-config/02-typescript.md`.
The [TypeScript 7 release notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
explain the missing JavaScript compiler API and the new configuration defaults.
The project uses TypeScript 7.0.2 with strict checking, bundler module resolution,
explicit global types and the modern JSX runtime. Every page and component is
now TSX. Both `next build` and `npm run typecheck` run the native compiler;
no TypeScript 6 compatibility alias or ignored build errors are needed.

### Removed and replacement dependencies

- `react-image-lightbox`'s latest release only supports React 16/17 and is archived;
  `yet-another-react-lightbox` 3.32.2 supports React 19 and provides navigation,
  captions, zoom, keyboard controls and focus restoration; backdrop dismissal is
  explicitly enabled to preserve the previous lightbox behavior.
- `next-optimized-images`, `responsive-loader`, `imagemin-mozjpeg`,
  `imagemin-optipng`, `imagemin-svgo` and `jimp` belonged to the old Webpack image
  pipeline; Sharp now generates 200px WebP thumbnails before development/build.
- ESLint, its React/hooks/Prettier plugins, `eslint-config-prettier` and Prettier
  were replaced by Biome 2.5.15; Biome checks JS/TS/JSON and uses a recommended
  lint preset, with `noImgElement` disabled for this static image pipeline.
- Unused Moment, Lodash's child-emptiness helper and ignored function-component
  PropTypes were removed; React's `Children.count` and TypeScript replace the
  latter two.
- Yarn 1's lockfile was replaced by npm 11's lockfile; Node 24+ and `npm ci` are
  the supported reproducible installation workflow.

## Export and verification

`npm run build` generates thumbnails, produces the complete `out/` tree with
Next.js's static export and copies `apache/.htaccess` into it. The original
photos and ten font files remain in `public/`. Gallery ordering and all 94
titles are preserved: Arbeit 56, Tadelakt 14, Lehmputz 10, restoration 14.

`npm run check` runs Biome, strict TypeScript, the Vitest suite, production build
and 19 Chromium e2e cases. The e2e suite covers all nine content routes, local
assets, metadata/JSON-LD, all galleries, zoom/backdrop/keyboard/focus behavior, mobile
client-side navigation, missing-route status and the four Apache error query
codes. `npm run test:e2e` starts `next dev` on a spare port; `E2E_BASE_URL`
selects an already-running server instead, such as `npm start` for the export.

### Real Apache verification

After building, start Apache with rewrite support and overrides enabled:

```sh
docker run --detach --rm --name tadelakt-check \
  --publish 127.0.0.1:4174:80 \
  --volume "$PWD/out:/usr/local/apache2/htdocs:ro" \
  httpd:2.4 sh -c "sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/; s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf && exec httpd-foreground"
E2E_BASE_URL=http://www.localhost:4174 npm run test:e2e
curl -I -H 'Host: www.localhost' http://127.0.0.1:4174/arbeit
curl -I -H 'Host: www.localhost' http://127.0.0.1:4174/missing-page
curl -I -H 'Host: tadelakt.at' http://127.0.0.1:4174/kontakt
docker stop tadelakt-check
```

Verified against Apache 2.4.69: all 19 browser cases pass, clean URLs return 200,
missing routes return 404, and non-www hosts redirect to www with status 301.
The browser's special handling of `*.localhost` lets the exported configuration
retain its production www redirect during local tests. Next.js development was
also checked for homepage/contact rendering, gallery interactions and mobile
navigation using `localhost` as the browser origin.

The [live-state restoration report](live-state-restoration.md) records the
historical Next.js 10 baseline, including its then-current commands and generated
CSS; it remains evidence for content and assets rather than current tooling.
