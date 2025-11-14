// Button.tsx

/**
 * ButtonProps
 * Description: Props for Button component
 */
interface ButtonProps {
    bg_color: string;
    border_color: string;
    text_color: string;
    // display_type: useState<displayTypes>();
    display_type: string;
    text_input: string;
    svg_input: string;
    alt_text: string;
    button_size: string;
    border_type: string;
}

/**
 * Func GetButtonSpecs
 * @param button_size
 * @constructor
 */
function GetButtonSpecs(button_size: string) {
    switch (button_size) {
        case "xs":
            return "w-8 h-8";
        case "sm":
            return "h-32 h-32";
        default:
            return "h-32 h-32";
    }
}

/**
 * Button Component
 * Description: Button component for implementing buttons into the UI
 * Usage: <Button
 *          {bg_color: <tailwind-defined-color>}
 *          {text_color: <tailwind-defined-color>}
 *          {display_type: string <"svg", "text">}
 *          {text_input: string}
 *          {svg_input: svg}
 *        />
 * **/
const Button = ({
    text_color,
    display_type,
    text_input,
    svg_input,
    alt_text,
    button_size,
}: ButtonProps) => {
    return (
        <>
            <div className={`m-2`}>
                <button
                    type="button"
                    name="button"
                    onClick={() => {
                        console.log(
                            `Pressed button with text: ${text_input} ${GetButtonSpecs(button_size)}`
                        );
                    }}
                    className={""}
                >
                    <span className={`text-${text_color}`}>
                        {display_type === "text" ? (
                            <p>{text_input}</p>
                        ) : (
                            <img src={svg_input} alt={alt_text} />
                        )}
                    </span>
                </button>
            </div>
        </>
    );
};

export default Button;
