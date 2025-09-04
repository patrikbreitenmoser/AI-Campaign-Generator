# Task 02 — Node SDK & Env Wiring

Summary
Install and configure the Gemini Node SDK in the backend using `@google/genai`. Load `GOOGLE_API_KEY` via `.env` (server-only).

Steps
1) Install: `npm i @google/genai dotenv` (server dependency). Remove `@google/generative-ai` if present.
2) Load env in server startup; fail fast if `GOOGLE_API_KEY` missing.
3) Create `server/gemini/client.(js|ts)` exporting a configured SDK client (e.g., `new GoogleGenAI({})`).

Acceptance Criteria
- `server/gemini/client` exports an initialized client that reads `GOOGLE_API_KEY` from env.
- Starting the server without the env key logs a clear error and exits.
- `.env` is in `.gitignore` (already) and an `.env.example` will be added later.

References
- Node SDK (@google/genai): https://ai.google.dev/gemini-api/docs
