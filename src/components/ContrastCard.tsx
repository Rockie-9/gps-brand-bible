'use client';

interface ContrastCardProps {
  fg: string;
  bg: string;
  label: string;
  ratio: string;
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
}

export default function ContrastCard({ fg, bg, label, ratio, level }: ContrastCardProps) {
  const pass = level !== 'Fail';
  const borderColor = pass ? 'var(--color-success)' : 'var(--color-danger)';

  return (
    <div style={{
      borderRadius: '8px',
      overflow: 'hidden',
      border: `2px solid ${borderColor}`,
      background: '#fff',
    }}>
      <div style={{
        background: bg,
        color: fg,
        padding: '16px',
        fontSize: '13px',
        fontWeight: 700,
        textAlign: 'center',
        minHeight: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {label}
      </div>
      <div style={{
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '10px',
        borderTop: `1px solid ${pass ? 'var(--color-gps-green-100)' : 'rgba(217,79,79,0.1)'}`,
        background: pass ? 'var(--color-gps-green-50)' : 'rgba(217,79,79,0.03)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: pass ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {ratio}
        </span>
        <span style={{
          padding: '2px 8px',
          borderRadius: '100px',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          background: pass ? 'var(--color-success)' : 'var(--color-danger)',
          color: '#fff',
        }}>
          {level}
        </span>
      </div>
      <div style={{
        padding: '4px 12px 6px',
        fontSize: '8px',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-g400)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>FG: {fg}</span>
        <span>BG: {bg}</span>
      </div>
    </div>
  );
}
