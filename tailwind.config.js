module.exports = {
    purge: [
        "./src/**/*.tsx"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "my-indigo": "#052959"
            },
            fontFamily: {
                cantarell: ["Cantarell", "sans-serif"]
            }
        }
    },
    variants: {
        extend: {
            fontWeight: ["hover"],
            borderRadius: ["last"],
            borderWidth: ["hover"]
        },
    },
    plugins: [],
}
