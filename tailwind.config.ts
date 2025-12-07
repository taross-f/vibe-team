import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        vibe: '0 10px 30px -12px rgba(99,102,241,0.35)',
        float: '0 14px 28px rgba(0,0,0,0.25)',
      },
      colors: {
        backlog: '#0f172a',
        progress: '#1e293b',
        review: '#4c1d95',
        changes: '#e11d48',
        done: '#16a34a',
      },
    },
  },
  plugins: [forms],
};

export default config;
