// Home.tsx

// Imports
import "../App.css";
import demoGif from "../assets/demo.gif";

// Types
type HomeProps = {
    theme: "light" | "dark";
};

/**
 * Name: Home
 * Type: Page
 * Description: Home page - '/' base directory
 */
export default function Home({ theme }: HomeProps) {
    const githubURL =
        "https://github.com/osu-capstone-46x-group-24/OSU_Capstone_Asset_Checking_System";

    const hoverClass =
        theme === "light"
            ? "hover:text-wu-red-100"
            : "hover:text-wu-yellow-100";

    return (
        <main className="grow w-full">
            <section className="max-w-6xl mx-auto px-6 py-20 text-text font-sans">
                {/* Hero */}
                <div className="text-center mb-20">
                    <p className="text-lg mb-4 tracking-widest uppercase opacity-80">
                        OSU CS 46X Capstone Project 2025-2026
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Check In / Out System for Assets
                    </h1>

                    <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
                        A prototype asset tracking system for a university
                        simulation lab that helps staff record equipment
                        check-outs, returns, and current asset status using RFID
                        badges and asset scans.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                        <a
                            href={githubURL}
                            target="_blank"
                            rel="noreferrer"
                            className={`px-6 py-3 rounded-xl border-2 transition-colors duration-300 ${hoverClass}`}
                        >
                            View on GitHub
                        </a>

                        <a
                            href="https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=6RBYZj9tMGMllxTk"
                            target="_blank"
                            rel="noreferrer"
                            className={`px-6 py-3 rounded-xl border-2 transition-colors duration-300 ${hoverClass}`}
                        >
                            View Capstone Listing
                        </a>
                    </div>
                </div>

                {/* Problem / Value */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold mb-6">
                        Project Overview
                    </h2>

                    <p className="text-lg leading-relaxed max-w-5xl">
                        This project is being developed for WesternU’s SMaRT
                        Simulation Lab, where students and staff use manikins,
                        task trainers, and other medical training equipment. The
                        goal is to replace manual tracking with a prototype
                        system that records which assets were checked out, when
                        they were taken, and when they were returned.
                    </p>
                </section>

                <section className="mb-20">
                    <h2 className="text-4xl font-bold mb-8">Why It Matters</h2>

                    <p className="text-lg leading-relaxed max-w-5xl">
                        Simulation equipment is expensive, frequently moved, and
                        shared across labs and training events. Without a
                        structured check-in/check-out process, staff have
                        limited visibility into where assets are, who is using
                        them, and whether items have been returned. Since
                        students and employees already carry RFID badges, this
                        system explores how existing identifiers can support a
                        faster and more accountable workflow.
                    </p>
                </section>

                {/* Features */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold mb-8">Key Features</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard
                            title="University ID Badge Identification"
                            description="Users identify themselves by scanning their university-issued ID cards, allowing each transaction to be associated with a specific user."
                        />

                        <FeatureCard
                            title="NFC-Tagged Asset Scanning"
                            description="All equipment is tagged with NFC stickers, enabling assets to be quickly scanned and recorded during check-out and return."
                        />

                        <FeatureCard
                            title="Check-Out and Return Logging"
                            description="The system records when an item is checked out and when it is returned, creating a simple and consistent transaction log."
                        />

                        <FeatureCard
                            title="Transaction Log Interface"
                            description="Staff can view a history of transactions showing who checked out items, when they were taken, and whether they have been returned."
                        />

                        <FeatureCard
                            title="Error Prevention"
                            description="Basic safeguards help prevent invalid actions, such as attempting to check out an item that has already been recorded as checked out."
                        />

                        <FeatureCard
                            title="Mock Scanner Support"
                            description="A mock scanner workflow allows the system to be tested and demonstrated without requiring full access to physical hardware."
                        />
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-4xl font-bold mb-6">Project Preview</h2>

                    <div className="rounded-2xl border-2 p-6 bg-bg dark:bg-wu-gray-500">
                        <img
                            src={demoGif}
                            alt="Demo of scanning workflow showing badge scan, asset scan, and transaction logging"
                            className="w-full rounded-xl mb-4"
                        />

                        <p className="text-lg text-center opacity-80">
                            Example flow showing a user scanning their
                            university ID, scanning an NFC-tagged asset, and
                            recording a check-out transaction.
                        </p>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-4xl font-bold mb-6">
                        How to Access the Project
                    </h2>

                    <p className="text-lg leading-relaxed max-w-5xl mb-6">
                        The prototype source code, setup instructions, and
                        development documentation are available on GitHub. The
                        public version of this page is a landing page for the
                        project, while the full application includes the scanner
                        integration, user dashboard, admin dashboard, backend
                        API, and database-backed transaction tracking.
                    </p>

                    <a
                        href={githubURL}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-block px-6 py-3 rounded-xl border-2 transition-colors duration-300 ${hoverClass}`}
                    >
                        Open GitHub Repository
                    </a>
                </section>

                <section>
                    <h2 className="text-4xl font-bold mb-6">Team Credits</h2>

                    <p className="text-lg leading-relaxed max-w-5xl mb-6">
                        Built by Team 24 for Oregon State University's CS 46X
                        capstone sequence in partnership with Dean Akin at
                        WesternU.
                    </p>

                    <ul className="text-lg space-y-2 mb-8">
                        <li>
                            Michael Zandonella — Scanner / Hardware Integration
                        </li>
                        <li>Mick Forsman — Frontend</li>
                        <li>Ryan Dobkin — Frontend</li>
                        <li>Ethan Shiota — Backend</li>
                    </ul>

                    <p className="text-lg">
                        Feedback and issues can be submitted through{" "}
                        <a
                            href={`${githubURL}/issues`}
                            target="_blank"
                            rel="noreferrer"
                            className={`underline transition-colors duration-300 ${hoverClass}`}
                        >
                            GitHub Issues
                        </a>
                        .
                    </p>
                </section>
            </section>
        </main>
    );

    type FeatureCardProps = {
        title: string;
        description: string;
    };

    function FeatureCard({ title, description }: FeatureCardProps) {
        return (
            <div className="rounded-2xl border-2 p-6 bg-bg dark:bg-wu-gray-500">
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-lg leading-relaxed opacity-90">
                    {description}
                </p>
            </div>
        );
    }
}
