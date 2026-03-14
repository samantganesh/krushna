import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Sidebar } from './Sidebar';

const DRAWER_PAPER_SELECTOR = '.MuiDrawer-paper';

describe('Sidebar', () => {
  it('renders in collapsed state when isOpen is false', () => {
    const { container } = render(
      <Sidebar isOpen={false}>
        <div>Nav Content</div>
      </Sidebar>
    );

    const drawer = container.querySelector(DRAWER_PAPER_SELECTOR);
    expect(drawer).toBeInTheDocument();
    // In collapsed state, width should be 64px
    expect(drawer).toHaveStyle({ width: '64px' });
  });

  it('renders in expanded state when isOpen is true', () => {
    const { container } = render(
      <Sidebar isOpen={true}>
        <div>Nav Content</div>
      </Sidebar>
    );

    const drawer = container.querySelector(DRAWER_PAPER_SELECTOR);
    expect(drawer).toBeInTheDocument();
    // In expanded state, width should be 240px
    expect(drawer).toHaveStyle({ width: '240px' });
  });

  it('renders children content', () => {
    render(
      <Sidebar isOpen={true}>
        <div>Navigation Item 1</div>
        <div>Navigation Item 2</div>
      </Sidebar>
    );

    expect(screen.getByText('Navigation Item 1')).toBeInTheDocument();
    expect(screen.getByText('Navigation Item 2')).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { container } = render(<Sidebar isOpen={true} />);

    const drawer = container.querySelector(DRAWER_PAPER_SELECTOR);
    expect(drawer).toBeInTheDocument();
  });

  it('uses permanent variant', () => {
    const { container } = render(
      <Sidebar isOpen={true}>
        <div>Nav Content</div>
      </Sidebar>
    );

    const drawer = container.querySelector('.MuiDrawer-root');
    expect(drawer).toHaveClass('MuiDrawer-docked');
  });

  it('has transition property for smooth animation', () => {
    const { container } = render(
      <Sidebar isOpen={true}>
        <div>Nav Content</div>
      </Sidebar>
    );

    const drawer = container.querySelector(DRAWER_PAPER_SELECTOR);
    if (drawer) {
      const computedStyle = window.getComputedStyle(drawer);
      // Check that transition property is set (MUI applies this)
      expect(computedStyle.transition).toBeTruthy();
    }
  });
});
