# Setting Up Commitlint for Conventional Commits

## Introduction

Commitlint is a tool that helps enforce consistent commit message conventions in your Git repository. It lints commit messages to ensure they follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add new feature`, `fix: resolve bug`, `docs: update documentation`). This is particularly useful when using tools like [Semantic-Release](https://semantic-release.gitbook.io/semantic-release/) for automated versioning, as it relies on commit messages to determine version bumps (major, minor, patch).

Without commitlint, team members might write inconsistent or invalid commit messages, leading to incorrect semantic-release behavior (e.g., no bump detected or wrong type). Commitlint runs as a Git hook (via [Husky](https://typicode.github.io/husky/)) to validate messages before they are committed.

## Why Use Commitlint?

- **Enforces Standards**: Ensures all commits follow a predictable format, improving readability and automation.
- **Integrates with Semantic-Release**: Semantic-release parses commit messages for changelog generation and version calculation.
- **Prevents Errors**: Catches invalid messages early (e.g., during `git commit`), avoiding CI failures.
- **Customizable**: Supports scopes, types, and rules tailored to your project.

## Prerequisites

- Node.js project with `package.json`.
- Git repository.
- npm or yarn as package manager.

## Common Commit Formats

| Type          | Description                  | Version Bump (with Semantic-Release) | Example                  |
|---------------|------------------------------|--------------------------------------|--------------------------|
| `feat`        | New feature                 | Minor                               | 1.0.0 → 1.1.0           |
| `fix`         | Bug fix                     | Patch                               | 1.0.0 → 1.0.1           |
| `docs`        | Documentation only          | None                                | No change                |
| `style`       | Formatting, no code change  | None                                | No change                |
| `refactor`    | Code refactor               | None                                | No change                |
| `perf`        | Performance improvements    | None                                | No change                |
| `test`        | Adding tests                | None                                | No change                |
| `build`       | Build process changes       | None                                | No change                |
| `ci`          | CI configuration changes    | None                                | No change                |
| `chore`       | Misc (tools, deps)          | None                                | No change                |
| `revert`      | Revert a commit             | None                                | No change                |
| `!` (Breaking)| Breaking change (appended to type, e.g., `feat!`) | Major | feat!: remove deprecated API → 1.0.0 → 2.0.0 |

**Note on Breaking Changes**: To indicate a breaking change, append `!` after the type (e.g., `feat!: breaking feature`) or use a footer line starting with `BREAKING CHANGE:` (e.g., in the body). This triggers a major version bump in semantic-release and is highlighted in changelogs.

Example full message with breaking change:
```
feat(api)!: remove legacy authentication method

This removes the old API endpoints for v1 auth.

BREAKING CHANGE: Users must migrate to JWT-based auth.
- Update client code to use new endpoints
- See migration guide in docs/

Closes #123
```

## Step-by-Step Setup

### 1. Install Dependencies

Install commitlint and Husky as dev dependencies:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

- `@commitlint/cli`: The command-line interface for commitlint.
- `@commitlint/config-conventional`: Pre-configured rules for Conventional Commits.
- `husky`: Manages Git hooks (e.g., pre-commit).

### 2. Initialize Husky

Set up Husky to create a `.husky/` directory and install hooks:

```bash
npx husky init
```

This creates a `pre-commit` hook. Edit `.husky/pre-commit` to run your tests or other scripts if needed (commitlint will be added next).

### 3. Configure Commitlint

Create a commitlint configuration file at the project root: `.commitlintrc.json` (or use `.commitlintrc` for YAML/JS formats).

Example `.commitlintrc.json` using the conventional config:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

This enforces:
- Types like `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`.
- Subject max length of 72 characters.
- Body and footer optional but formatted.

For custom rules (e.g., require scope like `feat(api): add endpoint`), extend the config:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "scope-enum": [2, "always", ["api", "ui", "docs", "core"]]
  }
}
```

### 4. Add the Pre-Commit Hook

Update the `pre-commit` hook in `.husky/pre-commit` to run commitlint:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

- This runs `commitlint` on the commit message file (`${1}`) during `git commit`.
- If the message is invalid, the commit is blocked with an error message (e.g., "subject must not be empty").

### 5. Add Scripts to package.json

Add a lint script for manual checks or CI:

```json
{
  "scripts": {
    "commitlint": "commitlint --from=HEAD~1",
    "prepare": "husky"
  }
}
```

- `commitlint`: Lints the last commit (useful for verification).
- `prepare`: Runs on `npm install` to set up Husky (add if not present).

### 6. Commit the Setup

Stage and commit the changes:

```bash
git add .husky/ .commitlintrc.json package.json package-lock.json
git commit -m "chore: add commitlint with husky for conventional commits"
```

Now, try an invalid commit to test:

```bash
git commit -m "invalid commit message"  # This should fail
```

It will output something like:

```
✖   subject cannot be empty [subject-empty]
✖   type must be one of [feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert] [type-enum]

See https://github.com/conventional-changelog/commitlint#what-is-commitlint for more details.
husky - pre-commit hook exited with code 1 (error)
```

A valid one:

```bash
git commit -m "feat: add user authentication endpoint"
```

### 7. Integrate with CI/CD (GitHub Actions)

To enforce in CI (e.g., on push/PR), add a job to your workflow (`.github/workflows/ci.yml`):

```yaml
name: CI

on: [push, pull_request]

jobs:
  lint-commits:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Fetch full history for commitlint
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run commitlint -- --from=HEAD~${{ github.event.pull_request.commits || 1 }}
```

This lints commits since the base branch (PR) or last commit (push).

## Troubleshooting

- **Husky Not Running**: Run `npm prepare` or `npx husky install`.
- **Bypass Hook**: Use `git commit --no-verify` (use sparingly!).
- **Errors in CI**: Ensure `fetch-depth: 0` in checkout to access commit history.

For more details, see the [Commitlint docs](https://commitlint.js.org/) and [Husky docs](https://typicode.github.io/husky/).

This setup ensures your commits are consistent and ready for semantic-release automation!