# GPS Brand Bible — Claude Code Project Brief

## What This Is
A Next.js brand standards portal for TSMC Global Physical Security (GPS), migrated from a monolithic single-HTML portal (v3.2, in `/reference/`) into a component-based architecture with AI features planned.

## The Team
Three roles only:
- **Division Head** — strategic direction, sign-off on big decisions
- **Strategy & Transformation** (Rockie) — briefs, reviews, brand standard custodian
- **Promotion** — design, production, publishing

## Source of Truth
- `/reference/v3.2-mega-portal.html` — the complete portal with all 31 sections, full bilingual content (EN + zh-TW), embedded SVG logos, design tokens, and interactive features. **ALL content must be migrated from this file. Do not invent content — extract it.**
- `/reference/playbook-standalone.html` — the brand quality playbook (also embedded as Appendix W in the portal)

## Tech Stack
- **Framework:** Next.js (App Router) with static export
- **Styling:** Tailwind CSS with GPS custom design tokens
- **Content:** MDX (markdown + JSX) — one file per chapter
- **AI Integration:** Anthropic Claude API (claude-sonnet-4-20250514) for compliance checker and brand assistant
- **Deployment:** Vercel (team_yNKOcm2e7B8JicmYDhqSlMjO, repo Rockie-9/gps-brand-bible)
- **Fonts:** Lato (EN) + Noto Sans TC (zh-TW) via Google Fonts

## GPS Brand Design Tokens

```
Primary:
  Turquoise: #26A7B0 (C75 M23 Y37 K0)
  Copper Tone: #CAC3D2 (C25 M24 Y12 K0)

Secondary:
  Purple: #8C9FCB (C30 M23 Y0 K20)
  Green: #8CC897 (C30 M0 Y25 K22)
  Orange: #F6AD90 (C0 M30 Y41 K4)

Neutral:
  Black: #0A1A22 (C0 M0 Y0 K100)
  White: #FFFFFF

Gradient:
  Brand: linear-gradient(135deg, #26A7B0 0%, #CAC3D2 100%)

Typography:
  EN Display/Body: Lato (300/400/700/900)
  ZH Display/Body: Noto Sans TC (300/400/500/700)
  Fallback EN: Trebuchet MS, Verdana
  Fallback ZH: Microsoft JhengHei

Color Ratio:
  Primary: 30–80%
  Neutral: 10–60%
  Secondary: 10–60%

Spacing Scale:
  xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 40px, 2xl: 64px
```

## Portal Structure (31 sections)

### I · Foundation
- 01: Brand Foundation 品牌基礎
- 02: Brand Behaviors 品牌行為準則 (7 behaviors)

### II · Visual Identity
- 03: Logo System 標誌系統
- 04: Master Color Palette 主色調系統
- 05: Tint & Shade Scales 色調漸變階梯
- 06: Gradient Library 漸層色庫
- 07: Semantic Colors & Dark Mode 語意色與深色模式
- 08: Accessibility Pairings 無障礙色彩配對
- 09: Typography 字體排版
- 10: Graphic System & Iconography 圖形系統與圖標
- 11: Imagery & Photography 影像與攝影

### III · Expression
- 12: Brand Voice & Tone 品牌語調
- 13: Motion & Animation 動態與動畫

### IV · Application: Print
- 14: Stationery System 文具系統
- 15: Poster & Environmental Signage 海報與環境標識
- 16: Uniform & Wearables 制服與穿戴識別

### V · Application: Digital
- 17: Web & Landing Page 網頁與入口頁面
- 18: Email & Newsletter 電子郵件與電子報
- 19: Mobile & LINE OA 行動裝置與 LINE
- 20: Digital Signage 數位看板

### VI · Creative Variations
- 21: Campaign Moods 主題視覺情緒
- 22: Seasonal & Event Adaptations 季節與活動變體

