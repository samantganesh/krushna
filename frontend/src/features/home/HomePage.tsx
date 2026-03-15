import { Box, Typography } from '@mui/material';

const PHOTO_SRC = 'https://res.cloudinary.com/db9fqisro/image/upload/krushna/paintings/field.jpeg';
const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const NAV_HEIGHT = '56px';

function HeroText() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        px: { xs: 3, md: 8 },
        pt: 6,
      }}
    >
      <Typography
        variant="h1"
        sx={(theme) => ({
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: { xs: '7vw', md: '4.5vw' },
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          mb: 2,
        })}
      >
        Welcome. Come see what I&apos;ve been making.
      </Typography>
      <Typography
        sx={(theme) => ({
          fontFamily: FONT_DISPLAY,
          fontSize: '0.78rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.55)'
              : 'rgba(0,0,0,0.55)',
        })}
      >
        Contemporary Arts · BA Year 3
        <br />
        Srishti Manipal Institute, Bengaluru, India
      </Typography>
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
        backgroundSize: { xs: 'contain', md: '100% auto' },
        backgroundPosition: { xs: 'bottom center', md: 'center center' },
        backgroundRepeat: 'no-repeat',
        bgcolor: 'background.default',
        minHeight: { xs: '126vw', md: '70vh' },
      }}
    >
      <Box
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          background: {
            xs:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to top, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.0) 100%)'
                : 'linear-gradient(to top, rgba(240,240,240,0.55) 0%, rgba(240,240,240,0.1) 40%, rgba(240,240,240,0.0) 100%)',
            md:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to right, rgba(13,13,13,0.60) 0%, rgba(13,13,13,0.20) 55%, rgba(13,13,13,0.0) 100%)'
                : 'linear-gradient(to right, rgba(240,240,240,0.60) 0%, rgba(240,240,240,0.20) 55%, rgba(240,240,240,0.0) 100%)',
          },
        })}
      />
      <HeroText />
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
