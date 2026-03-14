import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PortfolioLayout, type NavItem } from './features/core/nav';
import { ThemeProvider } from './features/core/theme';
import { ThemeSwitcher } from './features/core/theme/ThemeSwitcher';
import { HomePage } from './features/home';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
  { label: 'Hobbies', to: '/hobbies' },
  { label: 'Contact', to: '/contact' },
];

function AppContent() {
  return (
    <PortfolioLayout navItems={NAV_ITEMS} navRightContent={<ThemeSwitcher />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PortfolioLayout>
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
