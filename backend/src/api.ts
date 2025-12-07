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

const item = z
    .object({
        name: z.string().describe("Human readable item name"),
        rfid: z.string().describe("The unique identifier for this item"),
    })
    .describe("`POST api/items`");

export const itemSchema = z.union([item, z.array(item)]);

export const canaryResponse = z.object({
    connection: z.object({
        address: z.optional(z.string()),
        addressType: z.optional(z.string()),
        transport: z.optional(z.string()),
        port: z.optional(z.number()),
    }),
    uptime: z.int().describe("Server uptime in milliseconds"),
    timestamp: z.iso.datetime(),
});
