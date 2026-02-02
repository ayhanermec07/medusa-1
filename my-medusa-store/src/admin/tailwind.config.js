/** @type {import('tailwindcss').Config} */
const path = require("path")

module.exports = {
    content: [
        path.join(__dirname, "src", "**", "*.{js,jsx,ts,tsx}"),
        path.join(__dirname, "node_modules", "@medusajs", "ui", "dist", "**", "*.{js,jsx,ts,tsx}"),
    ],
    presets: [require("@medusajs/ui-preset")],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#f05b05",
                secondary: "#FCC85A",
                tertiary: "#F2DFA3",
                "background-light": "#f8f6f5",
                "background-dark": "#181311",
                "surface-dark": "#231e1a",
                "surface-light": "#3a2e27",
            },
            fontFamily: {
                display: ["Work Sans", "sans-serif"],
                body: ["Work Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
}
