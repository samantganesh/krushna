import { type SxProps, type Theme } from '@mui/material';

/**
 * Props for the MarkdownViewer component
 */
export interface MarkdownViewerProps {
  /**
   * Markdown content to render
   */
  content: string;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;

  /**
   * Code highlighting theme ('light' or 'dark')
   * Auto-detects from MUI theme if not provided
   */
  codeTheme?: 'light' | 'dark';
}
