import type { Config } from 'tailwindcss';

const config = {
  // darkMode: ["class"],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#3E3E3E',
        input: '#EEEEEE',
        ring: 'hsl(var(--ring))',
        background: '#E9EAED',
        foreground: '#3E3E3E',
        primary: {
          DEFAULT: '#81A9BB',
          foreground: '#EEEEEE'
        },
        secondary: {
          DEFAULT: '#FFF083',
          foreground: '#3E3E3E'
        },
        destructive: {
          DEFAULT: '#C96262',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: '#767676',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: '#D2DCF1',
          foreground: '#6100FF'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: '#EEEEEE',
          foreground: '#D9D9D9'
        }
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)'],
        inter: ['var(--font-inter)']
      },
      boxShadow: {
        dip: '0px 4px 0px 0px #3E3E3E',
        btn: '0px 0px 0px 2px #3E3E3E'
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
