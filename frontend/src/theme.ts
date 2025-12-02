// theme.ts

export const lightTheme = {
    colors: {},
    button: {
        defaultProps: {
            color: "primary",
            variant: "filled",
            size: "md",
            ripple: true,
        },
        valid: {
            colors: ["primary", "secondary"],
        },
        styles: {
            base: {
                initial: "rounded-lg font-regular transition-all",
            },
            variants: {
                filled: {
                    primary:
                        "bg-wuGrey-400 text-wuGrey-200 hover:bg-wuGrey-300",
                    secondary:
                        "bg-wuRed-100 text-wuGrey-200 hover:bg-wuRed-200",
                },
            },
        },
    },
};

export const darkTheme = {
    colors: {},
    button: {
        defaultProps: {
            color: "primary",
            variant: "filled",
            size: "md",
            ripple: true,
        },
        valid: {
            colors: ["primary", "secondary"],
        },
        styles: {
            base: {
                initial: "rounded-lg font-regular transition-all",
            },
            variants: {
                filled: {
                    primary:
                        "bg-wuGrey-200 text-wuGrey-400 hover:bg-wuGrey-100",
                    secondary:
                        "bg-wuGrey-200 text-wuRed-100 hover:bg-wuGrey-100",
                },
            },
        },
    },
};
