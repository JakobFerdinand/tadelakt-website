# Tadelakt Website

German-language portfolio for [tadelakt.at](https://tadelakt.at), built with
Next.js and TypeScript and statically exported for Apache.

## Development

Requires Node.js 24+ and npm 11.

```sh
npm ci
npm run dev
```

## Checks

```sh
npx playwright install chromium
npm run check
```

Runs formatting/lint checks, type checking, tests, the build and browser tests.
Use `npm run format` to apply formatting/lint fixes.

## Build and deploy

`npm run build` generates `out/`; `npm start` previews it on port 3000.
Deploy the complete `out/` directory, including `.htaccess`. No Node.js server
is required on the host.

See [deployment](docs/deployment.md) for CI and hosting setup, and
[dependency notes](docs/dependency-upgrade.md) for compatibility and Apache verification.
