# Tadelakt Website

This repository contains a nextjs website template for [tadelakt.at](https://tadelakt.at).

![Screenshot](img/Screenshot.jpg)

## Restored live-site baseline

This checkout reconstructs the deployment inspected on 2 October 2026 from
commit `b89e4f3`, with the later deployed fonts, contact wording and privacy text.
See [restoration notes](docs/live-state-restoration.md) for evidence and the
differences between the live HTML and JavaScript.

Use Node.js 16 and Yarn 1 with this historical Next.js 10 project:

```sh
yarn install --frozen-lockfile
yarn dev
```

To build the Apache static export:

```sh
yarn build
yarn export
```
