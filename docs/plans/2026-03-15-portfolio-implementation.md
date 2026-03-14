# Krushna Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a vibrant Contemporary Arts portfolio with bold-primary palette, responsive top navbar, 7 pages, masonry gallery with medium filtering, and per-entry writing components.

**Architecture:** Feature-per-page (Option A) — every page and content entry is its own isolated feature. Static typed manifests (`artworks.ts`, `entries.ts`) drive gallery and writing indices. `core/nav` owns layout shell. Page features live at `features/<name>/`. No backend, no CMS.

**Tech Stack:** Vite · React 19 · TypeScript · MUI v7 · React Router DOM v7 · @fontsource · Vitest · ESLint strictTypeChecked · Prettier

---

## Key ESLint Constraints

Read `eslint.config.js` before implementing. Critical rules:
- Named exports only (no default exports, except config files)
- Magic numbers: only `0, 1, -1, 2, 3, 4, 8, 16, 24, 32, 100` allowed as literals — define all others as named constants
- Max 300 lines per file, 50 lines per function (blank lines excluded)
- No cross-core imports: `core/nav` cannot import from `core/theme` (etc.)
- Import order: builtin → external → internal → parent → sibling → type, with newlines between groups
- `sonarjs/no-duplicate-string`: strings repeated 3+ times in a file must be constants
- `react/no-array-index-key`: never use array index as React key — use a unique `id` field

---

## Task 1: Install fonts

**Files:**
- Modify: `frontend/src/main.tsx`

**Step 1: Install packages**
```bash
cd frontend && npm install @fontsource/space-grotesk @fontsource/inter
```
Expected: both packages in `package.json` dependencies

**Step 2: Update main.tsx**

Full file content:
```tsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Step 3: Build**
```bash
cd frontend && npm run build
```
Expected: succeeds

**Step 4: Commit**
```bash
git add frontend/src/main.tsx frontend/package.json frontend/package-lock.json
git commit -m "feat: install Space Grotesk and Inter fonts via @fontsource"
```

---

## Task 2: Extend MUI theme — bold palette and typography

**Files:**
- Create: `frontend/src/features/core/theme/palette.ts`
- Modify: `frontend/src/features/core/theme/ThemeProvider.tsx`
- Modify: `frontend/src/features/core/theme/index.ts`

**Step 1: Create `palette.ts`**
```ts
export const PALETTE = {
  primary: '#E63022',
  secondary: '#1A56F0',
  accent: '#F5C800',
  bgLight: '#FAFAF7',
  bgDark: '#0D0D0D',
  paperDark: '#1A1A1A',
  paperLight: '#ffffff',
} as const;
```

**Step 2: Replace `ThemeProvider.tsx`**

Extract theme creation into `buildTheme` to keep the component function under 50 lines:
```tsx
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  type Theme,
} from '@mui/material';
import { useState, useEffect, type ReactNode } from 'react';

import { PALETTE } from './palette';
import {
  ThemeContext,
  THEME_STORAGE_KEY,
  getInitialTheme,
  type ThemeMode,
} from './themeContext';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_BODY = '"Inter", system-ui, sans-serif';

function buildTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: PALETTE.primary },
      secondary: { main: PALETTE.secondary },
      warning: { main: PALETTE.accent },
      background: {
        default: mode === 'light' ? PALETTE.bgLight : PALETTE.bgDark,
        paper: mode === 'light' ? PALETTE.paperLight : PALETTE.paperDark,
      },
    },
    typography: {
      fontFamily: FONT_BODY,
      h1: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h2: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h3: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h4: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h5: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h6: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
    },
  });
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={buildTheme(mode)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
```

**Step 3: Add `PALETTE` export to `theme/index.ts`**

Append to the existing file:
```ts
export { PALETTE } from './palette';
```

**Step 4: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```
Expected: no errors

**Step 5: Commit**
```bash
git add frontend/src/features/core/theme/
git commit -m "feat: extend theme with bold primary palette and Space Grotesk/Inter typography"
```

---

## Task 3: Create `core/nav` — TopNav, PortfolioLayout, BackLink

**Files to create:**
```
frontend/src/features/core/nav/
├── constants.ts
├── types.ts
├── index.ts
├── TopNav/
│   ├── index.ts
│   ├── TopNav.tsx
│   ├── TopNav.test.tsx
│   ├── NavLogo.tsx
│   ├── NavDesktopLinks.tsx
│   └── MobileMenu.tsx
├── PortfolioLayout/
│   ├── index.ts
│   └── PortfolioLayout.tsx
└── BackLink/
    ├── index.ts
    ├── BackLink.tsx
    └── BackLink.test.tsx
```

**Step 1: Create `constants.ts`**

Note: `56` is allowed by `ignoreDefaultValues: true` in no-magic-numbers (variable declaration default).
```ts
export const NAV_HEIGHT = 56;
export const FONT_DISPLAY = '"Space Grotesk", sans-serif';
```

**Step 2: Create `types.ts`**
```ts
export interface NavItem {
  label: string;
  to: string;
}
```

**Step 3: Write failing test**

`TopNav/TopNav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { TopNav } from './TopNav';

const ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
];

describe('TopNav', () => {
  it('renders the site logo', () => {
    render(<MemoryRouter><TopNav items={ITEMS} /></MemoryRouter>);
    expect(screen.getByText('Krushna')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    render(<MemoryRouter><TopNav items={ITEMS} /></MemoryRouter>);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });
});
```

**Step 4: Run test — confirm failure**
```bash
cd frontend && npm test -- --run TopNav
```
Expected: FAIL — `TopNav` not found

**Step 5: Create `NavLogo.tsx`**
```tsx
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';

export function NavLogo() {
  return (
    <Typography
      component={Link}
      to="/"
      variant="h5"
      sx={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        color: 'primary.main',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
      }}
    >
      Krushna
    </Typography>
  );
}
```

**Step 6: Create `NavDesktopLinks.tsx`**
```tsx
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';
import type { NavItem } from '../types';

interface NavDesktopLinksProps {
  items: NavItem[];
}

export function NavDesktopLinks({ items }: NavDesktopLinksProps) {
  const { pathname } = useLocation();

  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.to;
        return (
          <Button
            key={item.to}
            component={Link}
            to={item.to}
            sx={{
              color: 'text.primary',
              fontFamily: FONT_DISPLAY,
              fontWeight: isActive ? 700 : 400,
              borderBottom: '2px solid',
              borderColor: isActive ? 'primary.main' : 'transparent',
              borderRadius: 0,
              px: 1,
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
}
```

**Step 7: Create `MobileMenu.tsx`**

The full-screen overlay menu in primary red. Closes when a link is clicked.
```tsx
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';
import type { NavItem } from '../types';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const { pathname } = useLocation();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
        aria-label="Close menu"
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Stack spacing={4} alignItems="center">
        {items.map((item) => (
          <Typography
            key={item.to}
            component={Link}
            to={item.to}
            onClick={onClose}
            variant="h3"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: FONT_DISPLAY,
              fontWeight: pathname === item.to ? 700 : 400,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Stack>
    </Dialog>
  );
}
```

**Step 8: Create `TopNav.tsx`**

Uses a `Box` as header for full height control (avoids fighting MUI Toolbar's built-in min-height).
```tsx
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useState, type ReactNode } from 'react';

import { NAV_HEIGHT } from '../constants';
import type { NavItem } from '../types';
import { MobileMenu } from './MobileMenu';
import { NavDesktopLinks } from './NavDesktopLinks';
import { NavLogo } from './NavLogo';

interface TopNavProps {
  items: NavItem[];
  rightContent?: ReactNode;
}

function NavRight({ items, rightContent, onMenuOpen }: {
  items: NavItem[];
  rightContent?: ReactNode;
  onMenuOpen: () => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {rightContent}
        <IconButton onClick={onMenuOpen} aria-label="Open navigation" sx={{ color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <NavDesktopLinks items={items} />
      {rightContent}
    </Box>
  );
}

export function TopNav({ items, rightContent }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = () => { setMobileOpen(true); };
  const closeMenu = () => { setMobileOpen(false); };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAV_HEIGHT,
          zIndex: 'appBar',
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
        }}
      >
        <NavLogo />
        <NavRight items={items} rightContent={rightContent} onMenuOpen={openMenu} />
      </Box>
      <MobileMenu open={mobileOpen} onClose={closeMenu} items={items} />
    </>
  );
}
```

**Step 9: Create `TopNav/index.ts`**
```ts
export { TopNav } from './TopNav';
```

**Step 10: Run test — confirm pass**
```bash
cd frontend && npm test -- --run TopNav
```
Expected: PASS (2 tests)

**Step 11: Create `PortfolioLayout.tsx`**
```tsx
import { Box } from '@mui/material';
import type { ReactNode } from 'react';

import { NAV_HEIGHT } from '../constants';
import { TopNav } from '../TopNav';
import type { NavItem } from '../types';

interface PortfolioLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  navRightContent?: ReactNode;
}

export function PortfolioLayout({ children, navItems, navRightContent }: PortfolioLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopNav items={navItems} rightContent={navRightContent} />
      <Box component="main" sx={{ mt: `${NAV_HEIGHT}px` }}>
        {children}
      </Box>
    </Box>
  );
}
```

**Step 12: Create `PortfolioLayout/index.ts`**
```ts
export { PortfolioLayout } from './PortfolioLayout';
```

**Step 13: Write BackLink test**

`BackLink/BackLink.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('renders the label text', () => {
    render(<MemoryRouter><BackLink to="/gallery" label="Back to Gallery" /></MemoryRouter>);
    expect(screen.getByText('Back to Gallery')).toBeInTheDocument();
  });
});
```

**Step 14: Run BackLink test — confirm failure**
```bash
cd frontend && npm test -- --run BackLink
```
Expected: FAIL

**Step 15: Create `BackLink.tsx`**
```tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Button
      component={Link}
      to={to}
      startIcon={<ArrowBackIcon />}
      sx={{
        color: 'text.secondary',
        fontFamily: FONT_DISPLAY,
        '&:hover': { color: 'primary.main' },
      }}
    >
      {label}
    </Button>
  );
}
```

**Step 16: Create `BackLink/index.ts`**
```ts
export { BackLink } from './BackLink';
```

**Step 17: Run BackLink test — confirm pass**
```bash
cd frontend && npm test -- --run BackLink
```
Expected: PASS

**Step 18: Create `core/nav/index.ts`**
```ts
export { TopNav } from './TopNav';
export { PortfolioLayout } from './PortfolioLayout';
export { BackLink } from './BackLink';

export type { NavItem } from './types';
```

**Step 19: Full build + all tests**
```bash
cd frontend && npm run build && npm test -- --run
```
Expected: Build succeeds, all tests pass

**Step 20: Commit**
```bash
git add frontend/src/features/core/nav/
git commit -m "feat: add core/nav — TopNav, PortfolioLayout, BackLink"
```

---

## Task 4: Refactor App.tsx + create `features/home/`

**Files:**
- Create: `frontend/src/features/home/HomePage.tsx`
- Create: `frontend/src/features/home/index.ts`
- Modify: `frontend/src/App.tsx`
- Delete: `frontend/src/features/core/home/HomePage.tsx` (replaced by features/home)

**Step 1: Create stub `features/home/HomePage.tsx`** (replaced fully in Task 5)
```tsx
import { Box, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2">Home</Typography>
    </Box>
  );
}
```

**Step 2: Create `features/home/index.ts`**
```ts
export { HomePage } from './HomePage';
```

**Step 3: Replace `App.tsx`**

Note: `App.tsx` is in `boundaries/ignore` so it can import from all layers.
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './features/home';
import { PortfolioLayout, type NavItem } from './features/core/nav';
import { ThemeProvider } from './features/core/theme';
import { ThemeSwitcher } from './features/core/theme/ThemeSwitcher';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
  { label: 'Hobbies', to: '/hobbies' },
  { label: 'Contact', to: '/contact' },
];

function AppContent() {
  return (
    <PortfolioLayout navItems={NAV_ITEMS} navRightContent={<ThemeSwitcher />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PortfolioLayout>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

**Step 4: Delete the old home page**
```bash
rm -rf frontend/src/features/core/home
```

**Step 5: Run dev server and verify visually**
```bash
cd frontend && npm run dev
```
Open http://localhost:5173 — should see: Krushna logo in red, nav links across top, Home stub page below. Mobile: hamburger → red overlay menu.

**Step 6: Build + all tests**
```bash
cd frontend && npm run build && npm test -- --run
```
Expected: succeeds (existing main-app-layout tests still pass — that code is untouched)

**Step 7: Commit**
```bash
git add frontend/src/App.tsx frontend/src/features/home/
git rm frontend/src/features/core/home/HomePage.tsx
git commit -m "feat: wire PortfolioLayout, add features/home stub, remove sidebar layout"
```

---

## Task 5: Build `features/home/` — vibrant landing page

**Files:**
- Create: `frontend/src/features/home/HeroSection.tsx`
- Create: `frontend/src/features/home/TeaserGrid.tsx`
- Create: `frontend/src/features/home/TeaserCard.tsx`
- Modify: `frontend/src/features/home/HomePage.tsx`

**Step 1: Create `TeaserCard.tsx`**

A bold full-colour panel linking to a section.
```tsx
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

interface TeaserCardProps {
  label: string;
  to: string;
  bgcolor: string;
  color?: string;
}

export function TeaserCard({ label, to, bgcolor, color = 'white' }: TeaserCardProps) {
  return (
    <Box
      component={Link}
      to={to}
      sx={{
        flex: 1,
        minHeight: 200,
        bgcolor,
        color,
        display: 'flex',
        alignItems: 'flex-end',
        p: 4,
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
      >
        {label} →
      </Typography>
    </Box>
  );
}
```

**Step 2: Create `TeaserGrid.tsx`**
```tsx
import { Box } from '@mui/material';

import { TeaserCard } from './TeaserCard';

export function TeaserGrid() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 0,
        mt: 0,
      }}
    >
      <TeaserCard label="Gallery" to="/gallery" bgcolor="primary.main" />
      <TeaserCard label="Writing" to="/writing" bgcolor="secondary.main" />
      <TeaserCard label="Hobbies" to="/hobbies" bgcolor="warning.main" color="black" />
    </Box>
  );
}
```

**Step 3: Create `HeroSection.tsx`**
```tsx
import { Box, Typography } from '@mui/material';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 8 },
        py: 8,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '14vw', md: '10vw' },
          lineHeight: 1,
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: '-2px',
          color: 'text.primary',
          mb: 3,
        }}
      >
        Krushna
      </Typography>
      <Box
        sx={{
          width: 80,
          height: 4,
          bgcolor: 'primary.main',
          mb: 3,
        }}
      />
      <Typography
        variant="h5"
        sx={{ color: 'text.secondary', fontFamily: FONT_DISPLAY, fontWeight: 400 }}
      >
        Contemporary Arts · BA Year 3
      </Typography>
    </Box>
  );
}
```

**Step 4: Update `HomePage.tsx`**
```tsx
import { Box } from '@mui/material';

import { HeroSection } from './HeroSection';
import { TeaserGrid } from './TeaserGrid';

export function HomePage() {
  return (
    <Box>
      <HeroSection />
      <TeaserGrid />
    </Box>
  );
}
```

**Step 5: Note on font sizes**

`fontSize: { xs: '14vw', md: '10vw' }` — uses viewport-relative strings, no magic numbers issue. `'14vw'` is a CSS string value.

**Step 6: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```

**Step 7: Commit**
```bash
git add frontend/src/features/home/
git commit -m "feat: vibrant home page with full-viewport hero and teaser panels"
```

---

## Task 6: Create `features/gallery/` — masonry grid with medium filter

**Files:**
- Create: `frontend/src/features/gallery/artworks.ts`
- Create: `frontend/src/features/gallery/types.ts`
- Create: `frontend/src/features/gallery/ArtworkGrid.tsx`
- Create: `frontend/src/features/gallery/MediumFilter.tsx`
- Create: `frontend/src/features/gallery/GalleryPage.tsx`
- Create: `frontend/src/features/gallery/index.ts`
- Modify: `frontend/src/App.tsx` (add `/gallery` route)

**Step 1: Create `types.ts`**
```ts
export type ArtworkMedium =
  | 'painting'
  | 'drawing'
  | 'film'
  | 'sculpture'
  | 'performance'
  | 'other';

export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: ArtworkMedium;
  thumbnailSrc: string;
  route: string;
}
```

**Step 2: Create `artworks.ts`**

Add artwork images to `frontend/public/images/artwork/` (create directory). Use any filenames matching these entries. Images can be added later — the grid shows alt text gracefully if missing.
```ts
import type { Artwork } from './types';

export const ARTWORKS: Artwork[] = [
  {
    id: 'untitled-oil-2024',
    title: 'Untitled (Oil)',
    year: 2024,
    medium: 'painting',
    thumbnailSrc: '/images/artwork/untitled-oil-2024.jpg',
    route: '/artwork/untitled-oil-2024',
  },
  {
    id: 'figure-charcoal-2024',
    title: 'Figure Study',
    year: 2024,
    medium: 'drawing',
    thumbnailSrc: '/images/artwork/figure-charcoal-2024.jpg',
    route: '/artwork/figure-charcoal-2024',
  },
  {
    id: 'short-film-2023',
    title: 'Untitled Short',
    year: 2023,
    medium: 'film',
    thumbnailSrc: '/images/artwork/short-film-2023.jpg',
    route: '/artwork/short-film-2023',
  },
  {
    id: 'clay-form-2023',
    title: 'Form I',
    year: 2023,
    medium: 'sculpture',
    thumbnailSrc: '/images/artwork/clay-form-2023.jpg',
    route: '/artwork/clay-form-2023',
  },
];
```

**Step 3: Create `MediumFilter.tsx`**
```tsx
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import type { ArtworkMedium } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

const MEDIUMS: Array<{ value: ArtworkMedium | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'painting', label: 'Painting' },
  { value: 'drawing', label: 'Drawing' },
  { value: 'film', label: 'Film' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'performance', label: 'Performance' },
];

interface MediumFilterProps {
  value: ArtworkMedium | 'all';
  onChange: (value: ArtworkMedium | 'all') => void;
}

export function MediumFilter({ value, onChange }: MediumFilterProps) {
  const handleChange = (_: React.MouseEvent<HTMLElement>, next: string | null) => {
    if (next !== null) {
      onChange(next as ArtworkMedium | 'all');
    }
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
        {MEDIUMS.map((m) => (
          <ToggleButton key={m.value} value={m.value} size="small">
            <Typography variant="caption" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}>
              {m.label}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
```

**Step 4: Create `ArtworkGrid.tsx`**

Uses MUI ImageList masonry. Hovering reveals title + year overlay.
```tsx
import { Box, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import type { Artwork } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const GRID_COLS_MD = 3;
const GRID_COLS_SM = 2;

interface ArtworkGridProps {
  artworks: Artwork[];
}

function ArtworkTile({ artwork }: { artwork: Artwork }) {
  return (
    <ImageListItem
      component={Link}
      to={artwork.route}
      sx={{
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
        position: 'relative',
        '&:hover .overlay': { opacity: 1 },
      }}
    >
      <img
        src={artwork.thumbnailSrc}
        alt={artwork.title}
        loading="lazy"
        style={{ width: '100%', display: 'block' }}
      />
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.7)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'white', fontFamily: FONT_DISPLAY, fontWeight: 600 }}>
          {artwork.title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {artwork.year}
        </Typography>
      </Box>
    </ImageListItem>
  );
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const cols = isMd ? GRID_COLS_MD : isSm ? GRID_COLS_SM : 1;

  return (
    <ImageList variant="masonry" cols={cols} gap={8}>
      {artworks.map((artwork) => (
        <ArtworkTile key={artwork.id} artwork={artwork} />
      ))}
    </ImageList>
  );
}
```

**Step 5: Create `GalleryPage.tsx`**
```tsx
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { ARTWORKS } from './artworks';
import { ArtworkGrid } from './ArtworkGrid';
import { MediumFilter } from './MediumFilter';
import type { ArtworkMedium } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function GalleryPage() {
  const [filter, setFilter] = useState<ArtworkMedium | 'all'>('all');

  const filtered = filter === 'all'
    ? ARTWORKS
    : ARTWORKS.filter((a) => a.medium === filter);

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Gallery
      </Typography>
      <MediumFilter value={filter} onChange={setFilter} />
      <ArtworkGrid artworks={filtered} />
    </Box>
  );
}
```

**Step 6: Create `gallery/index.ts`**
```ts
export { GalleryPage } from './GalleryPage';
```

**Step 7: Add route in `App.tsx`**

Import and add:
```tsx
import { GalleryPage } from './features/gallery';
// ...
<Route path="/gallery" element={<GalleryPage />} />
```

**Step 8: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```

**Step 9: Commit**
```bash
git add frontend/src/features/gallery/ frontend/src/App.tsx
git commit -m "feat: gallery page with masonry grid and medium filter"
```

---

## Task 7: Create first artwork page — `features/artwork/`

Each artwork is its own component. This task creates the folder and one example. Future artworks follow the same pattern.

**Files:**
- Create: `frontend/src/features/artwork/UntitledOil2024.tsx`
- Create: `frontend/src/features/artwork/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `UntitledOil2024.tsx`**

Each artwork page is a blank canvas — no enforced layout. Only `BackLink` is required.
```tsx
import { Box, Typography } from '@mui/material';

import { BackLink } from '../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function UntitledOil2024() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <BackLink to="/gallery" label="Back to Gallery" />

      <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8 }}>
        <Box sx={{ flex: 2 }}>
          <img
            src="/images/artwork/untitled-oil-2024.jpg"
            alt="Untitled (Oil), 2024"
            style={{ width: '100%', display: 'block' }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 1 }}>
            Untitled (Oil)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            2024 · Oil on canvas
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {/* Artist statement — add description here */}
            A study in form and colour.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
```

**Step 2: Create `artwork/index.ts`**
```ts
export { UntitledOil2024 } from './UntitledOil2024';
```

**Step 3: Add route in `App.tsx`**
```tsx
import { UntitledOil2024 } from './features/artwork';
// ...
<Route path="/artwork/untitled-oil-2024" element={<UntitledOil2024 />} />
```

**Step 4: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```

**Step 5: Commit**
```bash
git add frontend/src/features/artwork/ frontend/src/App.tsx
git commit -m "feat: first artwork page — Untitled (Oil) 2024"
```

---

## Task 8: Create `features/writing/` — index + manifest

**Files:**
- Create: `frontend/src/features/writing/types.ts`
- Create: `frontend/src/features/writing/entries.ts`
- Create: `frontend/src/features/writing/EntryRow.tsx`
- Create: `frontend/src/features/writing/WritingIndexPage.tsx`
- Create: `frontend/src/features/writing/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `types.ts`**
```ts
export type WritingType = 'essay' | 'short' | 'reflection';

export interface WritingEntry {
  id: string;
  title: string;
  date: string;       // ISO 8601: 'YYYY-MM-DD'
  type: WritingType;
  excerpt: string;
  route: string;
}
```

**Step 2: Create `entries.ts`**
```ts
import type { WritingEntry } from './types';

export const ENTRIES: WritingEntry[] = [
  {
    id: 'on-social-justice-2025',
    title: 'On Social Justice and Contemporary Art',
    date: '2025-11-10',
    type: 'essay',
    excerpt: 'How contemporary artists are responding to systemic inequality — and whether art can actually change anything.',
    route: '/writing/on-social-justice-2025',
  },
  {
    id: 'a-short-thought-2025',
    title: 'The Camera as Witness',
    date: '2025-09-04',
    type: 'short',
    excerpt: 'Three lines on what it means to document conflict.',
    route: '/writing/a-short-thought-2025',
  },
  {
    id: 'process-notes-spring-2024',
    title: 'Process Notes — Spring 2024',
    date: '2024-04-20',
    type: 'reflection',
    excerpt: 'Thinking through the studio work from this term: what worked, what didn\'t, and where next.',
    route: '/writing/process-notes-spring-2024',
  },
];
```

**Step 3: Create `EntryRow.tsx`**
```tsx
import { Box, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { WritingEntry, WritingType } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

const TYPE_COLOR: Record<WritingType, 'error' | 'primary' | 'warning'> = {
  essay: 'error',
  short: 'primary',
  reflection: 'warning',
};

interface EntryRowProps {
  entry: WritingEntry;
}

export function EntryRow({ entry }: EntryRowProps) {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      component={Link}
      to={entry.route}
      sx={{
        display: 'block',
        textDecoration: 'none',
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover h3': { color: 'primary.main' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Chip label={entry.type} color={TYPE_COLOR[entry.type]} size="small" />
        <Typography variant="caption" color="text.secondary">{formattedDate}</Typography>
      </Box>
      <Typography variant="h5" component="h3" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, mb: 1 }}>
        {entry.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">{entry.excerpt}</Typography>
    </Box>
  );
}
```

**Step 4: Create `WritingIndexPage.tsx`**
```tsx
import { Box, Typography } from '@mui/material';

import { ENTRIES } from './entries';
import { EntryRow } from './EntryRow';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function WritingIndexPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 800 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Writing
      </Typography>
      <Box>
        {ENTRIES.map((entry) => (
          <EntryRow key={entry.id} entry={entry} />
        ))}
      </Box>
    </Box>
  );
}
```

**Step 5: Create `writing/index.ts`**
```ts
export { WritingIndexPage } from './WritingIndexPage';
```

**Step 6: Add route in `App.tsx`**
```tsx
import { WritingIndexPage } from './features/writing';
// ...
<Route path="/writing" element={<WritingIndexPage />} />
```

**Step 7: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```

