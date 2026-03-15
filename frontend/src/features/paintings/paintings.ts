import { type Painting } from './types';

const OIL_ON_CANVAS = 'Oil on canvas';

// Update title, year, medium, and dimensions for each painting as needed.
// The src paths match the filenames in public/images/paintings/.
// Add dimensions as e.g. '80 × 60 cm' once you have the measurements.
export const PAINTINGS: Painting[] = [
  {
    id: 'let-the-parents-see',
    title: 'Let the Parents See',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: '/images/paintings/let-the-parents-see.jpeg',
  },
  {
    id: 'temperature',
    title: 'Temperature',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: '/images/paintings/temperature.jpeg',
  },
  {
    id: 'the-sea',
    title: 'The Sea',
    year: 2024,
    medium: OIL_ON_CANVAS,
    // Note: file is named the-sea-jpeg (no .jpeg extension) — rename if needed
    src: '/images/paintings/the-sea-jpeg',
  },
  {
    id: 'the-sun',
    title: 'The Sun',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: '/images/paintings/the-sun.jpeg',
  },
];
