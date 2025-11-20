// tailwind.config.ts

import withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // WesternU Color Palette [here](https://cdn.discordapp.com/attachments/1435424497137221823/1435425476238770176/WU_pallete.png?ex=691f0966&is=691db7e6&hm=8c0cd4e4b5bc6424cb59e8e3ac242d638e61ac0431359c8ef19978709dacf5e3&)
                wuRed: {
                    100: "#690323",
                    200: "#58001B",
                    300: "#3E0214",
                },
                wuYellow: {
                    100: "#E0AB4C",
                },
                wuGrey: {
                    100: "#FFFFFF",
                    200: "#E2E4DB",
                    300: "#7C878E",
                    400: "#242424",
                    500: "#1A1A1A",
                },
            },
        },
        fontFamily: {
            sans: ["Open Sans", "sans-serif"],
        },
    },
    plugins: [],
});
