# Paintings Experience Enhancement — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a lightbox viewer, scroll-triggered fade-in animations, hover scale, and blur-up image placeholders to the paintings page.

**Architecture:** Five self-contained steps — two new hooks, one new Lightbox component, one refactored PaintingCard component extracted from LayoutA, and a wiring update in PaintingsPage. No routing changes, no new routes.

**Tech Stack:** React 19, TypeScript, MUI v7, IntersectionObserver (native browser API), Cloudinary (image source already in use)

---

## ESLint Rules to Keep in Mind

- No default exports — all named exports
- No magic numbers except `0, 1, -1, 2, 3, 4, 8, 16, 24, 32, 100` — define constants at file top
- Max 300 lines per file, 50 lines per function, 20 statements per function
- No nested ternaries
- Max JSX depth 6
- `{}` type is banned — use `Record<string, unknown>` or a specific interface
- Import order: builtin → external → internal → parent → sibling → type, with newlines between groups

---

## Task 1: `useScrollReveal` hook

**Files:**
- Create: `frontend/src/features/paintings/useScrollReveal.ts`

**Step 1: Write the hook**

```typescript
import { useEffect, useRef, useState } from 'react';

const INTERSECTION_THRESHOLD = 0.1;

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, revealed };
}
```

**Step 2: Verify it compiles**

```bash
cd frontend && npm run build 2>&1 | tail -5
```
Expected: no TypeScript errors relating to `useScrollReveal`.

**Step 3: Commit**

```bash
git add frontend/src/features/paintings/useScrollReveal.ts
git commit -m "feat: add useScrollReveal hook for intersection-based fade-in"
```

---

## Task 2: `useLightbox` hook

**Files:**
- Create: `frontend/src/features/paintings/useLightbox.ts`

**Step 1: Write the hook**

```typescript
import { useCallback, useState } from 'react';

interface UseLightboxReturn {
  activeIndex: number | null;
  open: (index: number) => void;
  close: () => void;
  navigate: (dir: 1 | -1, total: number) => void;
}

export function useLightbox(): UseLightboxReturn {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const navigate = useCallback((dir: 1 | -1, total: number) => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + dir + total) % total;
    });
  }, []);

  return { activeIndex, open, close, navigate };
}
```

**Step 2: Verify it compiles**

```bash
cd frontend && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add frontend/src/features/paintings/useLightbox.ts
git commit -m "feat: add useLightbox hook for lightbox state management"
```

---

## Task 3: `Lightbox` component

**Files:**
- Create: `frontend/src/features/paintings/Lightbox.tsx`

The lightbox renders a fixed full-screen overlay with the active painting, caption, prev/next arrows, and a close button. It locks body scroll while open and handles keyboard events.

**Step 1: Write the component**

