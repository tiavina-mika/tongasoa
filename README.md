# About

**Tongasoa** means "welcome" in Malagasy (the language of Madagascar).

This project is a template for anyone who wants to create npm libraries without worrying about all the different configurations that usually take a lot of time to set up.

It is a small demo app to showcase a modern npm package template with best practices for development, build, release, and CI/CD.

```bash
yarn dev
```

## Installation

```bash
yarn add tongasoa
```

## Usage

```js
import Tongasoa from 'tongasoa';

const App = () => {
  return (
    <Tongasoa name="Mika" />
  );
};

export default App;
```

# CI/CD with GitHub Actions

This project uses GitHub Actions for continuous integration and automated releases.

- **Lint, test, build and release** are run automatically on every push into the `main` branch.
- Commits and PR titles are validated for conventional format.
- Version and changelog are updated automatically.
- Publishing to npm is automated with semantic-release.

See the workflow files in `.github/workflows/` for details.

## Development

This project uses [Vite](https://vitejs.dev/) for local development and hot module replacement.

## Commit Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Pull Requests must have a conventional title (e.g. `feat: add new feature`)

## Build

[Rollup](https://rollupjs.org/) is used to bundle and optimize the package for production and npm publishing.

```bash
yarn build
```

## Release & Publishing

- Releases are automated via GitHub Actions and [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
- Publishing to npm only occurs when pushes are made into the `main` branch
- Version and changelog are updated automatically
- The changelog includes links to related PRs

## Changelog

See the [CHANGELOG.md](https://github.com/tiavina-mika/tongasoa/blob/main/CHANGELOG.md) file for the history of changes.
