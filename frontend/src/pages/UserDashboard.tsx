// UserDashboard.tsx

// Imports
import { useState } from "react";
import "../App.css";
import DatetimeModal from "../components/UI_Elements/DatetimeModal.tsx";
import ButtonDefault from "../components/UI_Elements/ButtonDefault.tsx";
import type { ReqItem } from "../../../.d.ts";
import { useSocket } from "../hooks/UseSocket.tsx";
import { useSearchParams, useNavigate } from "react-router-dom";

// Types

// just saves itemId, item name, and the raw string from the whole scan.
type CartItem = {
    itemId: string;
    itemName: string;
};

/**
 * UserDashboard Page
 * @constructor
 */
export default function UserDashboard() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [thankYou, setThankYou] = useState(false);

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();

    const handleScan = (req: ReqItem) => {
        // Only react to item scans

        if (req.reqType === "ITEM") {
            console.log("User " + id + " scanned item:", req);

            if (cartItems.some((item) => item.itemId === req.itemName)) {
                console.log("Item already in cart, ignoring scan.");
                return;
            }

            // get item data from database, for now:
            const item = {
                itemId: req.itemName,
                itemName: "Example Item Name for " + req.itemName,
            };

            setCartItems((prev) => [...prev, item]);
        }
    };

    useSocket(handleScan);

    function handleReset(): void {
        setCartItems([]);
        setThankYou(false);
        navigate("/Flow");
    }

    function handleConfirmCheckout(returnTime: string | null): void {
        const rawExport = cartItems.map((item) => item.itemId); // array of raw strings
        console.log("Checkout summary:");
        console.log("Items raw:", rawExport);
        console.log("Return time:", returnTime ?? "Not specified");

        // reset
        setShowModal(false); // close modal
        setThankYou(true); // show thank-you screen

        setTimeout(() => {
            // after 8 seconds, fully reset to dashboard. if it feels like too long you can shorten it idk
            handleReset();
        }, 8000);
    }

    const buttonTheme = "bg-bg text-text";

    const modalTheme = "bg-text text-bg";

    return (
        <div className="flex grow w-full">
            {thankYou ? (
                <div className="flex flex-col items-center justify-center mx-auto min-h-[70vh] text-center">
                    <h1 className="text-5xl">
                        Thank you for checking out your items!
                    </h1>
                    <p className="text-lg mt-4">Resetting User Dashboard...</p>
                </div>
            ) : (
                /* Modal */
                <div className="min-h-[70vh] w-full py-20 mt-12 px-6">
                    <div
                        className={`max-w-4xl mx-auto rounded shadow p-6 ${modalTheme}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    Welcome!
                                </h1>
                                <p className="text-sm text-gray-400 mt-1 text-left max-w-md">
                                    Begin by scanning your items. When finished,
                                    click "Submit Checkout" to confirm your
                                    checkout and return time.
                                </p>
                            </div>
                            <ButtonDefault
                                onClick={handleReset}
                                children={"Cancel"}
                                className={`px-4 py-2 rounded cursor-pointer hover:bg-bg/90 ${buttonTheme}`}
                            />
                        </div>

                        <div className="mt-6 relative">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                                            Item ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-3/4">
                                            Item
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider w-1/4">
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-wu-gray-400">
                                    {cartItems.length === 0 ? (
                                        <tr>
                                            <td
                                                className="px-6 py-4 text-left text-wu-gray-400"
                                                colSpan={3}
                                            >
                                                No Items in Cart, Scan to Add
                                                Items.
                                            </td>
                                        </tr>
                                    ) : (
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/4">
                                                    {item.itemId}
                                                </td>
                                                <td className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider w-3/4">
                                                    {item.itemName}
                                                </td>
                                                <td className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider w-1/4">
                                                    <ButtonDefault
                                                        onClick={() =>
                                                            setCartItems(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                            )
                                                        }
                                                        children={"X"}
                                                        className={`text-red-500 hover:underline cursor-pointer text-lg p-2 w-full`}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            <div className="flex justify-end mt-10">
                                <ButtonDefault
                                    disabled={cartItems.length === 0}
                                    onClick={() => setShowModal(true)}
                                    children={"Submit Checkout"}
                                    className={`rounded-md px-6 py-3 cursor-pointer hover:bg-bg/90 shadow  ${buttonTheme} ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <DatetimeModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmCheckout}
                items={cartItems}
            />
        </div>
    );
}
