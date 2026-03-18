import { useCallback } from 'react';

import { Box, Typography } from '@mui/material';

import { LayoutA } from './LayoutA';
import { Lightbox } from './Lightbox';
import { PAINTINGS } from './paintings';
import { useInfiniteScroll } from './useInfiniteScroll';
import { useLightbox } from './useLightbox';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const SENTINEL_HEIGHT = 120;

export function PaintingsPage() {
  const { visibleCount, sentinelRef } = useInfiniteScroll(PAINTINGS.length);
  const visible = PAINTINGS.slice(0, visibleCount);
  const { activeIndex, open, close, navigate } = useLightbox();

  const handleNavigate = useCallback(
    (dir: 1 | -1) => {
      navigate(dir, PAINTINGS.length);
    },
    [navigate],
  );

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ px: { xs: 2, md: 8 }, mb: 4 }}>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY }}>
          Paintings
        </Typography>
      </Box>

      <LayoutA paintings={visible} onPaintingClick={open} />

      {visibleCount < PAINTINGS.length && (
        <Box ref={sentinelRef} sx={{ height: SENTINEL_HEIGHT }} aria-hidden="true" />
      )}

      {activeIndex !== null && (
        <Lightbox
          paintings={PAINTINGS}
          activeIndex={activeIndex}
          onClose={close}
          onNavigate={handleNavigate}
        />
      )}
    </Box>
  );
}
