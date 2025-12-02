import { z } from "zod";
// defines api schema for endpoints
export const checkinSchema = z.object({
    userId: z.number().int(),
    itemId: z.number().int(),
    timestampId: z.number().int(),
});

export const checkoutSchema = z.object({
    userId: z.number().int().describe("User id"),
    items: z.array(z.number().int()).describe("Flat array of itemId's"),
    expectedReturn: z.iso
        .datetime()
        .optional()

        .describe("Expected time item will be returned"),
});
