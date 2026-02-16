import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import fs from "fs";
import { parse } from "yaml";

// A basic OpenAPI document
const openApiDoc = parse(
    fs.readFileSync("./src/openapi.yaml", {
        encoding: "utf8",
        flag: "r",
    })
);

const app = new Hono();
// returns the app to serve swagger-ui
app.get("/doc", (c) => c.json(openApiDoc));

// Use the middleware to serve Swagger UI at /ui
app.get(
    "/",
    swaggerUI({
        url: "/doc",
        defaultModelExpandDepth: 2,
    })
);

export default app;
