'use client';

import { useState, useEffect, useCallback, Suspense, lazy, ComponentType } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { sectionIdToSlug } from '@/lib/navigation';

const AIPromptPanel = lazy(() => import('@/components/AIPromptPanel'));
const AIComplianceChecker = lazy(() => import('@/components/AIComplianceChecker'));
const AIBrandAssistant = lazy(() => import('@/components/AIBrandAssistant'));

const contentComponents: Record<string, () => Promise<{ default: ComponentType }>> = {
  '01-brand-foundation': () => import('@/content/01-brand-foundation.mdx'),
  '02-brand-behaviors': () => import('@/content/02-brand-behaviors.mdx'),
  '03-logo-system': () => import('@/content/03-logo-system.mdx'),
  '04-color-palette': () => import('@/content/04-color-palette.mdx'),
  '05-tint-scales': () => import('@/content/05-tint-scales.mdx'),
  '06-gradient-library': () => import('@/content/06-gradient-library.mdx'),
  '07-semantic-dark-mode': () => import('@/content/07-semantic-dark-mode.mdx'),
  '08-accessibility': () => import('@/content/08-accessibility.mdx'),
  '09-typography': () => import('@/content/09-typography.mdx'),
  '10-graphic-iconography': () => import('@/content/10-graphic-iconography.mdx'),
  '11-imagery-photography': () => import('@/content/11-imagery-photography.mdx'),
  '12-voice-tone': () => import('@/content/12-voice-tone.mdx'),
  '13-motion-animation': () => import('@/content/13-motion-animation.mdx'),
  '14-stationery': () => import('@/content/14-stationery.mdx'),
  '15-poster-signage': () => import('@/content/15-poster-signage.mdx'),
  '16-uniform-wearables': () => import('@/content/16-uniform-wearables.mdx'),
  '17-web-landing': () => import('@/content/17-web-landing.mdx'),
  '18-email-newsletter': () => import('@/content/18-email-newsletter.mdx'),
  '19-mobile-line': () => import('@/content/19-mobile-line.mdx'),
  '20-digital-signage': () => import('@/content/20-digital-signage.mdx'),
  '21-campaign-moods': () => import('@/content/21-campaign-moods.mdx'),
  '22-seasonal-event': () => import('@/content/22-seasonal-event.mdx'),
  '23-co-branding': () => import('@/content/23-co-branding.mdx'),
  '24-brand-performance': () => import('@/content/24-brand-performance.mdx'),
  '25-templates-toolkit': () => import('@/content/25-templates-toolkit.mdx'),
  'app-a-activation': () => import('@/content/app-a-activation.mdx'),
  'app-l-language': () => import('@/content/app-l-language.mdx'),
  'app-r-raci': () => import('@/content/app-r-raci.mdx'),
  'app-t-design-tokens': () => import('@/content/app-t-design-tokens.mdx'),
  'app-v-version-history': () => import('@/content/app-v-version-history.mdx'),
  'app-w-quality-playbook': () => import('@/content/app-w-quality-playbook.mdx'),
};

function SectionContent({ sectionId }: { sectionId: string }) {
  const slug = sectionIdToSlug[sectionId];
  if (!slug || !contentComponents[slug]) {
    return <div style={{ padding: '40px', color: 'var(--color-g500)' }}>Section not found.</div>;
  }
  const Content = lazy(contentComponents[slug]);
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: 'var(--color-g500)' }}>Loading...</div>}>
      <Content />
    </Suspense>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('s01');
  const [lang, setLang] = useState('en');
  const [navOpen, setNavOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Restore saved language
  useEffect(() => {
    const saved = localStorage.getItem('gps-lang');
    if (saved === 'en' || saved === 'zh') {
      setLang(saved);
    }
  }, []);

  // Apply language class to body
  useEffect(() => {
    document.body.className = `lang-${lang}`;
    localStorage.setItem('gps-lang', lang);
  }, [lang]);

  // Escape key closes all panels
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPromptOpen(false);
        setComplianceOpen(false);
        setAssistantOpen(false);
        setNavOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Listen for cross-reference navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.section) {
        setActiveSection(detail.section);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('gps-navigate', handler);
    return () => window.removeEventListener('gps-navigate', handler);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLangToggle = useCallback((newLang: string) => {
    setLang(newLang);
  }, []);

  // Quick-copy on code elements
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'CODE' && !target.closest('pre')) {
        const text = target.textContent || '';
        navigator.clipboard.writeText(text.trim()).then(() => {
          target.classList.add('copied');
          setTimeout(() => target.classList.remove('copied'), 1500);
        });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <Sidebar
        activeSection={activeSection}
        lang={lang}
        isOpen={navOpen}
        onNavigate={handleNavigate}
        onLangToggle={handleLangToggle}
        onClose={() => setNavOpen(false)}
        onComplianceCheck={() => { setComplianceOpen(true); setNavOpen(false); }}
        onBrandAssistant={() => { setAssistantOpen(true); setNavOpen(false); }}
        onAIPrompt={() => { setPromptOpen(true); setNavOpen(false); }}
      />
      <div className="main-content" role="main" id="main-content">
        <TopBar
          activeSection={activeSection}
          lang={lang}
          onLangToggle={handleLangToggle}
          onMenuOpen={() => setNavOpen(true)}
        />
        <div className="max-w-[1020px] px-8 pt-10 pb-24">
          <SectionContent sectionId={activeSection} />
        </div>
      </div>

      <AIPromptPanel isOpen={promptOpen} onClose={() => setPromptOpen(false)} />
      <AIComplianceChecker isOpen={complianceOpen} onClose={() => setComplianceOpen(false)} />
      <AIBrandAssistant isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <div
        className="fixed bottom-4 right-4 px-3 py-1.5 rounded-md text-[10px] pointer-events-none z-50"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-g200)',
          fontFamily: 'var(--font-mono)',
          opacity: 0.5,
        }}
      >
        Ctrl+F <span className="en">to search</span><span className="zh">搜尋</span>
      </div>
    </>
  );
}
