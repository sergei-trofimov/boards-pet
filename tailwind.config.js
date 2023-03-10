/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      main: 'Comfortaa',
      secondary: 'Sofia Sans',
    },
    fontSize: {
      'xs': ['10px', '150%'], // Format: '{{name}}': '{{size}}' | ['{{size}}', '{{line-height}}']
      'sm': ['11px', '150%'],
      'lg': ['12px', '150%'],
      'base': ['13px', '150%'],
      'xl': ['14px', '150%'],
      '2xl': ['16px', '150%'],
      '3xl': ['18px', '150%'],
      '4xl': ['21px', '150%'],
      '5xl': ['24px', '150%'],
      '6xl': ['32px', '150%'],
      '7xl': ['34px', '150%'],
      '8xl': ['44px', '150%'],
      '9xl': ['52px', '150%'],
      'xxl': ['68px', '150%'],
    },
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(284px, 1fr))',
      },
      gridTemplateRows: {
        'min-h': 'repeat(auto-fill, minmax(124px, 1fr))'
      },
      gridAutoRows: {
        'm': 'minmax(124px, 1fr)'
      },
      spacing: {
        'inherit': 'inherit',
        '4.5': '1.125rem', // 18px
        '6.5': '1.625rem', // 26px
        '7.5': '1.875rem', // 30px
        '8.5': '2.125rem', // 34px
        '9.5': '2.375rem', // 38px
        '10.5': '2.625rem', // 42px
        '11.5': '2.875rem', // 46px
        '13': '3.125rem', // 50px
        '13.5': '3.375rem', // 54px
        '15': '3.75rem', // 60px
        '15.5': '3.875rem', // 62px
        '17': '4.25rem', // 68px
        '17.5': '4.375rem', // 70px
        '18': '4.5rem', // 72px
        '20.5': '5.125rem', // 82px
        '22': '5.5rem', // 88px,
        '22.5': '5.625rem', // 90px,
        '23': '5.75rem', // 92px
        '23.5': '5.875rem', // 94px
        '25': '6.25rem', // 100px
        '27': '6.75rem', // 108px
        '30': '7.5rem', // 120px
        '31': '7.75rem', // 124px
        '32.5': '8.125rem', // 130px
        '34': '8.5rem', // 136px
        '35': '8.75rem', // 140px
        '37': '9.25rem', // 148px
        '43': '10.75rem', // 172px
        '46': '11.5rem', // 184px
        '50': '12.5rem', // 200px
        '55': '13.75rem', // 220px
        '68': '17rem', // 272px
        '70': '17.5rem', // 280px
        '75': '18.75rem', // 300px
        '83': '20.75rem', // 332px
        '85': '21.25rem', // 340px
        '86': '21.5rem', // 344px
        '89': '22.25rem', // 356px
        '100': '25rem', // 400px
        '108': '27rem', // 432px
        '125': '31.25rem', // 500px
        '132': '33rem', // 528px
        '135': '33.75rem', // 540px
        '144': '36rem', // 576px
        '146': '36.5rem', // 584px
        '150': '37.5rem', // 600px
        '175': '43.75rem', // 700px
        '200': '50rem', // 800px
        '250': '62.5rem', // 1000px
        '342': '85.5rem', // 1368px
        '450': '112.5rem', // 1800px
        '1/10': '10%',
        '9/10': '90%'
      },
      minWidth: theme => ({
        ...theme('spacing'),
        full: '100%',
        '9/10': '90%'
      }),
      maxWidth: theme => ({
        ...theme('spacing'),
        full: '100%',
        '9/10': '90%'
      }),
      minHeight: theme => ({
        ...theme('spacing'),
        full: '100%',
        '9/10': '90%'
      }),
      maxHeight: theme => ({
        ...theme('spacing'),
        full: '100%',
        '9/10': '90%'
      }),
    },
  },
  plugins: [],
};
