import { Hono } from "hono";
import { getConnInfo } from "@hono/node-server/conninfo";

function canary() {
    const app = new Hono();
    const start_time = Date.now();

    // server status, uptime, timestamp, database status
    app.get("/canary", async (c) => {
        const conninfo = getConnInfo(c);
        const timestamp = Date.now();
        // uptime in milliseconds
        const uptime = timestamp - start_time;
        return c.json({
            connection: {
                address: conninfo.remote.address,
                addressType: conninfo.remote.addressType,
                transport: conninfo.remote.transport,
                port: conninfo.remote.port,
            },
            uptime: uptime,
            timestamp: new Date(timestamp).toISOString(),
        });
    });

    return app;
}

export default canary;
