import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // Component tests opt into jsdom with a `@vitest-environment jsdom` docblock.
    environment: 'node',
    // Playwright owns tests/e2e/*.spec.ts.
    include: ['tests/*.test.{mjs,ts,tsx}'],
  },
});
