import type { ReqItem } from "../../../.d.ts";
import { useSocket } from "../hooks/useSocket.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    sendGetRequest,
    sendPostRequest,
} from "../API/OutboundNetworkHandler.ts";

export default function ScannerFlow() {
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState<string>("");
    const [itemChecked, setItemChecked] = useState<boolean>(false);

    const handleScan = async (req: ReqItem) => {
        // Only react to card scans

        if (req.reqType === "CARD") {
            const userData = await sendPostRequest("/user/scan", {
                rfid: req.itemName,
            });
            console.log(userData);
            const scannedUserId = String(userData.id);

            if (userData.isAdmin) {
                setIsAdmin(true);
                setUserId(scannedUserId);
            } else {
                setNavigating(true);
                setTimeout(() => {
                    navigate("/User?id=" + scannedUserId);
                }, 3000);
            }
        } else if (req.reqType === "ITEM") {
            try {
                console.log("ATTEMPT CHECK IN: ", req.itemName);
                // Get Database of items
                // eg
                // [{"id":1,"name":"TEST","rfid":"001"},
                // {"id":2,"name":"TEST2","rfid":"002"},
                // {"id":3,"name":"TEST ELEMENT 3","rfid":"HALLO"},
                // {"id":4,"name":"Test element 4","rfid":"909992392939"},
                // {"id":5,"name":"","rfid":""},
                // {"id":6,"name":"TestElement","rfid":"20302323"},
                // {"id":7,"name":"sdds","rfid":"dsds"},
                // {"id":8,"name":"Admin Item","rfid":"0021"},
                // {"id":10,"name":"EKG","rfid":"00:80:61:3e:89:36:75:04"}]
                const databaseItemList = await sendGetRequest("/items/all");
                console.log("DATABASE ITEM LIST:\n", databaseItemList);
                // Get item entry: example [{"id":2,"name":"TEST2","rfid":"002"}]
                const itemEntry = databaseItemList.find(
                    (item: any) => item.rfid === req.itemName
                );
                console.log(itemEntry);
                // Pass id, name, and rfid to itemCheckinFlow()
                await sendPostRequest("/checkin", {
                    itemId: itemEntry.id,
                });
                itemCheckinFlow(itemEntry);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useSocket(handleScan);

    function itemCheckinFlow(itemEntry: any) {
        setItemChecked(true);
        if (itemChecked) {
            return (
                <div
                    className={`w-full min-h-screen bg-bg text-text flex items-center justify-center`}
                >
                    <h1 className={`text-3xl font-bold mb-20`}>
                        Item Scanned!
                    </h1>
                    <h2 className={`text-xl font-bold mt-20`}>
                        Checked in: {itemEntry.name} {`\n`}
                        Item ID: {itemEntry.id} {`\n`}
                        RFID: {itemEntry.rfid}
                    </h2>
                </div>
            );
        }
        setTimeout(() => {
            setItemChecked(false);
        }, 3000);
    }

    if (navigating) {
        return (
            <div
                className={`w-full min-h-screen 
            bg-bg text-text flex items-center justify-center`}
            >
                <h1 className="text-3xl font-bold mb-40">
                    Card scanned! Navigating to {isAdmin ? "Admin" : "User"}{" "}
                    dashboard...
                </h1>
            </div>
        );
    }

    if (isAdmin) {
        return (
            <div
                className={`w-full min-h-screen 
        transition-colors duration-300
            bg-bg text-text flex items-center justify-center`}
            >
                <main className="grow p-4 mb-40 text-center">
                    <div>
                        <h1 className="text-3xl font-bold ">Welcome Admin!</h1>
                        <p>Choose an option below:</p>
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <button
                            className="px-6 py-3 bg-text text-bg rounded-2xl hover:bg-secondary-dark transition-colors duration-300"
                            onClick={() => navigate("/User?id=" + userId)}
                        >
                            Checkout
                        </button>
                        <button
                            className="px-6 py-3 bg-text text-bg rounded-2xl hover:bg-primary-dark transition-colors duration-300"
                            onClick={() => navigate("/Admin")}
                        >
                            Admin Dashboard
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div
            className={`w-full min-h-screen 
        transition-colors duration-300
            bg-bg text-text flex items-center justify-center`}
        >
            <main className="grow p-4 mb-40 text-center">
                <h1 className="text-3xl font-bold ">
                    Welcome to the Asset Checking System!
                </h1>
                <p>Scan your ID card to begin</p>
            </main>
        </div>
    );
}
