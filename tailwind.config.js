/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class', // Tailwindcss 3.0 default is 'media',  'class'
    theme: {
        extend: {
            animation: {
                slideRight: 'slideRight 0.5s ease-in-out',
                tada: 'tada 1.5s ease-in-out infinite',
            },
            keyframes: (theme) => ({
                slideRight: {
                    '0%': { transform: 'translateX(-150%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                tada: {
                    '0%, 100%': { transform: 'scale3d(1, 1, 1)' },
                    '10%, 30%, 50%, 70%, 90%': {
                        transform: 'scale3d(0.9, 0.9, 0.9) rotate(-3deg)',
                    },
                    '20%, 40%, 60%, 80%': {
                        transform: 'scale3d(1.1, 1.1, 1.1) rotate(3deg)',
                    },
                },
            }),
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            spacing: {
                380: '23.75rem',
                450: '28.125rem',
                500: '31.25rem',
                650: '40.625rem',
                1100: '68.75rem',
                1200: '75rem',
            },
        },
        maxHeight: {
            0: '0',
            '1/4': '25%',
            '2/5': '40%',
            '1/2': '50%',
            '3/5': '60%',
            '3/4': '75%',
            '4/5': '80%',
            '9/10': '90%',
            full: '100%',
        },
    },
    variants: {
        extend: {
            animation: ['hover', 'focus'],
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
}
