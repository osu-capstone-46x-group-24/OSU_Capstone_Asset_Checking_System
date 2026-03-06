// ButtonDefault.tsx

// Imports
import type { ButtonProps } from "@material-tailwind/react";

// Types
type ButtonDefaultProps = {
    props?: ButtonProps;
    onClick?: () => void;
    children?: string;
    className?: string;
    disabled?: boolean;
    variant?: "Primary" | "Secondary";
};

/**
 * Name: ButtonDefault
 * Type: Component
 * Description: TBD
 */
export default function ButtonDefault({
    props,
    onClick,
    children,
    className,
    disabled,
    variant = "Primary",
}: ButtonDefaultProps) {
    const baseClasses =
        "p-2 rounded-md font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    let variantClasses = "";

    switch (variant) {
        case "Secondary":
            variantClasses = "bg-text text-bg";
            break;
        default:
            variantClasses = "bg-bg text-text hover:bg-bg/90 shadow";
            break;
    }

    return (
        <button
            {...props}
            onClick={onClick}
            children={children}
            className={`${baseClasses} ${variantClasses} ${className}`}
            disabled={disabled}
        />
    );
}
