import { Box, Typography } from '@mui/material';

import { ENTRIES } from './entries';
import { EntryRow } from './EntryRow';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function WritingIndexPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 800 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Writing
      </Typography>
      <Box>
        {ENTRIES.map((entry) => (
          <EntryRow key={entry.id} entry={entry} />
        ))}
      </Box>
    </Box>
  );
}
