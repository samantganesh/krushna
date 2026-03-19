import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { ArtworkGrid } from './ArtworkGrid';
import { ARTWORKS } from './artworks';
import { MediumFilter } from './MediumFilter';
import { type ArtworkMedium } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function GalleryPage() {
  const [filter, setFilter] = useState<ArtworkMedium | 'all'>('all');

  const filtered =
    filter === 'all' ? ARTWORKS : ARTWORKS.filter((a) => a.medium === filter);

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Gallery
      </Typography>
      <MediumFilter value={filter} onChange={setFilter} />
      <ArtworkGrid artworks={filtered} />
    </Box>
  );
}
