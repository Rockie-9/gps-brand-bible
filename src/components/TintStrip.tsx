'use client';

import { useState, useCallback } from 'react';

interface TintStep {
  step: string;
  hex: string;
  lightText?: boolean;
}

interface TintStripProps {
  name: string;
  steps: TintStep[];
}

export default function TintStrip({ name, steps }: TintStripProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = useCallback((hex: string, idx: number) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    });
  }, []);

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>{name}</div>
      <div style={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {steps.map((s, i) => (
          <div
            key={s.step}
            onClick={() => handleCopy(s.hex, i)}
            style={{
              flex: 1,
              background: s.hex,
              padding: '28px 2px 8px',
              textAlign: 'center',
              cursor: 'pointer',
              minWidth: 0,
              position: 'relative',
              transition: 'transform 0.15s',
            }}
            title={`Click to copy ${s.hex}`}
          >
            <span style={{
              display: 'block',
              fontSize: '9px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              color: s.lightText ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.9)',
              textShadow: s.lightText ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
            }}>
              {s.step}
            </span>
            <span style={{
              display: 'block',
              fontSize: '7px',
              fontFamily: 'var(--font-mono)',
              color: s.lightText ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.65)',
              textShadow: s.lightText ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
              marginTop: '2px',
            }}>
              {copiedIdx === i ? '✓ Copied' : s.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
