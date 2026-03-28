/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(94, 234, 212, 0.15), 0 20px 80px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'mesh-dark':
          'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 28%), radial-gradient(circle at 80% 0%, rgba(34,197,94,0.14), transparent 22%), radial-gradient(circle at 70% 70%, rgba(244,114,182,0.16), transparent 20%), linear-gradient(180deg, #09111f 0%, #07111f 55%, #050b14 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
