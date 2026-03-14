import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarLinkProps {
  /**
   * Display title for the link
   */
  title: string;
  /**
   * Route path to navigate to
   */
  route: string;
  /**
   * Icon component to display
   */
  icon: React.ReactNode;
}

/**
 * SidebarLink component provides a navigational link item for the sidebar.
 * Automatically highlights when the current route matches the link's route.
 */
export const SidebarLink: React.FC<SidebarLinkProps> = ({
  title,
  route,
  icon,
}) => {
  const location = useLocation();
  const isSelected =
    route === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(route);

  return (
    <ListItem disablePadding>
      <Link
        to={route}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
        }}
      >
        <ListItemButton selected={isSelected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};
