/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        neutral: {
          bgLight: 'var(--color-bg-light)',
          bgDark: 'var(--color-bg-dark)',
          textLight: 'var(--color-text-light)',
          textDark: 'var(--color-text-dark)',
        },
        error: 'var(--color-error)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      opacity: {
        '15': '0.15',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.25)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.18)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-white/10',
    'bg-white/15',
    'bg-white/20',
    'bg-white/25',
    'bg-white/30',
    'bg-white/40',
    'bg-white/50',
    'bg-white/70',
    'bg-white/80',
    'bg-white/90',
    'hover:bg-white/10',
    'hover:bg-white/15',
    'hover:bg-white/20',
    'hover:bg-white/25',
    'hover:bg-white/30',
    'dark:bg-white/5',
    'dark:bg-white/10',
    'dark:hover:bg-white/10',
    'dark:bg-neutral-bgDark/20',
    'dark:bg-neutral-bgDark/30',
    'dark:bg-neutral-bgDark/40',
    'dark:bg-neutral-bgDark/50',
    'dark:bg-neutral-textLight/10',
    'dark:bg-neutral-textLight/15',
    'dark:hover:bg-neutral-textLight/10',
    'dark:hover:bg-neutral-textLight/15',
    'dark:bg-primary-DEFAULT/30',
    'dark:bg-primary-DEFAULT/40',
    'dark:bg-primary-dark/10',
    'border-white/5',
    'border-white/10',
    'border-white/18',
    'border-white/20',
    'border-white/50'
  ],
}
