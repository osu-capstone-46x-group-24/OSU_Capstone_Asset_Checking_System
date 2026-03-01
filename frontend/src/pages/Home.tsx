// Home.tsx

// Imports
import "../App.css";
import Navbar from "../components/UI_Elements/Navbar";
import Footer from "../components/UI_Elements/Footer.tsx";

// Types
type HomeProps = {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
};

/**
 * Name: Home
 * Type: Page
 * Description: Home page - '/' base directory
 */
export default function Home({ theme, setTheme }: HomeProps) {
    return (
        <div className="flex grow mx-auto p-20 pb-40">
            {/* Body */}
            <div className="text-center">
                <div className="flex flex-col">
                    <div className="basis-12 py-6 text-7xl font-size-body mt-20">
                        <a
                            href="https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=6RBYZj9tMGMllxTk"
                            className={`transition-colors duration-300 ${
                                theme === "light"
                                    ? "hover:text-wu-red-100"
                                    : "hover:text-wu-yellow-100"
                            }`}
                        >
                            CS Capstone
                        </a>
                    </div>
                    <div className="basis-12 py-4 text-3xl mt-10">
                        <p>OSU CS 46X Capstone Project '25-'26</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
