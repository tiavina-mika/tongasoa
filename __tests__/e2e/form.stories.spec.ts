import { test, expect } from '@playwright/test';

// Test to verify form interaction works correctly
test('form interaction works correctly', async ({ page }) => {
  // Navigate to the Storybook page for the Tongasoa component
  await page.goto('/?path=/story/components-form--default');

  // Wait for the network to be idle
  await page.waitForLoadState('networkidle');
  // Locate the iframe that contains the story
  const storyFrame = page.frameLocator('#storybook-preview-iframe');

  await storyFrame.locator('[data-testid="open-form-button"]').waitFor({ state: 'visible', timeout: 12000 });
  // Open the form by clicking the button
  await storyFrame.getByTestId('open-form-button').click();
  // wait
  await storyFrame.locator('form').waitFor({ state: 'visible', timeout: 5000 });
  // Fill in the name input field
  await storyFrame.locator('input[type="text"]').fill('Mika');
  // Submit the form
  await storyFrame.getByTestId('submit-button').click();
  // the form should be hidden
  await expect(storyFrame.locator('form')).toBeHidden();
});