### VII · Governance
- 23: Co-branding & Partnership 聯合品牌
- 24: Brand Performance Metrics 品牌績效指標
- 25: Templates & Toolkit 模板與工具包

### Appendices
- A: New Site Activation Playbook 新廠區啟動
- L: Language Architecture 語言架構
- R: RACI Ownership Matrix RACI 權責矩陣
- T: Design Token Export 設計代符
- V: Version History 版本紀錄
- W: Brand Quality Playbook 品牌品質手冊

## Existing Features to Preserve
1. **Full bilingual EN/zh-TW** — every line has both languages, toggled by class
2. **Language toggle** — persists selection via localStorage
3. **Sidebar navigation** — grouped by section, mobile responsive with overlay
4. **Module-level status indicators** — done/wip/todo pills per chapter
5. **Print stylesheet** — A4, page-break-per-chapter, CMYK-safe
6. **AI Brand Prompt panel** — textarea with full brand context for copy-paste into AI tools
7. **Quick-copy on tokens** — click hex code or token value to copy
8. **Cross-reference links** — chapter references navigate within the portal
9. **Keyboard search** — Ctrl+F hint
10. **SVG logo renderings** — construction grid, all lockup variants (light/dark, CN/EN)
11. **Color swatches** — visual + hex + CMYK
12. **Do/Don't examples** — visual comparison cards
13. **Inline code blocks** — for CSS tokens, Tailwind config, font stacks
14. **Version history with changelog**

## v4.0 Enhancement Scope

### Visual Demos (15 text-only sections need visual demonstrations)
Priority order:
1. Ch05 Tint Scales → live CSS color strips
2. Ch06 Gradients → interactive gradient swatches
3. Ch07 Semantic/Dark Mode → side-by-side light/dark demo panel
4. Ch08 Accessibility → pass/fail contrast cards with WCAG ratings
5. Ch14 Stationery → SVG business card + letterhead mockups
6. Ch02 Brand Behaviors → scene illustrations (SVG or Unsplash photos showing each behavior in action)
7. Ch16 Uniform → SVG badge + ID card mockups
8. Ch17 Web → component wireframe demos
9. Ch21 Campaign Moods → mood boards with Unsplash photos
10. Ch24 Brand Performance → dashboard wireframe showing SFI and Brand Adoption Rate
11. App A Activation → phase timeline visual
12. App W Playbook → flow diagrams per work type

