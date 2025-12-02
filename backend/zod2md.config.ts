import type { Config } from "zod2md";

const config: Config = {
    entry: "src/api.ts",
    title: "API reference",
    output: "docs/api.md",
};

export default config;
