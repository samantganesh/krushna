# Theme

A completely self-contained, portable theme management system for React applications with Material-UI. Provides light/dark mode switching with localStorage persistence and system preference detection.

## Features

- **ThemeProvider** with automatic theme initialization (system preferences + localStorage)
- **localStorage Persistence** - theme preference survives page reloads
- **System Preference Detection** - respects `prefers-color-scheme` media query
- **ThemeSwitcher Component** - ready-to-use icon button for theme toggling
- **useTheme Hook** - access theme mode and toggle function from any component
- **Zero External Dependencies** - only imports from `react`, `@mui/material`, `@mui/icons-material`
- **Fully Portable** - copy folder to any Vite + React + TypeScript + MUI project

## Installation

This component is self-contained. Simply copy the `features/theme/` folder to your project.

### Peer Dependencies

Required packages (install if not present):

```json
{
  "react": "^19.0.0",
  "@mui/material": "^7.0.0",
  "@mui/icons-material": "^7.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0"
}
```

## Basic Usage

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from './features/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use ThemeSwitcher component

```tsx
import { ThemeSwitcher } from './features/theme';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

### 3. Access theme in any component

```tsx
import { useTheme } from './features/theme';

function MyComponent() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## API Reference

### ThemeProvider

Manages theme state and provides context to child components.

**Props:**

| Prop       | Type              | Required | Description                             |
| ---------- | ----------------- | -------- | --------------------------------------- |
| `children` | `React.ReactNode` | Yes      | Child components that need theme access |

**Behavior:**

- Initializes theme from localStorage (key: `'theme'`) or system preference
- Falls back to `'light'` mode if neither is available
- Automatically persists theme changes to localStorage
- Wraps children with Material-UI `ThemeProvider` and applies `CssBaseline`

**Theme Initialization Priority:**

1. localStorage value (if valid: `'light'` or `'dark'`)
2. System preference (`prefers-color-scheme` media query)
3. Default: `'light'`

### ThemeSwitcher

Pre-built icon button component for toggling theme.

**Props:** None (uses theme context internally)

**Behavior:**

- Displays `Brightness7` icon (sun) in dark mode
- Displays `Brightness4` icon (moon) in light mode
- Includes accessible aria-label
- Inherits color from parent (use `color="inherit"`)

**Example with custom styling:**

```tsx
import { ThemeSwitcher } from './features/theme';
import { Tooltip } from '@mui/material';

function Header() {
  return (
    <Tooltip title="Toggle theme">
      <span>
        <ThemeSwitcher />
      </span>
    </Tooltip>
  );
}
```

### useTheme Hook

Access theme context from any component.

**Returns:** `ThemeContextType`

```typescript
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}
```

**Properties:**

| Property      | Type                | Description                                    |
| ------------- | ------------------- | ---------------------------------------------- |
| `mode`        | `'light' \| 'dark'` | Current theme mode                             |
| `toggleTheme` | `() => void`        | Function to toggle between light and dark mode |

**Error Handling:**
Throws an error if used outside of `ThemeProvider`:

```
Error: useTheme must be used within a ThemeProvider
```

## Integration Patterns

### With App Layout

```tsx
import { ThemeProvider, ThemeSwitcher } from './features/theme';
import { MainAppLayout } from './features/main-app-layout';
import { IconButton } from '@mui/material';

function App() {
  return (
    <ThemeProvider>
      <MainAppLayout
        logo={<img src="/logo.png" alt="Logo" />}
        profileMenuContent={
          <>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>
              <ThemeSwitcher />
              <span style={{ marginLeft: 8 }}>Theme</span>
            </MenuItem>
          </>
        }
      >
        <YourPageContent />
      </MainAppLayout>
    </ThemeProvider>
  );
}
```

### Custom Theme Colors

```tsx
import { ThemeProvider as CustomThemeProvider } from './features/theme';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useTheme } from './features/theme';

function ThemedApp({ children }) {
  const { mode } = useTheme();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#dc004e',
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

function App() {
  return (
    <CustomThemeProvider>
      <ThemedApp>
        <YourApp />
      </ThemedApp>
    </CustomThemeProvider>
  );
}
```

### Programmatic Theme Control

```tsx
import { useTheme } from './features/theme';
import { useEffect } from 'react';

function AutoDarkMode() {
  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    const hour = new Date().getHours();
    const shouldBeDark = hour >= 18 || hour < 6;

    if (shouldBeDark && mode === 'light') {
      toggleTheme();
    } else if (!shouldBeDark && mode === 'dark') {
      toggleTheme();
    }
  }, []);

  return <div>Theme adjusts based on time of day</div>;
}
```

## Component Structure

```
features/theme/
├── ThemeProvider.tsx       # Context provider with theme state management
├── ThemeSwitcher.tsx       # Pre-built toggle button component
├── useTheme.ts             # Hook for accessing theme context
├── index.ts                # Public API exports
└── README.md
```

## Portability Verification

This component is completely self-contained:

✅ **Only imports from:**

- `react`
- `@mui/material`
- `@mui/icons-material`
- Files within this feature folder

✅ **No imports from:**

- Parent directories (`../`, `../../`)
- Other feature modules
- Project-specific utilities or configs

✅ **No hardcoded:**

- Application-specific styling
- External dependencies
- Feature cross-dependencies

## Testing

The theme feature can be tested manually or with unit tests:

**Manual Testing:**

1. Start the app and verify default theme matches system preference
2. Toggle theme using ThemeSwitcher
3. Reload page and verify theme persists
4. Change system preference and start app fresh (clear localStorage) to verify detection

**Unit Testing Example (Vitest):**

```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './features/theme';

function TestComponent() {
  const { mode, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

test('provides theme context', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByTestId('mode')).toBeInTheDocument();
});
```

## License

This component is part of the Achaeans project and follows the project's license.
