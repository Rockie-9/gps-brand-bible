'use client';

import { useState } from 'react';

interface PatternSpec {
  nameEn: string;
  nameZh: string;
  css: string;
  description: string;
}

const PATTERNS: PatternSpec[] = [
  {
    nameEn: 'Dot Grid',
    nameZh: '圓點網格',
    css: 'radial-gradient(circle, #26A7B0 1px, transparent 1px)',
    description: 'background-size: 16px 16px',
  },
  {
    nameEn: 'Diagonal Lines',
    nameZh: '斜線紋理',
    css: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(38,167,176,0.08) 8px, rgba(38,167,176,0.08) 9px)',
    description: 'Subtle brand texture',
  },
  {
    nameEn: 'Copper Mesh',
    nameZh: '銅色網紋',
    css: 'radial-gradient(ellipse at 30% 50%, rgba(202,195,210,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(38,167,176,0.15) 0%, transparent 50%)',
    description: 'Hero backgrounds',
  },
  {
    nameEn: 'Security Grid',
    nameZh: '安全網格',
    css: 'linear-gradient(rgba(38,167,176,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(38,167,176,0.06) 1px, transparent 1px)',
    description: 'background-size: 24px 24px',
  },
  {
    nameEn: 'Pillar Bands',
    nameZh: '支柱色帶',
    css: 'linear-gradient(90deg, #26A7B0 0%, #26A7B0 20%, #8C9FCB 20%, #8C9FCB 40%, #F6AD90 40%, #F6AD90 60%, #8CC897 60%, #8CC897 80%, #CAC3D2 80%, #CAC3D2 100%)',
    description: 'Five-pillar identity bar',
  },
  {
    nameEn: 'Noise Grain',
    nameZh: '噪點紋理',
    css: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E"), linear-gradient(135deg, #26A7B0, #CAC3D2)',
    description: 'Textured gradient hero',
  },
];

export default function PatternLibrary() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (css: string, idx: number) => {
    navigator.clipboard.writeText(css).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', margin: '14px 0' }}>
      {PATTERNS.map((p, i) => (
        <div
          key={p.nameEn}
          onClick={() => handleCopy(p.css, i)}
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid var(--color-g200)',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
            breakInside: 'avoid',
          }}
        >
          <div
            style={{
              height: '80px',
              background: p.css,
              backgroundSize: p.description.startsWith('background-size') ? p.description.split(': ')[1] : undefined,
            }}
          />
          <div style={{ padding: '8px', background: '#fff' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="en">{p.nameEn}</span>
              <span className="zh">{p.nameZh}</span>
            </div>
            <div style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: copiedIdx === i ? 'var(--color-success)' : 'var(--color-g400)', marginTop: '2px' }}>
              {copiedIdx === i ? '✓ Copied CSS' : 'Click to copy'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
