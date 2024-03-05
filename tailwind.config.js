const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    palette: {
      secondary: {
        main: '#ff9025'
      }
    },
    extend: {
      animation: {
        'zoom-in': 'zoomIn 500ms ease-in-out forwards',
        'zoom-out': 'zoomOut 500ms ease-in-out forwards'
      },
      boxShadow: {
        'topShadow': 'rgba(0, 0, 0, 0.45) 0px -25px 20px -20px',
        'wwlDefault': '0px 24px 40px rgba(0,0,0,0.03),0px 8px 24px rgba(0,0,0,0.05)',
        'wwlTabShadow': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        'wwlDragDropShadow': '0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)'
      },
      fontFamily: {
        chivo: ['Chivo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        pridi: ['Pridi', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        sourcesanspro: ['Source Sans Pro', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
      colors: {
        wwlGreen: '#D2D82C',
        wwlGreenTransparent: 'rgba(210, 216, 44, 0.5)',
        wwlGreenLight: '#34C759',
        wwlYellow: '#FFD032',
        wwlOrange: '#FF644C',
        wwlDarkBlue: '#005A5B',
        wwlBlack: '#101828',
        wwlBlue: '#24264D',
        wwlWhite: '#FFFFFF',
        wwlWhiteDim: '#F9F9F9',
        wwlWhiteTransparent: 'rgba(255, 255, 255, 0.18)',
        wwlGrayNormal:'#E0E0E0',
        wwlGray: '#ADADAD',
        wwlGrayLight: '#F9FAFB',
        wwlGray700: '#344054',
        wwlGray600: '#475467',
        wwlGray500: '#667085',
        wwlGray400: '#98A2B3',
        wwlGray300: '#D0D5DD',
        wwlGray200: '#E4E7EC',
        wwlGray100: '#F2F4F7',
        wwlTransparentYellow: 'rgba(255,208,50,0.2)',
        wwlYellowDim: 'rgba(255, 208, 50, 0.7)',
        wwlTransparentOrange: 'rgba(255,100,76,0.2)',
        wwlBorderColor: 'rgba(0, 0, 0, 0.05)',
        wwlPaginationActive: 'rgba(0, 90, 91, 0.1)',
        wwlInterfaceLightest: '#F7F7FB',
        wwlLoaderOverlay: 'rgba(0, 0, 0, 0.1)',
      },
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide'), require('tailwind-scrollbar'), require('tailwindcss-writing-mode')({
    variants: ['responsive', 'hover']
  })]
}
