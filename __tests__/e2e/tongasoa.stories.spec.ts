import { test, expect } from '@playwright/test';

// Test to verify that the main component has the expected contents
test('main component has contents', async ({ page }) => {
  // Navigate to the Storybook page for the Tongasoa component
  await page.goto('/?path=/story/pages-tongasoa--default');
  // Verify that the main component contains expected text
  await expect(page.locator('body')).toContainText('Tongasoa');

  // Wait for the network to be idle
  await page.waitForLoadState('networkidle');
  // Locate the iframe that contains the story
  const storyFrame = page.frameLocator('#storybook-preview-iframe');

  // Wait for the button to be visible
  await storyFrame.locator('[data-testid="open-form-button"]').waitFor({ state: 'visible', timeout: 10000 });
  // Verify the button text
  await expect(storyFrame.getByTestId('open-form-button')).toHaveText('Update your profile');
  // Verify the result message text
  await expect(storyFrame.getByTestId('result-message')).toHaveText('Hello World!');
});

// Test to verify that the form is displayed when the button is clicked
test('displays the form when the button is clicked', async ({ page }) => {
  // Navigate to the Storybook page for the Tongasoa component
  await page.goto('/?path=/story/pages-tongasoa--default');
  // Wait for the network to be idle
  await page.waitForLoadState('networkidle');
  // Locate the iframe that contains the story
  const storyFrame = page.frameLocator('#storybook-preview-iframe');

  await storyFrame.locator('[data-testid="open-form-button"]').waitFor({ state: 'visible', timeout: 10000 });

  // Open the form by clicking the button
  await storyFrame.getByTestId('open-form-button').click();
  // Verify that the name input is visible
  await expect(storyFrame.getByTestId('name-input')).toBeVisible();
  // The button should be hidden after clicking
  await expect(storyFrame.getByTestId('open-form-button')).toBeHidden();
});

// test form with result
test('form submission updates the result message', async ({ page }) => {
  // Navigate to the Storybook page for the Tongasoa component
  await page.goto('/?path=/story/pages-tongasoa--default');
  // Wait for the network to be idle
  await page.waitForLoadState('networkidle');
  // Locate the iframe that contains the story
  const storyFrame = page.frameLocator('#storybook-preview-iframe');

  await storyFrame.locator('[data-testid="open-form-button"]').waitFor({ state: 'visible', timeout: 10000 });
  // Open the form by clicking the button
  await storyFrame.getByTestId('open-form-button').click();

  // Wait for the form to be visible
  await storyFrame.locator('form').waitFor({ state: 'visible', timeout: 5000 });
  // Fill in the name input field
  await storyFrame.locator('input[type="text"]').fill('Mika');
  // Submit the form
  await storyFrame.getByTestId('submit-button').click();
  // the form should be hidden
  await expect(storyFrame.locator('form')).toBeHidden();
  // Verify that the result message is updated correctly
  await expect(storyFrame.getByTestId('result-message')).toContainText('Mika');
});
