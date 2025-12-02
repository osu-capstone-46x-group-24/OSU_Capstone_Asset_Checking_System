import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
// import UserDashboard from "../pages/UserDashboard.tsx";

// --- mock browser APIs that jsdom lacks ---
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });

    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: vi.fn().mockReturnValue(null),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        },
    });
});

describe("App component", () => {
    it("renders without crashing", () => {
        render(<App />);
        // You can adjust this text to something actually visible on your Home page
        expect(screen.getByText(/User/i)).toBeTruthy();
        expect(screen.getByText(/Admin/i)).toBeTruthy();
    });
});

// describe("User walkthrough", () => {
//     it("renders without crashing", () => {
//         render(<UserDashboard />);
//         // You can adjust this text to something actually visible on your Home page
//         expect(screen.getByText(/User/i)).toBeTruthy();
//         expect(screen.getByText(/Admin/i)).toBeTruthy();
//         //expect(screen.getByText())
//     });
// });
