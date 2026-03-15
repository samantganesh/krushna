import { type Painting } from './types';

const OIL_ON_CANVAS = 'Oil on canvas';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/db9fqisro/image/upload/krushna/paintings';

// To add a new painting:
// 1. Run: uv run --script scripts/upload_to_cloudinary.py paintings
// 2. Add an entry below using the Cloudinary public_id as the src filename.
export const PAINTINGS: Painting[] = [
  {
    id: 'let-the-parents-see',
    title: 'Let the Parents See',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: `${CLOUDINARY_BASE}/let-the-parents-see.jpg`,
  },
  {
    id: 'temperature',
    title: 'Temperature',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: `${CLOUDINARY_BASE}/temperature.jpg`,
  },
  {
    id: 'the-sea',
    title: 'The Sea',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: `${CLOUDINARY_BASE}/the-sea.jpg`,
  },
  {
    id: 'the-sun',
    title: 'The Sun',
    year: 2024,
    medium: OIL_ON_CANVAS,
    src: `${CLOUDINARY_BASE}/the-sun.jpg`,
  },
];
