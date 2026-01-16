import { test, expect } from '@playwright/test';

test('Take screenshot of WELCOME TO BECCO', async ({ page }) => {
  // Go to homepage
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check for the text
  await expect(page.getByText('WELCOME TO BECCO')).toBeVisible();
  
  // Take screenshot - save in test-results folder
  await page.screenshot({ 
    path: 'test-results/welcome-to-becco.png',
    fullPage: true 
  });
  
  // Also attach to report
  const screenshot = await page.screenshot();
  await test.info().attach('screenshot', {
    body: screenshot,
    contentType: 'image/png'
  });
  
  console.log('✅ Screenshot taken of "WELCOME TO BECCO"');
});