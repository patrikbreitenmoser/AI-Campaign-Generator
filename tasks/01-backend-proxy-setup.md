# Task 01 — Backend Proxy Setup

Summary
Set up a minimal Node backend to proxy Gemini API calls so the API key remains server-side.

Steps
1) Create `server/` with `server/index.ts` (or `.js`) and a basic HTTP server (Express or Hono).
2) Add `GET /api/health` returning `{ status: 'ok' }`.
3) Add npm scripts: `server:dev` (watch), `server:start` (prod).

Acceptance Criteria
- Server starts with `npm run server:dev` and logs its port.
- `GET /api/health` returns 200 and `{ status: 'ok' }`.
- No client code changes yet.

Notes
- Use ESM consistent with the repo (`"type": "module"`).
- Keep dependencies minimal; we’ll add the SDK next.