**Step 8: Commit**
```bash
git add frontend/src/features/writing/ frontend/src/App.tsx
git commit -m "feat: writing index page with entry manifest and type-coloured rows"
```

---

## Task 9: Create two writing entry components

Each entry is its own `.tsx` file. Add entries here as new writing is published.

**Files:**
- Create: `frontend/src/features/writing/entries/OnSocialJustice2025.tsx`
- Create: `frontend/src/features/writing/entries/AShortThought2025.tsx`
- Modify: `frontend/src/App.tsx`

**Step 1: Create essay entry — `OnSocialJustice2025.tsx`**

Essays get a full-page reading layout with large type, generous margins.
```tsx
import { Box, Divider, Typography } from '@mui/material';

import { BackLink } from '../../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function OnSocialJustice2025() {
  return (
    <Box sx={{ px: { xs: 2, md: 16 }, py: 4, maxWidth: 900, mx: 'auto' }}>
      <BackLink to="/writing" label="Back to Writing" />

      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Essay · 10 November 2025
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 2, lineHeight: 1.1 }}>
          On Social Justice and Contemporary Art
        </Typography>
        <Divider sx={{ borderColor: 'primary.main', borderBottomWidth: 3, width: 60, mb: 4 }} />
      </Box>

      <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.9, mb: 3 }}>
        {/* Replace this block with essay body */}
        How contemporary artists are responding to systemic inequality — and whether art can actually change anything.
      </Typography>

      {/* Add more paragraphs here */}
    </Box>
  );
}
```

