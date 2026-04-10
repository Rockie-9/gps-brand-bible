'use client';

import { useCallback } from 'react';

interface SoundEvent {
  nameEn: string;
  nameZh: string;
  frequencies: number[];
  durations: number[];
  waveform: OscillatorType;
  emotion: string;
}

const SOUND_EVENTS: SoundEvent[] = [
  { nameEn: 'Access Granted', nameZh: '通行允許', frequencies: [523, 659], durations: [0.2, 0.2], waveform: 'sine', emotion: 'Welcoming' },
  { nameEn: 'Access Denied', nameZh: '通行拒絕', frequencies: [440], durations: [0.3], waveform: 'sine', emotion: 'Neutral' },
  { nameEn: 'Badge Tap', nameZh: '感應刷卡', frequencies: [698], durations: [0.1], waveform: 'sine', emotion: 'Acknowledge' },
  { nameEn: 'System Ready', nameZh: '系統就緒', frequencies: [392, 523], durations: [0.15, 0.25], waveform: 'sine', emotion: 'Reassuring' },
  { nameEn: 'Visitor Welcome', nameZh: '訪客歡迎', frequencies: [523, 659, 784], durations: [0.2, 0.2, 0.3], waveform: 'sine', emotion: 'Warm' },
  { nameEn: 'Alert', nameZh: '警報', frequencies: [1000, 0, 1000], durations: [0.5, 0.5, 0.5], waveform: 'sine', emotion: 'Urgent' },
];

export default function SonicPlayer() {
  const playSound = useCallback((event: SoundEvent) => {
    const ctx = new AudioContext();
    let offset = 0;

    event.frequencies.forEach((freq, i) => {
      if (freq === 0) {
        offset += event.durations[i];
        return;
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = event.waveform;
      osc.frequency.value = freq;

      // Smooth envelope
      gain.gain.setValueAtTime(0, ctx.currentTime + offset);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + offset + 0.02);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + offset + event.durations[i] - 0.03);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + offset + event.durations[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + event.durations[i]);

      offset += event.durations[i];
    });
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px', margin: '14px 0' }}>
      {SOUND_EVENTS.map((event) => (
        <button
          key={event.nameEn}
          onClick={() => playSound(event)}
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            padding: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-turquoise-300)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(38,167,176,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="var(--color-turquoise-400)" strokeWidth="1.5" />
              <polygon points="8,6 15,10 8,14" fill="var(--color-turquoise-500)" />
            </svg>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="en">{event.nameEn}</span>
              <span className="zh">{event.nameZh}</span>
            </div>
          </div>
          <div style={{ fontSize: '8px', fontFamily: 'var(--font-mono)', color: 'var(--color-g400)', lineHeight: 1.4 }}>
            {event.frequencies.filter(f => f > 0).map(f => `${f}Hz`).join(' → ')}
            <br />
            {event.emotion}
          </div>
        </button>
      ))}
    </div>
  );
}
