'use client';

import { useState, useMemo } from 'react';

function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  if (!rgb || rgb.length < 3) return 0;
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const GPS_COLORS = [
  { name: 'Turquoise', hex: '#26A7B0' },
  { name: 'Copper', hex: '#CAC3D2' },
  { name: 'Black', hex: '#0A1A22' },
  { name: 'White', hex: '#FAFBFC' },
  { name: 'Turq-600', hex: '#1E8A92' },
  { name: 'Turq-700', hex: '#186E75' },
  { name: 'Purple', hex: '#8C9FCB' },
  { name: 'Green', hex: '#8CC897' },
  { name: 'Orange', hex: '#F6AD90' },
  { name: 'Danger', hex: '#D94F4F' },
  { name: 'Success', hex: '#2D9F5B' },
  { name: 'DM-BG', hex: '#0D1B21' },
  { name: 'DM-Text', hex: '#E2E8EC' },
];

export default function ContrastChecker() {
  const [fg, setFg] = useState('#0A1A22');
  const [bg, setBg] = useState('#FAFBFC');

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const rounded = Math.round(ratio * 10) / 10;
  const passAA = ratio >= 4.5;
  const passAALarge = ratio >= 3;
  const passAAA = ratio >= 7;

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-g500)', display: 'block', marginBottom: '4px' }}>
            <span className="en">Foreground (Text)</span><span className="zh">前景（文字）</span>
          </label>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: 0 }} />
            <input type="text" value={fg} onChange={(e) => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setFg(e.target.value)} style={{ flex: 1, padding: '6px 10px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase' }} />
          </div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
            {GPS_COLORS.map((c) => (
              <button key={c.hex + 'fg'} onClick={() => setFg(c.hex)} title={c.name} style={{ width: '18px', height: '18px', borderRadius: '4px', background: c.hex, border: fg === c.hex ? '2px solid var(--color-turquoise-500)' : '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-g500)', display: 'block', marginBottom: '4px' }}>
            <span className="en">Background</span><span className="zh">背景</span>
          </label>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: 0 }} />
            <input type="text" value={bg} onChange={(e) => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setBg(e.target.value)} style={{ flex: 1, padding: '6px 10px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase' }} />
          </div>
          <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
            {GPS_COLORS.map((c) => (
              <button key={c.hex + 'bg'} onClick={() => setBg(c.hex)} title={c.name} style={{ width: '18px', height: '18px', borderRadius: '4px', background: c.hex, border: bg === c.hex ? '2px solid var(--color-turquoise-500)' : '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', padding: 0 }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: bg, color: fg, borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '10px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
          <span className="en">Sample Text Preview</span><span className="zh">文字預覽範例</span>
        </div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          <span className="en">When people feel genuinely safe, they are free to focus and contribute.</span>
          <span className="zh">當人們感到真正的安全，他們才能自由地專注和貢獻。</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '8px 16px', borderRadius: '8px', background: passAAA ? 'rgba(45,159,91,0.08)' : passAA ? 'rgba(45,159,91,0.08)' : 'rgba(217,79,79,0.06)', border: `1px solid ${passAA ? 'rgba(45,159,91,0.2)' : 'rgba(217,79,79,0.15)'}` }}>
          <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: passAA ? 'var(--color-success)' : 'var(--color-danger)' }}>{rounded}:1</div>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--color-g500)' }}>
            <span className="en">Contrast Ratio</span><span className="zh">對比度</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
          <div style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: passAA ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700 }}>{passAA ? '✓' : '✗'}</span>
            AA Normal (≥4.5:1)
          </div>
          <div style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: passAALarge ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700 }}>{passAALarge ? '✓' : '✗'}</span>
            AA Large (≥3:1)
          </div>
          <div style={{ fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: passAAA ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 700 }}>{passAAA ? '✓' : '✗'}</span>
            AAA (≥7:1)
          </div>
        </div>
      </div>
    </div>
  );
}
