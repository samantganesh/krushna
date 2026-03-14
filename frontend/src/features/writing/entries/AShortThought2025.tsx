import { Box, Typography } from '@mui/material';

import { BackLink } from '../../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;

export function AShortThought2025() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 16 },
        py: { xs: 8, md: 16 },
        maxWidth: 700,
        mx: 'auto',
      }}
    >
      <BackLink to="/writing" label="Back to Writing" />

      <Box sx={{ mt: 8 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Short · 4 September 2025
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: FONT_DISPLAY,
            fontWeight: FONT_WEIGHT_BOLD,
            lineHeight: 1.3,
            mb: 4,
            color: 'primary.main',
          }}
        >
          The Camera as Witness
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 400, lineHeight: 1.8 }}>
          Three lines on what it means to document conflict.
        </Typography>
      </Box>
    </Box>
  );
}
