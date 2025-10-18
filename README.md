# About

**Tongasoa** means "welcome" in Malagasy (the language of Madagascar).

This project is a template for anyone who wants to create npm libraries without worrying about all the different configurations that usually take a lot of time to set up.

It is a small demo app to showcase a modern npm package template with best practices for development, build, release, and CI/CD.

<!-- [START BADGES] -->
<!-- Please keep comment here to allow auto update -->
[![NPM Version](https://img.shields.io/npm/v/tongasoa?style=flat-square)](https://www.npmjs.com/package/tongasoa)
[![Language](https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org)
[![Build](https://github.com/tiavina-mika/tongasoa/actions/workflows/release.yml/badge.svg)](https://github.com/tiavina-mika/tongasoa/actions)
[![Downloads](https://img.shields.io/npm/dm/tongasoa?style=flat-square)](https://www.npmjs.com/package/tongasoa)
[![Contributors](https://img.shields.io/github/contributors/tiavina-mika/tongasoa?style=flat-square)](https://github.com/tiavina-mika/tongasoa/graphs/contributors)
[![Storybook](https://img.shields.io/badge/Storybook-View%20Components-orange?style=flat-square&logo=storybook)](https://tiavina-mika.github.io/tongasoa)
<!-- [END BADGES] -->

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

# Testing

This project use both Unit Tests with Jest and E2E tests with Playwright integrated with Storybook.
Both testing strategies are integrated into the CI/CD pipeline via GitHub Actions for automation and reliability.

[View Storybook](https://tiavina-mika.github.io/tongasoa)

## Changelog

See the [CHANGELOG.md](https://github.com/tiavina-mika/tongasoa/blob/main/CHANGELOG.md) file for the history of changes.


