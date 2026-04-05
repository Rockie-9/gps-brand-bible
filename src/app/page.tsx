'use client';

import { useState, useEffect, useCallback, Suspense, lazy, ComponentType } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import ErrorBoundary from '@/components/ErrorBoundary';
import SearchPalette from '@/components/SearchPalette';
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

function SectionSkeleton() {
  return (
    <div style={{ padding: '40px 0' }} aria-busy="true" aria-label="Loading section">
      <div style={{ height: '12px', width: '120px', background: 'var(--color-g100)', borderRadius: '4px', marginBottom: '8px', animation: 'gps-fade 1.5s ease-in-out infinite' }} />
      <div style={{ height: '34px', width: '320px', background: 'var(--color-g100)', borderRadius: '6px', marginBottom: '16px', animation: 'gps-fade 1.5s ease-in-out infinite 0.1s' }} />
      <div style={{ height: '2px', width: '100%', background: 'var(--color-turquoise-100)', marginBottom: '24px' }} />
      <div style={{ height: '10px', width: '100%', maxWidth: '500px', background: 'var(--color-g100)', borderRadius: '3px', marginBottom: '10px', animation: 'gps-fade 1.5s ease-in-out infinite 0.2s' }} />
      <div style={{ height: '10px', width: '85%', maxWidth: '430px', background: 'var(--color-g100)', borderRadius: '3px', marginBottom: '10px', animation: 'gps-fade 1.5s ease-in-out infinite 0.3s' }} />
      <div style={{ height: '10px', width: '92%', maxWidth: '460px', background: 'var(--color-g100)', borderRadius: '3px', animation: 'gps-fade 1.5s ease-in-out infinite 0.4s' }} />
    </div>
  );
}

function SectionContent({ sectionId }: { sectionId: string }) {
  const slug = sectionIdToSlug[sectionId];
  if (!slug || !contentComponents[slug]) {
    return <div style={{ padding: '40px', color: 'var(--color-g500)' }}>Section not found.</div>;
  }
  const Content = lazy(contentComponents[slug]);
  return (
    <ErrorBoundary>
      <Suspense fallback={<SectionSkeleton />}>
        <Content />
      </Suspense>
    </ErrorBoundary>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('s01');
  const [lang, setLang] = useState('en');
  const [navOpen, setNavOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  // Escape key closes all panels, Ctrl+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPromptOpen(false);
        setComplianceOpen(false);
        setAssistantOpen(false);
        setNavOpen(false);
        setSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    const searchToggle = () => setSearchOpen(prev => !prev);
    window.addEventListener('keydown', handler);
    window.addEventListener('gps-search-toggle', searchToggle);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('gps-search-toggle', searchToggle);
    };
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

  // IP Protection: disable right-click, Ctrl+C on non-code, Ctrl+U, Ctrl+S, print screen
  useEffect(() => {
    const blockContext = (e: MouseEvent) => { e.preventDefault(); };
    const blockKeys = (e: KeyboardEvent) => {
      // Block Ctrl+U (view source), Ctrl+S (save), Ctrl+P (print), F12 (devtools)
      if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
      }
    };
    const blockDrag = (e: DragEvent) => { e.preventDefault(); };

    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('dragstart', blockDrag);
    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('dragstart', blockDrag);
    };
  }, []);

  return (
    <>
      {/* Dynamic watermark */}
      <div className="watermark-overlay" />
      <div className="watermark-text">CONFIDENTIAL</div>

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
      <SearchPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />

      <div
        onClick={() => setSearchOpen(true)}
        className="fixed bottom-4 right-4 px-3 py-1.5 rounded-md text-[10px] z-50 cursor-pointer"
        style={{
          background: 'var(--color-ink)',
          color: 'var(--color-g200)',
          fontFamily: 'var(--font-mono)',
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        role="button"
        aria-label="Open search (Ctrl+K)"
      >
        <kbd style={{background:'rgba(255,255,255,0.1)',padding:'1px 4px',borderRadius:'3px'}}>⌘K</kbd> <span className="en">Search</span><span className="zh">搜尋</span>
      </div>
    </>
  );
}
