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
        sass: {
          api: 'modern',
          quietDeps: true,
          loadPaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src')],
        },
        scss: {
          api: 'modern',
          quietDeps: true,
          loadPaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src')],
        },
      },
    },
  },
});
