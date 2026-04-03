'use client';

import { useCallback } from 'react';

interface LangToggleProps {
  lang: string;
  onToggle: (lang: string) => void;
  variant?: 'light' | 'dark';
}

export default function LangToggle({ lang, onToggle, variant = 'light' }: LangToggleProps) {
  const handleEN = useCallback(() => onToggle('en'), [onToggle]);
  const handleZH = useCallback(() => onToggle('zh'), [onToggle]);

  const borderColor = variant === 'dark' ? 'rgba(255,255,255,0.1)' : undefined;

  return (
    <div
      className="flex border rounded overflow-hidden text-[10px] font-bold shrink-0"
      style={{
        borderColor: borderColor || 'var(--color-g200)',
        letterSpacing: '0.04em',
      }}
    >
      <button
        onClick={handleEN}
        className="border-none px-2.5 py-1 cursor-pointer text-[10px] font-bold transition-all duration-150"
        style={{
          background: lang === 'en' ? 'var(--color-turquoise-500)' : 'none',
          color: lang === 'en' ? '#fff' : variant === 'dark' ? 'rgba(255,255,255,0.4)' : 'var(--color-g500)',
        }}
      >
        EN
      </button>
      <button
        onClick={handleZH}
        className="border-none px-2.5 py-1 cursor-pointer text-[10px] font-bold transition-all duration-150"
        style={{
          background: lang === 'zh' ? 'var(--color-turquoise-500)' : 'none',
          color: lang === 'zh' ? '#fff' : variant === 'dark' ? 'rgba(255,255,255,0.4)' : 'var(--color-g500)',
        }}
      >
        中文
      </button>
    </div>
  );
}
