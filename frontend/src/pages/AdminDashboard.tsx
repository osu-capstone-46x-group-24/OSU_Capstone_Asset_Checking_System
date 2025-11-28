// AdminDashboard.tsx

import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import LogRFIDRequests from "../components/LogRFIDRequests";


/**
 * AdminDashboard
 * @type page
 * @param theme
 * @param setTheme
 * @constructor
 */
function AdminDashboard({
    theme,
    setTheme,
}: {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}) {

    const pageTheme =
        theme === "light"
            ? "bg-wu-gray-200 text-wu-gray-400"
            : "bg-wu-gray-400 text-wu-gray-200"

    const consoleTheme =
        theme === "light"
            ? "bg-wu-gray-400 text-wu-gray-200"
            : "bg-wu-gray-500 text-wu-gray-200";

    return (
        <div
            className={`absolute w-full top-0 left-0 font-mono duration-300 transition-colors
            ${pageTheme}`}
        >
            <Navbar theme={theme} setTheme={setTheme} />

            {/* Body */}
            <div className="justify-items-start w-full pb-1 pt-10 text-5xl">
                <span className="">Admin Dashboard</span>
            </div>
            <div className="min-h-180 max-w-8/10 w-full p-10 flex flex-col">
                <div className="flex p-0.5 text-xl">
                    <span>RFID Request Console</span>
                </div>
                <div className={`h-140 items-top p-1 w-full rounded-sm shadow-lg self-start justify-self-stretch ${consoleTheme}`}>
                        <LogRFIDRequests />
                </div>
            </div>

            <Footer theme={theme} />
        </div>
    );
}

export default AdminDashboard;
