/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdfb',
          100: '#ccfbf4',
          200: '#99f6e8',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          blue:   '#2563eb',
          indigo: '#4f46e5',
          gold:   '#d97706',
          coral:  '#e11d48',
        },
        surface: {
          white:  '#ffffff',
          light:  '#f8fafc',
          subtle: '#f1f5f9',
          card:   '#ffffff',
        },
        text: {
          primary:   '#0f172a',
          secondary: '#334155',
          muted:     '#64748b',
          light:     '#94a3b8',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':      'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
        'spin-slow':  'spin 20s linear infinite',
        'fade-up':    'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' },    '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%':      { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        fadeUp:  { from:      { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      backgroundImage: {
        'gradient-mesh':   'linear-gradient(135deg, #f0fdfb 0%, #e0f2fe 50%, #f0f9ff 100%)',
        'gradient-teal':   'linear-gradient(135deg, #14b8a6, #2563eb)',
        'gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #f0fdfb 100%)',
      },
      boxShadow: {
        'soft':    '0 2px 20px rgba(0,0,0,0.06)',
        'card':    '0 4px 32px rgba(0,0,0,0.08)',
        'teal':    '0 4px 24px rgba(20,184,166,0.35)',
        'teal-lg': '0 8px 40px rgba(20,184,166,0.45)',
        'blue':    '0 4px 24px rgba(37,99,235,0.25)',
      },
    },
  },
  plugins: [],
}