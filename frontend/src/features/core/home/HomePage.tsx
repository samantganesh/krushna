import { Box, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 2,
        p: 3,
      }}
    >
      <Typography variant="h2" component="h1">
        Hello
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to Achaeans Realm
      </Typography>
    </Box>
  );
}
