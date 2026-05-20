import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";
import fs from "fs";
import { parse } from "yaml";

function resolveOpenApiPath() {
    const candidates = [
        new URL("../src/openapi/openapi.yaml", import.meta.url),
        new URL("./openapi/openapi.yaml", import.meta.url),
    ];

    const filepath = candidates.find((candidate) => fs.existsSync(candidate));
    if (!filepath) {
        throw new Error("Could not locate src/openapi/openapi.yaml");
    }

    return filepath;
}

// A basic OpenAPI document
const openApiDoc = parse(
    fs.readFileSync(resolveOpenApiPath(), {
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
