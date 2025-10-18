# Setting Up Commitlint for Conventional Commits

## Introduction

Commitlint is a tool that helps enforce consistent commit message conventions in your Git repository. It lints commit messages to ensure they follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add new feature`, `fix: resolve bug`, `docs: update documentation`). This is particularly useful when using tools like [Semantic-Release](https://semantic-release.gitbook.io/semantic-release/) for automated versioning, as it relies on commit messages to determine version bumps (major, minor, patch).

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

**Note on Breaking Changes**: To indicate a breaking change, use a footer line starting with `BREAKING CHANGE:` (e.g., in the body). This triggers a major version bump in semantic-release and is highlighted in changelogs.

Example full message with breaking change:
```
feat(api)!: remove legacy authentication method

This removes the old API endpoints for v1 auth.

BREAKING CHANGE: Users must migrate to JWT-based auth.
- Update client code to use new endpoints
- See migration guide in docs/

Closes #123
```

## Use cases
- Eg: current version is 2.3.4
- Case 1: If you are 2 commits:
  - "fix: correct minor typos in code" (patch)
  - "fix: resolve issue with login redirect" (patch)
  - push these commits
  
=> New version will be 2.3.5, it takes both commits as one patch bump.

- Case 2: If you are 2 commits:
  - "feat: add user profile page" (minor)
  - "fix: resolve issue with login redirect" (patch)
  - push these commits

=> New version will be 2.4.0, it takes the highest bump (minor) among the commits (here "feat: add user profile page").
