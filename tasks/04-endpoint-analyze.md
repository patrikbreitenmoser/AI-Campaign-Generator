# Task 04 — Endpoint: Analyze Image → Ideas

Summary
Add `POST /api/analyze` that accepts an image and optional `additionalInfo`, calls Gemini image understanding via `@google/genai`, and returns exactly 3 ideas.

Request
- Content-Type: `multipart/form-data`
- Fields: `image` (file, <= 5MB, type image/*), `additionalInfo` (string)

Response (200)
```json
{
  "ideas": [
    { "id": "string", "title": "string", "description": "string" },
    { "id": "string", "title": "string", "description": "string" },
    { "id": "string", "title": "string", "description": "string" }
  ]
}
```

Steps
1) Create `server/routes/analyze.(js|ts)` with validation (size <= 5MB, image mime), and Node SDK call.
2) Build contents: `[ { inlineData: { mimeType, data: <base64> } }, { text: buildAnalysisPrompt(additionalInfo) } ]` and call `ai.models.generateContent({ model: VISION_MODEL, contents })`.
3) Parse `response.text` as JSON into 3 ideas; generate stable IDs (e.g., `uuid`).
4) Surface SDK errors with `4xx/5xx` and a clear JSON `error` message.

Acceptance Criteria
- `curl -F image=@sample.jpg -F additionalInfo='text' http://localhost:PORT/api/analyze` returns 3 ideas.
- Non-image or >5MB uploads return 400 with a descriptive error.
- Server logs include minimal request tracing (start/finish or error only).

References
- Image understanding: https://ai.google.dev/gemini-api/docs/image-understanding
