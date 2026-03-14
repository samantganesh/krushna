import { useTheme } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

import { StyledMarkdownBox } from './styles';
import { type MarkdownViewerProps } from './types';

interface CodeComponentProps {
  inline?: boolean;
  className?: string | undefined;
  children?: React.ReactNode;
}

const CodeComponent = ({
  codeTheme,
}: {
  codeTheme: 'light' | 'dark';
}): React.FC<CodeComponentProps> => {
  return ({ inline, className: codeClassName, children, ...props }) => {
    const match = /language-(\w+)/.exec(codeClassName || '');
    const language = match ? match[1] : '';

    let codeString = '';
    if (Array.isArray(children)) {
      codeString = children.join('');
    } else if (typeof children === 'string') {
      codeString = children;
    } else if (typeof children === 'number') {
      codeString = String(children);
    }

    return !inline && language ? (
      <SyntaxHighlighter
        style={codeTheme === 'dark' ? oneDark : oneLight}
        language={language}
        PreTag="div"
        {...props}
      >
        {codeString.replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={codeClassName} {...props}>
        {children}
      </code>
    );
  };
};

/**
 * A high-quality Markdown viewer component with support for:
 * - Standard Markdown (headings, lists, tables, links, images)
 * - LaTeX math notation (inline $...$ and display $$...$$)
 * - Syntax highlighting for code blocks
 * - MUI theme integration
 *
 * @example
 * ```tsx
 * <MarkdownViewer
 *   content="# Hello\n\nThis is $E = mc^2$ inline math."
 *   sx={{ p: 2 }}
 * />
 * ```
 */
export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className,
  sx,
  codeTheme,
}) => {
  const theme = useTheme();
  const effectiveCodeTheme =
    codeTheme || (theme.palette.mode === 'dark' ? 'dark' : 'light');

  if (!content) {
    return null;
  }

  return (
    <StyledMarkdownBox
      className={className}
      {...(sx !== undefined ? { sx } : {})}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: CodeComponent({ codeTheme: effectiveCodeTheme }),
        }}
      >
        {content}
      </ReactMarkdown>
    </StyledMarkdownBox>
  );
};
