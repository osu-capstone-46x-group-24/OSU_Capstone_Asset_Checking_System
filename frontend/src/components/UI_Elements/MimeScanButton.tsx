// ScanButton.tsx
import ButtonDefault from "./ButtonDefault.tsx";

interface ScanButtonProps {
    onScan: (scanString: string) => void;
}

/**
 * Description: Custom wrapper around Button that simulates an ID scan
 */
const ScanButton = ({ onScan }: ScanButtonProps) => {
    void onScan;
    return <ButtonDefault children={"MIME ID SCAN"} />;
};

export default ScanButton;
