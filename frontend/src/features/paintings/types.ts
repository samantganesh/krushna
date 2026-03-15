export interface Painting {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions?: string;
  src: string;
}

export type LayoutVariant = 'A' | 'B' | 'C';
