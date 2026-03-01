import { Outlet } from "react-router-dom";
import Navbar from "../components/UI_Elements/Navbar";
import Footer from "../components/UI_Elements/Footer";

interface NavLayoutProps {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}

export default function NavLayout({ theme, setTheme }: NavLayoutProps) {
    return (
        <div className="w-full transition-colors font-mono duration-300 bg-bg text-text flex flex-col min-h-screen">
            <Navbar theme={theme} setTheme={setTheme} />
            <Outlet />
            <Footer theme={theme} />
        </div>
    );
}
