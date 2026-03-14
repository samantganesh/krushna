import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import React from 'react';

export interface TopbarProps {
  /**
   * Callback function triggered when hamburger menu is clicked
   */
  onMenuClick: () => void;
  /**
   * Optional logo or brand element displayed between hamburger and right content
   */
  logo?: React.ReactNode;
  /**
   * Content to display on the right side of the topbar (e.g., profile menu)
   */
  rightContent?: React.ReactNode;
  /**
   * Alternative way to provide right content via children
   */
  children?: React.ReactNode;
}

interface ToolbarContentProps {
  onMenuClick: () => void;
  logo?: React.ReactNode;
  rightSideContent?: React.ReactNode;
}

function ToolbarContent({
  onMenuClick,
  logo,
  rightSideContent,
}: ToolbarContentProps) {
  return (
    <Toolbar
      sx={{
        height: 64,
        minHeight: '64px !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
      }}
    >
      <IconButton
        color="inherit"
        aria-label="toggle menu"
        onClick={onMenuClick}
        edge="start"
        sx={{ minWidth: 44, minHeight: 44 }}
      >
        <MenuIcon />
      </IconButton>

      {Boolean(logo) && (
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>{logo}</Box>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {Boolean(rightSideContent) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {rightSideContent}
        </Box>
      )}
    </Toolbar>
  );
}

/**
 * Topbar component provides a fixed-height app bar with hamburger menu and configurable slots.
 * Height is fixed at 64px, spans full viewport width.
 */
export const Topbar: React.FC<TopbarProps> = ({
  onMenuClick,
  logo,
  rightContent,
  children,
}) => {
  const rightSideContent = rightContent ?? children;

  return (
    <AppBar
      position="fixed"
      sx={{
        height: 64,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <ToolbarContent
        onMenuClick={onMenuClick}
        logo={logo}
        rightSideContent={rightSideContent}
      />
    </AppBar>
  );
};
