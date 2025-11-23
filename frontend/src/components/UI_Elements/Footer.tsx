// Footer.tsx

import github_light from "../../images/github-mark-light.svg";
import github_dark from "../../images/github-mark-dark.svg";
import osu_horizontal_light from "../../images/osu-horizontal-light.svg";
import osu_horizontal_dark from "../../images/osu-horizontal-dark.svg";
import "tailwindcss";

export default function Footer({
    theme,
    // setTheme,
}: {
    theme: "light" | "dark";
    // setTheme: (t: "light" | "dark") => void;
}) {
    const githubUrl =
        "https://github.com/osu-capstone-46x-group-24/OSU_Capstone_Asset_Checking_System";

    const footerItems = [
        { title: "License", link: "#" },
        { title: "Contact", link: "#" },
        { title: "Github", link: "#" },
    ];

    return (
        <footer
            className={`relative bottom-0 w-full pb-10 pt-20 lg:pb-20 lg:pt-[120px]
            transition-all duration-300
            ${
                theme === "light"
                    ? "bg-emerald-600 text-wu-gray-200"
                    : "bg-wu-gray-500 text-wu-gray-200"
            }`}
        >
            <div className="w-full h-max">
                <div className="flex h-max w-6/10 justify-self-center justify-items-center justify-center p-12">
                    {/* Col 1 - Logo and subtext */}
                    <div className="px-4 mt-4 flex flex-col justify-start self-center w-6/10">
                        <a
                            href=""
                            className="mb-6 inline-block max-w-10px left-0 w-8/10"
                        >
                            <img
                                src={
                                    theme === "light"
                                        ? osu_horizontal_light
                                        : osu_horizontal_dark
                                }
                                alt="Oregon State University Logo"
                            ></img>
                        </a>
                        <div className="mb-6 max-w-160px text-start w-full">
                            <span>
                                <p>
                                    Artur Dubanaev &#x2022; Ethan Shiota
                                    &#x2022; Michael Zandonella
                                </p>
                                <p>
                                    Mick Forsman &#x2022; Ryan Dobkin &#x2022;
                                    © 2025
                                </p>
                            </span>
                        </div>
                    </div>

                    {/* Col 2 - Center Space */}
                    <div className="w-1/50"></div>

                    {/* Col 3 - Links */}
                    <div className="px-4 w-1/10 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            {footerItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_self"
                                    className="pb-1 ease-in-out text-lg relative"
                                >
                                    {item.title}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Col 4 - Icons */}
                    <div className="px-4 w-2/10 flex items-center justify-center">
                        <a
                            href={githubUrl}
                            target="_blank"
                            className="mx-4 w-12"
                        >
                            <img
                                src={
                                    theme === "light"
                                        ? github_light
                                        : github_dark
                                }
                                alt="Github logo"
                            ></img>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
