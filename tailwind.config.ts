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
        herotitle: pxToRem(38),
        bigtitle: pxToRem(32),
        title1: pxToRem(26),
        title2: pxToRem(22),
        title3: pxToRem(18),
        headline: pxToRem(16),
        body: pxToRem(16),
        footnote: pxToRem(14),
        caption: pxToRem(12),
      },
      screens: {
        sm: pxToRem(550), // mobile
        md: pxToRem(770), // tablet
        lg: pxToRem(1200), // desktop
      },
      spacing: {
        '0.75': pxToRem(3),
        '1.25': pxToRem(5),
        '3.25': pxToRem(13),
        '3.75': pxToRem(15),
        '4.5': pxToRem(18),
        '5.5': pxToRem(20),
        '6.5': pxToRem(24),
        '7.5': pxToRem(30),
        '8.75': pxToRem(35),
        '12.5': pxToRem(50),
        '15': pxToRem(60),
        '16.5': pxToRem(66),
        '18': pxToRem(72),
        '22': pxToRem(88),
        '24': pxToRem(96),
        '30': pxToRem(120),
        '38.5': pxToRem(154),
        '42': pxToRem(168),
        '68': pxToRem(272),
        '95': pxToRem(380),
        '4%': '4%',
        '5%': '5%',
        '6%': '6%',
        '7%': '7%',
        '8%': '8%',
        '10%': '10%',
        '13%': '13%',
      },
      borderRadius: {
        '1.25': pxToRem(5),
        '2.5': pxToRem(10),
        '3.75': pxToRem(15),
        '7.5': pxToRem(30),
        '14': pxToRem(56),
      },
      borderWidth: {
        '1': pxToRem(1),
      },
      margin: {
        'half-vw': 'calc(-50vw + 50%)',
      },
      width: {
        '15.5': pxToRem(62),
        '21': pxToRem(84),
        '24': pxToRem(96),
        '28.5': pxToRem(114),
        '67.5': pxToRem(270),
        '90': pxToRem(360),
        '95': pxToRem(380),
        'full-vw': '100vw',
      },
      height: {
        '14.5': pxToRem(58),
        '21': pxToRem(84),
        '24': pxToRem(96),
        '27.5': pxToRem(110),
        '44': pxToRem(166),
        '58': pxToRem(240),
        'screen-40': `calc(100vh - ${pxToRem(160)}`,
        'screen-80': `calc(100vh - ${pxToRem(320)}`,
        'screen-95': `calc(100vh - ${pxToRem(360)}`,
      },
      minHeight: {
        '30': pxToRem(120),
        '54': pxToRem(212),
        '223': pxToRem(892),
      },
      minWidth: {
        '20': pxToRem(80),
        '67.5': pxToRem(270),
      },
      maxWidth: {
        '67.5': pxToRem(270),
        '80': pxToRem(320),
        '160': pxToRem(640),
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
