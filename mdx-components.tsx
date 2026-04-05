import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h3: (props) => (
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#0A1A22',
          margin: '40px 0 16px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          letterSpacing: '-0.01em',
        }}
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--color-turquoise-700)',
          margin: '24px 0 8px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}
        {...props}
      />
    ),
    p: (props) => (
      <p style={{ marginBottom: '18px', maxWidth: '68ch', lineHeight: 1.8 }} {...props} />
    ),
    table: (props) => <table className="gps-table" {...props} />,
    code: (props) => (
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          background: 'var(--color-g50)',
          padding: '1px 5px',
          borderRadius: '3px',
          color: 'var(--color-turquoise-700)',
        }}
        {...props}
      />
    ),
  };
}
