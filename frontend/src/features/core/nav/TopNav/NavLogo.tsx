import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';

export function NavLogo() {
  return (
    <Typography
      component={Link}
      to="/"
      variant="h5"
      sx={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        color: 'primary.main',
        textDecoration: 'none',
        letterSpacing: '-0.5px',
      }}
    >
      Krushna
    </Typography>
  );
}
