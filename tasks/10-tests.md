# Task 10 — Minimal Tests

Summary
Introduce a small test setup to protect prompt builders and response mappers. Keep scope small.

Steps
1) Install dev deps: `npm i -D vitest @types/node`.
2) Add `npm test` script: `vitest run` and `vitest` for watch.
3) Add unit tests for `server/gemini/prompts.ts` and any response mapping utils.
4) If feasible, add a route handler test with the SDK mocked.

Acceptance Criteria
- `npm test` runs successfully locally.
- Tests cover: analysis prompt builder, generation prompt builder, idea parsing to `{id,title,description}`.
- No external network calls from tests.
