'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { navigation } from '@/lib/navigation';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function SearchPalette({ isOpen, onClose, onNavigate }: SearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = navigation.flatMap((g) =>
    g.items.map((item) => ({
      ...item,
      groupEn: g.en,
      groupZh: g.zh,
    }))
  );

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.en.toLowerCase().includes(query.toLowerCase()) ||
          item.zh.includes(query) ||
          item.number.toLowerCase().includes(query.toLowerCase()) ||
          item.groupEn.toLowerCase().includes(query.toLowerCase()) ||
          item.groupZh.includes(query)
      )
    : allItems;

  const handleSelect = useCallback(
    (id: string) => {
      onNavigate(id);
      onClose();
      setQuery('');
    },
    [onNavigate, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Dispatch custom event to open from page.tsx
          window.dispatchEvent(new CustomEvent('gps-search-toggle'));
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ background: 'rgba(10,26,34,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="mx-auto mt-[15vh] w-full max-w-[520px] bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        <div className="flex items-center px-4 py-3" style={{ borderBottom: '1px solid var(--color-g200)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginRight: '10px' }}>
            <circle cx="7" cy="7" r="5.5" stroke="var(--color-g400)" strokeWidth="1.5" />
            <path d="M11 11l3.5 3.5" stroke="var(--color-g400)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections... / 搜尋章節..."
            className="flex-1 border-none outline-none text-sm"
            style={{ fontFamily: 'var(--font-en)', color: 'var(--color-ink)', background: 'transparent' }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filtered.length > 0) handleSelect(filtered[0].id);
            }}
          />
          <kbd
            className="px-1.5 py-0.5 rounded text-[9px] font-bold"
            style={{ background: 'var(--color-g100)', color: 'var(--color-g400)', fontFamily: 'var(--font-mono)' }}
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs" style={{ color: 'var(--color-g400)' }}>
              <span className="en">No sections found</span>
              <span className="zh">未找到章節</span>
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 border-none cursor-pointer text-left"
                style={{ background: 'transparent', transition: 'background 0.1s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-turquoise-50)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  className="text-[10px] min-w-[22px] text-center"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-turquoise-500)', fontWeight: 700 }}
                >
                  {item.number}
                </span>
                <div>
                  <div className="text-xs font-bold" style={{ color: 'var(--color-ink)' }}>
                    <span className="en">{item.en}</span>
                    <span className="zh">{item.zh}</span>
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--color-g400)' }}>
                    <span className="en">{item.groupEn}</span>
                    <span className="zh">{item.groupZh}</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div
          className="px-4 py-2 flex items-center justify-between text-[9px]"
          style={{ borderTop: '1px solid var(--color-g100)', color: 'var(--color-g400)', fontFamily: 'var(--font-mono)' }}
        >
          <span>{filtered.length} <span className="en">sections</span><span className="zh">章節</span></span>
          <span>
            <kbd className="px-1 py-0.5 rounded" style={{ background: 'var(--color-g100)' }}>↵</kbd> <span className="en">to select</span><span className="zh">選擇</span>
          </span>
        </div>
      </div>
    </div>
  );
}
