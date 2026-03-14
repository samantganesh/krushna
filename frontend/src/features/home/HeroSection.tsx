import { Box, Typography } from '@mui/material';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 8 },
        py: 8,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '14vw', md: '10vw' },
          lineHeight: 1,
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: '-2px',
          color: 'text.primary',
          mb: 3,
        }}
      >
        Krushna
      </Typography>
      <Box
        sx={{
          width: 80,
          height: 4,
          bgcolor: 'primary.main',
          mb: 3,
        }}
      />
      <Typography
        variant="h5"
        sx={{ color: 'text.secondary', fontFamily: FONT_DISPLAY, fontWeight: 400 }}
      >
        Contemporary Arts · BA Year 3
      </Typography>
    </Box>
  );
}
