// UserDashboard.tsx

// Imports
import { useState } from "react";
import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import DatetimeModal from "../components/UI_Elements/DatetimeModal.tsx";
import ButtonDefault from "../components/UI_Elements/ButtonDefault.tsx";
import type { ReqItem } from "../../../.d.ts";
import Loader from "../components/UI_Elements/Loader.tsx";

// Types
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

type UserDashboardProps = {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
    reqQueue?: ReqItem;
    setReqQueue?: (r: ReqItem) => void;
};

/**
 * UserDashboard Page
 * @constructor
 */
export default function UserDashboard({ theme, setTheme }: UserDashboardProps) {
    const [scanned, setScanned] = useState<ScanData | null>(null);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [thankYou, setThankYou] = useState(false);
    const [showReturnPage, setShowReturnPage] = useState(false);

    function handleIdScan(scanString: string): void {
        const parts = scanString.replace(/^@/, "").split(",");
        const data: ScanData = {
            id: parts[0] ?? "",
            firstName: parts[1] ?? "",
            lastName: parts[2] ?? "",
        };
        setScanned(data);
        setShowCart(true);
    }

    function handleReset(): void {
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
        //opens return page on scan if checkout cart isn't already open
        if (!showCart) setShowReturnPage(true);

        //PREVENTS DUPLICATE SCANS NO IDEA HOW WILL WORK FOR ACTUAL HARDWARE SCANS SO LOOOOOK HERE PLEASEEE
        if (cartItems.some((item) => item.itemId === newItem.itemId)) {
            alert(`Scanned same item twice! This item is already in your cart: \n \n ${newItem.itemId} ${newItem.itemName}`);
            return;
        }
        setCartItems((prev) => [...prev, newItem]);
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
        if (!showCart) setShowReturnPage(true);
        //PREVENTS DUPLICATE SCANS NO IDEA HOW WILL WORK FOR ACTUAL HARDWARE SCANS SO LOOOOOK HERE PLEASEEE
        if (cartItems.some((item) => item.itemId === newItem.itemId)) {
            alert(`Scanned same item twice! This item is already in your cart: \n \n ${newItem.itemId} ${newItem.itemName}`);
            return;
        }
        setCartItems((prev) => [...prev, newItem]);
    }

    function handleConfirmCheckout(returnTime: string | null): void {
        const rawExport = cartItems.map((item) => item.raw); // array of raw strings
        console.log("Checkout summary:");
        console.log("User:", scanned);
        console.log("Items raw:", rawExport);
        console.log("Return time:", returnTime ?? "Not specified");

        // reset
        setShowModal(false); // close modal
        setThankYou(true); // show thank-you screen

        setTimeout(() => {
            // after 5 seconds, fully reset to dashboard. if it feels like too long you can shorten it idk
            handleReset();
        }, 5000);
    }

    const buttonTheme =
        theme === "light"
            ? "bg-wu-gray-400 text-wu-gray-200"
            : "bg-wu-gray-400 text-wu-gray-200";

    const modalTheme =
        theme === "light"
            ? "bg-wu-gray-400 text-wu-gray-200"
            : "bg-wu-gray-200 text-wu-gray-400";

    return (
        <div
            className={`absolute w-full top-0 left-0 min-h-screen font-mono
        transition-colors duration-300
            ${theme === "light"
                    ? "bg-wu-gray-200 text-wu-gray-400"
                    : "bg-wu-gray-400 text-wu-gray-200"
                }`}
        >
            <Navbar theme={theme} setTheme={setTheme} />

            {thankYou ? (
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                    <h1 className="text-5xl">
                        Thank you for tracking your items!
                    </h1>

                    <p className="text-lg mt-4">Resetting User Dashboard...</p>
                    <div className="mt-20">
                        <Loader />
                    </div>

                </div>
            ) : showReturnPage ? (
                <div className="relative min-h-[70vh] w-full pt-6 px-6">
                    <div className={`max-w-4xl mx-auto rounded shadow p-6 mt-8 ${modalTheme}`}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-semibold text-left">Return Page</h1>
                                {cartItems.length == 1 && (
                                    <p className="text-lg mt-1">
                                        Ready to return: <strong>{cartItems[0].itemName}</strong> (ID: {cartItems[0].itemId})
                                    </p>
                                )}
                                {cartItems.length > 1 && (
                                    <p className="text-lg mt-1">
                                        Ready to return items in cart
                                    </p>
                                )}
                            </div>
                            <ButtonDefault
                                onClick={() => {
                                    setShowReturnPage(false);
                                    handleReset();
                                }}
                                children="Back to Dashboard"
                                className={buttonTheme}
                            />
                        </div>

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
                                        <td colSpan={3} className="px-6 py-4 text-left text-wu-gray-400">
                                            No Items scanned. Scan to add items.
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
                                                <ButtonDefault
                                                    onClick={() =>
                                                        setCartItems((prev) => prev.filter((_, i) => i !== index))
                                                    }
                                                    children={"X"}
                                                    className={`text-red-500 hover:underline ${buttonTheme}`}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="flex flex-col mt-6 gap-4">
                            <div>
                                <ButtonDefault
                                    onClick={handleItemScan}
                                    children={"Mime Ultrasound Machine"}
                                    className={buttonTheme}
                                />
                            </div>
                            <div>
                                <ButtonDefault
                                    onClick={handleItemScan2}
                                    children={"Mime Osculatation Simulator"}
                                    className={buttonTheme}
                                />
                            </div>
                        </div>

                        {cartItems.length > 0 && (
                            <div className="flex justify-end mt-10">
                                <ButtonDefault
                                    onClick={() => {
                                        const now = new Date();
                                        console.log("Return summary:");
                                        console.log("User:", scanned);
                                        console.log("Items:", cartItems.map((item) => item.raw));
                                        console.log("Return time:", now.toISOString());

                                        // resets dashboard after return
                                        setCartItems([]);
                                        setShowReturnPage(false);
                                        setThankYou(true);

                                        setTimeout(() => handleReset(), 5000);
                                    }}
                                    children={"Submit Return"}
                                    className={`rounded-md px-6 py-3 shadow hover:bg-slate-700 ${buttonTheme}`}
                                />
                            </div>
                        )}
                    </div>
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

                        <div className="basis-12 py-6 text-5xl mt-12 flex flex-col gap-6">
                            {/* ID/checkout mime*/}
                            <div className="flex items-center gap-4">
                                <ButtonDefault
                                    onClick={() => handleIdScan("@05607858,Lilliam,Kalina")}
                                    children={"MIME ID SCAN"}
                                    className={buttonTheme}
                                />
                                <div className="text-lg">
                                    Click to simulate an <strong>ID</strong> scan returning{" "}
                                    <code>@05607858,Lilliam,Kalina</code>{" "}
                                    <strong>(enters checkout page)</strong>
                                </div>
                            </div>

                            {/* item/return mime*/}
                            <div className="flex items-center gap-4">
                                <ButtonDefault
                                    onClick={() => handleItemScan()}
                                    children={"MIME ITEM SCAN"}
                                    className={buttonTheme}
                                />
                                <div className="text-lg">
                                    Click to simulate an <strong>Item</strong> scan returning{" "}
                                    <code>T0001,Ultrasound machine,,Fuji/Sonosite ,,,</code>{" "}
                                    <strong>(enters return page)</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Modal */
                <div className="relative min-h-[70vh] w-full pt-6 px-6">
                    <div
                        className={`max-w-4xl mx-auto rounded shadow p-6 mt-8 ${modalTheme}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold">
                                    Welcome, {scanned?.firstName ?? "Guest"}
                                </h1>
                                <p className="text-s text-gray-400 mt-1 text-left">
                                    ID: {scanned?.id}
                                </p>
                            </div>
                            <ButtonDefault
                                onClick={handleReset}
                                children={"Not Me? (logout)"}
                                className={`px-4 py-2 rounded ${buttonTheme}`}
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
                                                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                                                    {item.itemId}
                                                </td>
                                                <td className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-3/4">
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
                                                        className={`text-red-500 hover:underline ${buttonTheme}`}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className="flex flex-col">
                                <div className="left-0 mt-6">
                                    <ButtonDefault
                                        onClick={handleItemScan}
                                        children={"Mime Ultrasound Machine"}
                                        className={`${buttonTheme}`}
                                    />
                                </div>

                                <div className="mt-6">
                                    <ButtonDefault
                                        onClick={handleItemScan2}
                                        children={"Mime Osculatation Simulator"}
                                        className={`${buttonTheme}`}
                                    />
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="flex justify-end mt-10">
                                    <ButtonDefault
                                        onClick={() => setShowModal(true)}
                                        children={"Submit Checkout"}
                                        className={`rounded-md px-6 py-3 shadow hover:bg-slate-700 ${buttonTheme}`}
                                    />
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
            <Footer theme={theme} />
        </div>
    );
}
