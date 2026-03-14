import { Typography } from '@mui/material';
import React from 'react';

export interface AppTitleProps {
  /**
   * The title text to display
   */
  title: string;
}

/**
 * AppTitle component displays the application title in the topbar.
 * Renders as a bold h6 Typography component.
 */
export const AppTitle: React.FC<AppTitleProps> = ({ title }) => {
  return (
    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
  );
};
