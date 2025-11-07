import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

/**
 * Function GetModalSpecs
 */
// function GetModalSpecs({ }) {
//     if
// }

/**
 * ModalProps
 * Description: Props for Modal component
 * **/
// interface ModalProps {
//     bg_color: string,
//     window_title: string,
//     window_description: string,
//     contains_button: boolean,
//     button_position: string,
// }

/**
 * Modal Component
 * Description: Overlay on top of enclosing element, allowing and/or prompting for user input
 * Usage: <Modal bg_color window_title: window_description, contains_button, button_position/>
 * **/
const Modal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            {/* Open Modal Button */}
            <Button
                className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                onClick={handleOpen}>
                    Open Modal
            </Button>
            <Dialog open={open} handler={handleOpen} placeholder={undefined} onResize={undefined}
                    onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {/* Header Bar - Exit */}
                    <DialogHeader placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                                  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Window Title
                    </DialogHeader>
                    {/* Body */}
                    <DialogBody placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Window Body
                    </DialogBody>
                    {/* Footer - Submit */}
                    <DialogFooter placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                                  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <Button
                            className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                            placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            onClick={handleOpen}>
                            Confirm
                        </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Modal;