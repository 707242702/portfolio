# Development Protocols

## Rules

**STAY LOCAL**
Never run `npm run build` or `gh-pages` unless the user explicitly says "publish" or "deploy".
Default workflow: localhost preview only.

**TARGETED EDITING**
Only read files relevant to the current task. Do not scan the entire repository.

**ASSET HANDLING**
Use `sips` for local image processing.
Always check `public/images/` for existing assets before assuming they are missing.
Compression standard: `sips -s format jpeg -s formatOptions 75 --resampleHeightWidthMax 800 input -o output`

**LAYOUT**
For Published Works (UNIT 04.2), always prioritize `heroLayout` for covers and `2:1` aspect for spreads to avoid cropping.

**TOKEN EFFICIENCY**
Keep responses brief. Only show code diffs, not full file contents.
