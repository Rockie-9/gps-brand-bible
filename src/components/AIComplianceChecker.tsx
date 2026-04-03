'use client';

import { useState, useCallback } from 'react';

interface VocabIssue {
  word: string;
  line?: number;
  context?: string;
  suggestion: string;
  severity: 'banned' | 'cautionary';
}

interface ToneResult {
  detected: string;
  confidence: number;
  notes: string;
}

interface ReadabilityResult {
  estimatedGrade: number;
  passesGrade8: boolean;
  issues: Array<{ type: string; text: string; suggestion: string }>;
}

interface BilingualResult {
  hasEnglish: boolean;
  hasTraditionalChinese: boolean;
  balanced: boolean;
  notes: string;
}

interface Reference {
  section: string;
  sectionName: string;
  reason: string;
}

interface ComplianceResult {
  vocabulary: VocabIssue[];
  tone: ToneResult;
  readability: ReadabilityResult;
  bilingual: BilingualResult;
  references: Reference[];
  overallScore: number;
  summary: string;
  error?: string;
}

interface AIComplianceCheckerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIComplianceChecker({ isOpen, onClose }: AIComplianceCheckerProps) {
  const [text, setText] = useState('');
  const [audience, setAudience] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    vocabulary: true, tone: true, readability: true, bilingual: true,
  });

  const handleCheck = useCallback(async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, audience: audience || undefined, purpose: purpose || undefined }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [text, audience, purpose]);

  const toggleSection = useCallback((key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleNavigate = useCallback((section: string) => {
    window.dispatchEvent(new CustomEvent('gps-navigate', { detail: { section } }));
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const scoreColor = result
    ? result.overallScore >= 80 ? 'var(--color-success)'
      : result.overallScore >= 50 ? 'var(--color-warning)'
      : 'var(--color-danger)'
    : 'var(--color-g400)';

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ background: 'rgba(10,26,34,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="max-w-[760px] mx-auto mt-8 mb-8 bg-white rounded-xl relative"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '2px solid var(--color-turquoise-500)' }}>
          <button
            onClick={onClose}
            className="absolute top-3 right-4 bg-transparent border-none text-2xl cursor-pointer"
            style={{ color: 'var(--color-g400)' }}
            aria-label="Close"
          >&times;</button>
          <div className="text-[11px] font-bold mb-1" style={{ color: 'var(--color-turquoise-500)', letterSpacing: '0.08em' }}>
            AI COMPLIANCE CHECKER
          </div>
          <div className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
            <span className="en">Brand Compliance Check</span>
            <span className="zh">品牌合規檢查</span>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-g500)' }}>
            <span className="en">Paste text to check vocabulary, tone, readability, and bilingual completeness against GPS Brand Bible standards.</span>
            <span className="zh">貼上文字以檢查詞彙、語調、可讀性和雙語完整性是否符合 GPS 品牌聖經標準。</span>
          </p>
        </div>

        <div className="px-6 py-4">
          {/* Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here for compliance checking... / 在此貼上您的文字進行合規檢查..."
            className="w-full h-40 p-3 rounded-md resize-y text-sm"
            style={{
              border: '1px solid var(--color-g200)',
              fontFamily: 'var(--font-en)',
              lineHeight: 1.6,
            }}
          />
          <div className="flex items-center justify-between mt-1 mb-3">
            <span className="text-[10px]" style={{ color: 'var(--color-g400)', fontFamily: 'var(--font-mono)' }}>
              {text.length} / 10,000
            </span>
          </div>

          {/* Context selectors */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <div>
              <label className="text-[9px] font-bold uppercase block mb-1" style={{ color: 'var(--color-g500)', letterSpacing: '0.08em' }}>
                <span className="en">Audience</span><span className="zh">受眾</span>
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="text-xs px-2 py-1.5 rounded border"
                style={{ borderColor: 'var(--color-g200)' }}
              >
                <option value="">— Optional —</option>
                <option value="frontline">Frontline / All-Staff</option>
                <option value="management">Section Heads / Directors</option>
                <option value="visitor">Visitors / External</option>
                <option value="all-staff">All Audiences</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-bold uppercase block mb-1" style={{ color: 'var(--color-g500)', letterSpacing: '0.08em' }}>
                <span className="en">Purpose</span><span className="zh">用途</span>
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="text-xs px-2 py-1.5 rounded border"
                style={{ borderColor: 'var(--color-g200)' }}
              >
                <option value="">— Optional —</option>
                <option value="emergency">Emergency</option>
                <option value="policy">Policy</option>
                <option value="training">Training</option>
                <option value="brand">Brand Communication</option>
                <option value="leadership">Leadership</option>
              </select>
            </div>
            <div className="ml-auto self-end">
              <button
                onClick={handleCheck}
                disabled={loading || !text.trim()}
                className="px-5 py-2 rounded-md font-bold text-sm border-none cursor-pointer"
                style={{
                  background: loading || !text.trim() ? 'var(--color-g200)' : 'var(--color-turquoise-500)',
                  color: loading || !text.trim() ? 'var(--color-g400)' : '#fff',
                }}
              >
                {loading ? (
                  <><span className="en">Checking...</span><span className="zh">檢查中...</span></>
                ) : (
                  <><span className="en">Check Compliance</span><span className="zh">檢查合規</span></>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-md mb-4 text-sm" style={{ background: 'rgba(217,79,79,0.06)', border: '1px solid rgba(217,79,79,0.2)', color: 'var(--color-danger)' }}>
              {error}
            </div>
          )}

          {/* Results */}
          {result && (
            <div>
              {/* Score badge */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ background: 'var(--color-g50)', border: '1px solid var(--color-g200)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: scoreColor, color: '#fff' }}>
                  {result.overallScore}
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>{result.summary}</div>
                  <div className="text-[10px]" style={{ color: 'var(--color-g500)' }}>
                    <span className="en">Overall compliance score</span><span className="zh">整體合規分數</span>
                  </div>
                </div>
              </div>

              {/* Vocabulary */}
              <ResultSection title="Vocabulary Scan" titleZh="詞彙掃描" expanded={expanded.vocabulary} onToggle={() => toggleSection('vocabulary')} count={result.vocabulary.length} pass={result.vocabulary.length === 0}>
                {result.vocabulary.length === 0 ? (
                  <p className="text-xs" style={{ color: 'var(--color-success)' }}>
                    <span className="en">No banned or cautionary vocabulary found.</span><span className="zh">未發現禁用或警示詞彙。</span>
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {result.vocabulary.map((v, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs p-2 rounded" style={{ background: v.severity === 'banned' ? 'rgba(217,79,79,0.05)' : 'rgba(229,153,62,0.05)', border: `1px solid ${v.severity === 'banned' ? 'rgba(217,79,79,0.15)' : 'rgba(229,153,62,0.15)'}` }}>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white shrink-0" style={{ background: v.severity === 'banned' ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                          {v.severity === 'banned' ? 'BANNED' : 'CAUTION'}
                        </span>
                        <div>
                          <span className="font-bold" style={{ color: 'var(--color-ink)' }}>"{v.word}"</span>
                          {v.context && <span style={{ color: 'var(--color-g500)' }}> — {v.context}</span>}
                          <div style={{ color: 'var(--color-turquoise-600)' }}>
                            → {v.suggestion}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ResultSection>

              {/* Tone */}
              <ResultSection title="Tone Classification" titleZh="語調分類" expanded={expanded.tone} onToggle={() => toggleSection('tone')} pass={true}>
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold" style={{ color: 'var(--color-ink)' }}>
                      <span className="en">Detected:</span><span className="zh">偵測：</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: 'var(--color-turquoise-50)', color: 'var(--color-turquoise-700)', border: '1px solid var(--color-turquoise-200)' }}>
                      {result.tone.detected?.toUpperCase()}
                    </span>
                    <span style={{ color: 'var(--color-g400)', fontFamily: 'var(--font-mono)', fontSize: '9px' }}>
                      {result.tone.confidence}% confidence
                    </span>
                  </div>
                  {result.tone.notes && <p style={{ color: 'var(--color-g500)' }}>{result.tone.notes}</p>}
                </div>
              </ResultSection>

              {/* Readability */}
              <ResultSection title="Readability" titleZh="可讀性" expanded={expanded.readability} onToggle={() => toggleSection('readability')} pass={result.readability.passesGrade8}>
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold" style={{ color: 'var(--color-ink)' }}>Grade Level:</span>
                    <span className="font-bold" style={{ fontFamily: 'var(--font-mono)', color: result.readability.passesGrade8 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {result.readability.estimatedGrade}
                    </span>
                    <span style={{ color: 'var(--color-g400)' }}>
                      {result.readability.passesGrade8 ? '(Target: ≤8 ✓)' : '(Target: ≤8 ✗)'}
                    </span>
                  </div>
                  {result.readability.issues?.map((issue, i) => (
                    <div key={i} className="p-2 rounded mb-1" style={{ background: 'var(--color-gps-orange-50)', border: '1px solid rgba(229,153,62,0.15)' }}>
                      <span className="text-[9px] font-bold uppercase" style={{ color: 'var(--color-warning)' }}>{issue.type.replace('_', ' ')}</span>
                      <div style={{ color: 'var(--color-g500)' }}>"{issue.text}"</div>
                      <div style={{ color: 'var(--color-turquoise-600)' }}>→ {issue.suggestion}</div>
                    </div>
                  ))}
                </div>
              </ResultSection>

              {/* Bilingual */}
              <ResultSection title="Bilingual Completeness" titleZh="雙語完整性" expanded={expanded.bilingual} onToggle={() => toggleSection('bilingual')} pass={result.bilingual.hasEnglish && result.bilingual.hasTraditionalChinese && result.bilingual.balanced}>
                <div className="text-xs flex gap-4">
                  <div className="flex items-center gap-1">
                    <StatusDot pass={result.bilingual.hasEnglish} /> English
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusDot pass={result.bilingual.hasTraditionalChinese} /> zh-TW
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusDot pass={result.bilingual.balanced} />
                    <span className="en">Balanced</span><span className="zh">平衡</span>
                  </div>
                </div>
                {result.bilingual.notes && <p className="text-xs mt-1" style={{ color: 'var(--color-g500)' }}>{result.bilingual.notes}</p>}
              </ResultSection>

              {/* References */}
              {result.references?.length > 0 && (
                <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--color-turquoise-50)', border: '1px solid var(--color-turquoise-200)' }}>
                  <div className="text-[9px] font-bold uppercase mb-2" style={{ color: 'var(--color-turquoise-700)', letterSpacing: '0.08em' }}>
                    <span className="en">Relevant Sections</span><span className="zh">相關章節</span>
                  </div>
                  {result.references.map((ref, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs mb-1">
                      <button
                        onClick={() => handleNavigate(ref.section)}
                        className="border-none bg-transparent cursor-pointer underline"
                        style={{ color: 'var(--color-turquoise-600)', textDecorationStyle: 'dotted' }}
                      >
                        {ref.sectionName}
                      </button>
                      <span style={{ color: 'var(--color-g500)' }}>— {ref.reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultSection({ title, titleZh, expanded, onToggle, children, count, pass }: {
  title: string; titleZh: string; expanded: boolean; onToggle: () => void;
  children: React.ReactNode; count?: number; pass: boolean;
}) {
  return (
    <div className="mb-2 rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-g200)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 border-none cursor-pointer text-left"
        style={{ background: 'var(--color-g50)' }}
      >
        <div className="flex items-center gap-2">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill={pass ? 'var(--color-success)' : 'var(--color-danger)'} />
            {pass ? (
              <path d="M2.5 4L3.5 5L5.5 3" stroke="#fff" strokeWidth="1" fill="none" />
            ) : (
              <path d="M2.8 2.8L5.2 5.2M5.2 2.8L2.8 5.2" stroke="#fff" strokeWidth="0.8" />
            )}
          </svg>
          <span className="text-xs font-bold" style={{ color: 'var(--color-ink)' }}>
            <span className="en">{title}</span><span className="zh">{titleZh}</span>
          </span>
          {count !== undefined && count > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ background: 'var(--color-danger)', color: '#fff' }}>
              {count}
            </span>
          )}
        </div>
        <span className="text-[10px]" style={{ color: 'var(--color-g400)' }}>{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && <div className="px-3 py-2.5">{children}</div>}
    </div>
  );
}

function StatusDot({ pass }: { pass: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" fill={pass ? 'var(--color-success)' : 'var(--color-danger)'} />
      {pass ? (
        <path d="M3 5L4.5 6.5L7 3.5" stroke="#fff" strokeWidth="1.2" fill="none" />
      ) : (
        <path d="M3.2 3.2L6.8 6.8M6.8 3.2L3.2 6.8" stroke="#fff" strokeWidth="1" />
      )}
    </svg>
  );
}
