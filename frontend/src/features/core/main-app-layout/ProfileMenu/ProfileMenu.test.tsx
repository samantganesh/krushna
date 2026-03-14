import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ProfileMenu } from './ProfileMenu';

const MENU_CONTENT = 'Menu Content';

describe('ProfileMenu', () => {
  it('renders default trigger (avatar icon)', () => {
    render(<ProfileMenu />);
    const button = screen.getByRole('button', { name: /profile menu/i });
    expect(button).toBeInTheDocument();
  });

  it('opens dropdown on trigger click', () => {
    render(
      <ProfileMenu>
        <div>Menu Content</div>
      </ProfileMenu>
    );

    const button = screen.getByRole('button', { name: /profile menu/i });
    fireEvent.click(button);

    expect(screen.getByText(MENU_CONTENT)).toBeInTheDocument();
  });

  it('closes dropdown on click-away', () => {
    const { container } = render(
      <ProfileMenu>
        <div>Menu Content</div>
      </ProfileMenu>
    );

    const button = screen.getByRole('button', { name: /profile menu/i });
    fireEvent.click(button);
    expect(screen.getByText(MENU_CONTENT)).toBeInTheDocument();

    // Click on the backdrop to close menu
    const backdrop = container.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      fireEvent.click(backdrop);
    }
  });

  it('closes dropdown on Escape key', () => {
    const { container } = render(
      <ProfileMenu>
        <div>Menu Content</div>
      </ProfileMenu>
    );

    const button = screen.getByRole('button', { name: /profile menu/i });
    fireEvent.click(button);
    expect(screen.getByText(MENU_CONTENT)).toBeInTheDocument();

    // Press Escape key on the menu
    const menu = container.querySelector('[role="menu"]');
    if (menu) {
      fireEvent.keyDown(menu, { key: 'Escape' });
    }
  });

  it('renders custom trigger when provided', () => {
    render(
      <ProfileMenu trigger={<button>Custom Trigger</button>}>
        <div>Menu Content</div>
      </ProfileMenu>
    );

    expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /profile menu/i })
    ).not.toBeInTheDocument();
  });

  it('renders slot content via children', () => {
    render(
      <ProfileMenu>
        <div>Custom Menu Item 1</div>
        <div>Custom Menu Item 2</div>
      </ProfileMenu>
    );

    const button = screen.getByRole('button', { name: /profile menu/i });
    fireEvent.click(button);

    expect(screen.getByText('Custom Menu Item 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Menu Item 2')).toBeInTheDocument();
  });
});
