'use client';

import { navigation } from '@/lib/navigation';
import LangToggle from './LangToggle';

interface SidebarProps {
  activeSection: string;
  lang: string;
  isOpen: boolean;
  onNavigate: (sectionId: string) => void;
  onLangToggle: (lang: string) => void;
  onClose: () => void;
  onComplianceCheck: () => void;
  onBrandAssistant: () => void;
  onAIPrompt: () => void;
}

const logoSvg = (
  <svg width="32" height="32" viewBox="0 0 80 90" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="50" cy="5" r="1.5" fill="#8EA0A8" />
    <circle cx="56" cy="7" r="1.2" fill="#A8B8C0" />
    <circle cx="44" cy="8" r="1.8" fill="#96A8B2" />
    <circle cx="61" cy="10" r="1" fill="#B0BCC3" />
    <rect x="38" y="12" width="4.5" height="3.8" rx=".8" fill="#8EA0A8" />
    <rect x="44" y="11" width="5" height="4" rx=".8" fill="#3DB9C2" />
    <rect x="50" y="12.5" width="4" height="3.5" rx=".8" fill="#96A8B2" />
    <rect x="56" y="14" width="3.5" height="3" rx=".7" fill="#26A7B0" opacity=".6" />
    <rect x="32" y="19" width="5.5" height="4.5" rx=".8" fill="#7A9098" />
    <rect x="39" y="18.5" width="5.5" height="4.5" rx=".8" fill="#26A7B0" />
    <rect x="46" y="19" width="5" height="4.2" rx=".8" fill="#8EA0A8" />
    <rect x="53" y="20" width="4.5" height="3.8" rx=".8" fill="#3DB9C2" />
    <rect x="59" y="21" width="3.5" height="3" rx=".7" fill="#96A8B2" opacity=".5" />
    <rect x="26" y="26" width="6" height="5" rx="1" fill="#26A7B0" />
    <rect x="34" y="25.5" width="6" height="5" rx="1" fill="#7A9098" />
    <rect x="42" y="26" width="6" height="5" rx="1" fill="#26A7B0" />
    <rect x="50" y="26.5" width="5.5" height="4.5" rx=".9" fill="#8EA0A8" />
    <rect x="57" y="27.5" width="4.5" height="3.8" rx=".8" fill="#3DB9C2" opacity=".6" />
    <rect x="22" y="33.5" width="6.5" height="5.2" rx="1" fill="#7A9098" />
    <rect x="30" y="33" width="6.5" height="5.2" rx="1" fill="#26A7B0" />
    <rect x="38" y="33.5" width="6.5" height="5.2" rx="1" fill="#7A9098" />
    <rect x="46" y="34" width="6" height="5" rx="1" fill="#26A7B0" />
    <rect x="54" y="35" width="5" height="4" rx=".9" fill="#8EA0A8" opacity=".5" />
    <rect x="18" y="41" width="6.5" height="5.2" rx="1" fill="#26A7B0" />
    <rect x="26" y="40.5" width="6.5" height="5.2" rx="1" fill="#8EA0A8" />
    <rect x="34" y="41" width="6.5" height="5.2" rx="1" fill="#26A7B0" />
    <rect x="42" y="41.5" width="6" height="5" rx="1" fill="#7A9098" />
    <rect x="50" y="42" width="5" height="4.2" rx=".9" fill="#3DB9C2" opacity=".5" />
    <rect x="15" y="48.5" width="6" height="5" rx="1" fill="#8EA0A8" />
    <rect x="23" y="48" width="6" height="5" rx="1" fill="#26A7B0" />
    <rect x="31" y="48.5" width="6" height="5" rx="1" fill="#7A9098" />
    <rect x="39" y="49" width="5.5" height="4.5" rx=".9" fill="#26A7B0" />
    <rect x="13" y="56" width="5.5" height="4.5" rx=".9" fill="#26A7B0" />
    <rect x="20" y="55.5" width="5.5" height="4.5" rx=".9" fill="#8EA0A8" />
    <rect x="27.5" y="56" width="5.5" height="4.5" rx=".9" fill="#26A7B0" />
    <rect x="35" y="57" width="4.5" height="3.8" rx=".8" fill="#7A9098" opacity=".6" />
    <rect x="16" y="63" width="5" height="4" rx=".8" fill="#7A9098" />
    <rect x="23" y="62.5" width="5" height="4" rx=".8" fill="#26A7B0" />
    <rect x="30" y="63.5" width="4.5" height="3.8" rx=".8" fill="#8EA0A8" opacity=".6" />
    <rect x="19" y="69.5" width="4.5" height="3.5" rx=".7" fill="#26A7B0" />
    <rect x="25.5" y="70" width="4" height="3.2" rx=".7" fill="#7A9098" />
    <rect x="22" y="76" width="3.5" height="3" rx=".6" fill="#26A7B0" opacity=".7" />
  </svg>
);

