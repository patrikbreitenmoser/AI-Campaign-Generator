# Task 03 — Models and Default Prompts

Summary
Choose initial model IDs and define default prompts for: (a) image understanding → 3 ideas, (b) image generation → 3 variations per idea. Use `@google/genai` models.

Steps
1) Create `server/gemini/models.ts` exporting constants for model IDs (vision + image generation/editing).
2) Create `server/gemini/prompts.ts` exporting `buildAnalysisPrompt(additionalInfo)` and `buildGenerationPrompt(idea, additionalInfo)`.
3) Keep prompts generic initially; we will iterate later.

Acceptance Criteria
- Model IDs are centralized and imported by route handlers (no hard-coded IDs elsewhere).
- Prompts are pure functions with unit-testable behavior.

References
- Image understanding: https://ai.google.dev/gemini-api/docs/image-understanding (e.g., `gemini-2.5-flash`)
- Image generation/editing: https://ai.google.dev/gemini-api/docs/image-generation#gemini-image-editing (e.g., `gemini-2.5-flash-image-preview`)
