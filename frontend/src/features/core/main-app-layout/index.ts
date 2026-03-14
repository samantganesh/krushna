/**
 * MainAppLayout - A self-contained, portable layout component
 *
 * Provides a complete application layout with:
 * - Topbar with hamburger menu and profile menu
 * - Collapsible sidebar (240px expanded, 64px collapsed)
 * - Responsive defaults (mobile: collapsed, desktop: expanded)
 * - Slot-based content via props/children
 *
 * @example
 * ```tsx
 * import { MainAppLayout } from './features/main-app-layout';
 *
 * <MainAppLayout
 *   logo={<img src="/logo.png" />}
 *   navigationItems={<List>...</List>}
 *   profileMenuContent={<MenuItem>Logout</MenuItem>}
 * >
 *   <div>Page content</div>
 * </MainAppLayout>
 * ```
 */
export { MainAppLayout } from './MainAppLayout';
export type { MainAppLayoutProps } from './MainAppLayout';

/**
 * useLayoutConfig - Hook to control layout visibility from child components
 *
 * Allows pages to show/hide layout components (sidebar, topbar, profile menu).
 * Configuration automatically resets when component unmounts.
 *
 * @param config - Layout configuration object
 * @param config.showSidebar - Show/hide sidebar (default: true)
 * @param config.showTopbar - Show/hide topbar (default: true)
 * @param config.showProfileMenu - Show/hide profile menu (default: true)
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   useLayoutConfig({ showSidebar: false });
 *   return <div>Page without sidebar</div>;
 * }
 * ```
 */
export { useLayoutConfig } from './MainAppLayout/constants';

/**
 * LayoutConfig - Configuration interface for layout visibility
 */
export type { LayoutConfig } from './MainAppLayout/constants';

/**
 * AppTitle - Application title component for topbar
 */
export { AppTitle } from './AppTitle';
export type { AppTitleProps } from './AppTitle';

export { SidebarLink } from './Sidebar/SidebarLink';
export type { SidebarLinkProps } from './Sidebar/SidebarLink';

export { Sidebar } from './Sidebar';
export type { SidebarProps } from './Sidebar';
