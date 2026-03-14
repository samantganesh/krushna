import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { MainAppLayout } from './MainAppLayout';
import { useLayoutConfig } from './useLayoutConfig';

// Mock useMediaQuery to control responsive behavior in tests
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(() => true), // Default to desktop view
  };
});

describe('MainAppLayout', () => {
  it('renders with all components visible by default', () => {
    render(
      <MainAppLayout>
        <div>Main Content</div>
      </MainAppLayout>
    );

    // Check topbar is present (hamburger button)
    expect(
      screen.getByRole('button', { name: /toggle menu/i })
    ).toBeInTheDocument();

    // Check main content is rendered
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders logo in topbar when provided', () => {
    render(
      <MainAppLayout logo={<div>App Logo</div>}>
        <div>Main Content</div>
      </MainAppLayout>
    );

    expect(screen.getByText('App Logo')).toBeInTheDocument();
  });

  it('renders navigation items in sidebar when provided', () => {
    render(
      <MainAppLayout
        navigationItems={
          <>
            <div>Home</div>
            <div>Settings</div>
          </>
        }
      >
        <div>Main Content</div>
      </MainAppLayout>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders profile menu content when provided', () => {
    render(
      <MainAppLayout
        profileMenuContent={
          <>
            <div>Profile Item</div>
            <div>Logout</div>
          </>
        }
      >
        <div>Main Content</div>
      </MainAppLayout>
    );

    // Open profile menu
    const profileButton = screen.getByRole('button', { name: /profile menu/i });
    fireEvent.click(profileButton);

    expect(screen.getByText('Profile Item')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('toggles sidebar when hamburger menu is clicked', () => {
    const { container } = render(
      <MainAppLayout>
        <div>Main Content</div>
      </MainAppLayout>
    );

    const hamburger = screen.getByRole('button', { name: /toggle menu/i });
    const drawer = container.querySelector('.MuiDrawer-paper');

    // Initially expanded (240px) on desktop
    expect(drawer).toHaveStyle({ width: '240px' });

    // Click to collapse
    fireEvent.click(hamburger);
    expect(drawer).toHaveStyle({ width: '64px' });

    // Click to expand again
    fireEvent.click(hamburger);
    expect(drawer).toHaveStyle({ width: '240px' });
  });
});

describe('MainAppLayout - LayoutConfig', () => {
  it('provides LayoutConfigContext to children', () => {
    const TestChild = () => {
      useLayoutConfig({ showSidebar: false });
      return <div>Test Child</div>;
    };

    const { container } = render(
      <MainAppLayout>
        <TestChild />
      </MainAppLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();

    // Sidebar should be hidden
    const drawer = container.querySelector('.MuiDrawer-root');
    expect(drawer).not.toBeInTheDocument();
  });

  it('hides topbar when showTopbar is false', () => {
    const TestChild = () => {
      useLayoutConfig({ showTopbar: false });
      return <div>Test Child</div>;
    };

    render(
      <MainAppLayout>
        <TestChild />
      </MainAppLayout>
    );

    // Topbar (hamburger button) should not be present
    expect(
      screen.queryByRole('button', { name: /toggle menu/i })
    ).not.toBeInTheDocument();
  });

  it('hides profile menu when showProfileMenu is false', () => {
    const TestChild = () => {
      useLayoutConfig({ showProfileMenu: false });
      return <div>Test Child</div>;
    };

    render(
      <MainAppLayout>
        <TestChild />
      </MainAppLayout>
    );

    // Profile menu button should not be present
    expect(
      screen.queryByRole('button', { name: /profile menu/i })
    ).not.toBeInTheDocument();
    // But topbar should still be present
    expect(
      screen.getByRole('button', { name: /toggle menu/i })
    ).toBeInTheDocument();
  });
});
