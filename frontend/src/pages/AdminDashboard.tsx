// AdminDashboard.tsx

// Imports
import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import LogRequestConsole from "../components/LogRequestConsole";
import NetworkManager from "../API/NetworkManager.tsx";
import { useState } from "react";

// Type
type AdminDashboardProps = {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
};

type NetworkLogItem = {
    reqType: string;
    sender: string;
    destination: string;
    itemName: string;
    timestamp: string;
    httpType: string;
    endpoint: string;
};

/**
 * AdminDashboard
 * Type: Page
 * Params: theme: "light" | "dark", setTheme: (t: "light" | "dark") => void
 */
export default function AdminDashboard({
    theme,
    setTheme,
}: AdminDashboardProps) {
    // networkLogs State
    const [networkLogs, setNetworkLogs] = useState<NetworkLogItem[]>([]);
    const addNetworkLog = (newLog: NetworkLogItem) => {
        setNetworkLogs((prev) => [...prev, newLog]);
    };

    // Theme
    const pageTheme =
        theme === "light"
            ? "bg-wu-gray-200 text-wu-gray-400"
            : "bg-wu-gray-400 text-wu-gray-200";

    const consoleParams =
        theme === "light"
            ? {
                  color_primary_text: "wu-gray-200",
                  color_primary_bg: "wu-gray-400",
                  color_accent_text: "wu-gray-400",
                  color_accent_bg: "wu-gray-200",
              }
            : {
                  color_primary_text: "wu-gray-200",
                  color_primary_bg: "wu-gray-500",
                  color_accent_text: "wu-gray-500",
                  color_accent_bg: "wu-gray-200",
              };

    return (
        <div
            className={`absolute w-full top-0 left-0 font-mono duration-300 transition-colors
            ${pageTheme}`}
        >
            <Navbar theme={theme} setTheme={setTheme} />

            {/* Body */}
            <div className="flex-grow">
                <div className="justify-items-start w-full pb-1 pt-10 text-5xl">
                    <span className="">Admin Dashboard</span>
                </div>
                <div className="flex flex-row">
                    <div className="min-h-[600px] min-w-[1000px] w-7/10 p-10 flex flex-col">
                        <div className="flex p-0.5 text-xl">
                            <span>Request Console</span>
                        </div>
                        <div className={`p-1`}>
                            <LogRequestConsole
                                {...consoleParams}
                                networkLogItems={networkLogs}
                            />
                        </div>
                    </div>
                    <div className="min-h-[150px] min-w-[100px] p-10 flex flex-col">
                        <div className="flex p-0.5 text-xl">
                            <span>Send API Request</span>
                        </div>
                        <div className={`p-1`}>
                            <NetworkManager
                                {...consoleParams}
                                onRequest={addNetworkLog}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
}
