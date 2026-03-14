import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Topbar } from './Topbar';

describe('Topbar', () => {
  it('renders hamburger menu button', () => {
    const handleMenuClick = vi.fn();
    render(<Topbar onMenuClick={handleMenuClick} />);

    const button = screen.getByRole('button', { name: /toggle menu/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onMenuClick when hamburger is clicked', () => {
    const handleMenuClick = vi.fn();
    render(<Topbar onMenuClick={handleMenuClick} />);

    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);

    expect(handleMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders logo when provided', () => {
    const handleMenuClick = vi.fn();
    render(<Topbar onMenuClick={handleMenuClick} logo={<div>App Logo</div>} />);

    expect(screen.getByText('App Logo')).toBeInTheDocument();
  });

  it('renders right content via rightContent prop', () => {
    const handleMenuClick = vi.fn();
    render(
      <Topbar
        onMenuClick={handleMenuClick}
        rightContent={<div>Right Content</div>}
      />
    );

    expect(screen.getByText('Right Content')).toBeInTheDocument();
  });

  it('renders right content via children prop', () => {
    const handleMenuClick = vi.fn();
    render(
      <Topbar onMenuClick={handleMenuClick}>
        <div>Children Content</div>
      </Topbar>
    );

    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  it('prefers rightContent over children when both provided', () => {
    const handleMenuClick = vi.fn();
    render(
      <Topbar
        onMenuClick={handleMenuClick}
        rightContent={<div>Right Content</div>}
      >
        <div>Children Content</div>
      </Topbar>
    );

    expect(screen.getByText('Right Content')).toBeInTheDocument();
    expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
  });

  it('maintains layout structure with all slots', () => {
    const handleMenuClick = vi.fn();
    const { container } = render(
      <Topbar
        onMenuClick={handleMenuClick}
        logo={<div>Logo</div>}
        rightContent={<div>Right</div>}
      />
    );

    // Check that AppBar is rendered
    const appBar = container.querySelector('.MuiAppBar-root');
    expect(appBar).toBeInTheDocument();

    // Check that all elements are present
    expect(
      screen.getByRole('button', { name: /toggle menu/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });
});
