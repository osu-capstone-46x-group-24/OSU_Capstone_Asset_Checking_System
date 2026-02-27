# OpenAPI Document

Use nushell script to generate and merge definitions into `openapi.yaml`.

```nu
nu ./generate.nu
```

## Design

Definitions are generated from `paths.yaml` and `schema.cue`.

- Schemas are defined using cue in `schema.cue`
- API endpoints are documented in `paths.yaml`
