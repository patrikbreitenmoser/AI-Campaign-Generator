# Task 06 — Client API Helpers

Summary
Create small client helpers for calling backend endpoints with proper types and error mapping.

Steps
1) Add `src/lib/api.ts` exporting:
   - `analyzeImage(file: File, additionalInfo: string): Promise<Idea[]>`
   - `generateImages(idea: Idea, additionalInfo: string, file?: File): Promise<GeneratedImage[]>` (pass the original image optionally)
2) Use `fetch` with `FormData` for analyze; JSON for generate.
3) Map non-2xx into `Error` with server-provided `error` message.

Acceptance Criteria
- TypeScript types for `Idea` and `GeneratedImage` are exported (or colocated) and align with UI expectations.
- Helpers do not log secrets; they accept only runtime arguments.
