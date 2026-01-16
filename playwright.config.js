import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['line']
  ],
  use: {
    baseURL: process.env.UI_BASE_URL || 'http://localhost:4173',
    screenshot: 'on',
    trace: 'on',
    video: 'on'
  },
});