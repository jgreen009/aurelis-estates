import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT || 4173);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 45_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: `http://localhost:${PORT}/`,
    trace: 'retain-on-failure',
    hangTimeout: 10_000,
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --port 4173 --host',
    cwd: '.',
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
