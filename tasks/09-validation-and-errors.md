# Task 09 — Validation & Error Handling

Summary
Add consistent validation and error responses on the server and friendly UI messages on the client.

Steps (Server)
1) Enforce <= 5MB and `image/*` on `/api/analyze` uploads; return 400 JSON on violation.
2) Standardize error shape: `{ error: { code, message } }`.
3) Add basic request timeouts (e.g., 60s) to SDK calls.

Steps (Client)
1) Map non-2xx to user-friendly messages (network vs validation vs SDK error).
2) Show inline error state where currently used and clear on retry.

Acceptance Criteria
- Intentionally invalid inputs produce clear messages without breaking the app.
- SDK failure is reported to the user and logged to console (no secrets).
