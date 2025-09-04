# Repository Guidelines

## Project Structure & Module Organization
- Source code: `src/` (React + TS). Entry: `src/main.tsx`, app shell: `src/App.tsx`.
- UI: `src/components/` (handwritten) and `src/components/generated/` (auto‑generated; avoid manual edits).
- Utilities: `src/lib/` (e.g., `utils.ts`). Hooks: `src/hooks/` (e.g., `use-mobile.ts`).
- Styling: `src/index.css` (Tailwind v4). Settings: `src/settings/` (injected configuration like `theme.ts`).
- Public template: `index.html`. Build output: `dist/`.
- Import alias: `@/` maps to `src/` (set in `vite.config.ts` and `tsconfig.*`).

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server with HMR.
- `npm run build`: Type‑check (`tsc -b`) then build production assets.
- `npm run preview`: Serve the built `dist/` locally for verification.
- `npm run lint`: Run ESLint over the project.
- `npm run format` / `npm run format:check`: Format with Prettier / verify formatting.

Use npm for consistency (`package-lock.json` present). Example: `npm run dev`.

## AI Endpoints
- Image understanding: https://ai.google.dev/gemini-api/docs/image-understanding
- Image generation/editing: https://ai.google.dev/gemini-api/docs/image-generation#gemini-image-editing
- SDK: `@google/genai` via backend proxy (`/api/analyze`, `/api/generate`), key in `GOOGLE_API_KEY`.

## Coding Style & Naming Conventions
- Formatting: Prettier (2‑space indent, semicolons, single quotes, width 100, `trailingComma: es5`).
- Linting: ESLint 9 with TypeScript + React Hooks plugins; unused vars rule disabled.
- Files: React components in `.tsx`, utilities in `.ts`.
- Names: Components in PascalCase (`Button.tsx`), hooks `useX.ts`, utilities in camelCase (`cn`, `ensureLightMode`).
- Imports: Prefer `@/path` alias over relative deep paths.

## Testing Guidelines
- No test framework is configured yet. If adding tests, prefer Vitest + React Testing Library.
- Suggested naming: colocate as `*.test.ts(x)` under `src/`.
- Add a `test` script in `package.json` when introducing tests.

## Commit & Pull Request Guidelines
- Commits: Use clear, imperative messages (e.g., "Add image modal").
- Consider Conventional Commits (`feat:`, `fix:`) for clearer history once automation is added.
- PRs: Include a summary, screenshots/GIFs for UI changes, steps to test, and link related issues. Keep PRs focused and small.

## Security & Configuration Tips
- Do not edit files in `src/components/generated/` by hand.
- `src/settings/theme.ts` reads injected values; validate any build‑time injection to avoid invalid themes.
- Avoid adding dark‑mode classes; `ensureLightMode()` enforces light theme.
