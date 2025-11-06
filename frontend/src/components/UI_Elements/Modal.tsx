import Button from "./Button.tsx";

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
interface ModalProps {
    bg_color: string,
    window_title: string,
    window_description: string,
    contains_button: boolean,
    button_position: string,
}

/**
 * Modal Component
 * Description: Overlay on top of enclosing element, allowing and/or prompting for user input
 * Usage: <Modal bg_color window_title: window_description, contains_button, button_position/>
 * **/
const Modal = ({ bg_color, window_title, window_description }: ModalProps) => {
    return (
        <>
            <div className={"w-min h-min m-4 justify-self-center"}>
                <div className={`flex flex-col h-64 w-128 bg-${bg_color} border-2 border-white rounded-lg drop-shadow`}>
                    {/* Header Bar - Exit */}
                    <div className={"flex justify-between pr-16 w-full h-10 text-2xl bg-neutral-200 rounded-t-sm border-b-2 border-white"}>
                        <div className="order-1 justify-self-start pl-1 m-1">
                            <span className={"font-semibold text-2xl text-black"}>
                                {window_title}
                            </span>
                        </div>
                        <div className={"order-2 justify-self-end pr-1 m-1 h-8 w-8"}>
                            <Button
                                bg_color={"neutral-200"}
                                button_size={"xs"}
                                border_color={"neutral-100"}
                                alt_text={"exit modal"}
                                text_color={"neutral-100"}
                                text_input={"x"}
                                svg_input={"null"}
                                display_type={"text"}
                                border_type={"full"}
                            />
                        </div>
                    </div>
                    {/* Body */}
                    <div className={"flex w-full h-full"}>
                        <div className={"text-2xl justify-self-start align-top pl-2 pt-1"}>
                            <p>{window_description}</p>
                        </div>
                    </div>
                    {/* Footer - Submit */}
                    <div className={"w-full h-min bg-neutral-600 text-2xl align-bottom"}>
                        <div className={"justify-self-end"}>
                            <Button
                                bg_color={"green-300"}
                                button_size={"xs"}
                                border_color={"neutral-100"}
                                alt_text={"exit modal"}
                                text_color={"neutral-100"}
                                text_input={"Submit →"}
                                svg_input={"null"}
                                display_type={"text"}
                                border_type={"none"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;