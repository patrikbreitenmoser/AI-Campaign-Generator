export function buildAnalysisPrompt(additionalInfo = '') {
  const extra = additionalInfo?.trim() ? `\nAdditional context from user: ${additionalInfo.trim()}` : '';
  return [
    'You are a marketing strategist. Analyze the uploaded product image and propose exactly 3 distinct advertising campaign ideas.',
    'Each idea must include a concise title and a one-sentence description.',
    'Tailor the ideas to the visual content of the image and any user context provided.',
    'Respond ONLY in minified JSON with this shape:',
    '{"ideas":[{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."}]}',
    extra,
  ].filter(Boolean).join('\n');
}

export function buildGenerationPrompt(idea, additionalInfo = '') {
  const title = idea?.title || '';
  const desc = idea?.description || '';
  const extra = additionalInfo?.trim() ? `\nUser context: ${additionalInfo.trim()}` : '';
  return [
    'Create a high-quality advertising image for the following campaign idea.',
    `Campaign title: ${title}`,
    `Campaign concept: ${desc}`,
    'Requirements: photo-realistic if applicable, product-centric composition, clean background, vibrant but natural lighting, no embedded text or watermarks, safe content.',
    'Visual framing: landscape 4:3 composition suitable for web placements.',
    extra,
  ].filter(Boolean).join('\n');
}

