import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Vite \+ Vue/);
  });

  test('has welcome heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Welcome to Our Application' });
    await expect(heading).toBeVisible();
  });

  test('button click increments counter', async ({ page }) => {
    const button = page.getByTestId('demo-button');
    const counter = page.getByTestId('click-counter');
    
    // Initially counter should not be visible
    await expect(counter).not.toBeVisible();
    
    // Click the button
    await button.click();
    
    // Counter should now be visible and show 1 click
    await expect(counter).toBeVisible();
    await expect(counter).toContainText('Button clicked 1 times');
    
    // Click again
    await button.click();
    await expect(counter).toContainText('Button clicked 2 times');
  });

  test('input field works correctly', async ({ page }) => {
    const input = page.getByTestId('demo-input');
    const display = page.getByTestId('input-display');
    
    // Initially display should not be visible
    await expect(display).not.toBeVisible();
    
    // Type in input
    const testText = 'Hello Playwright!';
    await input.fill(testText);
    
    // Display should show the typed text
    await expect(display).toBeVisible();
    await expect(display).toContainText(`You typed: ${testText}`);
  });

  test('navigation to about page works', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: 'About' });
    await aboutLink.click();
    
    await expect(page).toHaveURL(/.*about/);
    
    const aboutHeading = page.getByRole('heading', { name: 'About This Project' });
    await expect(aboutHeading).toBeVisible();
  });
});