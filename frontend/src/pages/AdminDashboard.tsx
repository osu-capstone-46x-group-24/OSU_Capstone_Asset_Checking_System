// AdminDashboard.tsx

// Imports
import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import LogRequestConsole from "../components/LogRequestConsole";

// Type
type FilterProperty = {
    name: string,
    boolValue?: boolean,
    strValue?: string,
}

// Const
const filterList = {

}

/**
 * AdminDashboard
 * Type: Page
 * Params: theme: "light" | "dark", setTheme: (t: "light" | "dark") => void
 */
export default function AdminDashboard({
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

    const consoleParams =
        theme === "light"
            ? {color_primary_text: "wu-gray-200", color_primary_bg: "wu-gray-400", color_accent_text: "wu-gray-400", color_accent_bg: "wu-gray-200"}
            : {color_primary_text: "wu-gray-200", color_primary_bg: "wu-gray-500", color_accent_text: "wu-gray-500", color_accent_bg: "wu-gray-200"};

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
                <div className={`w-[100px] h-[600px] flex flex-col ${pageTheme}`}>

                </div>
                <div className="min-h-[600px] min-w-[1000px] w-full p-10 flex flex-col">
                    <div className="flex p-0.5 text-xl">
                        <span>Request Console</span>
                    </div>
                    <div className={`p-1`}>
                            <LogRequestConsole
                                {...consoleParams}
                            />
                    </div>
                </div>
            </div>
            <Footer theme={theme} />
        </div>
    );
};