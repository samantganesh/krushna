import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('renders the label text', () => {
    render(<MemoryRouter><BackLink to="/gallery" label="Back to Gallery" /></MemoryRouter>);
    expect(screen.getByText('Back to Gallery')).toBeInTheDocument();
  });
});
