import { Box } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

const INLINE_CODE_PADDING_X = 0.25;
const INLINE_CODE_PADDING_Y = 0.5;
const LIST_PADDING_LEFT = 3;

const getHeadingStyles = (theme: Theme) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
});

const getTableStyles = (theme: Theme) => ({
  borderCollapse: 'collapse' as const,
  width: '100%',
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
});

const getBlockquoteStyles = (theme: Theme) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.action.hover,
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
});

/**
 * Styled wrapper for Markdown content with MUI theme integration
 */
export const StyledMarkdownBox = styled(Box)(({ theme }) => ({
  '& h1, & h2, & h3, & h4, & h5, & h6': getHeadingStyles(theme),
  '& p': {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& table': getTableStyles(theme),
  '& th, & td': {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: theme.palette.action.hover,
    fontWeight: theme.typography.fontWeightBold,
  },
  '& blockquote': getBlockquoteStyles(theme),
  '& code': {
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(INLINE_CODE_PADDING_X, INLINE_CODE_PADDING_Y),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'monospace',
    fontSize: '0.875em',
  },
  '& pre': {
    marginBottom: theme.spacing(2),
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(LIST_PADDING_LEFT),
    marginBottom: theme.spacing(1),
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
  '& hr': {
    border: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(2, 0),
  },
}));
