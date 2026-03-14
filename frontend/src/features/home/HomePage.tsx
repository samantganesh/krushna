import { Box } from '@mui/material';

import { HeroSection } from './HeroSection';
import { TeaserGrid } from './TeaserGrid';

export function HomePage() {
  return (
    <Box>
      <HeroSection />
      <TeaserGrid />
    </Box>
  );
}