**Step 2: Create short entry — `AShortThought2025.tsx`**

Short posts have a minimal, punchy layout — large type, very short.
```tsx
import { Box, Typography } from '@mui/material';

import { BackLink } from '../../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function AShortThought2025() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 16 },
        py: { xs: 8, md: 16 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <BackLink to="/writing" label="Back to Writing" />

      <Box sx={{ mt: 8 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Short · 4 September 2025
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 4,
            color: 'primary.main',
          }}
        >
          The Camera as Witness
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 400, lineHeight: 1.8 }}>
          {/* Replace with actual text */}
          Three lines on what it means to document conflict.
        </Typography>
      </Box>
    </Box>
  );
}
```

**Step 3: Add routes in `App.tsx`**
```tsx
import { OnSocialJustice2025 } from './features/writing/entries/OnSocialJustice2025';
import { AShortThought2025 } from './features/writing/entries/AShortThought2025';
// ...
<Route path="/writing/on-social-justice-2025" element={<OnSocialJustice2025 />} />
<Route path="/writing/a-short-thought-2025" element={<AShortThought2025 />} />
```

**Step 4: Build + lint**
```bash
cd frontend && npm run build && npm run lint
```

**Step 5: Commit**
```bash
git add frontend/src/features/writing/entries/ frontend/src/App.tsx
git commit -m "feat: first two writing entries — essay and short formats"
```

