// DatetimeModal.tsx
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Checkbox,
    Input,
} from "@material-tailwind/react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: (returnTime: string | null) => void;
    user?: { id: string; firstName: string; lastName: string } | null;
    items?: { itemId: string; itemName: string }[];
};

const DatetimeModal = ({
    open,
    onClose,
    onConfirm,
    user,
    items,
}: ModalProps) => {
    const [datetime, setDatetime] = useState<string>("");
    const [unsure, setUnsure] = useState(false);

    useEffect(() => {
        if (!open) {
            setDatetime("");
            setUnsure(false);
        }
    }, [open]);

    function handleConfirm() {
        const result = unsure ? null : datetime;
        onConfirm(result);
        onClose();
    }

    return (
        <Dialog open={open} handler={onClose} placeholder={undefined} onResize={undefined}
                onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="text-gray-800">
                <DialogHeader placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Confirm Checkout</DialogHeader>
            </div>
            <DialogBody placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex flex-col gap-4">
                    {user && (
                        <p className="text-gray-700 text-sm">
                            Checking out as{" "}
                            <strong>
                                {user.firstName} {user.lastName}
                            </strong>{" "}
                            (ID: {user.id})
                        </p>
                    )}
                    {items && items.length > 0 && (
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Items:</p>
                            <ul className="list-disc ml-5 text-sm text-gray-700">
                                {items.map((it) => (
                                    <li key={it.itemId}>{it.itemName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <label className="text-sm text-gray-700 mt-2">
                        Expected Return Time:
                    </label>
                    <Input
                        type="datetime-local"
                        value={datetime}
                        onChange={(e) => setDatetime(e.target.value)}
                        disabled={unsure}
                        className="border rounded p-2 text-gray-800" onResize={undefined} onResizeCapture={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                    />
                    <Checkbox
                        label="Not sure when I'll return these items"
                        checked={unsure}
                        onChange={(e) => setUnsure(e.target.checked)} onResize={undefined} onResizeCapture={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                    />
                </div>
            </DialogBody>
            <DialogFooter placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Button color="gray" onClick={onClose} className="mr-2" placeholder={undefined}
                        onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
                    Cancel
                </Button>
                <Button color="blue" onClick={handleConfirm} placeholder={undefined}
                        onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
                    Confirm & Checkout
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DatetimeModal;
