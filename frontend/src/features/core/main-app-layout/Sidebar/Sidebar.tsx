import { Drawer, Box } from '@mui/material';
import React from 'react';

const DRAWER_WIDTH_EXPANDED = 240;
const DRAWER_WIDTH_COLLAPSED = 64;

export interface SidebarProps {
  /**
   * Whether the sidebar is in expanded state
   */
  isOpen: boolean;
  /**
   * Navigation content to render inside the sidebar
   */
  children?: React.ReactNode;
}

/**
 * Sidebar component provides a collapsible navigation drawer.
 * Uses MUI Drawer with smooth transitions between collapsed (64px) and expanded (240px) states.
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, children }) => {
  const drawerWidth = isOpen ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: 64, // Below the topbar
          height: 'calc(100vh - 64px)',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          py: 2,
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};
