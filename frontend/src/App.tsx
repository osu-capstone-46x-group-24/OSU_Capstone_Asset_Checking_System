// App.tsx

import { useEffect, useState } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
// import { lightTheme, darkTheme } from "./theme.ts";
import type { ReqItem } from "../../.d.ts";

/**
 * Name: App
 */
export default function App() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [reqQueue, setReqQueue] = useState<ReqItem[]>([]);

    // Load theme from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") {
            setTheme(saved);
        }
    }, []);

    // Apply theme "dark" to html, save theme
    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route
                        path="/Home"
                        element={<Home theme={theme} setTheme={setTheme} />}
                    />
                    <Route
                        path="/Admin"
                        element={
                            <AdminDashboard
                                theme={theme}
                                setTheme={setTheme}
                                reqQueue={reqQueue}
                                setReqQueue={setReqQueue}
                            />
                        }
                    />
                    <Route
                        path="/User"
                        element={
                            <UserDashboard
                                theme={theme}
                                setTheme={setTheme}
                                reqQueue={reqQueue}
                                setReqQueue={setReqQueue}
                            />
                        }
                    />
                </Routes>
            </Router>
            <script src="../node_modules/@material-tailwind/html@latest/scripts/ripple.js"></script>
            <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
        </ThemeProvider>
    );
}
