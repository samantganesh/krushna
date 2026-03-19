import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { TopNav } from './TopNav';

const ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
];

describe('TopNav', () => {
  it('renders the site logo', () => {
    render(
      <MemoryRouter>
        <TopNav items={ITEMS} />
      </MemoryRouter>
    );
    expect(screen.getByText('Krushna')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    render(
      <MemoryRouter>
        <TopNav items={ITEMS} />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });
});
