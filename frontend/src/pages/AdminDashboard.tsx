import "../App.css";
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";

function AdminDashboard({
    theme,
    setTheme,
}: {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}) {
    return (
        <div
            className={`absolute w-full top-0 left-0 font-mono duration-300 transition-colors
        ${
            theme === "light"
                ? "bg-wu-gray-200 text-wu-gray-400"
                : "bg-wu-gray-400 text-wu-gray-200"
        }`}
        >
            <Navbar theme={theme} setTheme={setTheme} />

            {/* Body */}
            <div className="relative min-h-180 w-full pt-19">
                <div className="flex flex-col pt-20">
                    <div className="basis-12 py-6 text-7xl font-size-body mt-20">
                        <a href="#">Admin Dashboard</a>
                    </div>
                </div>
            </div>

            <Footer theme={theme} />
        </div>
    );
}

export default AdminDashboard;
