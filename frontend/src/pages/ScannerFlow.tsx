import type { ReqItem } from "../../../.d.ts";
import { useSocket } from "../hooks/useSocket.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendPostRequest } from "../API/OutboundNetworkHandler.ts";

export default function ScannerFlow() {
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState<string>("");

    const handleScan = async (req: ReqItem) => {
        // Only react to card scans

        if (req.reqType === "CARD") {
            const userData = await sendPostRequest("/user/scan", {
                rfid: req.itemName,
            });
            console.log(userData);

            if (userData.isAdmin) {
                setIsAdmin(true);
                setUserId(userData.id);
            } else {
                setNavigating(true);
                setTimeout(() => {
                    navigate("/User?id=" + userId);
                }, 3000);
            }
        }
    };

    useSocket(handleScan);

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
