# Testing & E2E Automation

## Unit tests with Jest

- Unit tests are written in the `__tests__/unit` directory.
- Command: `yarn test` or `yarn test:ci` (for CI with coverage).
- Configuration: see `jest.config.cjs` and integration in `package.json`.
- Tests are automatically run in the GitHub Actions workflow `release.yml` (job `test`) when a commit is pushed to `main`.

## E2E with Playwright and Storybook

### General workflow
- E2E tests are in `__tests__/e2e/`.
- Playwright is used to simulate user interactions on components in Storybook.
- Tests target stories (e.g. `/?path=/story/components-form--default`).

### Automatic Storybook deployment
- On each release, Storybook is built and deployed to GitHub Pages via the `e2e.yml` workflow in job `deploy`.
- The public URL is: `https://<owner>.github.io/tongasoa` (see the `STORYBOOK_PAGES_URL` variable in the workflow).
- After deployment, an e2e job runs Playwright tests against this deployed URL.

### Playwright: configuration and usage
- Config: `playwright.config.ts`
  - `baseURL` is set by the environment variable `PLAYWRIGHT_TEST_BASE_URL` (used in CI to point to GitHub Pages, otherwise localhost).
  - Tests do not try to start Storybook if the deployed URL is provided.
- Playwright tests use stories as E2E scenarios (e.g. checking for a button, interacting with the form, etc.).
- Example test:
  ```ts
  await page.goto('/?path=/story/components-form--default');
  await expect(page.frameLocator('#storybook-preview-iframe').locator('[data-testid="open-form-button"]')).toBeVisible();
  ```

### GitHub Actions: full integration
- `storybook-deploy.yml`
  - Deploys Storybook to GitHub Pages.
  - Then triggers the e2e job which:
    - Installs dependencies and Playwright.
    - Runs E2E tests against the public Storybook URL.
    - Uploads results as an artifact.
- `e2e.yml` (optional)
  - Deploy
    - Build storybook and deploy to GitHub Pages on every push/PR.
  - E2E Tests
    - Allows running E2E tests on every push/PR
    - Its test the storybook deployed on GitHub Pages in the preview job.
    - Allows running E2E tests on every push/PR locally (with local Storybook).

## Summary
- Unit tests ensure code robustness.
- Playwright E2E tests validate integration and accessibility of components via Storybook, both locally and on GitHub Pages.
- The entire chain is automated via GitHub Actions for a modern and reliable CI/CD.
