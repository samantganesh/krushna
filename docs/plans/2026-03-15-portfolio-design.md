# Krushna Portfolio Website — Design Document

**Date:** 2026-03-15
**Status:** Approved

---

## Overview

A fully professional, vibrant personal portfolio for Krushna — a Contemporary Arts BA Year 3 student. The site showcases multi-disciplinary work (Painting, Drawing, Film, Sculpture, Performance) and writing (short posts + long essays on social justice, contemporary issues). Design philosophy: the site itself feels like art — bold, expressive, colour-forward.

---

## Approach

**Option A — Feature-per-page, flat routing.** Every page and every piece of content (artwork, writing entry) is its own isolated feature/component. No CMS, no backend. Data manifests are typed TS arrays. Adding content = add a file + register a route.

---

## Architecture & Folder Structure

```
frontend/src/
├── App.tsx                          # routes + top navbar
├── features/
│   ├── core/
│   │   ├── theme/                   # extended with bold palette
│   │   ├── main-app-layout/         # replaced: topbar-only, no sidebar
│   │   ├── markdown-viewer/         # existing
│   │   └── nav/                     # NEW: TopNav (responsive)
│   │
│   ├── home/                        # Landing page
│   ├── gallery/                     # Gallery browse + filtering
│   ├── artwork/                     # Individual artwork pages
│   │   ├── PaintingSeriesOne.tsx
│   │   └── ...
│   ├── writing/                     # Writing index + entries
│   │   ├── WritingIndexPage.tsx
│   │   ├── entries.ts               # manifest
│   │   └── entries/
│   │       ├── OnSocialJustice2025.tsx
│   │       └── ...
│   ├── about/
│   ├── contact/
│   └── hobbies/
```

**Architectural rules (enforced by ESLint boundaries):**
- `core/` features may be imported by any feature
- Non-core features cannot import from sibling features
- Each feature is a self-contained module

---

## Visual Design

### Colour Palette — Bold Primaries
| Token | Value | Use |
|-------|-------|-----|
| Primary | `#E63022` | CTAs, logo, accents |
| Secondary | `#1A56F0` | Links, highlights |
| Accent | `#F5C800` | Tags, hover states |
| Background light | `#FAFAF7` | Light mode bg |
| Background dark | `#0D0D0D` | Dark mode bg |

### Typography
- **Display / headings:** Space Grotesk (geometric, contemporary)
- **Body:** Inter (clean, readable)
- Writing entries may override typography per-component

### Top Navbar
- Fixed, full-width, 56px tall
- Logo: "Krushna" in Space Grotesk bold, primary red
- Links: Home · Gallery · Writing · About · Hobbies · Contact
- Mobile: hamburger → full-screen overlay in primary red
- Dark/light mode toggle top-right (existing ThemeSwitcher)

### Page Designs

**Home / Landing**
- Full-viewport hero: large typographic name + rotating tagline
- Three bold teaser panels below (Gallery / Writing / Hobbies) in primary colours
- No hero image — artwork lives in the gallery

**Gallery**
- Masonry grid with filter pills by medium (All · Painting · Drawing · Film · Sculpture · Performance)
- Tile: image only; title + year appear on hover
- Click → individual artwork page

**Writing Index**
- List view: title, date, type tag (Essay / Short / Reflection), one-line excerpt
- Short posts expandable inline; essays link to dedicated page

**Individual Artwork & Writing Entry Pages**
- No enforced template — each `.tsx` is a blank canvas
- Only shared element: `<BackLink />` core component

---

## Routing

All routes flat, registered in `App.tsx`:

```
/                              → HomePage
/gallery                       → GalleryPage
/artwork/:slug                 → individual artwork .tsx files
/writing                       → WritingIndexPage
/writing/:slug                 → individual writing entry .tsx files
/about                         → AboutPage
/contact                       → ContactPage
/hobbies                       → HobbiesPage
```

---

## Data Manifests

### `features/gallery/artworks.ts`
```ts
interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: 'painting' | 'drawing' | 'film' | 'sculpture' | 'performance' | 'other';
  thumbnailSrc: string;
  route: string;
}
```

### `features/writing/entries.ts`
```ts
interface WritingEntry {
  id: string;
  title: string;
  date: string;          // ISO 8601
  type: 'essay' | 'short' | 'reflection';
  excerpt: string;
  route: string;
}
```

Adding artwork: add object to `artworks.ts` + create `features/artwork/MyNewPiece.tsx` + register route.
Adding writing: add object to `entries.ts` + create `features/writing/entries/MyEntry.tsx` + register route.

---

## State Management

- **Zustand:** not needed at launch — all data is static manifests
- Add Zustand when: Instagram feed integration, contact form state, or any async data

---

## Responsiveness

- Mobile-first MUI breakpoints throughout
- Navbar collapses to hamburger on `xs`/`sm`
- Gallery grid: 1 col (xs) → 2 col (sm) → 3 col (md) → 4 col (lg)
- All pages tested at 375px, 768px, 1280px, 1440px

---

## Out of Scope (for now)

- Instagram feed auto-pull (architecture kept open)
- CMS / admin panel
- Backend / database
- Authentication
- Comments / interactions
