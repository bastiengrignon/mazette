module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "logo-yellow": "#FFDD53",
                "logo-blue": "#1E1288",
                "black": "#06041D"
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
