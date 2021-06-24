module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "logo-yellow": "#FFDD53",
                "logo-blue": "#1E1288",
                "secondary-blue": "#6F8AB7",
                "black": "#06041D",
                "test-red": "#EC6A69",
                "test-green": "#21BD8F",
                "test-blue": "#0C57B4"
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
