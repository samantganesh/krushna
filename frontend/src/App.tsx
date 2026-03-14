import { Home as HomeIcon } from '@mui/icons-material';
import { List } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './features/core/home/HomePage';
import {
  MainAppLayout,
  AppTitle,
  SidebarLink,
} from './features/core/main-app-layout';
import { ThemeProvider } from './features/core/theme';
import { ThemeSwitcher } from './features/core/theme/ThemeSwitcher';

function AppContent() {
  return (
    <MainAppLayout
      logo={<AppTitle title="Krushna" />}
      topbarRightContent={<ThemeSwitcher />}
      navigationItems={
        <List>
          <SidebarLink title="Home" route="/" icon={<HomeIcon />} />
        </List>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </MainAppLayout>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
