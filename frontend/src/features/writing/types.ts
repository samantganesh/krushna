export type WritingType = 'essay' | 'short' | 'reflection';

export interface WritingEntry {
  id: string;
  title: string;
  date: string;
  type: WritingType;
  excerpt: string;
  route: string;
}
