# Semantic-Release Forcing Version to 1.0.0 Despite Existing v3.0.0 Tag

## Bug Description

When using Semantic-Release in a GitHub Actions workflow to automate versioning and publishing to npm, you may encounter an issue where the tool ignores an existing Git tag (e.g., `v3.0.0`) and forces the next release version to `1.0.0`. This results in an npm publish error like:

```
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
npm error code E403
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/tongasoa - You cannot publish over the previously published versions: 1.0.0.
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
```

Even if:
- The Git tag `v3.0.0` exists on GitHub.
- The package version `3.0.0` is already published on npm.
- You've manually updated `package.json` to `"version": "3.0.0"` and pushed the changes.

Semantic-Release overrides the `package.json` version back to `1.0.0` during execution, treating it as the "first release" and attempting to republish an already-existing version, which npm blocks with a 403 Forbidden error.

This bug disrupts CI/CD pipelines, especially after manual tag creation or version misalignment, preventing proper automated releases.

## Root Cause

Semantic-Release determines the next version by analyzing Git tags and conventional commit messages since the last valid release. It validates a tag as a "release" only if:
- The tag follows the configured format (default: `v{{version}}`, e.g., `v3.0.0`).
- The commit pointed to by the tag has a `package.json` file with a matching `"version"` field (e.g., `"version": "3.0.0"`).

If the tag `v3.0.0` was created manually (e.g., via `git tag` without updating `package.json` first), or if the commit it points to has an outdated version (e.g., `1.0.0`), Semantic-Release discards it as invalid. It then falls back to the default "initial release" logic, starting from `1.0.0`—which is already published on npm, causing the 403 error.

Manually editing and pushing `package.json` to `3.0.0` doesn't help if the original tag commit doesn't match, as Semantic-Release runs on the current branch state but bases its calculation on historical tags.

## Solution

To resolve this, realign the `v3.0.0` tag to point to a commit where `package.json` explicitly has `"version": "3.0.0"`. This makes the tag valid, allowing Semantic-Release to recognize `3.0.0` as the last release. Future bumps (e.g., via `feat:` commits) will then proceed correctly from there (e.g., to `3.1.0`).

### Step-by-Step Fix

1. **Delete the Existing Tag** (locally and remotely, to recreate it cleanly):
   ```
   git tag -d v3.0.0
   git push origin :refs/tags/v3.0.0
   ```

2. **Update `package.json` to Version 3.0.0** (if not already done):
   - Open `package.json` and set:
     ```json
     {
       "version": "3.0.0"
     }
     ```
   - Stage and commit the change with a non-bumping message (e.g., `docs` or `chore` scope to avoid triggering a new release):
     ```
     git add package.json
     git commit -m "docs: align package version with existing release"
     ```

3. **Create and Push the New Tag** on this aligned commit:
   ```
   git tag v3.0.0
   git push origin v3.0.0
   ```
   - Also push the branch if needed: `git push`.

4. **Trigger the Workflow**:
   - The push will run your Semantic-Release job.
   - It should now validate `v3.0.0` as the last release, detect no new commits for bumping (since the alignment commit is non-bumping), and skip publishing without errors.
   - Verify in the GitHub Actions logs: Look for "The next release version is..."—it should reference `3.0.0` or higher.

### Verification

- After the push, check the workflow logs for Semantic-Release output. It should log the detected last release as `3.0.0`.
- Run a dry-run locally (optional, for testing):
  ```
  npx semantic-release --dry-run
  ```
  This simulates the process without publishing.

## Additional Tips

- **Tag Format Configuration**: Ensure your Semantic-Release config (in `.releaserc`, `package.json` under `"release"`, or defaults) uses `tagFormat: "v{{version}}"`. If customized, match it exactly.
- **Initial Version in `package.json`**: For new projects, set `"version": "0.0.0-development"` to signal Semantic-Release to manage versions fully.
- **Avoid Manual Tags**: Always let Semantic-Release create tags to prevent misalignment.
- **Handling Older Tags**: If there's a conflicting older tag (e.g., `v1.0.0`), delete it similarly if it's invalid.
- **npm Scope**: If your package is scoped (e.g., `@org/tongasoa`), ensure the npm publish step uses the correct registry/auth.
- **Debugging**: In workflow logs, search for "git tag" or "last release" lines. Share logs if issues persist.

This fix ensures Semantic-Release respects your existing `3.0.0` release without rewriting history or republishing. For more on Semantic-Release, see the [official docs](https://semantic-release.gitbook.io/semantic-release/).