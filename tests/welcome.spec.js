import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Take screenshot of WELCOME TO BECCO', async ({ page }) => {
  // Create directory if it doesn't exist
  const dir = 'test-results';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await page.goto('/');
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: 'test-results/welcome-to-becco.png',
    fullPage: true 
  });
  console.log('✅ Screenshot saved');
});