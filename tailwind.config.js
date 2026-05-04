/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0F0F13',
                surface: '#1A1A24',
                accent: '#A78BFA',
                'accent-dark': '#7C5FC4',
                border: '#2A2A38',
                txt: '#FFFFFF',
                txt2: '#94A3B8',
                success: '#6EE7B7',
                error: '#F87171',
                warn: '#FBBF24',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                display: ['Montserrat', 'sans-serif'],
            },
            borderRadius: {
                card: '12px',
            },
        },
    },
    plugins: [],
}


