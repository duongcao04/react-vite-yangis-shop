/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
import { nextui } from '@nextui-org/react'

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            // => @media (min-width: 375px) { ... }
            mobile: '375px',
            // => @media (min-width: 640px) { ... }
            tablet: '640px',
            // => @media (min-width: 1024px) { ... }
            laptop: '1024px',
            // => @media (min-width: 1280px) { ... }
            desktop: '1280px',
        },
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                16: 'repeat(16, minmax(0, 1fr))',

                // Complex site-specific column configuration
                navbar: 'minmax(35px,175px) 1fr minmax(58px,267px)',
                admin: '280px 1fr',
            },
            fontSize: {
                xxs: ['10px', '12px'],
            },
            fontFamily: {
                rampart: ['Rampart One'],
            },
            colors: {
                wallground: {
                    light: '#f3f4f6',
                    dark: '#18191a',
                },
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                sky: {
                    50: '#D9EDFD',
                    100: '#C5E4FC',
                    200: '#9ED3FA',
                    300: '#78C1F8',
                    400: '#51AFF6',
                    500: '#2A9DF4',
                    600: '#0B81DB',
                    700: '#0962A5',
                    800: '#064270',
                    900: '#03233B',
                    950: '#021320',
                    DEFAULT: '#2A9DF4',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554',
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                primary: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                    950: '#450a0a',
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                success: {
                    DEFAULT: '#22c55e',
                },
                warning: {
                    DEFAULT: '#eab308',
                },
                green: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                    DEFAULT: '#22c55e',
                },
                yellow: {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                    950: '#422006',
                    DEFAULT: '#eab308',
                },

                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                chart: {
                    1: 'var(--chart-1)',
                    2: 'var(--chart-2)',
                    3: 'var(--chart-3)',
                    4: 'var(--chart-4)',
                    5: 'var(--chart-5)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [
        nextui(),
        import('tailwindcss-animate'),
        function ({ addBase, theme }) {
            addBase({
                h1: {
                    fontSize: theme('fontSize.5xl'),
                    fontWeight: theme('fontWeight.bold'),
                },
                h2: { fontSize: theme('fontSize.2xl') },
                h3: {
                    fontSize: theme('fontSize.xl'),
                    fontWeight: theme('fontWeight.medium'),
                },
            })
        },
    ],
}
