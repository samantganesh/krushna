import { Box, Divider, Typography } from '@mui/material';

import { type Painting } from './types';

// Layout A: painting centered, caption strip below (title left, metadata right).
// Clean editorial feel — lets the image breathe.

const FONT_SERIF = '"Georgia", serif';
const MAX_PAINTING_WIDTH = 840;

interface PaintingCaptionProps {
  painting: Painting;
}

function PaintingCaption({ painting }: PaintingCaptionProps) {
  const meta = [painting.year, painting.medium, painting.dimensions]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 1,
          mt: 1.5,
          mb: painting.description ? 2 : 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontSize: '1rem',
          }}
        >
          {painting.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'right' }}
        >
          {meta}
        </Typography>
      </Box>
      {painting.description ? (
        <Box sx={{ mb: 3, maxWidth: 600 }}>
          {painting.description.split('\n\n').map((para) => (
            <Typography
              key={para}
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}
            >
              {para}
            </Typography>
          ))}
        </Box>
      ) : null}
    </>
  );
}

interface LayoutAProps {
  paintings: Painting[];
}

export function LayoutA({ paintings }: LayoutAProps) {
  return (
    <Box sx={{ maxWidth: MAX_PAINTING_WIDTH, mx: 'auto', px: { xs: 2, md: 4 } }}>
      {paintings.map((p) => (
        <Box key={p.id}>
          <Box
            component="img"
            src={p.src}
            alt={p.title}
            sx={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <PaintingCaption painting={p} />
          <Divider sx={{ mb: 8, opacity: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
