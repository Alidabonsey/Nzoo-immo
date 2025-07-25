/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#183154', // Couleur à garder
        secondary: '#2563eb', // Bleu moderne
        accent: '#7c3aed', // Violet moderne
        success: '#059669', // Vert moderne
        warning: '#d97706', // Orange moderne
        danger: '#dc2626', // Rouge moderne
        'sky-light': {
          400: '#38bdf8',
          500: '#0ea5e9', 
          600: '#0284c7'
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'light-gray': '#D3D6DB'
      },
      fontFamily: {
        'sans': ['Poppins', 'Montserrat', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
