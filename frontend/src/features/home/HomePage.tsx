import { Box, Typography } from '@mui/material';

const PHOTO_SRC = '/images/field.jpeg';
const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const NAV_HEIGHT = '56px';
const DARK_BG = '#0D0D0D';
const GRADIENT_OVERLAY_DESKTOP =
  'linear-gradient(to right, rgba(13,13,13,0.60) 0%, rgba(13,13,13,0.20) 55%, rgba(13,13,13,0.0) 100%)';
const GRADIENT_OVERLAY_MOBILE =
  'linear-gradient(to top, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.0) 100%)';

function ImmersiveHero() {
  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        backgroundImage: `url(${PHOTO_SRC})`,
        backgroundSize: { xs: 'contain', md: '100% auto' },
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        bgcolor: DARK_BG,
        minHeight: { xs: '126vw', md: '70vh' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: { xs: GRADIENT_OVERLAY_MOBILE, md: GRADIENT_OVERLAY_DESKTOP },
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

export function HomePage() {
  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAV_HEIGHT})`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ImmersiveHero />
    </Box>
  );
}
