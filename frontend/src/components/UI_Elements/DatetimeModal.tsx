// DatetimeModal.tsx

// Imports
import { useState, useEffect } from "react";
import {
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import ButtonDefault from "./ButtonDefault";
import "react-datepicker/dist/react-datepicker.css";
import HelpHover from "./HelpHover";
// Types
type ModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: (returnTime: string | null) => void;
    user?: { id: string; firstName: string; lastName: string } | null;
    items?: { itemId: string; itemName: string }[];
};

/**
 * Name: DatetimeModal
 * Type: Component
 * Description: TBD
 */
export default function DatetimeModal({
    open,
    onClose,
    onConfirm,
    user,
    items,
}: ModalProps) {
    const [datetime, setDatetime] = useState<string>("");
    const [unsure, setUnsure] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setDatetime("");
            setUnsure(false);
        }
    }, [open]);

    function handleConfirm() {
        const isValid = unsure || datetime !== "";
        if (!isValid) {
            setError("Missing fields");
            return;
        }
        setError(null);
        const result = unsure ? null : datetime;
        onConfirm(result);
        onClose();
    }

    return (
        <>
            {open && (
                <div className="fixed inset-x-0 top-0 flex justify-center z-50 pointer-events-none text-left">
                    {/* CENTERED IN SPRINT 9 LMAO soz */}
                    <div className="pointer-events-auto bg-white rounded-lg drop-shadow-2x1 w-full max-w-md p-6 text-gray-800">
                        <DialogHeader className="font-bold">Confirm Checkout</DialogHeader>

                        <DialogBody>
                            <div className="flex flex-col gap-4">
                                {user && (
                                    <p className="text-sm text-gray-700">
                                        Checking out as <strong>{user.firstName} {user.lastName}</strong> (ID: {user.id})
                                    </p>
                                )}

                                {items && items.length > 0 && (
                                    <div>
                                        <strong className="text-sm text-gray-900 mb-1 ">Items:</strong>
                                        <ul className="list-disc ml-5 text-sm text-gray-700">
                                            {items.map((it) => (
                                                <li key={it.itemId}>{it.itemName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <label className="text-sm text-gray-700 font-bold">Expected Return Time:</label>

                                <DatePicker
                                    selected={datetime ? new Date(datetime) : null}
                                    onChange={(date: Date | null) => setDatetime(date ? date.toISOString() : "")}
                                    showTimeSelect
                                    timeIntervals={15}
                                    dateFormat="Pp"
                                    className={`w-full p-2 border rounded ${unsure ? "bg-gray-200 cursor-not-allowed text-gray-500" : "text-gray-800"}`}
                                    disabled={unsure}
                                    placeholderText="Select date & time"
                                />

                                <div className="flex items-center gap-2 mt-2">
                                    <input type="checkbox" id="unsure" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} className="w-4 h-4" />
                                    <label htmlFor="unsure" className="text-gray-700 select-none">Not sure when I'll return these items</label>
                                </div>
                            </div>
                        </DialogBody>

                        {error && (
                            <div className="text-red-500 text-sm mb-2">{error}</div>
                        )}
                        <DialogFooter className="flex justify-end gap-2 pt-4 text-white">
                            <ButtonDefault onClick={onClose}>Cancel</ButtonDefault>
                            <div className="flex items-center gap-2">
                                <ButtonDefault
                                    onClick={handleConfirm}
                                    props={{ disabled: !(unsure || datetime !== "") }}
                                    className={`${!(unsure || datetime !== "") ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    Confirm & Checkout
                                </ButtonDefault>
                                <HelpHover text="If unclickable, there's still missing fields present" />
                            </div>
                        </DialogFooter>
                    </div>
                </div>
            )}
        </>
    );

}
