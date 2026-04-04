'use client';

import { useCallback, useState } from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  cmyk?: string;
}

export default function ColorSwatch({ color, name, hex, cmyk }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [hex]);

  return (
    <div className="swatch" onClick={handleCopy} style={{ cursor: 'pointer' }}>
      <div className="swatch-color" style={{ background: color }} />
      <div className="swatch-info">
        <div className="swatch-name" style={copied ? { outline: '2px solid var(--color-success)' } : {}}>
          {name}
        </div>
        <div className="swatch-value">{hex}</div>
        {cmyk && <div className="swatch-cmyk">{cmyk}</div>}
      </div>
    </div>
  );
}
