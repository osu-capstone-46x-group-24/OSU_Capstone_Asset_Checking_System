import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import "tailwindcss";

/**
 * Navbar Component
 * Description: Displays a header navigation bar fixed to the top of the screen.
 * **/
const Navbar = () => {
    /**
     * @state {boolean} isOpen - Indicates if menu is open for mobile UI
     * @state {boolean} isLoggedIn - Visual indicator if user is logged in
     * @state {boolean} isDarkMode - Updates elements if darkMode toggle is hit TODO: Handle this properly (through contexts mabye?)
     * **/
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    // Parameter for leftmost navbar text - logo-equivalent
    const title = "CS 46X Capstone";

    // Names and links for navbar items
    const navItems = [
        { title: "Dashboard", link: "#" },
        { title: "Docs", link: "#" },
        { title: "About", link: "#" },
        { title: "Admin", link: "/Admin" },
        { title: "User", link: "/User" },
    ];

    /**
     * ThemeToggle local function
     * On Call: toggles document theme tag from light to dark or dark to light
     * Fallback sets theme to light
     * TODO: Should set theme globally, having issues immediately updating/updating other components
     * **/
    function ToggleTheme(): void {
        // Toggles document theme (Light & Dark)
        const selectedTheme = localStorage.getItem("theme");
        toggleDarkMode();
        if (selectedTheme === "dark") {
            // sets document class theme to light
            document.body.classList.replace("dark", "light");
            localStorage.setItem("theme", "light");
            console.log("Toggled theme to light...");
        } else if (selectedTheme === "light") {
            // sets document class theme to dark
            document.body.classList.replace("light", "dark");
            localStorage.setItem("theme", "dark");
            console.log("Toggled theme to dark...");
        } else {
            // fallback - reset theme to light, clear and repopulate document class theme
            document.body.classList.remove();
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
            console.log("Reset theme to light...");
        }
    }

    /**
     * SetDarkGradientBackground
     * Description: Sets className for navbar background to the correct gradient, depending on if isDarkMode or Not
     * TODO: This is probably implemented really poorly, couldn't figure out the proper way. Should figure out how to do this inline
     * **/
    function SetDarkGradientBackground() {
        if (isDarkMode) {
            return "bg-gradient-to-r bg-gradient-dark p-4 transition duration-300 ease-in-out fixed w-full left-0 top-0 z-50 drop-shadow-2lg";
        } else if (!isDarkMode) {
            return "bg-gradient-to-r bg-gradient-light p-4 transition duration-300 ease-in-out fixed w-full left-0 top-0 z-50 drop-shadow-2lg";
        }
    }

    return (
        <nav className={SetDarkGradientBackground()}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Branding / Logo Equivalent */}
                    <div className="flex items-center">
                        <a
                            href="/Home"
                            className="hover:text-purple-200 transition duration-300 ease-in-out text-lg relative group">
                            <span
                                className="text-neutral-200 font-bold text-3xl tracking-wider hover:text-purple-200 transition-all duration-300">
                                {title}
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_self"
                                className="text-neutral-200 hover:text-purple-200 transition duration-300 ease-in-out text-lg relative group"
                            >
                                {item.title}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-inverse-background/10 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        {/* Login & Logout */}
                        <button
                            onClick={() => setIsLoggedIn(!isLoggedIn)}
                            className="text-neutral-200 flex items-center space-x-2 bg-inverse-background/10 backdrop-blur-md px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out border border-white/10"
                        >
                            <FaUserCircle className="h-5 w-5"/>
                            <span>{isLoggedIn ? "Sign Out" : "Login"}</span>
                        </button>
                        {/* Theme Switcher*/}
                        <button
                            onClick={() => ToggleTheme()}
                            className="text-neutral-200 flex items-center space-x-2 inverse-background/25 backdrop-blur-md px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out border border-white/20"
                        >
                            {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-color-primary focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6"/>
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden backdrop-blur-lg bg-purple-600/90 rounded-lg mt-4 shadow-xl">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    className="text-neutral-200 block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300 ease-in-out"
                                >
                                    {item.title}
                                </a>
                            ))}
                            <button
                                onClick={() => setIsLoggedIn(!isLoggedIn)}
                                className="text-neutral-200 w-full flex items-center justify-center space-x-2 bg-white/10 px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out mt-4 border border-white/20"
                            >
                                <FaUserCircle className="h-5 w-5" />
                                <span>{isLoggedIn ? "Sign Out" : "Login"}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;