import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom brand colors
        brand: {
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          gold: '#ffd700',
          silver: '#c0c0c0',
          bronze: '#cd7f32',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'holo-gradient': 'linear-gradient(135deg, #ff0080 0%, #00ffff 25%, #ff00ff 50%, #00ff00 75%, #ff0080 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
        'silver-gradient': 'linear-gradient(135deg, #C0C0C0 0%, #808080 50%, #C0C0C0 100%)',
        'bronze-gradient': 'linear-gradient(135deg, #CD7F32 0%, #8B4513 50%, #CD7F32 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.6)',
        'glow-holo': '0 0 40px rgba(255, 0, 255, 0.5)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'holographic': 'holographic 3s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        holographic: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
