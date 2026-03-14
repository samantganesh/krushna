# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is Krushna's personal website — a portfolio for a Contemporary Arts (BA Year 3) student. The goal is to showcase artwork and creative work. Code quality standards are high (maintained by a software developer parent). Formal testing and unit tests are not required.

## Development Commands

All commands run from `frontend/`:

```bash
npm run dev          # Start dev server (port 5173, hot reload)
npm run dev:manual   # Start dev server on port 5180
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (check only)
```

## Architecture

The app is a **Vite + React 19 + TypeScript + MUI v7** SPA located entirely in `frontend/`.

**Entry point:** `src/main.tsx` → `src/App.tsx`

**App.tsx** wires the top-level providers and layout:
1. `ThemeProvider` (custom, wraps MUI ThemeProvider) — outermost
2. `BrowserRouter`
3. `MainAppLayout` — topbar + collapsible sidebar shell
4. `Routes` — page-level route definitions

### Feature Structure (`src/features/`)

Features are organized into layers enforced by `eslint-plugin-boundaries`:

- **`core/`** — shared, reusable modules; can be imported by `feature` and `service` layers
- **`services/`** — can only import from `core`
- **`features/<name>/`** (non-core) — can only import from `core`; cross-feature imports are forbidden

Each feature folder is **self-contained**: it only imports from its own files or allowed layers — never from parent/sibling features.

### Core Features

**`core/main-app-layout`** — Shell layout with topbar, collapsible sidebar (240px/64px), and profile menu. Controlled via `useLayoutConfig` hook from child pages to show/hide layout elements per-route. Config auto-resets on unmount.

**`core/theme`** — Light/dark mode with localStorage persistence and `prefers-color-scheme` detection. Exposes `ThemeProvider`, `ThemeSwitcher`, and `useTheme` hook.

**`core/markdown-viewer`** — `MarkdownViewer` component supporting GFM, LaTeX math (KaTeX), and syntax-highlighted code blocks. Automatically adapts code theme to MUI light/dark mode.

**`core/home`** — `HomePage` — current landing page.

## Code Quality Rules (ESLint)

The ESLint config uses `typescript-eslint`'s `strictTypeChecked` preset with full type-aware linting (`parserOptions.projectService: true`). Key constraints to keep in mind:

- **No default exports** (except config files) — use named exports everywhere
- **Import order** enforced: builtin → external → internal → parent → sibling → type, with newlines between groups
- **File size**: max 300 lines; function max 50 lines; max 20 statements per function
- **No magic numbers** (except `0, 1, -1, 2, 3, 4, 8, 16, 24, 32, 100`)
- **No nested ternaries**; max JSX depth of 6
- **No param reassignment** (including props)
- **`{}` type is banned** — use `Record<string, unknown>` or a specific interface
- **No `eslint-disable` comments** without a warning (flagged by linting)
- **Architectural boundary violations** are lint errors — features cannot import across layer boundaries