```typescript
import { useCallback, useEffect } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import { type Painting } from './types';

const FONT_SERIF = '"Georgia", serif';
const BACKDROP_OPACITY = 0.92;
const IMG_MAX_HEIGHT = '82vh';
const IMG_MAX_WIDTH = '90vw';
const ARROW_FONT_SIZE = '2rem';
const CAPTION_MT = 2;

interface LightboxProps {
  paintings: Painting[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

export function Lightbox({ paintings, activeIndex, onClose, onNavigate }: LightboxProps) {
  const painting = paintings[activeIndex];

  const handleNavigateBack = useCallback(() => {
    onNavigate(-1);
  }, [onNavigate]);

  const handleNavigateForward = useCallback(() => {
    onNavigate(1);
  }, [onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onNavigate]);

  if (painting === undefined) return null;

  const meta = [painting.year, painting.medium, painting.dimensions]
    .filter(Boolean)
    .join(' · ');

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: `rgba(0,0,0,${BACKDROP_OPACITY})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        aria-label="Close lightbox"
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
      >
        ✕
      </IconButton>

      {/* Prev arrow */}
      <IconButton
        onClick={(e) => { e.stopPropagation(); handleNavigateBack(); }}
        aria-label="Previous painting"
        sx={{ position: 'absolute', left: 16, color: 'white', fontSize: ARROW_FONT_SIZE }}
      >
        ‹
      </IconButton>

      {/* Image + caption — stop propagation so clicking image doesn't close */}
      <Box
        onClick={(e) => { e.stopPropagation(); }}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          component="img"
          src={painting.src}
          alt={painting.title}
          sx={{
            maxHeight: IMG_MAX_HEIGHT,
            maxWidth: IMG_MAX_WIDTH,
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <Box
          sx={{
            mt: CAPTION_MT,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: 'white' }}>
            {painting.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>
            {meta}
          </Typography>
        </Box>
      </Box>

      {/* Next arrow */}
      <IconButton
        onClick={(e) => { e.stopPropagation(); handleNavigateForward(); }}
        aria-label="Next painting"
        sx={{ position: 'absolute', right: 16, color: 'white', fontSize: ARROW_FONT_SIZE }}
      >
        ›
      </IconButton>
    </Box>
  );
}
```

**Step 2: Verify it compiles**

```bash
cd frontend && npm run build 2>&1 | tail -10
```
Expected: no errors.

**Step 3: Commit**

```bash
git add frontend/src/features/paintings/Lightbox.tsx
git commit -m "feat: add Lightbox component for full-screen painting viewer"
```

---

## Task 4: `PaintingCard` component + update `LayoutA`

Extract each painting row into a `PaintingCard` component that handles scroll reveal, hover, blur-up placeholder, and click-to-open. Then simplify `LayoutA` to render a list of `PaintingCard`s.

**Files:**
- Create: `frontend/src/features/paintings/PaintingCard.tsx`
- Modify: `frontend/src/features/paintings/LayoutA.tsx`

### 4a — Create `PaintingCard.tsx`

A Cloudinary blur URL is formed by inserting `w_30,e_blur:1000/` after `/upload/` in the image URL.

```typescript
import { useCallback, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { type Painting } from './types';
import { useScrollReveal } from './useScrollReveal';

const FONT_SERIF = '"Georgia", serif';
const REVEAL_TRANSITION = 'opacity 450ms ease, transform 450ms ease';
const HOVER_SCALE = 'scale(1.02)';
const HOVER_TRANSITION = 'transform 300ms ease';
const HIDDEN_Y = 'translateY(20px)';

function blurSrc(src: string): string {
  return src.replace('/upload/', '/upload/w_30,e_blur:1000/');
}

interface PaintingCaptionProps {
  painting: Painting;
}

function PaintingCaption({ painting }: PaintingCaptionProps) {
  const meta = [painting.year, painting.medium, painting.dimensions]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 1,
          mt: 1.5,
          mb: painting.description ? 2 : 3,
        }}
      >
        <Typography sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: '1rem' }}>
          {painting.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
          {meta}
        </Typography>
      </Box>
      {painting.description ? (
        <Box sx={{ mb: 3, maxWidth: 600 }}>
          {painting.description.split('\n\n').map((para) => (
            <Typography
              key={para}
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}
            >
              {para}
            </Typography>
          ))}
        </Box>
      ) : null}
    </>
  );
}

interface PaintingCardProps {
  painting: Painting;
  onClick: () => void;
}

export function PaintingCard({ painting, onClick }: PaintingCardProps) {
  const { ref, revealed } = useScrollReveal();
  const [imgSrc, setImgSrc] = useState(blurSrc(painting.src));

  const handleLoad = useCallback(() => {
    setImgSrc(painting.src);
  }, [painting.src]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : HIDDEN_Y,
        transition: REVEAL_TRANSITION,
      }}
    >
      <Box
        component="img"
        src={imgSrc}
        alt={painting.title}
        onLoad={handleLoad}
        onClick={onClick}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer',
          transition: HOVER_TRANSITION,
          '&:hover': { transform: HOVER_SCALE },
        }}
      />
      <PaintingCaption painting={painting} />
      <Divider sx={{ mb: 8, opacity: 1 }} />
    </Box>
  );
}
```

**Note on blur-up:** The `handleLoad` fires when the blurred image loads, immediately swapping to the full-res src. Because the blurred image loads near-instantly (it's tiny), the full image starts loading as soon as the component mounts — giving a smooth progressive reveal.

### 4b — Update `LayoutA.tsx`

Replace the inline map-with-img with `PaintingCard`. Remove `PaintingCaption` (it now lives in `PaintingCard`).

```typescript
import { Box } from '@mui/material';

