// GPS Brand Bible v4.0 — Tailwind CSS Configuration
// Copy this into your tailwind.config.js theme.extend section

module.exports = {
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: '#F0FAFB', 100: '#D4F1F3', 200: '#A8E3E8', 300: '#6DCDD5',
          400: '#3DB9C2', 500: '#26A7B0', 600: '#1E8A92', 700: '#186E75',
          800: '#145860', 900: '#0F4249', 950: '#082A30',
        },
        copper: {
          50: '#F8F7F9', 100: '#EDEAF1', 200: '#DDD8E5', 300: '#CAC3D2',
          400: '#B3A9C2', 500: '#9B8FA8', 600: '#857693', 700: '#6E5F7C',
          800: '#574A63', 900: '#41374B', 950: '#2B2433',
        },
        'gps-purple': { 400: '#8C9FCB', 500: '#7086BA', 600: '#5B6FA3' },
        'gps-green': { 400: '#8CC897', 500: '#6BB57E', 600: '#539A63' },
        'gps-orange': { 300: '#F6AD90', 500: '#ED7442', 600: '#D45A2A' },
      },
      fontFamily: {
        en: ['Lato', 'Trebuchet MS', 'Verdana', 'sans-serif'],
        zh: ['Noto Sans TC', 'Microsoft JhengHei', 'sans-serif'],
        jp: ['Noto Sans JP', 'Hiragino Sans', 'sans-serif'],
        sc: ['Noto Sans SC', 'Microsoft YaHei', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      spacing: {
        'sp1': '4px', 'sp2': '8px', 'sp3': '12px', 'sp4': '16px',
        'sp6': '24px', 'sp8': '32px', 'sp12': '48px', 'sp16': '64px', 'sp24': '96px',
      },
    },
  },
};
