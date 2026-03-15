import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { type Painting } from './types';

// Layout B: painting full-width, info overlays from the bottom.
// On mobile: always visible. On desktop: fades in on hover.

const MAX_PAINTING_WIDTH = 960;
const OVERLAY_CAPTION_OPACITY = 0.75;
const OVERLAY_TRANSLATE_Y_PX = '10px';

interface OverlayCaptionProps {
  painting: Painting;
  visible: boolean;
}

function OverlayCaption({ painting, visible }: OverlayCaptionProps) {
  const meta = [painting.medium, painting.dimensions].filter(Boolean).join(' · ');

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.72))',
        color: 'white',
        px: 3,
        py: 2,
        pt: 4,
        opacity: { xs: 1, md: visible ? 1 : 0 },
        transform: {
          xs: 'none',
          md: visible ? 'translateY(0)' : `translateY(${OVERLAY_TRANSLATE_Y_PX})`,
        },
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      <Typography sx={{ fontStyle: 'italic', mb: 0.5 }}>
        {painting.title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: OVERLAY_CAPTION_OPACITY }}>
        {painting.year}
        {meta.length > 0 ? ` · ${meta}` : ''}
      </Typography>
    </Box>
  );
}

interface PaintingOverlayProps {
  painting: Painting;
}

function PaintingWithOverlay({ painting }: PaintingOverlayProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      sx={{ position: 'relative', mb: 6 }}
    >
      <Box
        component="img"
        src={painting.src}
        alt={painting.title}
        sx={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <OverlayCaption painting={painting} visible={hovered} />
    </Box>
  );
}

interface LayoutBProps {
  paintings: Painting[];
}

export function LayoutB({ paintings }: LayoutBProps) {
  return (
    <Box sx={{ maxWidth: MAX_PAINTING_WIDTH, mx: 'auto', px: { xs: 2, md: 4 } }}>
      {paintings.map((p) => (
        <PaintingWithOverlay key={p.id} painting={p} />
      ))}
    </Box>
  );
}
