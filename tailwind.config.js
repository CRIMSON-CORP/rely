/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html"],
    theme: {
        extend: {
            colors: {
                neutral: {
                    light: "#D0D5DD",
                    black: "#101828",
                },
                primary: {
                    blue: "#001E78",
                },
                secondary: {
                    "yellow-1": "#FCF2D3",
                    "yellow-6": "#F0BD23",
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "20px",
                },
            },
            fontFamily: {
                sans: ["Open Sans", "ssans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
