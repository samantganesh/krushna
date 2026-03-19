import { Box, Divider, Typography } from '@mui/material';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_WEIGHT_BOLD = 700;
const FONT_WEIGHT_SEMIBOLD = 600;
const DIVIDER_WIDTH = 60;
const LABEL_WIDTH = 120;

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ width: LABEL_WIDTH, flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

export function AboutPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, maxWidth: 900 }}>
      <Typography
        variant="h2"
        sx={{ fontFamily: FONT_DISPLAY, fontWeight: FONT_WEIGHT_BOLD, mb: 2 }}
      >
        About Me
      </Typography>
      <Divider
        sx={{
          borderColor: 'primary.main',
          borderBottomWidth: 3,
          width: DIVIDER_WIDTH,
          mb: 4,
        }}
      />

      <Typography
        variant="body1"
        sx={{ fontSize: '1.125rem', lineHeight: 1.9, mb: 8, maxWidth: 640 }}
      >
        I am a Contemporary Arts student in Year 3, working across painting,
        drawing, film, sculpture, and performance.
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontFamily: FONT_DISPLAY,
          fontWeight: FONT_WEIGHT_SEMIBOLD,
          mb: 2,
        }}
      >
        Education
      </Typography>
      <StatLine label="Degree" value="BA Contemporary Arts" />
      <StatLine label="Year" value="Year 3" />
      <StatLine
        label="University"
        value="Srishti Manipal Institute, Bengaluru, India"
      />
    </Box>
  );
}
