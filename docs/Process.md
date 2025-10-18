# Summary: Example of a Release with Semantic-Release

## Context
- **Change**: Modification of a button's redirection in `LoginButton.tsx` (from `/dashboard` to `/profile`).
- **Current Version**: 3.0.0 (Git tag, `package.json`, npm).
- **Commit**: `feat: change button redirection` → Triggers a minor bump (3.1.0).
- **Triggers**: Push to `main` → Workflows `commitlint.yml` (validation) and `release.yml` (build/test/release).

## Key Steps

1. **Local Dev**: `yarn dev` → Test the change live.
2. **Commit**: `git commit -m "feat: change button redirection"` → Validated by commitlint (Husky hook).
3. **Push**: `git push origin main` → Starts CI/CD.

### Workflow commitlint.yml
- Lints recent commits → Passes (`feat` message valid).

### Workflow release.yml
#### Job 1: build-and-test
- Rollup Build: TS → JS, minify, copy assets/types, rewrite imports (`@` → `./`).
- Jest Tests: Verifies the button → Passes.

#### Job 2: release (on `main`)
- **Commit Analysis**: `feat` → Version 3.1.0 (minor rule).
- **Notes & Changelog**: Generates "Features" section in `CHANGELOG.md`.
- **Npm Publish**: Publishes `tongasoa@3.1.0`.
- **Git Update**: Commits `chore(release): 3.1.0 [skip ci]`, tags `v3.1.0`, pushes `package.json`/changelog.

## Result
- New Version: 3.1.0 everywhere (Git, npm).
- Changelog Updated: `## 3.1.0 (2025-10-15)\n### Features\n* change button redirection`.
- `package.json` updated with version 3.1.0.
- Config `.releaserc.json`: Custom rules for bumps, changelog groups, auto-publish.

For debugging: Actions logs or `npx semantic-release --dry-run`.