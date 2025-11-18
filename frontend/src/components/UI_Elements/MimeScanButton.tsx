// ScanButton.tsx
import Button from "./Button";

interface ScanButtonProps {
    onScan: (scanString: string) => void;
}

/**
 * Description: Custom wrapper around Button that simulates an ID scan
 */
const ScanButton = ({ onScan }: ScanButtonProps) => {
    return (
        <Button
            bg_color=""
            text_color="white"
            display_type="text"
            text_input="MIME ID SCAN"
            svg_input=""
            alt_text="Simulated scan"
            button_size="sm"
            border_type="rounded"
            border_color=""
        />
    );
};

export default ScanButton;
