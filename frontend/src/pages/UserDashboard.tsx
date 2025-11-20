// UserDashboard.tsx

import { useState } from "react";
import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import DatetimeModal from "../components/UI_Elements/DatetimeModal.tsx";
import ScanButton from "../components/UI_Elements/MimeScanButton.tsx";

// ID data types based on the example stuff he provided
type ScanData = {
    id: string;
    firstName: string;
    lastName: string;
};

// just saves itemId, item name, and the raw string from the whole scan.
type CartItem = {
    itemId: string;
    itemName: string;
    raw: string;
};

/**
 * UserDashboard Page
 * @constructor
 */
export default function UserDashboard({
    theme,
    setTheme,
}: {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}) {
    const [scanned, setScanned] = useState<ScanData | null>(null);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [thankYou, setThankYou] = useState(false);

    function handleScan(scanString: string) {
        const parts = scanString.replace(/^@/, "").split(",");
        const data: ScanData = {
            id: parts[0] ?? "",
            firstName: parts[1] ?? "",
            lastName: parts[2] ?? "",
        };
        setScanned(data);
        setShowCart(true);
    }

    function handleReset() {
        setScanned(null);
        setShowCart(false);
        setCartItems([]);
        setThankYou(false);
    }

    // hopefully this doesn't have to be changed much for actual item scanning. fakeItem just loads a test string
    function handleItemScan() {
        const fakeItem = "T0001,Ultrasound machine,,Fuji/Sonosite ,,,,";

        const parts = fakeItem.split(",");
        const newItem: CartItem = {
            itemId: parts[0],
            itemName: parts[1],
            raw: fakeItem,
        };

        setCartItems((prev) => [...prev, newItem]);
        return newItem;
    }

    //and a second test string for variety/testing
    function handleItemScan2() {
        const fakeItem = "T0007,Wearable Osculatation simulator,,Avkin,,,,";

        const parts = fakeItem.split(",");
        const newItem: CartItem = {
            itemId: parts[0],
            itemName: parts[1],
            raw: fakeItem,
        };

        setCartItems((prev) => [...prev, newItem]);
        return newItem;
    }

    function handleConfirmCheckout(returnTime: string | null) {
        const rawExport = cartItems.map((item) => item.raw); // array of raw strings
        console.log("Checkout summary:");
        console.log("User:", scanned);
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

    return (
        <div
            className={`absolute w-full top-0 left-0 min-h-screen font-mono
        transition-colors duration-300
            ${
                theme === "light"
                    ? "bg-wu-gray-200 text-wu-gray-400"
                    : "bg-wu-gray-400 text-wu-gray-200"
            }`}
        >
            <Navbar theme={theme} setTheme={setTheme} />

            {thankYou ? (
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                    <h1 className="text-5xl">
                        Thank you for checking out your items!
                    </h1>
                    <p className="text-lg mt-4">Resetting User Dashboard...</p>
                </div>
            ) : !showCart ? (
                <div className="relative min-h-[60vh] w-full pt-19 px-6">
                    <div className="flex flex-col pt-20">
                        <div className="basis-12 py-6 text-7xl mt-20">
                            <h2>User Dashboard</h2>
                            <h2 className="basis-12 py-4 text-3xl mt-10">
                                Scan ID To Get Started:
                            </h2>
                        </div>

                        <div className="basis-12 py-6 text-5xl font-sans mt-12">
                            <div className="flex items-center">
                                <div
                                    onClick={() =>
                                        handleScan("@05607858,Lilliam,Kalina")
                                    }
                                >
                                    <ScanButton onScan={handleScan} />
                                </div>
                                <div className="ml-4 text-lg text-white">
                                    Click to simulate an ID scan returning{" "}
                                    <code>@05607858,Lilliam,Kalina</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative min-h-[70vh] w-full pt-6 px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 mt-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    Welcome, {scanned?.firstName ?? "Guest"}
                                </h1>
                                <p className="text-s text-gray-400 mt-1 text-left">
                                    ID: {scanned?.id}
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="bg-gray-200 hover:bg-gray-300 text-white px-4 py-2 rounded"
                            >
                                Not Me? (logout)
                            </button>
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
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cartItems.length === 0 ? (
                                        <tr>
                                            <td
                                                className="px-6 py-4 text-left text-gray-400"
                                                colSpan={3}
                                            >
                                                No Items in Cart, Scan to Add
                                                Items.
                                            </td>
                                        </tr>
                                    ) : (
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                                                    {item.itemId}
                                                </td>
                                                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-3/4">
                                                    {item.itemName}
                                                </td>
                                                <td className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider w-1/4">
                                                    <button
                                                        className="text-red-500 hover:underline"
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
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            <div className="absolute left-0 mt-6">
                                <button
                                    onClick={handleItemScan}
                                    className="text-white"
                                >
                                    Mime Ultrasound Machine
                                </button>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleItemScan2}
                                    className="text-white"
                                >
                                    Mime Osculatation Simulator
                                </button>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="flex justify-end mt-10">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-slate-800 text-white rounded-md px-6 py-3 shadow hover:bg-slate-700"
                                    >
                                        Submit Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <DatetimeModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmCheckout}
                user={scanned}
                items={cartItems}
            />

            <Footer theme={theme} setTheme={setTheme} />
        </div>
    );
}
