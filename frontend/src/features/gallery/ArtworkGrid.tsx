import { Box, ImageList, ImageListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import  { type Artwork } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_SEMIBOLD = 600;
const GRID_COLS_MD = 3;
const GRID_COLS_SM = 2;

interface ArtworkGridProps {
  artworks: Artwork[];
}

function ArtworkTile({ artwork }: { artwork: Artwork }) {
  return (
    <ImageListItem
      component={Link}
      to={artwork.route}
      sx={{
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
        position: 'relative',
        '&:hover .overlay': { opacity: 1 },
      }}
    >
      <img
        src={artwork.thumbnailSrc}
        alt={artwork.title}
        loading="lazy"
        style={{ width: '100%', display: 'block' }}
      />
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.7)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ color: 'white', fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_SEMIBOLD }}>
          {artwork.title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {artwork.year}
        </Typography>
      </Box>
    </ImageListItem>
  );
}

function getGridCols(isMd: boolean, isSm: boolean): number {
  if (isMd) return GRID_COLS_MD;
  if (isSm) return GRID_COLS_SM;
  return 1;
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const cols = getGridCols(isMd, isSm);

  return (
    <ImageList variant="masonry" cols={cols} gap={8}>
      {artworks.map((artwork) => (
        <ArtworkTile key={artwork.id} artwork={artwork} />
      ))}
    </ImageList>
  );
}
