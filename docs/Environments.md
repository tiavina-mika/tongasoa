# Project Environments Overview

This document explains the different environments in our project structure. It covers development, source code, build output, and user testing setups. The project uses tools like Vite for dev serving, Rollup for production builds, and Semantic-Release for npm publishing. Builds happen automatically in the `release.yml` GitHub Actions workflow on pushes to `main`.

## Key Environments

### 1. Dev Environment
- **Purpose**: Local development and hot-reloading for rapid iteration.
- **Tooling**: Powered by [Vite](https://vitejs.dev/) for fast bundling and HMR (Hot Module Replacement).
- **Entry Points**: Located in the `dev/` directory (e.g., `dev/index.html` or `dev/main.tsx`).
- **How to Run**:
  ```
  yarn dev
  ```
  - Serves the app at `http://localhost:5173` (default port).
  - Loads code directly from `src/` with TypeScript support, aliases (e.g., `@/` for `src/`), and unminified assets.
- **Use Case**: Testing UI changes (e.g., button redirections) in a browser without building.
- **Notes**: No minification or optimization—focus on speed. Changes to `src/` auto-reload.

### 2. Src Environment
- **Purpose**: Core source code—the "heart" of the library/app.
- **Location**: `src/` directory.
- **Contents**:
  - TypeScript files (`.ts`/`.tsx`): Business logic, components, utils.
  - Assets: Raw files like SVGs, images, styles (e.g., `src/assets/`, `src/styles/`).
  - Entry Point: Main export (e.g., `src/index.ts` exposes the public API).
- **Role in Publishing**: This is the input for builds. It's **not** directly published—it's transformed into `dist/`.
- **Use Case**: Write and develop features here (e.g., edit `src/components/LoginButton.tsx`).

### 3. Dist Environment
- **Purpose**: Production-ready build output, optimized for npm distribution and user installation.
- **Location**: `dist/` directory (generated on build).
- **Build Process** (via Rollup in `package.json` scripts or `release.yml`):
  - **Input**: From `src/`.
  - **Transformations**:
    - TypeScript → JavaScript: Compiles `.ts`/`.tsx` to `.js`/`.cjs`/`.esm` (ESM/CJS dual support).
    - Copy Assets: Moves SVGs, images, etc., from `src/assets/` to `dist/`.
    - Minify JS and CSS: Compresses code (via Terser for JS, cssnano for CSS) for smaller bundle sizes.
    - Copy Types: Generates/copies `.d.ts` declaration files for TypeScript consumers.
    - Rewrite Imports: Converts aliases (e.g., `@/components/Button` → `./components/Button`) for standalone use.
  - **Trigger**: Automatic in `release.yml` GitHub Actions on push to `main` (after build-and-test job passes).
    - Command: `yarn build` (uses `rollup.config.js`).
- **Role in Publishing**: This is what gets packaged and sent to npm. Users install `dist/` contents.
- **Use Case**: Final artifact for deployment—lightweight, tree-shakable, and production-optimized.
- **Notes**: `dist/` is git-ignored (`.gitignore`)—regenerated on each build. Includes `package.json` with exports pointing to built files.

### 4. Example (User) Environment
- **Purpose**: Simulates the end-user experience—testing the published npm package in a separate app.
- **Location**: `example/` directory (a standalone Vite/React/whatever app).
- **How to Use**:
  1. Install the local package (links to your built `dist/`):
     ```
     cd example
     yarn add ../  # Or npm install ../ for local dev linking
     ```
  2. Import and use in `example/src/App.tsx`:
     ```tsx
     import { TongasoaComponent } from 'tongasoa';  // From your npm package

     function App() {
       return <TongasoaComponent />;  // e.g., the button with updated redirection
     }
     ```
  3. Run the example app:
     ```
     yarn dev
     ```
     - Serves at `http://localhost:3000` (or configured port).
- **What Happens**: Mimics `yarn add tongasoa` from npm—installs `dist/` files, resolves imports, and runs in a clean slate.
- **Use Case**: Verify the package works post-install (e.g., button redirects correctly, types are intact, no build errors).
- **Testing Releases**: After a push to `main` (triggers build/publish), update to latest: `yarn add tongasoa@latest` and re-test.
- **Notes**: Great for e2e checks. If linking locally, use `yarn build` first to update `dist/`.

## Workflow Integration
- **Local Dev Cycle**: Edit `src/` → `yarn dev` (in root or `dev/`) → Test → Commit (`feat: ...`) → Push.
- **CI/CD on Push to Main** (`release.yml`):
  1. Build `dist/` (Rollup).
  2. Test (Jest on `src/` and/or `dist/`).
  3. Semantic-Release: Analyzes commits → Bumps version → Publishes `dist/` to npm → Tags Git.
- **Version Sync**: After release, `example/` can pull the new npm version for user-like testing.

## Tips
- **Aliases in Dev vs. Prod**: Vite handles `@/` in dev; Rollup rewrites for prod.
- **Debug Builds**: Run `yarn build` locally to inspect `dist/`.
- **Package.json Exports**: Defines entry points (e.g., `"exports": { ".": "./dist/index.js" }`) for npm consumers.
- **Troubleshooting**: If `dist/` is outdated, check `release.yml` logs. For user issues, test in `example/`.

For more on tooling, see [Vite docs](https://vitejs.dev/) or [Rollup docs](https://rollupjs.org/). This setup ensures seamless dev-to-prod flow!