---

## Task 10: Create `features/about/`

**Files:**
- Create: `frontend/src/features/about/AboutPage.tsx`
- Create: `frontend/src/features/about/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `AboutPage.tsx`**
```tsx
import { Box, Typography, Divider } from '@mui/material';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary" sx={{ width: 120, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

export function AboutPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 900 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 2 }}>
        About
      </Typography>
      <Divider sx={{ borderColor: 'primary.main', borderBottomWidth: 3, width: 60, mb: 4 }} />

      <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.9, mb: 8, maxWidth: 640 }}>
        {/* Replace with bio */}
        Krushna is a Contemporary Arts student in Year 3, working across painting, drawing,
        film, sculpture, and performance. Her practice is concerned with [themes — add here].
      </Typography>

      <Typography variant="h5" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, mb: 2 }}>
        Education
      </Typography>
      <StatLine label="Degree" value="BA Contemporary Arts" />
      <StatLine label="Year" value="Year 3" />
      <StatLine label="University" value="[University name]" />
    </Box>
  );
}
```

**Step 2: Create `about/index.ts`**
```ts
export { AboutPage } from './AboutPage';
```

**Step 3: Add route in `App.tsx`**
```tsx
import { AboutPage } from './features/about';
// ...
<Route path="/about" element={<AboutPage />} />
```

**Step 4: Build + lint + commit**
```bash
cd frontend && npm run build && npm run lint
git add frontend/src/features/about/ frontend/src/App.tsx
git commit -m "feat: about page"
```

---

## Task 11: Create `features/contact/`

**Files:**
- Create: `frontend/src/features/contact/ContactPage.tsx`
- Create: `frontend/src/features/contact/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `ContactPage.tsx`**
```tsx
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, IconButton, Typography } from '@mui/material';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const INSTAGRAM_URL = 'https://instagram.com/[handle]';
const EMAIL = 'hello@krushna.art';

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        textDecoration: 'none',
        color: 'text.primary',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover': { color: 'primary.main' },
      }}
    >
      <IconButton component="span" sx={{ color: 'inherit', p: 0 }}>{icon}</IconButton>
      <Typography variant="h6" sx={{ fontFamily: FONT_DISPLAY }}>{label}</Typography>
    </Box>
  );
}

export function ContactPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 600 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 8 }}>
        Get in touch
      </Typography>
      <ContactLink href={`mailto:${EMAIL}`} icon={<MailOutlineIcon />} label={EMAIL} />
      <ContactLink href={INSTAGRAM_URL} icon={<InstagramIcon />} label="Instagram" />
    </Box>
  );
}
```

