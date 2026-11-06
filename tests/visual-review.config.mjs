// Minimal config for the visual-review harness — picks up tests/visual-review.spec.js
// and auto-starts vite preview.
import { defineConfig } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT || 4173);

export default defineConfig({
  testDir: '.',
  testMatch: /visual-review\.spec\.js$/,
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: `http://localhost:${PORT}/`,
    hangTimeout: 10_000,
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --port 4173 --host',
    cwd: '..',
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
