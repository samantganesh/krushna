import { Box, Grid, Typography } from '@mui/material';

import { HOBBIES } from './hobbiesData';
import { HobbyCard } from './HobbyCard';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';

export function HobbiesPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h2" sx={{ fontFamily: FONT_DISPLAY, mb: 4 }}>
        Hobbies
      </Typography>
      <Grid container spacing={3}>
        {HOBBIES.map((hobby) => (
          <Grid key={hobby.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <HobbyCard hobby={hobby} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
