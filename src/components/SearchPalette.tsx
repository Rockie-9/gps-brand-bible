'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { navigation } from '@/lib/navigation';

interface SearchIndex {
  id: string;
  slug: string;
  headings: string[];
  searchEN: string;
  searchZH: string;
  codes: string[];
  colors: string[];
}

interface SearchResult {
  id: string;
  number: string;
  en: string;
  zh: string;
  groupEn: string;
  groupZh: string;
  matchType: 'title' | 'heading' | 'content' | 'token';
  matchText?: string;
}

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function SearchPalette({ isOpen, onClose, onNavigate }: SearchProps) {
  const [query, setQuery] = useState('');
  const [contentIndex, setContentIndex] = useState<SearchIndex[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load content index on first open
  useEffect(() => {
    if (isOpen && contentIndex.length === 0) {
      fetch('/search-index.json')
        .then((r) => r.json())
        .then((data) => setContentIndex(data))
        .catch(() => {});
    }
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen, contentIndex.length]);

  const allNavItems = navigation.flatMap((g) =>
    g.items.map((item) => ({ ...item, groupEn: g.en, groupZh: g.zh }))
  );

  const search = useCallback(
    (q: string): SearchResult[] => {
      if (!q.trim()) {
        return allNavItems.map((item) => ({
          ...item,
          matchType: 'title' as const,
        }));
      }

      const lower = q.toLowerCase();
      const results: SearchResult[] = [];
      const seen = new Set<string>();

      // 1. Title matches (highest priority)
      for (const item of allNavItems) {
        if (
          item.en.toLowerCase().includes(lower) ||
          item.zh.includes(q) ||
          item.number.toLowerCase().includes(lower)
        ) {
          results.push({ ...item, matchType: 'title' });
          seen.add(item.id);
        }
      }

      // 2. Heading matches from content index
      for (const entry of contentIndex) {
        if (seen.has(entry.id)) continue;
        const matchedHeading = entry.headings.find((h) =>
          h.toLowerCase().includes(lower)
        );
        if (matchedHeading) {
          const nav = allNavItems.find((n) => n.id === entry.id);
          if (nav) {
            results.push({
              ...nav,
              matchType: 'heading',
              matchText: matchedHeading,
            });
            seen.add(entry.id);
          }
        }
      }

      // 3. Token/code matches
      for (const entry of contentIndex) {
        if (seen.has(entry.id)) continue;
        const matchedCode = entry.codes.find((c) =>
          c.toLowerCase().includes(lower)
        );
        const matchedColor = entry.colors.find((c) =>
          c.toLowerCase().includes(lower)
        );
        if (matchedCode || matchedColor) {
          const nav = allNavItems.find((n) => n.id === entry.id);
          if (nav) {
            results.push({
              ...nav,
              matchType: 'token',
              matchText: matchedCode || matchedColor,
            });
            seen.add(entry.id);
          }
        }
      }

      // 4. Full-text content matches
      for (const entry of contentIndex) {
        if (seen.has(entry.id)) continue;
        if (
          entry.searchEN.toLowerCase().includes(lower) ||
          entry.searchZH.includes(q)
        ) {
          const nav = allNavItems.find((n) => n.id === entry.id);
          if (nav) {
            // Extract snippet around match
            const idx = entry.searchEN.toLowerCase().indexOf(lower);
            const snippet =
              idx >= 0
                ? '...' +
                  entry.searchEN.slice(Math.max(0, idx - 30), idx + lower.length + 40) +
                  '...'
                : undefined;
            results.push({
              ...nav,
              matchType: 'content',
              matchText: snippet,
            });
            seen.add(entry.id);
          }
        }
      }

      return results;
    },
    [allNavItems, contentIndex]
  );

  const filtered = search(query);

  const handleSelect = useCallback(
    (id: string) => {
      onNavigate(id);
      onClose();
      setQuery('');
    },
    [onNavigate, onClose]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('gps-search-toggle'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchTypeLabel: Record<string, { en: string; zh: string; color: string }> = {
    title: { en: 'Title', zh: '標題', color: 'var(--color-turquoise-500)' },
    heading: { en: 'Section', zh: '段落', color: 'var(--color-gps-purple-400)' },
    token: { en: 'Token', zh: '代符', color: 'var(--color-gps-orange-300)' },
    content: { en: 'Content', zh: '內容', color: 'var(--color-gps-green-400)' },
  };

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ background: 'rgba(10,26,34,0.5)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="mx-auto mt-[12vh] w-full max-w-[560px] bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.25)', margin: '12vh 16px 0' }}
      >
        <div className="flex items-center px-4 py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginRight: '10px' }}>
            <circle cx="8" cy="8" r="6" stroke="var(--color-g400)" strokeWidth="1.5" />
            <path d="M12.5 12.5l4 4" stroke="var(--color-g400)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, headings, tokens, colors... / 搜尋章節、段落、代符、色彩..."
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
            <div className="px-4 py-8 text-center text-xs" style={{ color: 'var(--color-g400)' }}>
              <span className="en">No results found</span>
              <span className="zh">未找到結果</span>
            </div>
          ) : (
            filtered.slice(0, 20).map((item) => (
              <button
                key={item.id + item.matchType}
                onClick={() => handleSelect(item.id)}
                className="w-full flex items-start gap-3 px-4 py-2.5 border-none cursor-pointer text-left"
                style={{ background: 'transparent', transition: 'background 0.1s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-turquoise-50)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span
                  className="text-[10px] min-w-[22px] text-center mt-0.5"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-turquoise-500)', fontWeight: 700 }}
                >
                  {item.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold truncate" style={{ color: 'var(--color-ink)' }}>
                      <span className="en">{item.en}</span>
                      <span className="zh">{item.zh}</span>
                    </span>
                    <span
                      className="text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ background: matchTypeLabel[item.matchType]?.color, color: '#fff', opacity: 0.9 }}
                    >
                      <span className="en">{matchTypeLabel[item.matchType]?.en}</span>
                      <span className="zh">{matchTypeLabel[item.matchType]?.zh}</span>
                    </span>
                  </div>
                  {item.matchText && (
                    <div
                      className="text-[10px] mt-0.5 truncate"
                      style={{ color: 'var(--color-g400)', fontFamily: item.matchType === 'token' ? 'var(--font-mono)' : 'inherit' }}
                    >
                      {item.matchText}
                    </div>
                  )}
                  <div className="text-[9px]" style={{ color: 'var(--color-g300)' }}>
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
          style={{ borderTop: '1px solid rgba(0,0,0,0.04)', color: 'var(--color-g400)', fontFamily: 'var(--font-mono)' }}
        >
          <span>{filtered.length} <span className="en">results</span><span className="zh">結果</span></span>
          <div className="flex gap-2">
            <span style={{ color: matchTypeLabel.title.color }}>● <span className="en">Title</span><span className="zh">標題</span></span>
            <span style={{ color: matchTypeLabel.heading.color }}>● <span className="en">Section</span><span className="zh">段落</span></span>
            <span style={{ color: matchTypeLabel.token.color }}>● <span className="en">Token</span><span className="zh">代符</span></span>
            <span style={{ color: matchTypeLabel.content.color }}>● <span className="en">Content</span><span className="zh">內容</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
