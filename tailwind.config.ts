import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // AKZA brand palette
        ink:   '#0A0A0A',
        ash:   '#141414',
        coal:  '#1C1C1C',
        smoke: '#2E2E2E',
        fog:   '#9A9A9A',
        mist:  '#FAFAFA',
        red: {
          DEFAULT: '#C0392B',
          hot:     '#E74C3C',
          dim:     '#7B241C',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Jost"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        jp:      ['"Noto Serif JP"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.4em',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -3%)' },
          '30%':      { transform: 'translate(3%, -1%)' },
          '50%':      { transform: 'translate(-1%, 2%)' },
          '70%':      { transform: 'translate(2%, 1%)' },
          '90%':      { transform: 'translate(-3%, 2%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
