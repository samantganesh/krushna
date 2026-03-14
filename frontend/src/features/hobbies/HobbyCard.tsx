import { Box, Typography } from '@mui/material';

import  { type Hobby } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;

interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <Box
      sx={{
        p: 4,
        borderTop: '4px solid',
        borderColor: hobby.accent,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_BOLD, mb: 1 }}>
        {hobby.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {hobby.description}
      </Typography>
    </Box>
  );
}
