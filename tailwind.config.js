/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                backgroundDark: "#0D0D0D",
                background: "#1A1C1B",
                "muted-background": "#303231",
                primary: "#62A07B",
                accent: "#404241",
                foreground: "#BAC4C6",
                "muted-foreground": "#585C5B",
            },
        },
    },
    plugins: [],
};
