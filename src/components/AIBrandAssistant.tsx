'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { TEMPLATES } from '@/lib/assistant-prompt';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

interface AIBrandAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIBrandAssistant({ isOpen, onClose }: AIBrandAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [template, setTemplate] = useState('general');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed && !image) return;

    const userMsg: Message = { role: 'user', content: trimmed, image: imagePreview || undefined };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          template: template !== 'general' ? template : undefined,
          image: image || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.error || 'Request failed'}` }]);
        setLoading(false);
        return;
      }

      // Stream the response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantText += parsed.text;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: assistantText };
                    return updated;
                  });
                }
                if (parsed.error) {
                  assistantText += `\n\nError: ${parsed.error}`;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: assistantText };
                    return updated;
                  });
                }
              } catch { /* skip malformed lines */ }
            }
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
      removeImage();
    }
  }, [input, messages, template, image, imagePreview, removeImage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 bottom-0 z-[9998] flex"
      style={{ width: '420px', maxWidth: '100vw' }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{ background: 'rgba(10,26,34,0.3)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="flex flex-col h-full bg-white" style={{ width: '100%', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)' }}>
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between shrink-0" style={{ borderBottom: '2px solid var(--color-turquoise-500)' }}>
          <div>
            <div className="text-[10px] font-bold" style={{ color: 'var(--color-turquoise-500)', letterSpacing: '0.08em' }}>
              AI BRAND ASSISTANT
            </div>
            <div className="text-sm font-bold" style={{ color: 'var(--color-ink)' }}>
              <span className="en">Brand Assistant</span><span className="zh">品牌助手</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border"
              style={{ borderColor: 'var(--color-g200)' }}
            >
              {Object.entries(TEMPLATES).map(([key, t]) => (
                <option key={key} value={key}>{t.nameEn}</option>
              ))}
            </select>
            <button
              onClick={onClose}
              className="bg-transparent border-none text-xl cursor-pointer"
              style={{ color: 'var(--color-g400)' }}
              aria-label="Close"
            >&times;</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: 'var(--color-g50)' }}>
          {messages.length === 0 && (
            <div className="text-center py-8" style={{ color: 'var(--color-g400)' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 8px' }}>
                <circle cx="20" cy="20" r="18" stroke="var(--color-g200)" strokeWidth="2" />
                <path d="M14 16h12M14 20h8M14 24h10" stroke="var(--color-g300)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="text-xs">
                <span className="en">Ask me about GPS brand standards, generate content, or upload an image for review.</span>
                <span className="zh">詢問 GPS 品牌標準、生成內容，或上傳圖片進行審查。</span>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className="mb-3"
              style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}
            >
              {msg.image && (
                <div className="mb-1 inline-block">
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    style={{ maxWidth: '160px', maxHeight: '100px', borderRadius: '6px', border: '1px solid var(--color-g200)' }}
                  />
                </div>
              )}
              <div
                className="inline-block px-3 py-2 rounded-lg text-xs max-w-[85%] text-left"
                style={{
                  background: msg.role === 'user' ? 'var(--color-turquoise-50)' : '#fff',
                  border: `1px solid ${msg.role === 'user' ? 'var(--color-turquoise-200)' : 'var(--color-g200)'}`,
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content || (loading && i === messages.length - 1 ? '...' : '')}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="px-4 py-2 flex items-center gap-2 shrink-0" style={{ borderTop: '1px solid var(--color-g200)', background: 'var(--color-turquoise-50)' }}>
            <img src={imagePreview} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
            <span className="text-[10px] flex-1" style={{ color: 'var(--color-turquoise-700)' }}>
              <span className="en">Image attached for analysis</span>
              <span className="zh">已附加圖片供分析</span>
            </span>
            <button onClick={removeImage} className="bg-transparent border-none cursor-pointer text-sm" style={{ color: 'var(--color-g400)' }}>&times;</button>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid var(--color-g200)' }}>
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 w-8 h-8 rounded border-none cursor-pointer flex items-center justify-center"
              style={{ background: 'var(--color-g100)', color: 'var(--color-g500)' }}
              title="Upload image"
              aria-label="Upload image for analysis"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="4.5" cy="6.5" r="1" stroke="currentColor" strokeWidth="0.8" />
                <path d="M1 10l3-3 2 2 3-3 4 4" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about brand standards... / 詢問品牌標準..."
              className="flex-1 px-3 py-2 rounded-md text-xs resize-none"
              style={{
                border: '1px solid var(--color-g200)',
                fontFamily: 'var(--font-en)',
                lineHeight: 1.5,
                minHeight: '36px',
                maxHeight: '80px',
              }}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && !image)}
              className="shrink-0 px-3 h-8 rounded-md border-none cursor-pointer text-xs font-bold"
              style={{
                background: loading || (!input.trim() && !image) ? 'var(--color-g200)' : 'var(--color-turquoise-500)',
                color: loading || (!input.trim() && !image) ? 'var(--color-g400)' : '#fff',
              }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
