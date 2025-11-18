import { describe, it, expect } from "vitest";

describe("happy path", () => {
    it("sums numbers", () => {
        const result = 2 + 2;
        expect(result).toBe(4);
    });
});
