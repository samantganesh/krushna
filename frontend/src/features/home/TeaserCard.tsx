import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

interface TeaserCardProps {
  label: string;
  to: string;
  bgcolor: string;
  color?: string;
}

export function TeaserCard({ label, to, bgcolor, color = 'white' }: TeaserCardProps) {
  return (
    <Box
      component={Link}
      to={to}
      sx={{
        flex: 1,
        minHeight: 200,
        bgcolor,
        color,
        display: 'flex',
        alignItems: 'flex-end',
        p: 4,
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
      >
        {label} →
      </Typography>
    </Box>
  );
}
