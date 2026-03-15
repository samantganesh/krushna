import { Box, Divider, Typography } from '@mui/material';

import { type Painting } from './types';

// Layout C: two-column — image left, info right (alternates sides).
// On mobile: stacked (image then info below).

const FONT_SERIF = '"Georgia", serif';
const IMAGE_FLEX_BASIS = '58%';
const MAX_LAYOUT_WIDTH = 1100;
const TEXT_SECONDARY = 'text.secondary';

interface PaintingRowProps {
  painting: Painting;
  index: number;
}

function InfoPanel({ painting }: { painting: Painting }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 0, md: 4 },
        py: { xs: 2, md: 0 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', mb: 2 }}
      >
        {painting.title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" sx={{ color: TEXT_SECONDARY, mb: 0.5 }}>
        {painting.year}
      </Typography>
      <Typography variant="body2" sx={{ color: TEXT_SECONDARY, mb: 0.5 }}>
        {painting.medium}
      </Typography>
      {painting.dimensions !== undefined && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {painting.dimensions}
        </Typography>
      )}
    </Box>
  );
}

function PaintingRow({ painting, index }: PaintingRowProps) {
  const isEven = index % 2 === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
        alignItems: 'center',
        mb: 10,
        gap: { xs: 0, md: 2 },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          flexBasis: { xs: '100%', md: IMAGE_FLEX_BASIS },
          maxWidth: { xs: '100%', md: IMAGE_FLEX_BASIS },
        }}
      >
        <Box
          component="img"
          src={painting.src}
          alt={painting.title}
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>
      <Box sx={{ flex: 1, width: '100%' }}>
        <InfoPanel painting={painting} />
      </Box>
    </Box>
  );
}

interface LayoutCProps {
  paintings: Painting[];
}

export function LayoutC({ paintings }: LayoutCProps) {
  return (
    <Box sx={{ maxWidth: MAX_LAYOUT_WIDTH, mx: 'auto', px: { xs: 2, md: 6 } }}>
      {paintings.map((p, i) => (
        <PaintingRow key={p.id} painting={p} index={i} />
      ))}
    </Box>
  );
}
