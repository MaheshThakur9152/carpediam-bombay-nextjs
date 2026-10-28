import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
    launchOptions: {
      executablePath: 'C:\\Users\\mahesh\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
      headless: true,
    },
  },
  projects: [
    {
      name: 'desktop-brave',
      use: {
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: 'mobile-brave',
      use: {
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});
