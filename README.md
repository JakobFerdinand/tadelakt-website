# Tadelakt Website

This repository contains the website for [tadelakt.at](https://tadelakt.at).

- Primary site (Astro, static): `astro/tadelakt.at/`
- Legacy / rollback (Next.js): `web/`

## Development

Astro (primary)

```sh
pnpm -C astro/tadelakt.at install
pnpm -C astro/tadelakt.at dev
```

Build + preview:

```sh
pnpm -C astro/tadelakt.at build
pnpm -C astro/tadelakt.at preview
```

Next.js (legacy / rollback)

```sh
cd web
yarn install
yarn dev
```

Build + start:

```sh
cd web
yarn build
yarn start
```

Notes:

- Root scripts (`package.json` + `lerna.json`) currently target `web/` only and are kept for rollback/reference.
- The Astro project uses `pnpm`; the legacy Next project uses `yarn` (see `astro/tadelakt.at/pnpm-lock.yaml` and `web/yarn.lock`).

![Screenshot](img/Screenshot.jpg)
