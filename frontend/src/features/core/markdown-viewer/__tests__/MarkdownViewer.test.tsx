import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MarkdownViewer } from '../MarkdownViewer';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MarkdownViewer', () => {
  it('renders basic markdown with headings, lists, and links', () => {
    const content = `# Heading 1
## Heading 2

- List item 1
- List item 2

[Link text](https://example.com)`;

    renderWithTheme(<MarkdownViewer content={content} />);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
    expect(screen.getByText('Heading 2')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('Link text')).toBeInTheDocument();
  });

  it('renders tables', () => {
    const content = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`;

    renderWithTheme(<MarkdownViewer content={content} />);
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });

  it('renders images', () => {
    const content = `![Alt text](https://example.com/image.png)`;
    renderWithTheme(<MarkdownViewer content={content} />);
    const img = screen.getByAltText('Alt text');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.png');
  });

  it('renders inline code', () => {
    const content = 'This is `inline code` in text.';
    renderWithTheme(<MarkdownViewer content={content} />);
    expect(screen.getByText('inline code')).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    const { container } = renderWithTheme(<MarkdownViewer content="" />);
    expect(container.firstChild).toBeNull();
  });

  it('applies sx prop', () => {
    const { container } = renderWithTheme(
      <MarkdownViewer content="# Test" sx={{ padding: 2 }} />
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toBeInTheDocument();
  });
});
