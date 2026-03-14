import { Box, Divider, Typography } from '@mui/material';

import { BackLink } from '../../core/nav';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;
const DIVIDER_WIDTH = 60;

export function OnSocialJustice2025() {
  return (
    <Box sx={{ px: { xs: 2, md: 16 }, py: 4, maxWidth: 900, mx: 'auto' }}>
      <BackLink to="/writing" label="Back to Writing" />

      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
          Essay · 10 November 2025
        </Typography>
        <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_BOLD, mb: 2, lineHeight: 1.1 }}>
          On Social Justice and Contemporary Art
        </Typography>
        <Divider sx={{ borderColor: 'primary.main', borderBottomWidth: 3, width: DIVIDER_WIDTH, mb: 4 }} />
      </Box>

      <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.9, mb: 3 }}>
        How contemporary artists are responding to systemic inequality — and whether art can actually change anything.
      </Typography>
    </Box>
  );
}
