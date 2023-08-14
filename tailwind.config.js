/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html"],
    theme: {
        extend: {
            colors: {
                neutral: {
                    light: "#D0D5DD",
                },
            },
            container: {
                center: true,
                padding: {
                    DEFUALT: "20px",
                },
            },
            fontFamily: {
                sans: ["Open Sans", "ssans-serif"],
            },
        },
    },
    plugins: [],
};
