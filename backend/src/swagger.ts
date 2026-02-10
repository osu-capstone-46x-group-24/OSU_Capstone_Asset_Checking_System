import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

// A basic OpenAPI document
const openApiDoc = {
    openapi: "3.0.0", // This is the required version field
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for your service",
    },
    paths: {
        // Add your API paths here
        "/api/log/{level}": {
            parameters: [
                {
                    name: "level",
                    in: "path",
                    description: "string",
                    required: "true",
                },
            ],
            post: {
                summary: "Logs event to database with severity level.",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    timestamp: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                    type: { type: "string" },
                                    message: { type: "string" },
                                },
                                example: {
                                    timestamp: "YYYY-MM-DD",
                                    type: "Scanner",
                                    message: "we must construct more scanners.",
                                },
                            },
                        },
                    },

                    required: true,
                },
                responses: {
                    "200": {
                        description: "OK",
                    },
                },
            },
        },
        "/api/items": {},
        // Add more endpoints as needed
    },
};

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