export default function Sidebar({
  activeSection,
  lang,
  isOpen,
  onNavigate,
  onLangToggle,
  onClose,
  onComplianceCheck,
  onBrandAssistant,
  onAIPrompt,
}: SidebarProps) {
  return (
    <>
      <div
        className={`nav-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
      />
      <nav className={`nav-sidebar${isOpen ? ' open' : ''}`} role="navigation" aria-label="Brand Bible sections">
        <div
          className="flex items-center gap-2.5 px-4 pt-5 pb-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {logoSvg}
          <div>
            <h2
              className="text-[17px] font-normal text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="en">GPS Brand Bible</span>
              <span className="zh">GPS 品牌聖經</span>
            </h2>
            <small
              className="text-[9px] block mt-0.5"
              style={{ color: 'var(--color-turquoise-500)', fontFamily: 'var(--font-mono)' }}
            >
              Mega Portal v4.0 — 2026
            </small>
          </div>
        </div>

        <div className="mx-4 mt-2.5 mb-1.5">
          <LangToggle lang={lang} onToggle={onLangToggle} variant="dark" />
        </div>

        {navigation.map((group) => (
          <div key={group.en}>
            <div
              className="pt-2.5 pl-4 text-[8px] font-bold uppercase mt-1"
              style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)' }}
            >
              <span className="en">{group.en}</span>
              <span className="zh">{group.zh}</span>
            </div>
            {group.items.map((item) => (
              <a
                key={item.id}
                className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span
                  className="text-[9px] min-w-[18px]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: activeSection === item.id ? 'var(--color-turquoise-500)' : 'rgba(255,255,255,0.25)',
                  }}
                >
                  {item.number}
                </span>
                <span className="en">{item.en}</span>
                <span className="zh">{item.zh}</span>
              </a>
            ))}
          </div>
        ))}

        <div
          className="px-4 py-2.5 text-[9px]"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.2)',
            lineHeight: 1.5,
          }}
        >
          <span className="en">Confidential — Internal Use Only</span>
          <span className="zh">機密 — 僅供內部使用</span>
          <div className="flex gap-0.5 mt-1">
            {['EN', 'zh-TW', 'SC', 'DE', 'JP', 'ES'].map((l) => (
              <span
                key={l}
                className="px-1.5 py-px rounded-sm text-[8px] font-bold"
                style={{
                  background: l === 'EN' || l === 'zh-TW' ? 'rgba(38,167,176,0.18)' : 'rgba(255,255,255,0.05)',
                  color: l === 'EN' || l === 'zh-TW' ? 'var(--color-turquoise-500)' : 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={onComplianceCheck}
            style={{
              width: '100%', padding: '9px', marginBottom: '6px',
              background: 'var(--color-turquoise-500)', color: '#fff',
              border: 'none', borderRadius: '6px', fontWeight: 700,
              cursor: 'pointer', fontSize: '11px', letterSpacing: '0.04em',
            }}
          >
            <span className="en">AI Compliance Check</span>
            <span className="zh">AI 合規檢查</span>
          </button>
          <button
            onClick={onBrandAssistant}
            style={{
              width: '100%', padding: '9px', marginBottom: '6px',
              background: 'transparent', color: 'var(--color-turquoise-400)',
              border: '1px solid var(--color-turquoise-700)', borderRadius: '6px',
              fontWeight: 700, cursor: 'pointer', fontSize: '11px', letterSpacing: '0.04em',
            }}
          >
            <span className="en">AI Brand Assistant</span>
            <span className="zh">AI 品牌助手</span>
          </button>
          <button
            onClick={onAIPrompt}
            style={{
              width: '100%', padding: '9px',
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
              fontWeight: 700, cursor: 'pointer', fontSize: '11px', letterSpacing: '0.04em',
            }}
          >
            <span className="en">AI Brand Prompt</span>
            <span className="zh">AI 品牌提示詞</span>
          </button>
        </div>
      </nav>
    </>
  );
}
