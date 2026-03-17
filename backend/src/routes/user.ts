import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { users_table, admins_table } from "../db/schema.js";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema.js";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import { scanSchema } from "../api.js";

function userRoute(db: LibSQLDatabase<typeof schema>) {
    const userRoute = new Hono();

    userRoute.post("user/scan", zValidator("json", scanSchema), async (c) => {
        const { rfid } = c.req.valid("json");

        // create user if missing, otherwise return user info
        await db.insert(users_table).values({ rfid }).onConflictDoNothing();

        const user = await db.query.users_table.findFirst({
            where: eq(users_table.rfid, rfid),
        });

        if (!user) {
            return c.json({ error: "Failed to create or find user" }, 500);
        }

        const adminStatus = await db.query.admins_table.findFirst({
            where: eq(schema.admins_table.user_id, user.id),
        });

        return c.json({
            id: user.id,
            rfid: user.rfid,
            isAdmin: !!adminStatus,
        });
    });

    return userRoute;
}

export default userRoute;
