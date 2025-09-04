# AI Campaign Generator (React + TypeScript + Vite)

Generate ad campaign ideas and image variations from a single product image. The app analyzes an uploaded image, proposes three campaign concepts, and renders three visual variants per concept using Google Gemini.

## Quick Start

- Prereqs: Node 20+, npm, a Google API key with access to Gemini (`GOOGLE_API_KEY`).
- Install: `npm install`
- Dev (frontend + proxy): `npm run dev`
- Start backend: `GOOGLE_API_KEY=... npm run server:start`
  - Dev with reload: `GOOGLE_API_KEY=... npm run server:dev`
- Build: `npm run build`
- Preview built app: `npm run preview`
- Lint/format: `npm run lint`, `npm run format`, `npm run format:check`

In development, Vite proxies `/api/*` to `http://localhost:8787` (see `vite.config.ts`). No extra env is needed for the frontend while developing.

## Environment

- `.env` (at repo root)
  - `GOOGLE_API_KEY=your_key_here` (required by the backend)
  - `VITE_API_BASE=https://your-server.example.com` (optional for deployments when the API is not same-origin)

## Scripts

- `npm run dev`: Start Vite dev server with HMR and a dev proxy to the backend.
- `npm run server:start`: Start the Node HTTP API on port `8787`.
- `npm run server:dev`: Same as above with `--watch`.
- `npm run build`: Type-checks then builds production assets to `dist/`.
- `npm run preview`: Serves `dist/` locally for verification.
- `npm run lint`: ESLint (type-aware) over the project (generated code excluded).
- `npm run format` / `npm run format:check`: Prettier format / verify formatting.

## Project Structure

- `src/` React + TypeScript source
  - `src/main.tsx`: entry point
  - `src/App.tsx`: app shell
  - `src/components/`: handwritten components
  - `src/components/generated/`: auto-generated components (do not edit by hand)
  - `src/lib/`: utilities and API client (`api.ts`)
  - `src/hooks/`: custom hooks
  - `src/settings/`: theme and injected settings
  - `src/index.css`: Tailwind v4 styles
- `server/`: lightweight Node HTTP API that proxies to Google Gemini
  - `server/index.js`: route dispatcher and CORS
  - `server/routes/analyze.js`: POST `/api/analyze` (extracts 3 ideas)
  - `server/routes/generate.js`: POST `/api/generate` (creates image variants)
  - `server/gemini/*`: SDK wrapper, model ids, prompt builders
- `dist/`: production build output

Import alias: `@/` maps to `src/`.

## Features

- Upload a product image (JPG/PNG/WebP up to 5MB)
- Analyze to get 3 campaign ideas (title + compact description)
- Generate 3 image variants per idea in parallel
- Stable 3-slot layout per idea (no shifting as images stream in)
- High-res image modal on click
- Show/Hide Prompt button to inspect the prompt used
- Enforced light theme (no dark mode)

## Frontend Architecture

- `GeminiAdImageGeneratorApp`: Orchestrates upload, analysis, and image generation; aborts in-flight requests when inputs change.
- `IdeasGrid`: Renders ideas with three stable slots per idea. Missing slots show placeholders until filled.
- `ImageUploadBox`: Drag-and-drop or file picker with preview (preview height capped for comfortable layout).
- `HighResImageModal`: Full-screen preview.
- `lib/api.ts`: Thin client for `/api/analyze` and `/api/generate`; converts images to base64 when needed.

Styling: Tailwind v4 with Prettier formatting; import paths use `@/` alias.

## Backend API

Base URL in dev: proxied via Vite to `http://localhost:8787`. In production, set `VITE_API_BASE` if the API is on a different origin.

- `POST /api/analyze`
  - Content-Type: `multipart/form-data`
  - Fields: `image` (file, required), `additionalInfo` (string, optional)
  - Limits: 5MB max, only `image/*` accepted
  - Response: `{ ideas: Array<{ id: string; title: string; description: string }> }`

- `POST /api/generate`
  - Content-Type: `application/json`
  - Body: `{ title, description, additionalInfo?, image?: { mimeType, base64 }, count?, variantIndex? }`
  - Behavior: Returns one image by default; if `count > 1`, generates up to 3 variants.
  - Response: `{ images: Array<{ id: string; url: string; alt: string }> }` where `url` is a data URL.

### Generation Strategy

- Variants: The UI requests three variants in parallel, one per `variantIndex` (0–2).
- Retry: For each variant, the server calls the model up to 3 times with light backoff `[0ms, 300ms, 800ms]` plus jitter. Response format is `image/png`.
- Early exit: As soon as an attempt returns at least one image, it stops retrying.

## Running Locally

1) Start the backend (requires `GOOGLE_API_KEY`):

```
GOOGLE_API_KEY=your_key_here npm run server:start
```

2) Start the frontend (dev server with proxy):

```
npm run dev
```

Open the app at the Vite URL (typically `http://localhost:5173`).

## Deployment

- Build the frontend: `npm run build` → `dist/` static assets.
- Deploy the backend (Node, port `8787` by default) with `GOOGLE_API_KEY` set.
- If the frontend is served from a different origin than the backend, set `VITE_API_BASE` at build time to the API origin.

## Linting & Formatting

- ESLint 9 with TypeScript type-aware rules, React Hooks, react-x, and react-dom.
- Generated components in `src/components/generated/` are excluded from linting.
- Prettier is configured (2‑space indent, semicolons, single quotes, width 100, trailing comma es5).

## Testing

- No test framework is configured yet. If adding tests, prefer Vitest + React Testing Library.
- Suggested naming: colocate as `*.test.ts(x)` under `src/` and add a `test` script in `package.json`.

## Security Notes

- The backend requires `GOOGLE_API_KEY`; do not expose it in client code.
- Uploads are limited to 5MB and `image/*`. Non-image files are rejected.
- CORS is permissive in dev; restrict origins in production as needed.

## Troubleshooting

- 502 from `/api/generate`: Upstream model returned no image after retries. Try again or adjust prompts.
- “Please upload an image first”: Ensure the file is `image/*` and under 5MB.
- CORS errors in production: Set `VITE_API_BASE` to your API origin or serve both from the same origin with a reverse proxy.

## Contributing

- Keep PRs focused and small. Include a summary, steps to test, and screenshots/GIFs for UI changes.
- Follow the code style: TypeScript, React Hooks, alias imports (`@/path`), no manual edits in `src/components/generated/`.

## License

Proprietary project (no license file). Add a LICENSE if you intend to open source.
