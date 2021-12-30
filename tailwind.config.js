module.exports = {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-primary': '#334960',
        'c-secondary': '#2ADBAC',
        'c-black': '#252631',
        'c-red': '#EB5757',
        'c-green': '#219653',
        'c-gray': '#9EA1A5',

        'c-F6F6FB': '#F6F6FB',
        'c-F2F2F2': '#F2F2F2',
        'c-D1D5DB': '#D1D5DB',
        'c-EBEBEB': '#EBEBEB',
        'c-2F80ED': '#2F80ED',
        'c-D2E5F3': '#D2E5F3',
        'c-2D9CDB': '#2D9CDB',
        'c-56CCF2': '#56CCF2',
        'c-1C5085': '#1C5085',
        'c-66A5D4': '#66A5D4',
        'c-3384C6': '#3384C6',
        'c-E3E3E3': '#E3E3E3',
        'c-E1E8E4': '#E1E8E4',
        'c-98C6FF': '#98C6FF',
        'c-54A0FF': '#54A0FF',
      },
      boxShadow:  {
        'c-lg-reverse':  '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        'c-primary':  '1px 2px 10px 1px rgba(0, 0, 0, 0.05)',
      },
      width: {
        '300px': '300px',
      },
      maxWidth: {
        '300px': '300px',
        '8xl': '1440px',
        '16': '64px',
      },
      minWidth: {
        '600px': '600px',
        '500px': '500px',
        '300px': '300px',
        '250px': '250px',
        '200px': '200px',
        '50px': '50px',
      },
      maxHeight: {
        '300px': '300px',
        '200px': '200px',
        '150px': '150px',
      },
      minHeight: {
        '500px': '500px',
        '300px': '300px',
        '150px': '150px',
      },
      fontSize: {
        'xxs': '0.625rem',
        'xxxs': '0.5rem',
      },
      margin: {
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
      },
      height: {
        '275px': '275px',
        '500px': '500px',
        '540px': '540px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
