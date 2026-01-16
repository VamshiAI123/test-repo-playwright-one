import { test } from '@playwright/test';

test('Take screenshot of WELCOME TO BECCO', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000); // Simple wait
  await page.screenshot({ 
    path: 'test-results/welcome-to-becco.png',
    fullPage: true 
  });
  console.log('✅ Screenshot saved');
});