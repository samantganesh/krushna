import { Box, Typography } from '@mui/material';

import { BackLink } from '../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;

export function ClayForm2023() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <BackLink to="/gallery" label="Back to Gallery" />

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 8,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <img
            src="/images/artwork/clay-form-2023.jpg"
            alt="Form I, 2023"
            style={{ width: '100%', display: 'block' }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: FONT_WEIGHT_BOLD,
              mb: 1,
            }}
          >
            Form I
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            2023 · Sculpture
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            A study in form and colour.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
