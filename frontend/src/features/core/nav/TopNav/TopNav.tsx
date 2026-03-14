import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useState, type ReactNode } from 'react';

import { NAV_HEIGHT } from '../constants';
import  { type NavItem } from '../types';

import { MobileMenu } from './MobileMenu';
import { NavDesktopLinks } from './NavDesktopLinks';
import { NavLogo } from './NavLogo';


interface TopNavProps {
  items: NavItem[];
  rightContent?: ReactNode;
}

interface NavRightProps {
  items: NavItem[];
  rightContent?: ReactNode;
  onMenuOpen: () => void;
}

function NavRight({ items, rightContent, onMenuOpen }: NavRightProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {rightContent}
        <IconButton onClick={onMenuOpen} aria-label="Open navigation" sx={{ color: 'text.primary' }}>
          <MenuIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <NavDesktopLinks items={items} />
      {rightContent}
    </Box>
  );
}

export function TopNav({ items, rightContent }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = () => { setMobileOpen(true); };
  const closeMenu = () => { setMobileOpen(false); };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAV_HEIGHT,
          zIndex: 'appBar',
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
        }}
      >
        <NavLogo />
        <NavRight items={items} rightContent={rightContent} onMenuOpen={openMenu} />
      </Box>
      <MobileMenu open={mobileOpen} onClose={closeMenu} items={items} />
    </>
  );
}
