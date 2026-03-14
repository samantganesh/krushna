import { Box, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import  { type WritingEntry, type WritingType } from './types';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_SEMIBOLD = 600;

const TYPE_COLOR: Record<WritingType, 'error' | 'primary' | 'warning'> = {
  essay: 'error',
  short: 'primary',
  reflection: 'warning',
};

interface EntryRowProps {
  entry: WritingEntry;
}

export function EntryRow({ entry }: EntryRowProps) {
  const formattedDate = new Date(entry.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      component={Link}
      to={entry.route}
      sx={{
        display: 'block',
        textDecoration: 'none',
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:hover h3': { color: 'primary.main' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Chip label={entry.type} color={TYPE_COLOR[entry.type]} size="small" />
        <Typography variant="caption" color="text.secondary">{formattedDate}</Typography>
      </Box>
      <Typography variant="h5" component="h3" sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_SEMIBOLD, mb: 1 }}>
        {entry.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">{entry.excerpt}</Typography>
    </Box>
  );
}