### Content Additions (from brand consultant review)
1. **Ch10/15: Physical Material & Lighting Standards** — new section defining:
   - Material specs for physical facilities: anodized/brushed metal for Copper tone at visitor desks, access gates
   - Color-to-safety-function mapping: Turquoise (#26A7B0) on emergency help buttons, evacuation guide strips, guard epaulette stitching
   - Lighting color temperature by zone: warm 3000K for administrative (Guardian tone), cool 5000K+ high-CRI for controlled zones (Transparent Technology)
2. **Ch24: Two new metrics**
   - Safety Feeling Index (SFI): quarterly survey of 800+ global employees measuring perceived freedom to focus, create, contribute. Named index, not generic "perception survey."
   - Brand Adoption Rate: % of site-produced materials using portal templates and design tokens. Measures whether the Brand Bible is actually used.
3. **Ch11: Geographic diversity requirement** — imagery must represent multiple site geographies (TW fabs, JASM Kumamoto, ESMC Dresden, AZ), not default to Taiwan-only. Cultural neutrality check for all photography selections.
4. **Ch18: Canonical bilingual layout** — define paragraph-aligned or side-by-side EN/zh-TW layout for email templates, enforcing co-equal display (not EN-primary with zh-TW footnote).
5. **App A: Security-in-design paragraph** — add requirement that safety specs (CPTED principles, lighting, material) are integrated into architectural planning phase for new sites, not added after construction.

### AI Features (Phase 3–4) — Detailed Spec

**Phase 3: AI Compliance Checker**
Text analysis capabilities:
- **Vocabulary scan:** Auto-detect banned words (enforce, mandate, police, surveil, comply, resources, headcount, zero tolerance) and suggest GPS-approved replacements (protect, support, enable, design, collaborate, care, guide, empower)
- **Tone classification:** Classify input text into one of 5 tone contexts (emergency / policy / training / brand / leadership) and flag mismatches against the stated purpose
- **Audience readability:** Check if frontline-targeted content meets Grade 8 reading level; flag jargon in all-staff communications
- **Bilingual completeness:** Verify both EN and zh-TW content present; flag single-language outputs

**Phase 4: AI Brand Assistant + Vision**
Chat capabilities:
- **Stakeholder-specific generation:** Built-in templates for different audiences/sites. Example: "Generate a JASM Kumamoto new employee welcome message" → produces Grade 8 bilingual text using kaizen framing, polite-form Japanese, concrete workplace scenario
- **ESMC Works Council brief generator:** Structured output matching Betriebsrat communication requirements
- **AZ OSHA signage text:** Auto-generates ES + EN safety signage text meeting OSHA requirements

Image analysis capabilities:
- **Logo clearspace detection:** Upload image → AI verifies minimum clearspace (1/4 mark size for horizontal, 1/2 mark width for vertical) → returns pass/fail with measurement overlay
- **Grid compliance:** Check whether layout follows 12-column grid system
- **Color accuracy:** Extract dominant colors from uploaded image → compare against approved palette → flag off-brand colors with nearest approved alternative
- **Accessibility contrast:** Measure text-on-background contrast ratios → flag any below WCAG AA (4.5:1 normal text, 3:1 large text)

### Future Workstreams (not in portal scope, noted for planning)
- Year 1 "Designed Safety" workshop: frontline guards + design team co-redesign warning signage (event-planner skill)
- Year 2 annual safety awards program tied to 5 brand pillars (event-planner skill)
- Year 3 security-in-architectural-design standard (separate deliverable)

## Critical Rules
- **All visual elements use SVG/CSS vector — no icon libraries (Font Awesome, Heroicons, etc.)**
- **Bilingual is mandatory** — every user-facing string must have EN + zh-TW
- **LINE OA is NOT an official company channel** — operates outside firewall, used only for learning & news push (non-corporate info), classified as Campaign-tier
- **ES supplement is workforce accessibility (OSHA), not brand localization**
- **No TSMC project codenames, personal names, or internal org chart details in any output**
- **Monolithic brand architecture** — one brand across all divisions/geographies, no sub-brands
- **Co-equal primary languages:** EN and zh-TW (not one primary + one translation)

## Brand Framework

Core Belief:
"When people feel genuinely safe — not just at work, but across their whole lives — they are free to focus, create, and contribute at their highest level."

Five Pillars: Designed Safety / Journey Protection / Family Extension / Living Culture / Transparent Technology

Three-Year Narrative:
- Year 1 (2025–2026): "We're changing how security feels"
- Year 2 (2027): "Safety becomes who we are"
- Year 3 (2028+): "Safety by design"

Philosophical Foundation: CPTED (Crime Prevention Through Environmental Design)

## Stakeholder Communication Principles

**Frontline / All-Staff:**
- Simple language, every concept with a concrete work/life example
- "You can do this" framing, step-by-step, Grade 8 reading level max
- Avoid management jargon

**Section Heads / Directors:**
- Inverted pyramid: conclusion first, then evidence
- Cite methodology with institution name, year, or link
- Every recommendation maps to a measurable indicator

## Deploy Configuration
- Vercel Team: team_yNKOcm2e7B8JicmYDhqSlMjO
- Framework: Next.js (changed from "Other")
- Build Command: `next build` (default)
- Output Directory: `out` (static export)
- GitHub PAT: provided by Rockie at deploy time, use-and-discard, never store

## Target Project Structure

```
gps-brand-bible/
├── CLAUDE.md                          ← this file (project brief)
├── reference/
│   ├── v3.2-mega-portal.html          ← source of truth for ALL content
│   └── playbook-standalone.html       ← standalone playbook reference
├── next.config.js                     ← static export config
├── tailwind.config.js                 ← GPS design tokens
├── postcss.config.js
├── package.json
├── tsconfig.json
├── public/
│   └── assets/
│       ├── logo-mark-standard.svg     ← extracted from base64 in reference
│       ├── logo-mark-reversed.svg
│       ├── logo-horizontal-cn-light.svg
│       ├── logo-horizontal-cn-dark.svg
│       ├── logo-horizontal-en-light.svg
│       ├── logo-horizontal-en-dark.svg
│       ├── logo-vertical-cn-light.svg
│       ├── logo-vertical-cn-dark.svg
│       ├── logo-vertical-en-light.svg
│       └── logo-vertical-en-dark.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx                 ← root layout with fonts, metadata
│   │   ├── page.tsx                   ← portal shell (nav + content loader)
│   │   └── globals.css                ← Tailwind base + GPS custom styles
│   ├── components/
│   │   ├── Sidebar.tsx                ← navigation sidebar
│   │   ├── TopBar.tsx                 ← mobile bar + breadcrumb
│   │   ├── LangToggle.tsx             ← EN/zh-TW toggle (persists to localStorage)
│   │   ├── ModuleTracker.tsx          ← done/wip/todo pills
│   │   ├── ChapterHeader.tsx          ← section header (number, title, owner)
│   │   ├── DoExample.tsx              ← do/don't comparison cards
│   │   ├── ColorSwatch.tsx            ← color display with copy-to-clipboard
│   │   ├── CodeBlock.tsx              ← syntax-highlighted code with copy
│   │   ├── Callout.tsx                ← info/warning/tip callout boxes
│   │   ├── CrossRef.tsx               ← chapter cross-reference link
│   │   ├── PrintStylesheet.tsx        ← print-only styles injected
│   │   ├── AIPromptPanel.tsx          ← existing AI prompt textarea
│   │   ├── AIComplianceChecker.tsx    ← Phase 3: text analysis tool
│   │   └── AIBrandAssistant.tsx       ← Phase 4: embedded chat panel
│   └── content/
│       ├── 01-brand-foundation.mdx
│       ├── 02-brand-behaviors.mdx
│       ├── 03-logo-system.mdx
│       ├── 04-color-palette.mdx
│       ├── 05-tint-scales.mdx
│       ├── 06-gradient-library.mdx
│       ├── 07-semantic-dark-mode.mdx
│       ├── 08-accessibility.mdx
│       ├── 09-typography.mdx
│       ├── 10-graphic-iconography.mdx
│       ├── 11-imagery-photography.mdx
│       ├── 12-voice-tone.mdx
│       ├── 13-motion-animation.mdx
│       ├── 14-stationery.mdx
│       ├── 15-poster-signage.mdx
│       ├── 16-uniform-wearables.mdx
│       ├── 17-web-landing.mdx
│       ├── 18-email-newsletter.mdx
│       ├── 19-mobile-line.mdx
│       ├── 20-digital-signage.mdx
│       ├── 21-campaign-moods.mdx
│       ├── 22-seasonal-event.mdx
│       ├── 23-co-branding.mdx
│       ├── 24-brand-performance.mdx
│       ├── 25-templates-toolkit.mdx
│       ├── app-a-activation.mdx
│       ├── app-l-language.mdx
│       ├── app-r-raci.mdx
│       ├── app-t-design-tokens.mdx
│       ├── app-v-version-history.mdx
│       └── app-w-quality-playbook.mdx
└── README.md
```

## Phase-by-Phase Build Instructions

### Phase 1: Scaffold (Sessions 1–2)
1. Initialize Next.js with App Router + TypeScript
2. Configure Tailwind with GPS tokens from the token block above
3. Set up MDX processing (@next/mdx)
4. Build shell: Sidebar, TopBar, LangToggle, content area
5. Extract ALL text content from `/reference/v3.2-mega-portal.html` into 31 MDX files
6. Extract embedded base64 SVG logos into `/public/assets/` as standalone SVG files
7. Port: language toggle persistence, module status pills, cross-reference navigation
8. Configure `next.config.js` for static export (`output: 'export'`)
9. Deploy to Vercel, verify all 31 sections render correctly

### Phase 2: Content Enhancement + Visual Demos (Sessions 3–4)
1. Add visual demos to 15 text-only sections (see priority list above)
2. Add 5 new content additions from brand consultant review
3. Methods: CSS gradient bars, inline SVG mockups, Unsplash external photos, dark mode toggle demos, WCAG contrast cards
4. All new visual content must be bilingual
5. Verify print stylesheet handles new visual elements (break-inside:avoid)

### Phase 3: AI Compliance Checker (Session 5)
1. Build `AIComplianceChecker.tsx` component
2. Text input area + "Check" button
3. Calls Anthropic Claude API with Brand Bible rules as system prompt
4. Returns: vocabulary scan, tone classification, readability score, bilingual completeness
5. Results displayed inline with chapter references (cross-links to relevant sections)

### Phase 4: AI Brand Assistant + Vision (Session 6)
1. Build `AIBrandAssistant.tsx` as slide-out chat panel
2. System prompt includes full Brand Bible context
3. Stakeholder-specific generation templates (JASM, ESMC, AZ)
4. Image upload for logo clearspace detection, grid check, color accuracy
5. Uses Claude vision capability for image analysis

### Phase 5: Polish (Session 7)
1. Accessibility audit (alt text, ARIA labels, keyboard navigation)
2. Print stylesheet verification with all new content
3. Full bilingual QA pass
4. Performance: lazy-load images, optimize SVGs


## Build Queue (execute in order)

### Phase 3: AI Compliance Checker
Build AIComplianceChecker.tsx component:
- UI: text input area + "Check Compliance" button + results panel
- Calls Anthropic Claude API (claude-sonnet-4-20250514) via server-side API route (/api/compliance-check)
- Four checks: vocabulary scan (banned → approved word replacement), tone classification (5 contexts), Grade 8 readability scoring, bilingual completeness verification
- Results: pass/fail per check with chapter cross-references (Ch 01, Ch 12, App L) linking to portal sections
- No API key hardcoded — use environment variable ANTHROPIC_API_KEY via API route
- All UI text bilingual EN + zh-TW

### Phase 4: AI Brand Assistant + Vision
Build AIBrandAssistant.tsx as slide-out chat panel:
- System prompt includes full Brand Bible context (core belief, pillars, tone rules, vocabulary)
- Stakeholder-specific generation: JASM welcome (kaizen framing, Grade 8, bilingual), ESMC Works Council brief (Betriebsrat format), AZ OSHA signage (ES + EN)
- Image upload capabilities via Claude vision:
  - Logo clearspace detection (1/4 mark for horizontal, 1/2 width for vertical) → pass/fail with overlay
  - 12-column grid compliance check
  - Color accuracy: extract dominant colors → compare against approved palette → flag off-brand
  - Accessibility contrast: measure ratios → flag below WCAG AA (4.5:1 text, 3:1 large)
- Same API route pattern as Phase 3
- All UI text bilingual

### Phase 5: Polish
- Accessibility audit: alt text on all images/SVGs, ARIA labels, keyboard navigation for all interactive components
- Print stylesheet: verify all new components (AI panels, visual demos) handled correctly
- Bilingual QA: every user-facing string has EN + zh-TW
- Performance: lazy-load Unsplash images, optimize SVGs, check bundle size
- Update App V version history: bump to v4.0 with comprehensive changelog covering all phases
- Final Vercel deploy
5. Version bump to v4.0 with comprehensive changelog
6. Final deploy
