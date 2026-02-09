// @ts-check
import { defineConfig } from 'astro/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.tadelakt.at',
  trailingSlash: 'never',
  vite: {
    css: {
      preprocessorOptions: {
        // Keep legacy `@import styles/...` Sass paths working.
        sass: {
          api: 'legacy',
          includePaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src')],
        },
        scss: {
          api: 'legacy',
          includePaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src')],
        },
      },
    },
  },
});
