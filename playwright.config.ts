import { once } from 'node:events';
import { createServer } from 'node:net';
import { defineConfig, devices } from '@playwright/test';

// Workers reload this file, so the chosen port is shared through the environment.
if (!process.env.E2E_BASE_URL && !process.env.E2E_PORT) {
  const probe = createServer().listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const address = probe.address();
  if (address === null || typeof address === 'string')
    throw new Error('Could not find a spare port for the dev server');
  process.env.E2E_PORT = String(address.port);
  probe.close();
  await once(probe, 'close');
}
const baseURL =
  process.env.E2E_BASE_URL ?? `http://127.0.0.1:${process.env.E2E_PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  // The dev server compiles each route on first request.
  timeout: 60_000,
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run dev -- --hostname 127.0.0.1 --port ${process.env.E2E_PORT}`,
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
