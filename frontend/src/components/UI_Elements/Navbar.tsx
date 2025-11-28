// Navbar.tsx

// import { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss";
import SwitchTheme from "../SwitchTheme.tsx";

/**
 * Navbar Component
 * Description: Displays a header navigation bar fixed to the top of the screen.
 * **/
export default function Navbar({
    theme,
    setTheme,
}: {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}) {
    // Parameter for leftmost navbar text - logo-equivalent
    const title = "CS 46X Capstone";

    // Names and links for navbar items
    const navItems = [
        { title: "User Dashboard", link: "/User" },
        { title: "Admin", link: "/Admin" },
        { title: "About", link: "/Home" },
    ];

    return (
        <div
            className={`p-5 w-full h-min transition-colors font-mono
            duration-300 drop-shadow-2xl ${
                theme === "light"
                    ? "bg-wu-gray-200 text-wu-gray-500"
                    : "bg-wu-gray-500 text-wu-gray-200"
            }`}
        >
            <nav className={""}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        {/* Branding / Logo Equivalent */}
                        <div className="flex items-center">
                            <Link
                                to={"/Home"}
                                target="_self"
                                className="transition duration-300 ease-in-out text-lg relative group"
                            >
                                <span className="text-3xl tracking-wider">
                                    {title}
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    target="_self"
                                    className={`transition duration-300 ease-in-out text-lg relative group
                                                ${
                                                    theme === "light"
                                                        ? "hover:text-yellow-500"
                                                        : "hover:text-wu-yellow-100"
                                                }
                                    `}
                                >
                                    {item.title}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5"></span>
                                </Link>
                            ))}
                            {/* Theme Switcher*/}
                            <SwitchTheme theme={theme} setTheme={setTheme} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
