// ToggleButton.tsx

// Types
type ToggleButtonProps = {
    // theme: "light" | "dark";
    // setTheme: (t: "light" | "dark") => void;
    value: boolean;
};

/**
 * Name: ToggleButton
 * Type: Component
 * Description: TBD
 */
export default function ToggleButton({ value }: ToggleButtonProps) {
    return (
        <div className="relative inline-block w-10 h-5.5">
            <input
                checked={value === false}
                onChange={undefined}
                id="switch-component-dark"
                type="checkbox"
                className="peer appearance-none w-10 h-5.5 bg-wu-gray-400 rounded-full checked:bg-wu-gray-200 cursor-pointer transition-colors duration-300"
            />
            <label
                htmlFor="switch-component-dark"
                className="absolute top-0.25 left-0.25 w-5 h-5 bg-wu-gray-200 peer-checked:bg-wu-gray-500
                peer-checked:hover:border-wu-gray-200 hover:border-wu-gray-500 rounded-full border border-wu-gray-200 shadow-sm
                 transition-all duration-300 peer-checked:translate-x-4.5 peer-checked:border-wu-gray-500 cursor-pointer"
            ></label>
        </div>
    );
}