**Step 2: Create `contact/index.ts`**
```ts
export { ContactPage } from './ContactPage';
```

**Step 3: Add route in `App.tsx`**
```tsx
import { ContactPage } from './features/contact';
// ...
<Route path="/contact" element={<ContactPage />} />
```

**Step 4: Build + lint + commit**
```bash
cd frontend && npm run build && npm run lint
git add frontend/src/features/contact/ frontend/src/App.tsx
git commit -m "feat: contact page with email and Instagram links"
```

> **Note:** Replace `[handle]` in `INSTAGRAM_URL` and `EMAIL` constant with real values.

---

## Task 12: Create `features/hobbies/`

**Files:**
- Create: `frontend/src/features/hobbies/types.ts`
- Create: `frontend/src/features/hobbies/hobbiesData.ts`
- Create: `frontend/src/features/hobbies/HobbyCard.tsx`
- Create: `frontend/src/features/hobbies/HobbiesPage.tsx`
- Create: `frontend/src/features/hobbies/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `types.ts`**
```ts
export interface Hobby {
  id: string;
  name: string;
  description: string;
  accent: string;   // hex colour for card accent
}
```

**Step 2: Create `hobbiesData.ts`**
```ts
import type { Hobby } from './types';

export const HOBBIES: Hobby[] = [
  {
    id: 'reading',
    name: 'Reading',
    description: 'Mostly fiction — magical realism, postcolonial lit, anything strange.',
    accent: '#E63022',
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Playing and listening. Lots of ambient and electronic.',
    accent: '#1A56F0',
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Experimenting with new cuisines every weekend.',
    accent: '#F5C800',
  },
];
```

**Step 3: Create `HobbyCard.tsx`**
```tsx
import { Box, Typography } from '@mui/material';

