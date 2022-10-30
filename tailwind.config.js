const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ addComponents, theme, addUtilities }) => {
      addUtilities({
        '.text-shadow': {
          textShadow: '1px 1px rgba(0, 0, 0, 0.4)'
        },
        '.outline-border-none': {
          outline: 'none',
          border: 'none'
        },
        '.flex-center-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        },
        '.image-like-bg': {
          objectPosition: 'center',
          objectFit: 'cover',
          pointerEvents: 'none'
        }
      });
    })
  ]
};
