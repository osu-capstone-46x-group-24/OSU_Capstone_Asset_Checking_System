// ButtonDefault.tsx

// Imports
import type { ButtonProps } from "@material-tailwind/react";

// Types
type ButtonDefaultProps = {
    props?: ButtonProps;
    onClick?: () => void;
    children?: string;
    className?: string;
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
}: ButtonDefaultProps) {
    return (
        <div className={`flex items-center gap-4`}>
            <button
                {...props}
                onClick={onClick}
                children={children}
                className={className}
            />
        </div>
    );
}
