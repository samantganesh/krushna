# MainAppLayout

A completely self-contained, portable layout component for React applications with Material-UI. Provides a consistent layout structure with topbar, collapsible sidebar, and profile menu.

## Features

- **Topbar** with hamburger menu button and configurable right-side content
- **Collapsible Sidebar** with smooth animations (240px expanded, 64px collapsed)
- **Profile Menu** with dropdown and slot-based content
- **Layout Configuration** via React Context API - pages can show/hide components
- **Responsive Defaults** - mobile: collapsed sidebar, desktop: expanded sidebar
- **Zero External Dependencies** - only imports from `react`, `react-dom`, `@mui/*`
- **Fully Portable** - copy folder to any Vite + React + TypeScript + MUI project

## Installation

This component is self-contained. Simply copy the `features/main-app-layout/` folder to your project.

### Peer Dependencies

Required packages (install if not present):

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@mui/material": "^7.0.0",
  "@mui/icons-material": "^7.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0"
}
```

## Basic Usage

```tsx
import { MainAppLayout } from './features/main-app-layout';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
} from '@mui/material';

function App() {
  return (
    <MainAppLayout
      logo={<img src="/logo.png" alt="Logo" />}
      navigationItems={
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
      }
      profileMenuContent={
        <>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </>
      }
    >
      {/* Your page content */}
      <div>Main Content</div>
    </MainAppLayout>
  );
}
```

## API Reference

### MainAppLayout Props

| Prop                 | Type              | Required | Description                                              |
| -------------------- | ----------------- | -------- | -------------------------------------------------------- |
| `logo`               | `React.ReactNode` | No       | Logo or brand element to display in topbar               |
| `navigationItems`    | `React.ReactNode` | No       | Navigation content for sidebar (use MUI List components) |
| `profileMenuContent` | `React.ReactNode` | No       | Content for profile menu dropdown (use MUI MenuItem)     |
| `children`           | `React.ReactNode` | Yes      | Main page content                                        |

### useLayoutConfig Hook

Control layout visibility from child pages using the `useLayoutConfig` hook:

```tsx
import { useLayoutConfig } from './features/main-app-layout';

function MyPage() {
  // Hide sidebar on this page
  useLayoutConfig({ showSidebar: false });

  return <div>Page without sidebar</div>;
}
```

**Config Options:**

| Option            | Type      | Default | Description            |
| ----------------- | --------- | ------- | ---------------------- |
| `showSidebar`     | `boolean` | `true`  | Show/hide sidebar      |
| `showTopbar`      | `boolean` | `true`  | Show/hide topbar       |
| `showProfileMenu` | `boolean` | `true`  | Show/hide profile menu |

**Context Reset Behavior:**

Layout configuration automatically resets to defaults when a component unmounts. This means each page can have its own config without affecting other pages.

```tsx
// Page A
function PageA() {
  useLayoutConfig({ showSidebar: false }); // Sidebar hidden
  return <div>Page A</div>;
}

// Page B (different route)
function PageB() {
  // No useLayoutConfig call - defaults apply
  return <div>Page B</div>; // Sidebar is visible again
}
```

**Persisting Config:**

If you need config to persist across pages, lift the state to a parent component:

```tsx
function App() {
  const [layoutConfig, setLayoutConfig] = useState({ showSidebar: true });

  return (
    <MainAppLayout {...props}>
      <Routes>
        <Route path="/" element={<HomePage config={layoutConfig} />} />
      </Routes>
    </MainAppLayout>
  );
}
```

## Integration Patterns

### With React Router

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainAppLayout
        navigationItems={
          <List>
            <ListItem>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </List>
        }
        profileMenuContent={<MenuItem>Logout</MenuItem>}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainAppLayout>
    </BrowserRouter>
  );
}
```

### Theme Switcher Example

```tsx
import { useState } from 'react';
import { ThemeProvider, createTheme, MenuItem, Switch } from '@mui/material';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainAppLayout
        profileMenuContent={
          <MenuItem onClick={() => setDarkMode(!darkMode)}>
            <Switch checked={darkMode} />
            {darkMode ? 'Dark' : 'Light'} Mode
          </MenuItem>
        }
      >
        <div>Content</div>
      </MainAppLayout>
    </ThemeProvider>
  );
}
```

## Component Structure

```
features/main-app-layout/
├── MainAppLayout/
│   ├── MainAppLayout.tsx       # Main orchestrator component
│   ├── MainAppLayout.test.tsx
│   ├── LayoutContext.tsx       # Context and useLayoutConfig hook
│   └── index.ts
├── Topbar/
│   ├── Topbar.tsx              # Top bar with hamburger and slots
│   ├── Topbar.test.tsx
│   └── index.ts
├── Sidebar/
│   ├── Sidebar.tsx             # Collapsible navigation drawer
│   ├── Sidebar.test.tsx
│   └── index.ts
├── ProfileMenu/
│   ├── ProfileMenu.tsx         # Dropdown menu with slot content
│   ├── ProfileMenu.test.tsx
│   └── index.ts
├── index.ts                     # Public API exports
└── README.md
```

## Portability Verification

This component is completely self-contained:

✅ **Only imports from:**

- `react`
- `react-dom`
- `@mui/material`
- `@mui/icons-material`
- Files within this feature folder

✅ **No imports from:**

- Parent directories (`../`, `../../`)
- Other feature modules
- Project-specific utilities or configs

✅ **No hardcoded:**

- Routes or navigation paths
- Application-specific logic
- External feature dependencies

## Testing

All components include Vitest unit tests. Run tests:

```bash
npm test
```

Test coverage includes:

- Component rendering
- State management
- User interactions (clicks, keyboard)
- Slot/children rendering
- Context integration

## License

This component is part of the Achaeans project and follows the project's license.