import { PaintingCard } from './PaintingCard';
import { type Painting } from './types';

const MAX_PAINTING_WIDTH = 840;

interface LayoutAProps {
  paintings: Painting[];
  onPaintingClick: (index: number) => void;
}

export function LayoutA({ paintings, onPaintingClick }: LayoutAProps) {
  return (
    <Box sx={{ maxWidth: MAX_PAINTING_WIDTH, mx: 'auto', px: { xs: 2, md: 4 } }}>
      {paintings.map((p, i) => (
        <PaintingCard
          key={p.id}
          painting={p}
          onClick={() => { onPaintingClick(i); }}
        />
      ))}
    </Box>
  );
}
```

**Step: Verify it compiles**

```bash
cd frontend && npm run build 2>&1 | tail -10
```

**Step: Commit**

```bash
git add frontend/src/features/paintings/PaintingCard.tsx frontend/src/features/paintings/LayoutA.tsx
git commit -m "feat: add PaintingCard with scroll reveal, hover, and blur-up placeholder"
```

---

## Task 5: Wire lightbox in `PaintingsPage`

**Files:**
- Modify: `frontend/src/features/paintings/PaintingsPage.tsx`

Update `PaintingsPage` to use `useLightbox`, pass `onPaintingClick` to `LayoutA`, and render `Lightbox` when active.

```typescript
import { Box, Typography } from '@mui/material';

import { Lightbox } from './Lightbox';
import { LayoutA } from './LayoutA';
import { PAINTINGS } from './paintings';
import { useInfiniteScroll } from './useInfiniteScroll';
import { useLightbox } from './useLightbox';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const SENTINEL_HEIGHT = 120;

export function PaintingsPage() {
  const { visibleCount, sentinelRef } = useInfiniteScroll(PAINTINGS.length);
  const visible = PAINTINGS.slice(0, visibleCount);
  const { activeIndex, open, close, navigate } = useLightbox();

  const handleNavigate = (dir: 1 | -1) => {
    navigate(dir, PAINTINGS.length);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ px: { xs: 2, md: 8 }, mb: 4 }}>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY }}>
          Paintings
        </Typography>
      </Box>

      <LayoutA paintings={visible} onPaintingClick={open} />

      {visibleCount < PAINTINGS.length && (
        <Box ref={sentinelRef} sx={{ height: SENTINEL_HEIGHT }} aria-hidden="true" />
      )}

      {activeIndex !== null && (
        <Lightbox
          paintings={PAINTINGS}
          activeIndex={activeIndex}
          onClose={close}
          onNavigate={handleNavigate}
        />
      )}
    </Box>
  );
}
```

**Step: Verify it compiles and lints**

```bash
cd frontend && npm run build && npm run lint 2>&1 | tail -20
```
Expected: no errors.

**Step: Manual smoke test**

```bash
cd frontend && npm run dev
```

Open `http://localhost:5173/paintings` and verify:
- Paintings fade in as the page loads/scrolls
- Hovering an image scales it slightly
- Clicking an image opens the lightbox
- `←`/`→` keys navigate between paintings
- `Esc` closes the lightbox
- Clicking the backdrop closes the lightbox

**Step: Commit**

```bash
git add frontend/src/features/paintings/PaintingsPage.tsx
git commit -m "feat: wire lightbox into PaintingsPage"
```

---

## Task 6: Final lint + format pass

```bash
cd frontend && npm run lint && npm run format
```

Fix any lint warnings. Then:

```bash
git add -p  # stage any formatting fixes
git commit -m "chore: lint and format paintings experience feature"
```
