/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                backgroundDark: '#0D0D0D',
                background: '#1A1C1B',
                'tab-background': '#1C1C1C',
                'muted-background': '#303231',
                primary: '#62A07B',
                accent: '#404241',
                foreground: '#BAC4C6',
                'muted-foreground': '#585C5B',
                boldText: '#C3C3C3',
            },
            fontFamily: {
                pathRegular: ["PathRegular"],
                pathSemiBold: ["PathSemi"],
                pathMedium: ["PathMedium"],
                pathBold: ["PathBold"],
                poppinsRegular: ['PoppinsRegular'],
                poppinsSemiBold: ['PoppinsSemi'],
                poppinsMedium: ['PoppinsMedium'],
                poppinsBold: ['PoppinsBold'],
                test: ['Test'],
            },
        },
    },
    plugins: [],
};
