import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h3: (props) => (
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 900,
          color: '#0A1A22',
          margin: '36px 0 14px',
          paddingTop: '18px',
          borderTop: '1px solid var(--color-g100)',
        }}
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        style={{
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--color-charcoal)',
          margin: '20px 0 6px',
          letterSpacing: '0.04em',
          textTransform: 'uppercase' as const,
        }}
        {...props}
      />
    ),
    p: (props) => (
      <p style={{ marginBottom: '16px', maxWidth: '72ch' }} {...props} />
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
