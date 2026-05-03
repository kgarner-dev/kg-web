/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        surface: 'var(--color-bg)',
        card: 'var(--color-card)'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace']
      },
      borderRadius: {
        card: '20px'
      },
      boxShadow: {
        card: '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 24px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
}
