import { type Painting } from './types';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/db9fqisro/image/upload/krushna/paintings';
const A4_LANDSCAPE = '23.4 x 33.1 Inches';

// To add a new painting:
// 1. Run: uv run --script scripts/upload_to_cloudinary.py paintings
// 2. Add an entry below using the Cloudinary public_id as the src filename.
export const PAINTINGS: Painting[] = [
  {
    id: 'field',
    title: 'Field',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: A4_LANDSCAPE,
    description:
      'This painting depicts a field at dusk. As the sun is setting its final rays hitting some taller parts of the field. Dried grass getting lit up, almost looking like a fire. The bright colours seen on a dark blue sky.',
    src: `${CLOUDINARY_BASE}/field.jpeg`,
  },
  {
    id: 'let-the-parents-see',
    title: 'Let the Parents See',
    year: 2024,
    medium: 'Acrylic on paper',
    dimensions: 'A1',
    description:
      "This work is based on the audiobook 'My Struggle, Book 1 - Death in the Family' by Karl Ove Knausgaard. After studying the works of Cy Twombly (Iliad: Series), I made this illustration while listening to the audiobook.\n\nThis work is based on the very start of the book. Where the author describes an accident of a woman in the snow. Her body lying there, with her face crushed and the snow soaking in the blood. The author says that we must be decent with the relatives of the dead. Let them have their last moments with their loved ones. Let the parents see their child lying there, bleeding in the snow.",
    src: `${CLOUDINARY_BASE}/let-the-parents-see.jpg`,
  },
  {
    id: 'temperature',
    title: 'Temperature',
    year: 2024,
    medium: 'Oil and acrylic on canvas',
    dimensions: '48 x 48 Inches',
    description:
      "I wanted to see how I could depict 'temperature', the transition from warm to cold, like lava cooling down. To achieve that, I used warm tones like reds and oranges and cooler tones like blues and greens; but what I wanted to do is make the cooler tones 'feel' a little warmer than they are supposed to be and warmer tones cooler than the blues and greens. Not everywhere, but as they transition from one to another.",
    src: `${CLOUDINARY_BASE}/temperature.jpg`,
  },
  {
    id: 'the-sea',
    title: 'The Sea',
    year: 2024,
    medium: 'Acrylic and oil on canvas',
    dimensions: A4_LANDSCAPE,
    description:
      'I wanted to paint what it looks like when you swim so deep inside the sea you see nothing but the blues. And the waves are so minimal, so surface level that they look like light lines. The more you look, the more shades of blues you see.',
    src: `${CLOUDINARY_BASE}/the-sea.jpg`,
  },
  {
    id: 'the-sun',
    title: 'The Sun',
    year: 2024,
    medium: 'Oil on canvas',
    dimensions: A4_LANDSCAPE,
    description:
      'I wanted to paint how it would look if you stood very close to the sun. Something Icarus might have seen after flying up high. Something very colourful and bright. It would not really matter if I got burnt or lost my eyesight if I got to see the Sun this up close.',
    src: `${CLOUDINARY_BASE}/the-sun.jpg`,
  },
];
