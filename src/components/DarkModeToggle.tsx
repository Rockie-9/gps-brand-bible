'use client';

import { useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-ink)' }}>
          <span className="en">Preview Mode:</span><span className="zh">預覽模式：</span>
        </span>
        <button
          onClick={() => setDark(false)}
          style={{
            padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontSize: '10px', fontWeight: 700,
            background: !dark ? 'var(--color-turquoise-500)' : 'var(--color-g100)',
            color: !dark ? '#fff' : 'var(--color-g500)',
          }}
        >Light</button>
        <button
          onClick={() => setDark(true)}
          style={{
            padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer',
            fontSize: '10px', fontWeight: 700,
            background: dark ? 'var(--color-turquoise-500)' : 'var(--color-g100)',
            color: dark ? '#fff' : 'var(--color-g500)',
          }}
        >Dark</button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
      }}>
        {/* Light panel */}
        <div style={{
          background: dark ? 'var(--color-dm-bg)' : '#F4F5F7',
          borderRadius: '10px', padding: '16px',
          border: `1px solid ${dark ? 'var(--color-dm-border)' : 'var(--color-g200)'}`,
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            background: dark ? 'var(--color-dm-surface)' : '#fff',
            borderRadius: '8px', padding: '14px',
            border: `1px solid ${dark ? 'var(--color-dm-border)' : 'var(--color-g200)'}`,
            transition: 'all 0.3s ease',
          }}>
            <h5 style={{
              color: dark ? 'var(--color-dm-text)' : 'var(--color-ink)',
              fontSize: '13px', fontWeight: 700, marginBottom: '4px',
              transition: 'color 0.3s',
            }}>
              <span className="en">Card Title</span><span className="zh">卡片標題</span>
            </h5>
            <p style={{
              color: dark ? 'var(--color-dm-muted)' : 'var(--color-g500)',
              fontSize: '11px', margin: 0, lineHeight: 1.5,
              transition: 'color 0.3s',
            }}>
              <span className="en">Body text adapts to the selected mode with appropriate contrast ratios.</span>
              <span className="zh">內文會根據所選模式調整，保持適當的對比度。</span>
            </p>
            <div style={{
              marginTop: '10px', padding: '6px 12px', borderRadius: '4px',
              background: dark ? 'var(--color-turquoise-400)' : 'var(--color-turquoise-500)',
              color: dark ? 'var(--color-dm-bg)' : '#fff',
              fontSize: '10px', fontWeight: 700, display: 'inline-block',
              transition: 'all 0.3s',
            }}>
              <span className="en">Action Button</span><span className="zh">操作按鈕</span>
            </div>
          </div>
        </div>

        {/* Token reference */}
        <div style={{
          background: dark ? 'var(--color-dm-surface)' : '#fff',
          borderRadius: '10px', padding: '14px',
          border: `1px solid ${dark ? 'var(--color-dm-border)' : 'var(--color-g200)'}`,
          fontSize: '10px', fontFamily: 'var(--font-mono)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ fontWeight: 700, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px', color: dark ? 'var(--color-turquoise-400)' : 'var(--color-turquoise-600)' }}>
            <span className="en">Active Tokens</span><span className="zh">作用中代符</span>
          </div>
          {[
            { token: '--bg', light: '#F4F5F7', dark: '#0D1B21' },
            { token: '--surface', light: '#FFFFFF', dark: '#142229' },
            { token: '--border', light: '#E2E6EA', dark: '#243944' },
            { token: '--text', light: '#1A2A32', dark: '#E2E8EC' },
            { token: '--text-muted', light: '#6B7B85', dark: '#8A9BA5' },
            { token: '--accent', light: '#26A7B0', dark: '#3DB9C2' },
          ].map(t => (
            <div key={t.token} style={{
              display: 'flex', justifyContent: 'space-between', padding: '3px 0',
              borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'var(--color-g100)'}`,
              color: dark ? 'var(--color-dm-text)' : 'var(--color-ink)',
              transition: 'all 0.3s',
            }}>
              <span style={{ color: dark ? 'var(--color-dm-muted)' : 'var(--color-g500)' }}>{t.token}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: dark ? t.dark : t.light, border: '1px solid rgba(0,0,0,0.1)' }} />
                <span>{dark ? t.dark : t.light}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
