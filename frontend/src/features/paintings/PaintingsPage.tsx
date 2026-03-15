import { Box, Typography } from '@mui/material';

import { LayoutA } from './LayoutA';
import { PAINTINGS } from './paintings';
import { useInfiniteScroll } from './useInfiniteScroll';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const SENTINEL_HEIGHT = 120;

export function PaintingsPage() {
  const { visibleCount, sentinelRef } = useInfiniteScroll(PAINTINGS.length);
  const visible = PAINTINGS.slice(0, visibleCount);

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ px: { xs: 2, md: 8 }, mb: 4 }}>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY }}>
          Paintings
        </Typography>
      </Box>

      <LayoutA paintings={visible} />

      {visibleCount < PAINTINGS.length && (
        <Box ref={sentinelRef} sx={{ height: SENTINEL_HEIGHT }} aria-hidden="true" />
      )}
    </Box>
  );
}
