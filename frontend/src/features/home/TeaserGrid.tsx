import { Box } from '@mui/material';

import { TeaserCard } from './TeaserCard';

export function TeaserGrid() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 0,
        mt: 0,
      }}
    >
      <TeaserCard label="Gallery" to="/gallery" bgcolor="primary.main" />
      <TeaserCard label="Writing" to="/writing" bgcolor="secondary.main" />
      <TeaserCard label="Hobbies" to="/hobbies" bgcolor="warning.main" color="black" />
    </Box>
  );
}
