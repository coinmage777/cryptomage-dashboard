/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0a0a0b', card: '#111113', hover: '#1a1a1d', elevated: '#18181b' },
        accent: { DEFAULT: '#8b5cf6', dim: '#6d42d1', glow: 'rgba(139,92,246,0.12)' },
        mint: '#34d399',
        coral: '#f87171',
        gold: '#fbbf24',
        text: { DEFAULT: '#e4e4e7', dim: '#71717a', muted: '#52525b' },
        border: { DEFAULT: '#27272a', light: '#3f3f46' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