import type { Hobby } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <Box
      sx={{
        p: 4,
        borderTop: '4px solid',
        borderColor: hobby.accent,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700, mb: 1 }}>
        {hobby.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {hobby.description}
      </Typography>
    </Box>
  );
}
```

**Step 4: Create `HobbiesPage.tsx`**
```tsx
import { Box, Grid, Typography } from '@mui/material';

import { HOBBIES } from './hobbiesData';
import { HobbyCard } from './HobbyCard';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function HobbiesPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Hobbies
      </Typography>
      <Grid container spacing={3}>
        {HOBBIES.map((hobby) => (
          <Grid key={hobby.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HobbyCard hobby={hobby} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
```

Note: MUI v7 uses `Grid size={{ xs: 12 }}` instead of `Grid item xs={12}`.

**Step 5: Create `hobbies/index.ts`**
```ts
export { HobbiesPage } from './HobbiesPage';
```

**Step 6: Add route in `App.tsx`**
```tsx
import { HobbiesPage } from './features/hobbies';
// ...
<Route path="/hobbies" element={<HobbiesPage />} />
```

**Step 7: Build + lint + commit**
```bash
cd frontend && npm run build && npm run lint
git add frontend/src/features/hobbies/ frontend/src/App.tsx
git commit -m "feat: hobbies page with card grid"
```

---

## Task 13: Add 404 Not Found page

**Files:**
- Create: `frontend/src/features/not-found/NotFoundPage.tsx`
- Create: `frontend/src/features/not-found/index.ts`
- Modify: `frontend/src/App.tsx`

**Step 1: Create `NotFoundPage.tsx`**
```tsx
import { Box, Typography } from '@mui/material';

import { BackLink } from '../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 8 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: { xs: '20vw', md: '15vw' },
          lineHeight: 1,
          color: 'primary.main',
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <BackLink to="/" label="Back to Home" />
    </Box>
  );
}
```

**Step 2: Create `not-found/index.ts`**
```ts
export { NotFoundPage } from './NotFoundPage';
```

**Step 3: Add catch-all route in `App.tsx`** (must be last route)
```tsx
import { NotFoundPage } from './features/not-found';
// ...
<Route path="*" element={<NotFoundPage />} />
```

**Step 4: Final build + all tests + lint**
```bash
cd frontend && npm run build && npm run lint && npm test -- --run
```
Expected: zero errors, all tests pass

**Step 5: Final commit**
```bash
git add frontend/src/features/not-found/ frontend/src/App.tsx
git commit -m "feat: 404 not found page"
```

---

## Final Verification Checklist

After all tasks complete:

- [ ] `npm run build` — zero TypeScript errors
- [ ] `npm run lint` — zero lint errors
- [ ] `npm test -- --run` — all tests pass
- [ ] `npm run dev` — site loads at localhost:5173
- [ ] Nav links all work (Home, Gallery, Writing, About, Hobbies, Contact)
- [ ] Gallery filter pills filter artwork by medium
- [ ] Writing index links to individual entry pages
- [ ] Back to Gallery / Back to Writing links work
- [ ] Dark mode toggle switches theme
- [ ] Mobile: hamburger menu opens red overlay, closes on link click
- [ ] Resize to 375px — no horizontal overflow on any page

---

## Adding Future Content

### New Artwork
1. Add image to `public/images/artwork/<slug>.jpg`
2. Add entry to `frontend/src/features/gallery/artworks.ts`
3. Create `frontend/src/features/artwork/<ComponentName>.tsx`
4. Add route in `App.tsx`: `<Route path="/artwork/<slug>" element={<ComponentName />} />`

### New Writing Entry
1. Add entry to `frontend/src/features/writing/entries.ts`
2. Create `frontend/src/features/writing/entries/<ComponentName>.tsx`
3. Add route in `App.tsx`: `<Route path="/writing/<slug>" element={<ComponentName />} />`

### New Hobby
1. Add entry to `frontend/src/features/hobbies/hobbiesData.ts`
