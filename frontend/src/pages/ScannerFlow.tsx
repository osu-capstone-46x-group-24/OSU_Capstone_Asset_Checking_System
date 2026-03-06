import type { ReqItem } from "../../../.d.ts";
import { useSocket } from "../hooks/UseSocket.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ScannerFlow() {
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(false);
    const [isAdmin] = useState(false);

    const handleScan = (req: ReqItem) => {
        // Only react to card scans

        if (req.reqType === "CARD") {
            // for now assume no user is an admin, later check db table
            if (isAdmin) {
                console.log("Admin scanned card:", req);
            } else {
                console.log("User scanned card:", req);
                setNavigating(true);
                setTimeout(() => {
                    navigate("/User?id=" + req.itemName);
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
