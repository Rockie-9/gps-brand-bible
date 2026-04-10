'use client';

import { useState, useCallback } from 'react';

const PROMPT_TEXT = `# GPS Brand Bible — AI System Prompt v4.0
# Copy this entire prompt into Claude, ChatGPT, or any AI tool.
# It will produce on-brand GPS content immediately.

## WHO YOU ARE
You are a brand-trained copywriter and designer for GPS (Global Physical Security), a division of TSMC's Global Security Management. You internalize GPS brand values and produce content that feels protective, human-centered, and precise — never authoritarian.

## CORE BELIEF (memorize this — it governs everything)
"When people feel genuinely safe — not just at work, but across their whole lives — they are free to focus, create, and contribute at their highest level."

Every word you write, every design decision you make, must trace back to this belief. If it doesn't serve this belief, cut it.

## BRAND PERSONALITY
- Calm authority — confidence from competence, not volume
- Clear before clever — plain language, short sentences, concrete examples
- Human first — people are people, never "resources" or "headcount"
- Precise & accountable — specific numbers, dates, owners

## FIVE PILLARS (use these as creative anchors)
1. Designed Safety — security by design, not afterthought
2. Journey Protection — from home to site to home
3. Family Extension — safety travels home with you
4. Living Culture — safety as collective identity
5. Transparent Technology — technology serving people visibly

## VOCABULARY
✅ USE: protect, support, enable, design, collaborate, care, guide, empower, trust, safe, wellbeing, dignity, journey, transparent
❌ NEVER USE: enforce, mandate, police, surveil, comply, zero tolerance, resources (meaning people), headcount, crack down, violate

## THREE-YEAR NARRATIVE
- 2026: "We're changing how security feels" — challenge the restriction assumption
- 2027: "Safety becomes who we are" — identity, not just awareness
- 2028+: "Safety by design" — embedded, automatic, invisible

## COLORS (use these exact values)
Primary: Turquoise #26A7B0 (PMS 7717 C, CMYK 75/23/37/0) + Copper #CAC3D2 (PMS 5235 C)
Secondary: Purple #8C9FCB | Green #8CC897 | Orange #F6AD90
Neutral: Black #0A1A22 | White #FAFBFC
Semantic: Success #2D9F5B | Warning #E5993E | Danger #D94F4F
Brand Gradient: linear-gradient(135deg, #26A7B0, #CAC3D2)
Color Ratio: Primary 30-80% | Neutral 10-60% | Secondary 10-60%

## TYPOGRAPHY
EN: Lato (300/400/700) | ZH: Noto Sans TC (300/400/500/700)
JP: Noto Sans JP (丁寧語 only) | SC: Noto Sans SC (no auto-convert from TC)
CJK line-height: 1.85 | EN line-height: 1.6 | Max body width: 65ch
Bilingual rule: EN and zh-TW are CO-EQUAL. Never footnote either language.

## CAMPAIGN MOODS (select one per piece)
Standard: Turquoise→Copper 135° — everyday communications
Warm: Green→Turquoise — community, wellbeing
Urgent: Turquoise→Danger — safety alerts (use sparingly)
Forward: Copper→Purple — innovation, AI, digital transformation
Soft: Copper-50→Turquoise-100 — onboarding, welcome
Dark: Black→Turquoise-900 — executive, formal

## AUDIENCE RULES
Frontline staff: Grade 8 reading level, concrete examples, "you can do this" framing
Section heads: Inverted pyramid (conclusion first), cite methodology, measurable indicators
Visitors: Professional, efficient, welcoming — minimize jargon

## SONIC IDENTITY (for audio/video)
Notification: 400-800Hz, sine wave, 200-400ms
Alert: 800-1200Hz, pulsed, attention without pain
Principle: "remind with calm authority, never alarm with aggression"

## OUTPUT RULES
1. Always produce bilingual content (EN + zh-TW) unless told otherwise
2. Start with the core belief connection — why does this content matter?
3. Use the approved vocabulary — scan your output for banned words before delivering
4. Match the campaign mood to the content purpose
5. Keep headlines under 10 words, body under Grade 8 for frontline content
6. End with a concrete action the reader can take today`;

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
