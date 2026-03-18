import { Box, IconButton, Typography } from '@mui/material';
import { type MouseEvent, useCallback, useEffect } from 'react';

import { type Painting } from './types';

const LIGHTBOX_Z_INDEX = 1300;
const FONT_SERIF = '"Georgia", serif';
const BACKDROP_OPACITY_CSS = 'rgba(0,0,0,0.92)';
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

function useLightboxEffects(
  onClose: () => void,
  onNavigate: (dir: 1 | -1) => void
) {
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
}

interface CaptionProps {
  painting: Painting;
}

function LightboxCaption({ painting }: CaptionProps) {
  const meta = [painting.year, painting.medium, painting.dimensions]
    .filter(Boolean)
    .join(' · ');

  return (
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
      <Typography
        sx={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: 'white' }}
      >
        {painting.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}
      >
        {meta}
      </Typography>
    </Box>
  );
}

interface ImageAreaProps {
  painting: Painting;
  onStopPropagation: (e: MouseEvent) => void;
}

function LightboxImageArea({ painting, onStopPropagation }: ImageAreaProps) {
  return (
    <Box
      onClick={onStopPropagation}
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
      <LightboxCaption painting={painting} />
    </Box>
  );
}

interface CloseButtonProps {
  onClose: () => void;
}

function LightboxCloseButton({ onClose }: CloseButtonProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-label="Close lightbox"
      sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
    >
      ✕
    </IconButton>
  );
}

interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onNavigate: () => void;
}

function LightboxArrowButton({ direction, onNavigate }: ArrowButtonProps) {
  const isPrev = direction === 'prev';
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onNavigate();
      }}
      aria-label={isPrev ? 'Previous painting' : 'Next painting'}
      sx={{
        position: 'absolute',
        [isPrev ? 'left' : 'right']: 16,
        color: 'white',
        fontSize: ARROW_FONT_SIZE,
      }}
    >
      {isPrev ? '‹' : '›'}
    </IconButton>
  );
}

export function Lightbox({
  paintings,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const painting = paintings[activeIndex];

  const handleNavigateBack = useCallback(() => {
    onNavigate(-1);
  }, [onNavigate]);
  const handleNavigateForward = useCallback(() => {
    onNavigate(1);
  }, [onNavigate]);
  const handleStopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  useLightboxEffects(onClose, onNavigate);

  if (painting === undefined) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: LIGHTBOX_Z_INDEX,
        bgcolor: BACKDROP_OPACITY_CSS,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LightboxCloseButton onClose={onClose} />
      <LightboxArrowButton direction="prev" onNavigate={handleNavigateBack} />
      <LightboxImageArea
        painting={painting}
        onStopPropagation={handleStopPropagation}
      />
      <LightboxArrowButton
        direction="next"
        onNavigate={handleNavigateForward}
      />
    </Box>
  );
}
