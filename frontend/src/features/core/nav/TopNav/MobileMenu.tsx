import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, Stack, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { FONT_DISPLAY } from '../constants';
import type { NavItem } from '../types';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const { pathname } = useLocation();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
        aria-label="Close menu"
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Stack spacing={4} alignItems="center">
        {items.map((item) => (
          <Typography
            key={item.to}
            component={Link}
            to={item.to}
            onClick={onClose}
            variant="h3"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: FONT_DISPLAY,
              fontWeight: pathname === item.to ? 700 : 400,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Stack>
    </Dialog>
  );
}
