import { Box } from '@mui/material';
import { type ReactNode } from 'react';

import { NAV_HEIGHT } from '../constants';
import { TopNav } from '../TopNav';
import { type NavItem } from '../types';

interface PortfolioLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  navRightContent?: ReactNode;
}

export function PortfolioLayout({
  children,
  navItems,
  navRightContent,
}: PortfolioLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopNav items={navItems} rightContent={navRightContent} />
      <Box component="main" sx={{ mt: `${String(NAV_HEIGHT)}px` }}>
        {children}
      </Box>
    </Box>
  );
}
