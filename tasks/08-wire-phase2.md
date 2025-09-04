# Task 08 — Wire Phase 2 in UI

Summary
For each idea returned from Phase 1, request 3 images via `/api/generate` and progressively render them in the grid.

Steps
1) After ideas are set, iterate each idea (sequentially or with limited concurrency) and call `generateImages` (include the original uploaded image when available).
2) Update `generatedIdeas[index].images` as results arrive; keep `isGenerating` true until all ideas complete.
3) On any per-idea error, attach an inline error (or skip images) but continue others.

Acceptance Criteria
- The grid shows images filling in progressively per idea (3 images each).
- The modal preview still works with generated images.
- Cancelling/retry behavior is out of scope for v1.
