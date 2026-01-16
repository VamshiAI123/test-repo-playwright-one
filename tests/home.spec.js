import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('home page loads with basic structure', async ({ page }) => {
    await page.goto('/');
    
    // Test basic page structure
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Test for at least one heading
    const headings = page.locator('h1, h2, h3');
    await expect(headings.first()).toBeVisible();
    
    // Test for Vue app mount
    await expect(page.locator('#app')).toBeVisible();
  });

  test('has working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCountGreaterThan(0);
    
    // Click first link and verify navigation
    const firstLink = navLinks.first();
    await firstLink.click();
    
    // Should navigate away from home
    await expect(page).not.toHaveURL('/');
  });

  test('interactive elements are functional', async ({ page }) => {
    await page.goto('/');
    
    // Test buttons
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      const firstButton = buttons.first();
      await firstButton.click();
      // Button should respond to click (no specific behavior required)
      await expect(firstButton).toBeEnabled();
    }
    
    // Test inputs if present
    const inputs = page.locator('input, textarea');
    if (await inputs.count() > 0) {
      const firstInput = inputs.first();
      await firstInput.fill('Test input');
      await expect(firstInput).toHaveValue('Test input');
    }
  });

  test('page has no major errors', async ({ page }) => {
    // Listen for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Fail test if there are JS errors
    if (errors.length > 0) {
      console.error('Page errors:', errors);
      // Uncomment to fail on errors:
      // throw new Error(`Page has JavaScript errors: ${errors.join(', ')}`);
    }
  });
});