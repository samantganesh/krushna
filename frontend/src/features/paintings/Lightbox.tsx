import { useCallback, useEffect } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import { type Painting } from './types';

const FONT_SERIF = '"Georgia", serif';
const BACKDROP_OPACITY = 0.92;
const IMG_MAX_HEIGHT = '82vh';
const IMG_MAX_WIDTH = '90vw';
const ARROW_FONT_SIZE = '2rem';
const CAPTION_MT = 2;

interface LightboxProps {
  paintings: Painting[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

export function Lightbox({ paintings, activeIndex, onClose, onNavigate }: LightboxProps) {
  const painting = paintings[activeIndex];

  const handleNavigateBack = useCallback(() => {
    onNavigate(-1);
  }, [onNavigate]);

  const handleNavigateForward = useCallback(() => {
    onNavigate(1);
  }, [onNavigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onNavigate]);

  if (painting === undefined) return null;

  const meta = [painting.year, painting.medium, painting.dimensions]
    .filter(Boolean)
    .join(' · ');

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: `rgba(0,0,0,${BACKDROP_OPACITY})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        aria-label="Close lightbox"
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
      >
        ✕
      </IconButton>

      {/* Prev arrow */}
      <IconButton
        onClick={(e) => { e.stopPropagation(); handleNavigateBack(); }}
        aria-label="Previous painting"
        sx={{ position: 'absolute', left: 16, color: 'white', fontSize: ARROW_FONT_SIZE }}
      >
        ‹
      </IconButton>

      {/* Image + caption */}
      <Box
        onClick={(e) => { e.stopPropagation(); }}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          component="img"
          src={painting.src}
          alt={painting.title}
          sx={{
            maxHeight: IMG_MAX_HEIGHT,
            maxWidth: IMG_MAX_WIDTH,
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <Box
          sx={{
            mt: CAPTION_MT,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: 'white' }}>
            {painting.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>
            {meta}
          </Typography>
        </Box>
      </Box>

      {/* Next arrow */}
      <IconButton
        onClick={(e) => { e.stopPropagation(); handleNavigateForward(); }}
        aria-label="Next painting"
        sx={{ position: 'absolute', right: 16, color: 'white', fontSize: ARROW_FONT_SIZE }}
      >
        ›
      </IconButton>
    </Box>
  );
}
