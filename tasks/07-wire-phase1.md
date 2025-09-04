# Task 07 — Wire Phase 1 in UI

Summary
Replace the mock idea generation in `GeminiAdImageGeneratorApp` with a call to `/api/analyze` using the uploaded image and `additionalInfo` (via `@google/genai`).

Steps
1) Import and use `analyzeImage` from `src/lib/api.ts` inside `handleGenerateIdeas`.
2) Validate presence of image and enforce client-side max size 5MB (friendly error message).
3) Set `generatedIdeas` with `{ id, title, description, images: [] }` (no images yet).

Acceptance Criteria
- Clicking the generate button triggers a real `/api/analyze` call and updates ideas.
- Loading state and existing placeholders still behave correctly.
- Errors from the server show in the existing `error` state and UI.
