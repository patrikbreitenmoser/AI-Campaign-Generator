# Task 05 — Endpoint: Generate Images for Idea

Summary
Add `POST /api/generate` that accepts one idea, optional `additionalInfo`, and optionally the original image (base64) to guide editing. Use `@google/genai` to create 3 images (variations), and return data URLs.

Request
- Content-Type: `application/json`
- Body: `{ "title": string, "description": string, "additionalInfo"?: string, "image"?: { "mimeType": string, "base64": string } }`

Response (200)
```json
{
  "images": [
    { "id": "string", "url": "data:image/jpeg;base64,....", "alt": "string" },
    { "id": "string", "url": "data:image/jpeg;base64,....", "alt": "string" },
    { "id": "string", "url": "data:image/jpeg;base64,....", "alt": "string" }
  ]
}
```

Steps
1) Create `server/routes/generate.(js|ts)` using the image generation/editing endpoint from the Node SDK.
2) Build prompt: `[ { text: buildGenerationPrompt(idea, additionalInfo) }, ...(image? [{ inlineData: { mimeType, data: base64 } }] : []) ]` and call `ai.models.generateContent({ model: IMAGE_MODEL, contents })`.
3) Extract `inlineData` parts and return images as base64 data URLs suitable for `<img src>`.

Acceptance Criteria
- `curl -X POST -H 'Content-Type: application/json' -d '{"title":"..","description":".."}' http://localhost:PORT/api/generate` returns 3 `images` items.
- Errors from the SDK surface as 4xx/5xx JSON with an `error` message.

References
- Image generation/editing: https://ai.google.dev/gemini-api/docs/image-generation#gemini-image-editing
