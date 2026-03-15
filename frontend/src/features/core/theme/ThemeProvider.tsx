import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  type Theme,
} from '@mui/material';
import { useState, useEffect, type ReactNode } from 'react';

import { PALETTE } from './palette';
import {
  ThemeContext,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from './themeContext';

const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const FONT_BODY = '"Inter", system-ui, sans-serif';

function buildTheme(mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: { main: PALETTE.primary },
      secondary: { main: PALETTE.secondary },
      warning: { main: PALETTE.accent },
      background: {
        default: mode === 'light' ? PALETTE.bgLight : PALETTE.bgDark,
        paper: mode === 'light' ? PALETTE.paperLight : PALETTE.paperDark,
      },
    },
    typography: {
      fontFamily: FONT_BODY,
      h1: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h2: { fontFamily: FONT_DISPLAY, fontWeight: 700 },
      h3: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h4: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h5: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
      h6: { fontFamily: FONT_DISPLAY, fontWeight: 600 },
    },
  });
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={buildTheme(mode)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
