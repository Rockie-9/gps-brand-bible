import { sectionIdToSlug } from './navigation';

const contentModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
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

export async function loadContent(sectionId: string) {
  const slug = sectionIdToSlug[sectionId];
  if (!slug || !contentModules[slug]) return null;
  const mod = await contentModules[slug]();
  return mod.default;
}

export function getSlugForSection(sectionId: string): string | undefined {
  return sectionIdToSlug[sectionId];
}
