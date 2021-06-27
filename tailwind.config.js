const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "black": "#06041D",
                "test-red": "#EC6A69",
                "test-green": "#21BD8F",
                "footer-gray": "#55505c"
            },
            fontFamily: {
                cantarell: ["Cantarell", "sans-serif"],
                sifonn: ["Sifonn Pro", ...defaultTheme.fontFamily.sans],
                avenir: ["Avenir LT Std 55 Roman", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    variants: {
        extend: {
            fontWeight: ["hover"],
            borderRadius: ["hover", "last"],
            borderWidth: ["hover"]
        },
    },
    plugins: [],
}
