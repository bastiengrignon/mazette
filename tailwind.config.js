module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "black": "#06041D",
                "test-red": "#EC6A69",
                "test-green": "#21BD8F"
            },
            fontFamily: {
                cantarell: ["Cantarell", "sans-serif"]
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
