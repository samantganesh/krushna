import { useCallback, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { type Painting } from './types';
import { useScrollReveal } from './useScrollReveal';

const FONT_SERIF = '"Georgia", serif';
const REVEAL_TRANSITION = 'opacity 450ms ease, transform 450ms ease';
const HOVER_SCALE = 'scale(1.02)';
const HOVER_TRANSITION = 'transform 300ms ease';
const HIDDEN_Y = 'translateY(20px)';

function blurSrc(src: string): string {
  return src.replace('/upload/', '/upload/w_30,e_blur:1000/');
}

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
        <Typography sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', fontSize: '1rem' }}>
          {painting.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
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

interface PaintingCardProps {
  painting: Painting;
  onClick: () => void;
}

export function PaintingCard({ painting, onClick }: PaintingCardProps) {
  const { ref, revealed } = useScrollReveal();
  const [imgSrc, setImgSrc] = useState(blurSrc(painting.src));

  const handleLoad = useCallback(() => {
    setImgSrc(painting.src);
  }, [painting.src]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : HIDDEN_Y,
        transition: REVEAL_TRANSITION,
      }}
    >
      <Box
        component="img"
        src={imgSrc}
        alt={painting.title}
        onLoad={handleLoad}
        onClick={onClick}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          cursor: 'pointer',
          transition: HOVER_TRANSITION,
          '&:hover': { transform: HOVER_SCALE },
        }}
      />
      <PaintingCaption painting={painting} />
      <Divider sx={{ mb: 8, opacity: 1 }} />
    </Box>
  );
}
