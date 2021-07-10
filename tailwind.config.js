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
                "footer": "#FCE4D9"
            },
            fontFamily: {
                sifonn: ["Sifonn Pro", ...defaultTheme.fontFamily.sans],
                avenir: ["Avenir", ...defaultTheme.fontFamily.sans],
                avenirM: ["AvenirM", ...defaultTheme.fontFamily.sans],
                avenirMO: ["AvenirMO", ...defaultTheme.fontFamily.sans],
                avenirBL: ["AvenirBL", ...defaultTheme.fontFamily.sans],
                avenirBLO: ["avenirBLO", ...defaultTheme.fontFamily.sans]
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
