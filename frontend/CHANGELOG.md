# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Vite + React + TypeScript project setup
- Material UI (MUI) component library integration
  - @mui/material v7.3.7
  - @emotion/react and @emotion/styled for styling
  - @mui/icons-material for icons
- TypeScript strict mode configuration
  - Enabled `strict: true`
  - Added `noUncheckedIndexedAccess` for safer array access
  - Configured for type-safe development
- ESLint configuration with `strictTypeChecked` preset
  - Type-aware linting rules
  - React hooks linting
  - React refresh plugin support
- Prettier code formatting
  - Consistent code style enforcement
  - Format and format:check scripts
- Feature isolation structure
  - `src/features/` directory for modular feature organization
  - Home page feature with minimal "Hello" message
- Development tooling
  - Vite dev server with HMR
  - Build and preview scripts
  - Lint and format scripts

### Changed

- Removed Vite template boilerplate
  - Deleted default SVG logo files
  - Removed sample CSS files
  - Removed counter component example
  - Cleaned up template demonstration code

### Project Standards

- Feature modules must be self-contained
- No cross-feature dependencies allowed
- TypeScript strict mode enforced
- ESLint strictTypeChecked rules enforced
- All code must pass linting and formatting checks
