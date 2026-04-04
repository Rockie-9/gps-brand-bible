'use client';

import { useState, useCallback } from 'react';

const PROMPT_TEXT = `You are designing materials for GPS (Global Physical Security), a division under TSMC's Global Security Management (GSM). Follow these brand rules strictly.

=== COLORS ===
Primary: Turquoise #26A7B0 (PMS 7466 C pending), Copper #CAC3D2 (PMS 5235 C pending)
Secondary: Purple #8C9FCB, Green #8CC897, Orange #F6AD90
Neutral: Black #0A1A22, Ink #1A2A32, Charcoal #2D3E48, Slate #4A5E6A, White #FAFBFC
Semantic: Success #2D9F5B, Warning #E5993E, Danger #D94F4F
Ratio: Primary 30-80% | Neutral 10-60% | Secondary 10-60%

=== DARK MODE ===
BG #0D1B21, Surface #142229, Surface2 #1C2F38, Border #243944
Text #E2E8EC, TextMuted #8A9BA5. Never use pure white.

=== TYPOGRAPHY ===
EN: Lato (Light 300, Regular 400, Bold 700). ZH: Noto Sans TC (L/R/M/B).
Fallback: Trebuchet MS, Verdana. Mono: SF Mono, Fira Code, Consolas.
CJK line-height 1.85, EN line-height 1.6. Max body width 65ch.
Bilingual: EN at 85-90% of CJK size. Stack CJK above EN.

=== SPACING ===
Base unit: 4px. Scale: 4/8/12/16/24/32/48/64/96px.
Breakpoints: sm 420px (4-col), md 768px (8-col), lg 1024px (12-col), xl 1280px (12-col).
Border radius: sm 4px, md 6px, lg 8px, xl 12px.

=== VOICE & TONE ===
Warm, protective, human-centered. Never authoritarian or surveillance-language.
Use: protect, support, enable, design, collaborate, care, guide, empower, trust
Avoid: enforce, mandate, police, surveil, comply (imperative), zero tolerance, resources (people)
Core belief: "When people feel genuinely safe — not just at work, but across their whole lives — they are free to focus, create, and contribute at their highest level."

=== CAMPAIGN MOODS ===
Standard: Turquoise→Copper 135° (everyday comms)
Warm: Green→Turquoise 135° (community, wellbeing)
Urgent: Turquoise→Danger (safety alerts — use sparingly)
Forward: Copper→Purple 135° (innovation, AI)
Soft: Copper-50→Turquoise-100 (onboarding, welcome)
Dark: Black→Turquoise-900 (executive, formal)

=== MOTION ===
Reveal 400ms ease-in (cubic-bezier 0.25,0.1,0.25,1) — "a curtain rising gently"
Cascade 350ms stagger 80ms — "dominoes in slow motion"
Pulse 600ms ease-in-out — "a heartbeat, not an alarm"
Settle 500ms overshoot (cubic-bezier 0.16,1,0.3,1) — "a stone finding rest"

=== FIVE PILLARS ===
Designed Safety | Journey Protection | Family Extension | Living Culture | Transparent Technology

=== NARRATIVE ARC ===
Year 1: "We are changing how security feels" — break the control frame
Year 2: "Safety becomes who we are" — cultural identity shift
Year 3: "Safety by design" — embedded, automatic, invisible`;

interface AIPromptPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIPromptPanel({ isOpen, onClose }: AIPromptPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] p-6 overflow-y-auto"
      style={{ background: 'rgba(10,26,34,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="max-w-[700px] mx-auto mt-10 bg-white rounded-xl p-6 relative"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 bg-none border-none text-2xl cursor-pointer"
          style={{ color: 'var(--color-g400)' }}
        >
          &times;
        </button>
        <div className="text-[11px] font-bold mb-1" style={{ color: 'var(--color-turquoise-500)', letterSpacing: '0.08em' }}>
          AI BRAND CONTEXT
        </div>
        <div className="text-lg font-bold mb-1" style={{ color: 'var(--color-ink)' }}>
          <span className="en">Copy GPS Brand Prompt</span>
          <span className="zh">複製 GPS 品牌提示詞</span>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--color-g500)' }}>
          <span className="en">Paste this into Claude, ChatGPT, or any AI tool to get on-brand output instantly. Contains all colors, fonts, voice rules, and layout specs.</span>
          <span className="zh">將此貼入 Claude、ChatGPT 或任何 AI 工具，即可立即獲得符合品牌的輸出。包含所有色彩、字體、語調規則和版面規格。</span>
        </p>
        <textarea
          readOnly
          value={PROMPT_TEXT}
          className="w-full h-80 p-3 rounded-md resize-y text-[10px]"
          style={{
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.6,
            border: '1px solid var(--color-g200)',
            background: 'var(--color-g50)',
            color: 'var(--color-ink)',
          }}
        />
        <button
          onClick={handleCopy}
          className="mt-2.5 px-6 py-2.5 border-none rounded-md font-bold cursor-pointer text-[13px]"
          style={{ background: 'var(--color-turquoise-500)', color: '#fff' }}
        >
          {copied ? (
            <><span className="en">{'\u2713'} Copied</span><span className="zh">{'\u2713'} 已複製</span></>
          ) : (
            <><span className="en">Copy Prompt</span><span className="zh">複製提示詞</span></>
          )}
        </button>
      </div>
    </div>
  );
}
