'use client';

import { useState, useCallback } from 'react';

interface Decision {
  question: string;
  questionZh: string;
  yes: string | Decision;
  no: string | Decision;
}

const DECISION_TREE: Record<string, Decision> = {
  logo: {
    question: 'Are you using the GPS logo on a light background?',
    questionZh: '您是否在淺色背景上使用 GPS 標誌？',
    yes: {
      question: 'Is the background white or light gray (#F4F5F7 or lighter)?',
      questionZh: '背景是否為白色或淺灰色（#F4F5F7 或更淺）？',
      yes: '✅ Use the Standard Mark. Ensure minimum clearspace of 1/4 mark size on all sides. Min height: 36px digital, 10mm print. See Ch03.',
      no: {
        question: 'Is the background a GPS brand color (Turquoise, Copper, etc.)?',
        questionZh: '背景是否為 GPS 品牌色（青綠色、銅色等）？',
        yes: '✅ Use the Standard Mark if contrast ≥4.5:1. For Turquoise-500 backgrounds, use dark mark (#0A1A22). Check contrast in Ch08.',
        no: '⚠️ Non-brand backgrounds require GPS Strategy approval. Submit your design for review. See Ch23 Co-branding.',
      },
    },
    no: {
      question: 'Is the background dark (#0A1A22 or similar)?',
      questionZh: '背景是否為深色（#0A1A22 或類似）？',
      yes: '✅ Use the Reversed Mark (white). Ensure minimum clearspace. See Ch03 for dark background lockups.',
      no: '⚠️ For non-standard backgrounds, use the Reversed Mark and verify contrast ≥4.5:1 in the Contrast Checker (Ch08).',
    },
  },
  color: {
    question: 'Is this for a digital or print application?',
    questionZh: '這是用於數位還是印刷？',
    yes: {
      question: 'Are you using it as a primary brand surface (hero, header)?',
      questionZh: '您是否將其用作主要品牌表面（主視覺、標頭）？',
      yes: '✅ Use the brand gradient (Turquoise→Copper 135°) or solid Turquoise-500. Primary ratio: 30-80%. See Ch04 + Ch06.',
      no: '✅ Use secondary colors (Purple, Green, Orange) as accents only (10-60% ratio). Never as primary surfaces. See Ch04.',
    },
    no: {
      question: 'Do you need PMS codes for the printer?',
      questionZh: '您是否需要提供 PMS 色號給印刷廠？',
      yes: '✅ Turquoise = PMS 7717 C, Copper = PMS 5235 C. Verify with physical swatch (Delta E < 2). Full codes in Ch04 Color Production Codes table.',
      no: '✅ Use CMYK values from Ch04. Turquoise = C75 M23 Y37 K0. Copper = C25 M24 Y12 K0. Request 300 DPI, PDF/X-1a format.',
    },
  },
  campaign: {
    question: 'Is this a standard policy/procedure announcement?',
    questionZh: '這是否為標準政策/流程公告？',
    yes: '✅ Level 1 (Admin): Use standard three-zone poster layout. Standard gradient. MarCom self-approves. See Ch21 Campaign Design Lab.',
    no: {
      question: 'Is this a safety week, training event, or seasonal campaign?',
      questionZh: '這是否為安全週、培訓活動或季節性活動？',
      yes: '✅ Level 2 (Awareness): Asymmetric layout allowed. Duotone photos OK. Secondary color fills OK. GPS Strategy reviews. See Ch21.',
      no: {
        question: 'Is this a hackathon, innovation day, AI competition, or annual celebration?',
        questionZh: '這是否為黑客松、創新日、AI 競賽或年度慶典？',
        yes: '✅ Level 3 (Creative): Broken grid, oversized type (60%), text masking allowed. GPS Director sign-off required. See Ch21.',
        no: '⚠️ Contact GPS Strategy team for guidance on non-standard campaign types. See App V for contact details.',
      },
    },
  },
};

function DecisionNode({ node, onReset }: { node: Decision | string; onReset: () => void }) {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  if (typeof node === 'string') {
    return (
      <div style={{ padding: '14px', borderRadius: '10px', background: node.startsWith('✅') ? 'rgba(45,159,91,0.06)' : 'rgba(229,153,62,0.06)', border: `1px solid ${node.startsWith('✅') ? 'rgba(45,159,91,0.15)' : 'rgba(229,153,62,0.15)'}`, margin: '10px 0' }}>
        <div style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--color-ink)' }}>{node}</div>
        <button onClick={onReset} style={{ marginTop: '8px', padding: '4px 12px', fontSize: '10px', fontWeight: 700, background: 'var(--color-turquoise-500)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          <span className="en">Ask another question</span><span className="zh">再問另一個問題</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ margin: '8px 0' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '8px', lineHeight: 1.5 }}>
        <span className="en">{node.question}</span>
        <span className="zh">{node.questionZh}</span>
      </div>
      {!answer && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setAnswer('yes')} style={{ padding: '6px 20px', borderRadius: '6px', border: '1px solid var(--color-turquoise-200)', background: 'var(--color-turquoise-50)', color: 'var(--color-turquoise-700)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
            <span className="en">Yes</span><span className="zh">是</span>
          </button>
          <button onClick={() => setAnswer('no')} style={{ padding: '6px 20px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', color: 'var(--color-ink)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
            <span className="en">No</span><span className="zh">否</span>
          </button>
        </div>
      )}
      {answer === 'yes' && <DecisionNode node={node.yes} onReset={onReset} />}
      {answer === 'no' && <DecisionNode node={node.no} onReset={onReset} />}
    </div>
  );
}

export default function BrandDecisionWizard() {
  const [topic, setTopic] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const handleReset = useCallback(() => {
    setTopic(null);
    setKey((k) => k + 1);
  }, []);

  const topics = [
    { id: 'logo', en: 'Logo Usage', zh: '標誌使用', icon: '◎' },
    { id: 'color', en: 'Color Choice', zh: '色彩選擇', icon: '◆' },
    { id: 'campaign', en: 'Campaign Level', zh: '活動等級', icon: '▲' },
  ];

  return (
    <div style={{ border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px', overflow: 'hidden', margin: '16px 0' }}>
      <div style={{ padding: '12px 16px', background: 'linear-gradient(135deg,#0D1B21,#0A1A22)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>
          <span className="en">Brand Decision Wizard</span><span className="zh">品牌決策精靈</span>
        </div>
        <div style={{ fontSize: '9px', color: 'var(--color-turquoise-400)', fontFamily: 'var(--font-mono)' }}>
          <span className="en">Answer Yes/No to get guidance</span><span className="zh">回答是/否以獲得指引</span>
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        {!topic ? (
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-g500)', marginBottom: '10px' }}>
              <span className="en">What do you need help with?</span><span className="zh">您需要什麼方面的協助？</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {topics.map((t) => (
                <button key={t.id} onClick={() => setTopic(t.id)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)', background: '#fff', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-turquoise-300)'; e.currentTarget.style.background = 'var(--color-turquoise-50)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.background = '#fff'; }}
                >
                  <span style={{ fontSize: '16px' }}>{t.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    <span className="en">{t.en}</span><span className="zh">{t.zh}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <DecisionNode key={key} node={DECISION_TREE[topic]} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
