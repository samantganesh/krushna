import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PHOTO_SRC = '/images/field.jpeg';
const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const NAV_HEIGHT = '56px';
const DARK_BG = '#0D0D0D';
const GRADIENT_OVERLAY =
  'linear-gradient(to right, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.45) 65%, rgba(13,13,13,0.05) 100%)';

const NAV_LINKS = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Writing', to: '/writing' },
  { label: 'Hobbies', to: '/hobbies' },
] as const;

function ImmersiveNavStrip() {
  return (
    <Box
      sx={{
        bgcolor: DARK_BG,
        px: { xs: 3, md: 8 },
        py: 3,
        display: 'flex',
        gap: 6,
        borderTop: '2px solid',
        borderColor: 'primary.main',
      }}
    >
      {NAV_LINKS.map(({ label, to }) => (
        <Box
          key={label}
          component={Link}
          to={to}
          sx={{
            fontFamily: FONT_DISPLAY,
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            '&:hover': { color: '#E63022' },
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
}

function ImmersiveHero() {
  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        backgroundImage: `url(${PHOTO_SRC})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        bgcolor: DARK_BG,
        minHeight: { xs: '60vw', md: '70vh' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: GRADIENT_OVERLAY,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: { xs: 3, md: 8 },
          pb: 6,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: { xs: '14vw', md: '9vw' },
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'white',
            mb: 2,
          }}
        >
          Krushna
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT_DISPLAY,
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Contemporary Arts · BA Year 3
        </Typography>
      </Box>
    </Box>
  );
}

export function HomePageB() {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAV_HEIGHT})`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ImmersiveHero />
      <ImmersiveNavStrip />
    </Box>
  );
}
