import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Button
      component={Link}
      to={to}
      startIcon={<ArrowBackIcon />}
      sx={{
        color: 'text.secondary',
        fontFamily: FONT_DISPLAY,
        '&:hover': { color: 'primary.main' },
      }}
    >
      {label}
    </Button>
  );
}
