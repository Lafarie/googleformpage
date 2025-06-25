/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-alumni': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
      colors: {
        'alumni-gold': '#ffd700',
        'alumni-gold-light': '#ffed4a',
        'alumni-purple': '#8b5cf6',
        'alumni-purple-dark': '#7c3aed',
        'alumni-gray': '#a0aec0',
        'alumni-light': '#e2e8f0',
      },
      animation: {
        'format-pulse': 'formatPulse 0.6s ease-in-out',
      },
      keyframes: {
        formatPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { 
            transform: 'scale(1.02)', 
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' 
          },
          '100%': { transform: 'scale(1)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      maxHeight: {
        '50': '12.5rem',
      }
    },
  },
  plugins: [],
} 