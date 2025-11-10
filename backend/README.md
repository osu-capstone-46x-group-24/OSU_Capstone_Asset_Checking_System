# Backend

## Database

Database schema is located in the `src/db/schema.ts` typescript file.
This is the source of truth for the schema and changes to the schema
should be done through that file.
When updating the schema run `npx drizzle-kit generate`
to generate the migration files.
When the server is run migrations are automatically applied.

## Tooling

`npx drizzle-kit studio` can be used to inspect database state.

## Running

```
npm install
npm run dev
```
