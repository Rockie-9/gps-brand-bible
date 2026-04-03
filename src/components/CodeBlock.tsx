'use client';

import { useCallback, useState, ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = typeof children === 'string' ? children : '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [children]);

  return (
    <div className="relative" style={{ margin: '12px 0' }}>
      <pre
        className="p-4 rounded-lg text-[12px] overflow-x-auto"
        style={{
          background: '#0A1A22',
          color: 'var(--color-g300)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.6,
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-1.5 right-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold cursor-pointer border-none transition-opacity"
        style={{
          background: 'var(--color-turquoise-500)',
          color: '#fff',
          opacity: copied ? 1 : 0.7,
          fontFamily: 'var(--font-en)',
        }}
      >
        {copied ? '\u2713 Copied' : 'Copy'}
      </button>
    </div>
  );
}
