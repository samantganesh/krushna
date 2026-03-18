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
    <Box
      sx={{ maxWidth: MAX_PAINTING_WIDTH, mx: 'auto', px: { xs: 2, md: 4 } }}
    >
      {paintings.map((p, i) => (
        <PaintingCard
          key={p.id}
          painting={p}
          onClick={() => {
            onPaintingClick(i);
          }}
        />
      ))}
    </Box>
  );
}
