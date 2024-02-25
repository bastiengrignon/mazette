import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        black: '#06041D',
        red: '#EC6A69',
        green: '#21BD8F',
        footer: '#FCE4D9',
        darker: '#3A3A3A',
        'ghost-white': '#B5B5B5',
        blueGray: colors.slate,
      },
      fontFamily: {
        sifonn: ['Sifonn Pro', ...defaultTheme.fontFamily.sans],
        avenir: ['Avenir', ...defaultTheme.fontFamily.sans],
        avenirM: ['AvenirM', ...defaultTheme.fontFamily.sans],
        avenirMO: ['AvenirMO', ...defaultTheme.fontFamily.sans],
        avenirBL: ['AvenirBL', ...defaultTheme.fontFamily.sans],
        avenirBLO: ['avenirBLO', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      borderRadius: ['hover', 'last'],
      borderWidth: ['hover'],
      scale: ['active'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
