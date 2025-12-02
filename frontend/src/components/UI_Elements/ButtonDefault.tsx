// ButtonDefault.tsx

import type { ButtonProps } from "@material-tailwind/react";

/**
 * ButtonDefault Component
 * @param props
 * @constructor
 */
export default function ButtonDefault({
    props,
    onClick,
    children,
    className,
}: {
    props?: ButtonProps;
    onClick?: () => void;
    children?: string;
    className?: string;
}) {
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
