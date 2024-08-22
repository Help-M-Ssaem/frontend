import type { Config } from 'tailwindcss'

const pxToRem = (px: number, base: number = 16): string => `${px / base}rem`

interface PluginAPI {
  addUtilities: (utilities: Record<string, Record<string, string>>) => void
  e: (className: string) => string
  theme: (path: string, defaultValue?: any) => any
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#DACAFF',
        main1: '#A580FC',
        main2: '#AD71EA',
        main3: '#FAF8FF',
        main4: '#F4EFFF',
        maindark: '#222222',
        alarm: '#FF5C5C',
        green: '#5BE1A9',

        gray1: '#4E4F4E',
        gray2: '#7A7A7B',
        gray3: '#A7A7A7',
        gray4: '#D4D3D3',
        gray5: '#F5F5F5',
        gray6: '#E0E0E0',

        enfp: '#F9CAF2',
        enfj: '#FCE8CA',
        infp: '#CAFCD4',
        infj: '#CAEEFC',
        intj: '#C6A1AE',
        intp: '#7581F2',
        entj: '#3D3DA0',
        entp: '#A588FF',
        istp: '#B2A8A6',
        isfp: '#FFD1C5',
        estp: '#A4B79F',
        esfp: '#D8C8FD',
        istj: '#83899B',
        isfj: '#4B784B',
        estj: '#68676B',
        esfj: '#B8C4EE',

        newbie: '#80E045',
        mbtilano: '#00AF76',
        mbtmi: '#FAA454',
        mbtiadult: '#F85CA2',
        funfun: '#00B5DC',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        herotitle: '38px',
        bigtitle: '32px',
        title1: '26px',
        title2: '22px',
        title3: '18px',
        headline: '16px',
        body: '16px',
        footnote: '14px',
        caption: '12px',
      },
      screens: {
        sm: '550px', // mobile
        md: '770px', // tablet
        lg: '1200px', // desktop
      },
      spacing: {
        '0.75': '3px',
        '1.25': '5px',
        '3.25': '13px',
        '3.75': '15px',
        '4.5': '18px',
        '5.5': '20px',
        '6.5': '24px',
        '7.5': '30px',
        '8.75': '35px',
        '12.5': '50px',
        '15': '60px',
        '16.5': '66px',
        '18': '72px',
        '22': '88px',
        '30': '120px',
        '38.5': '154px',
        '68': '272px',
        '95': '380px',
        '4%': '4%',
        '5%': '5%',
        '6%': '6%',
        '7%': '7%',
        '8%': '8%',
        '10%': '10%',
        '13%': '13%',
      },
      borderRadius: {
        '1.25': '5px',
        '2.5': '10px',
        '3.75': '15px',
        '7.5': '30px',
        '14': '56px',
      },
      borderWidth: {
        '1': '1px',
      },
      margin: {
        'half-vw': 'calc(-50vw + 50%)',
      },
      width: {
        '15.5': '62px',
        '21': '84px',
        '24': '96px',
        '28.5': '114px',
        '67.5': '270px',
        '90': '360px',
        '95': '380px',
        'full-vw': '100vw',
      },
      height: {
        '14.5': '58px',
        '21': '84px',
        '24': '96px',
        '27.5': '110px',
        '44': '166px',
        '58': '240px',
        'screen-40': 'calc(100vh - 160px)',
        'screen-80': 'calc(100vh - 320px)',
        'screen-95': 'calc(100vh - 360px)',
      },
      minHeight: {
        '30': '120px',
        '54': '212px',
        '223': '892px',
      },
      minWidth: {
        '20': '80px',
        '67.5': '270px',
      },
      maxWidth: {
        '67.5': '270px',
        '80': '320px',
      },
      boxShadow: {
        'custom-light': '0 4px 10px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities, e, theme }: PluginAPI) {
      const remSpacing = Object.entries(theme('spacing')).reduce<
        Record<string, Record<string, string>>
      >((acc, [key, value]) => {
        if (typeof value === 'string' && value.endsWith('px')) {
          const remValue = pxToRem(parseInt(value, 10))
          acc[`.${e(`p-${key}rem`)}`] = { padding: remValue }
          acc[`.${e(`m-${key}rem`)}`] = { margin: remValue }
          acc[`.${e(`w-${key}rem`)}`] = { width: remValue }
          acc[`.${e(`h-${key}rem`)}`] = { height: remValue }
        }
        return acc
      }, {})

      addUtilities(remSpacing)
    },
  ],
}

export default config
