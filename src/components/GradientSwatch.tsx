'use client';

import { useState, useCallback } from 'react';

interface GradientSwatchProps {
  nameEn: string;
  nameZh: string;
  css: string;
  gradient: string;
  height?: number;
}

export default function GradientSwatch({ nameEn, nameZh, css, gradient, height = 64 }: GradientSwatchProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [css]);

  return (
    <div
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height,
        borderRadius: '8px',
        margin: '8px 0',
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <span style={{
        position: 'absolute', bottom: 6, left: 12,
        fontSize: '9px', fontWeight: 700, color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,.4)', letterSpacing: '0.04em',
      }}>
        <span className="en">{nameEn}</span>
        <span className="zh">{nameZh}</span>
      </span>
      <span style={{
        position: 'absolute', bottom: 6, right: 12,
        fontFamily: 'var(--font-mono)', fontSize: '8px',
        color: 'rgba(255,255,255,.7)',
        transition: 'opacity 0.2s',
      }}>
        {copied ? '✓ Copied!' : hovered ? 'Click to copy CSS' : css}
      </span>
    </div>
  );
}
