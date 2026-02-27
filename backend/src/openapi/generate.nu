cue def --out openapi | from json | merge deep (open paths.yaml) | to yaml | save -f openapi.yaml
