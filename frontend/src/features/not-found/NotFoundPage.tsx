import { Box, Typography } from '@mui/material';

import { BackLink } from '../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 8 },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: FONT_DISPLAY,
          fontWeight: FONT_WEIGHT_BOLD,
          fontSize: { xs: '20vw', md: '15vw' },
          lineHeight: 1,
          color: 'primary.main',
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <BackLink to="/" label="Back to Home" />
    </Box>
  );
}
