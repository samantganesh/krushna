# Paintings Page Experience Enhancement — Design

**Date:** 2026-03-18
**Status:** Approved

## Goal

Enhance the paintings page with a lightbox viewer, scroll-triggered animations, hover effects, and blur-up image placeholders — without changing the existing editorial layout.

## Lightbox

A full-screen overlay triggered by clicking any painting image.

- **Backdrop**: `rgba(0,0,0,0.92)` covering full viewport; clicking it closes the lightbox
- **Image**: centered, `max-height: 90vh`, `max-width: 90vw`, `object-fit: contain`
- **Caption bar**: below the image — italic title on the left, `year · medium · dimensions` on the right (matches existing caption style)
- **Navigation**: left/right arrow buttons; wraps around (last → first, first → last)
- **Close button**: X button top-right corner
- **Keyboard**: `←`/`→` to navigate, `Esc` to close; scroll lock on body while open
- **Cursor**: pointer on painting images to signal clickability

## Scroll Animations

Each painting fades in as it enters the viewport.

- Initial state: `opacity: 0`, `transform: translateY(20px)`
- Final state: `opacity: 1`, `transform: translateY(0)`, transition `450ms ease`
- Triggered by `IntersectionObserver` (same pattern as existing `useInfiniteScroll`)
- Trigger threshold: `0.1` (fires when 10% of element is visible)

## Hover Effect

- On painting image: `scale(1.02)`, transition `300ms ease`
- Cursor: `pointer`

## Blur-Up Placeholder

- Show a Cloudinary low-quality blurred version (`w_30,e_blur:1000` transformation) as the `src` initially
- Once the full image loads (`onLoad`), swap to the full-resolution URL
- No layout shift — the image slot dimensions are already reserved

## Architecture

- New `Lightbox` component in `features/paintings/` — receives `paintings`, `activeIndex`, `onClose`, `onNavigate` props
- New `useLightbox` hook — manages `activeIndex | null` state and open/close/navigate handlers
- New `useScrollReveal` hook — attaches `IntersectionObserver` to a ref, returns `revealed: boolean`
- `LayoutA` updated to: use `useScrollReveal` per painting, add hover styles, add blur-up placeholder logic, wire click → lightbox open
- `PaintingsPage` updated to: instantiate `useLightbox`, render `Lightbox` when active

## Out of Scope

- Per-painting detail routes (`/paintings/:id`)
- Inline expand behavior
- Touch swipe gestures (can be added later)
