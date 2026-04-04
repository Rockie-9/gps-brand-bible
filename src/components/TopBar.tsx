'use client';

import { navigation } from '@/lib/navigation';
import LangToggle from './LangToggle';

interface TopBarProps {
  activeSection: string;
  lang: string;
  onLangToggle: (lang: string) => void;
  onMenuOpen: () => void;
}

export default function TopBar({ activeSection, lang, onLangToggle, onMenuOpen }: TopBarProps) {
  const item = navigation.flatMap((g) => g.items).find((i) => i.id === activeSection);
  const title = item ? (lang === 'zh' ? item.zh : item.en) : '';

  return (
    <div
      className="h-12 bg-white flex items-center px-8 sticky top-0 z-50 text-[11px]"
      style={{ borderBottom: '1px solid var(--color-g200)', color: 'var(--color-g500)' }}
    >
      <button
        className="mob-btn flex items-center justify-center w-9 h-9 border-none bg-transparent cursor-pointer p-0 md:hidden"
        onClick={onMenuOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="var(--color-ink)" strokeWidth="2" fill="none">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <span className="en">Brand Bible</span>
      <span className="zh">品牌聖經</span>
      {' / '}
      <b style={{ color: 'var(--color-ink)' }}>{title}</b>
      <div className="ml-auto">
        <LangToggle lang={lang} onToggle={onLangToggle} />
      </div>
    </div>
  );
}
