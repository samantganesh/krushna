import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useTheme } from './useTheme';

export function ThemeSwitcher() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      aria-label={
        mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
