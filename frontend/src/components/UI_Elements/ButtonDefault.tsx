// ButtonDefault.tsx

import { Button } from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";

export default function ButtonDefault(props: ButtonProps) {
    return (
        <div className="flex items-center gap-4">
            <Button {...props} />
        </div>
    );
}
