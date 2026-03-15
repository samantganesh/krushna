import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AboutPage } from './features/about';
// import { ClayForm2023, FigureCharcoal2024, ShortFilm2023, UntitledOil2024 } from './features/artwork';
// import { ContactPage } from './features/contact';
import { PortfolioLayout, type NavItem } from './features/core/nav';
import { ThemeProvider } from './features/core/theme';
import { ThemeSwitcher } from './features/core/theme/ThemeSwitcher';
// import { GalleryPage } from './features/gallery';
// import { HobbiesPage } from './features/hobbies';
import { HomePage } from './features/home';
import { NotFoundPage } from './features/not-found';
import { PaintingsPage } from './features/paintings';
// import { WritingIndexPage } from './features/writing';
// import { AShortThought2025 } from './features/writing/entries/AShortThought2025';
// import { OnSocialJustice2025 } from './features/writing/entries/OnSocialJustice2025';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  // { label: 'Gallery', to: '/gallery' },
  { label: 'Paintings', to: '/paintings' },
  // { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
  // { label: 'Hobbies', to: '/hobbies' },
  // { label: 'Contact', to: '/contact' },
];

function AppContent() {
  return (
    <PortfolioLayout navItems={NAV_ITEMS} navRightContent={<ThemeSwitcher />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/gallery" element={<GalleryPage />} /> */}
        <Route path="/paintings" element={<PaintingsPage />} />
        {/* <Route path="/artwork/untitled-oil-2024" element={<UntitledOil2024 />} /> */}
        {/* <Route path="/artwork/figure-charcoal-2024" element={<FigureCharcoal2024 />} /> */}
        {/* <Route path="/artwork/short-film-2023" element={<ShortFilm2023 />} /> */}
        {/* <Route path="/artwork/clay-form-2023" element={<ClayForm2023 />} /> */}
        {/* <Route path="/writing" element={<WritingIndexPage />} /> */}
        {/* <Route path="/writing/on-social-justice-2025" element={<OnSocialJustice2025 />} /> */}
        {/* <Route path="/writing/a-short-thought-2025" element={<AShortThought2025 />} /> */}
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/hobbies" element={<HobbiesPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
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
