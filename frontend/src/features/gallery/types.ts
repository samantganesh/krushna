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
