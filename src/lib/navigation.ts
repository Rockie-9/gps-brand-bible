export interface NavItem {
  id: string;
  number: string;
  en: string;
  zh: string;
}

export interface NavGroup {
  en: string;
  zh: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    en: 'I \u00B7 Foundation',
    zh: 'I \u00B7 \u57FA\u790E',
    items: [
      { id: 's01', number: '01', en: 'Brand Foundation', zh: '\u54C1\u724C\u57FA\u790E' },
      { id: 's02', number: '02', en: 'Brand Behaviors', zh: '\u54C1\u724C\u884C\u70BA\u6E96\u5247' },
    ],
  },
  {
    en: 'II \u00B7 Visual Identity',
    zh: 'II \u00B7 \u8996\u89BA\u8B58\u5225',
    items: [
      { id: 's03', number: '03', en: 'Logo System', zh: '\u6A19\u8A8C\u7CFB\u7D71' },
      { id: 's04', number: '04', en: 'Color Palette', zh: '\u4E3B\u8272\u8ABF\u7CFB\u7D71' },
      { id: 's05', number: '05', en: 'Tint & Shade Scales', zh: '\u8272\u8ABF\u6F38\u8B8A\u968E\u68AF' },
      { id: 's06', number: '06', en: 'Gradient Library', zh: '\u6F38\u5C64\u8272\u5EAB' },
      { id: 's07', number: '07', en: 'Semantic & Dark Mode', zh: '\u8A9E\u610F\u8272\u8207\u6DF1\u8272\u6A21\u5F0F' },
      { id: 's08', number: '08', en: 'Accessibility Pairings', zh: '\u7121\u969C\u7919\u8272\u5F69\u914D\u5C0D' },
      { id: 's09', number: '09', en: 'Typography', zh: '\u5B57\u9AD4\u6392\u7248' },
      { id: 's10', number: '10', en: 'Graphic & Iconography', zh: '\u5716\u5F62\u7CFB\u7D71\u8207\u5716\u6A19' },
      { id: 's11', number: '11', en: 'Imagery & Photography', zh: '\u5F71\u50CF\u8207\u651D\u5F71' },
    ],
  },
  {
    en: 'III \u00B7 Expression',
    zh: 'III \u00B7 \u8868\u9054',
    items: [
      { id: 's12', number: '12', en: 'Voice & Tone', zh: '\u54C1\u724C\u8A9E\u8ABF' },
      { id: 's13', number: '13', en: 'Motion & Animation', zh: '\u52D5\u614B\u8207\u52D5\u756B' },
    ],
  },
  {
    en: 'IV \u00B7 Application: Print',
    zh: 'IV \u00B7 \u61C9\u7528\uFF1A\u5370\u5237',
    items: [
      { id: 's14', number: '14', en: 'Stationery System', zh: '\u6587\u5177\u7CFB\u7D71' },
      { id: 's15', number: '15', en: 'Poster & Signage', zh: '\u6D77\u5831\u8207\u6A19\u8B58' },
      { id: 's16', number: '16', en: 'Uniform & Wearables', zh: '\u5236\u670D\u8207\u7A7F\u6234\u8B58\u5225' },
    ],
  },
  {
    en: 'V \u00B7 Application: Digital',
    zh: 'V \u00B7 \u61C9\u7528\uFF1A\u6578\u4F4D',
    items: [
      { id: 's17', number: '17', en: 'Web & Landing Page', zh: '\u7DB2\u9801\u8207\u5165\u53E3\u9801\u9762' },
      { id: 's18', number: '18', en: 'Email & Newsletter', zh: '\u96FB\u5B50\u90F5\u4EF6\u8207\u96FB\u5B50\u5831' },
      { id: 's19', number: '19', en: 'Mobile & LINE OA', zh: '\u884C\u52D5\u88DD\u7F6E\u8207 LINE' },
      { id: 's20', number: '20', en: 'Digital Signage', zh: '\u6578\u4F4D\u770B\u677F' },
    ],
  },
  {
    en: 'VI \u00B7 Creative Variations',
    zh: 'VI \u00B7 \u5275\u610F\u8B8A\u9AD4',
    items: [
      { id: 's21', number: '21', en: 'Campaign Moods', zh: '\u4E3B\u984C\u8996\u89BA\u60C5\u7DD2' },
      { id: 's22', number: '22', en: 'Seasonal & Event', zh: '\u5B63\u7BC0\u8207\u6D3B\u52D5\u8B8A\u9AD4' },
    ],
  },
  {
    en: 'VII \u00B7 Governance',
    zh: 'VII \u00B7 \u6CBB\u7406',
    items: [
      { id: 's23', number: '23', en: 'Co-branding', zh: '\u806F\u5408\u54C1\u724C' },
      { id: 's24', number: '24', en: 'Brand Performance', zh: '\u54C1\u724C\u7E3E\u6548' },
      { id: 's25', number: '25', en: 'Templates & Toolkit', zh: '\u6A21\u677F\u8207\u5DE5\u5177\u5305' },
    ],
  },
  {
    en: 'Appendix',
    zh: '\u9644\u9304',
    items: [
      { id: 'sA', number: 'A', en: 'New Site Activation', zh: '\u65B0\u5EE0\u5340\u555F\u52D5' },
      { id: 'sL', number: 'L', en: 'Language Architecture', zh: '\u8A9E\u8A00\u67B6\u69CB' },
      { id: 'sR', number: 'R', en: 'RACI Ownership', zh: 'RACI \u6B0A\u8CAC\u77E9\u9663' },
      { id: 'sT', number: 'T', en: 'Design Tokens', zh: '\u8A2D\u8A08\u4EE3\u7B26' },
      { id: 'sV', number: 'V', en: 'Version History', zh: '\u7248\u672C\u7D00\u9304' },
      { id: 'sW', number: 'W', en: 'Brand Quality Playbook', zh: '\u54C1\u724C\u54C1\u8CEA\u624B\u518A' },
    ],
  },
];

export const sectionIdToSlug: Record<string, string> = {
  s01: '01-brand-foundation',
  s02: '02-brand-behaviors',
  s03: '03-logo-system',
  s04: '04-color-palette',
  s05: '05-tint-scales',
  s06: '06-gradient-library',
  s07: '07-semantic-dark-mode',
  s08: '08-accessibility',
  s09: '09-typography',
  s10: '10-graphic-iconography',
  s11: '11-imagery-photography',
  s12: '12-voice-tone',
  s13: '13-motion-animation',
  s14: '14-stationery',
  s15: '15-poster-signage',
  s16: '16-uniform-wearables',
  s17: '17-web-landing',
  s18: '18-email-newsletter',
  s19: '19-mobile-line',
  s20: '20-digital-signage',
  s21: '21-campaign-moods',
  s22: '22-seasonal-event',
  s23: '23-co-branding',
  s24: '24-brand-performance',
  s25: '25-templates-toolkit',
  sA: 'app-a-activation',
  sL: 'app-l-language',
  sR: 'app-r-raci',
  sT: 'app-t-design-tokens',
  sV: 'app-v-version-history',
  sW: 'app-w-quality-playbook',
};

export function getAllSectionIds(): string[] {
  return navigation.flatMap((g) => g.items.map((i) => i.id));
}
