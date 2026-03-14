import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useContext } from 'react';

import { ProfileMenu } from '../ProfileMenu';
import { Sidebar } from '../Sidebar';
import { Topbar } from '../Topbar';

import { LayoutConfigContext } from './layoutConfigContext';
import { LayoutConfigProvider } from './LayoutContext';

function buildRightContent(
  topbarRightContent: React.ReactNode,
  profileMenuContent: React.ReactNode,
  showProfileMenu: boolean,
): React.ReactNode {
  return (
    <>
      {topbarRightContent}
      {showProfileMenu ? <ProfileMenu>{profileMenuContent}</ProfileMenu> : null}
    </>
  );
}

export interface MainAppLayoutProps {
  /**
   * Optional logo or brand element to display in the topbar
   */
  logo?: React.ReactNode;
  /**
   * Navigation items to render in the sidebar
   */
  navigationItems?: React.ReactNode;
  /**
   * Content to render in the profile menu dropdown
   */
  profileMenuContent?: React.ReactNode;
  /**
   * Optional content to display in the topbar right area (before profile menu)
   */
  topbarRightContent?: React.ReactNode;
  /**
   * Main content area
   */
  children: React.ReactNode;
}

/**
 * MainAppLayout provides a complete layout structure with topbar, collapsible sidebar, and profile menu.
 * All components are controlled via composition patterns (slots/children) with zero external dependencies.
 *
 * @example
 * ```tsx
 * <MainAppLayout
 *   logo={<img src="/logo.png" />}
 *   navigationItems={<><MenuItem>Home</MenuItem></>}
 *   profileMenuContent={<><MenuItem>Logout</MenuItem></>}
 * >
 *   <div>Page content</div>
 * </MainAppLayout>
 * ```
 */
const MainAppLayoutInner: React.FC<MainAppLayoutProps> = ({
  logo,
  navigationItems,
  profileMenuContent,
  topbarRightContent,
  children,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // md breakpoint is 900px by default
  const { config } = useContext(LayoutConfigContext);

  // Sidebar state: expanded on desktop, collapsed on mobile by default
  const [sidebarOpen, setSidebarOpen] = useState(() => isDesktop);

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  const showSidebar = config.showSidebar !== false;
  const showTopbar = config.showTopbar !== false;
  const showProfileMenu = config.showProfileMenu !== false;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Topbar */}
      {showTopbar ? (
        <Topbar
          onMenuClick={handleMenuClick}
          logo={logo}
          rightContent={buildRightContent(topbarRightContent, profileMenuContent, showProfileMenu)}
        />
      ) : null}

      {/* Sidebar */}
      {showSidebar ? (
        <Sidebar isOpen={sidebarOpen}>{navigationItems}</Sidebar>
      ) : null}

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: showTopbar ? '64px' : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

/**
 * MainAppLayout with LayoutConfigProvider wrapper
 */
export const MainAppLayout: React.FC<MainAppLayoutProps> = (props) => {
  return (
    <LayoutConfigProvider>
      <MainAppLayoutInner {...props} />
    </LayoutConfigProvider>
  );
};
