// Builds the image-understanding prompt that returns exactly 3 ideas in minified JSON.
// Description packs labeled sections using " | " separators and ";" for short lists.
export function buildAnalysisPrompt(additionalInfo = '') {
  const extra = additionalInfo?.trim()
    ? `\nAdditional Input (OVERRIDES defaults; highest priority — MUST FOLLOW): ${additionalInfo.trim()}`
    : '';
  return [
    // Role
    'Role: You are a world-class marketing strategist and senior art director. From a single uploaded product image, you will (1) infer the business and visual context and (2) deliver three distinct, high-impact visual campaign ideas that can be executed by a photographer or an AI image generator.',
    // Core instructions
    'Core Instructions: Analyze the product image first. Develop three genuinely different concepts; each must feature a human interacting with or enjoying the product (Lifestyle OR Aspirational OR Testimonial).',
    // Non-negotiables and defaults
    'Non-Negotiables: No embedded text. Reserve 20–35% clean negative space for copy. No hallucinated features/claims; clearly mark assumptions with confidence levels. Ensure concepts are visibly distinct.',
    'Defaults (override via Additional Input): Primary aspect 4:5, note adaptation for 16:9 and 9:16; tone premium-modern, minimal, approachable; risk appetite balanced→edgy (at least one concept is Edgy); seasonality autumn cues unless overridden.',
    // Inputs & overrides
    'Inputs: Product Image (source of truth). Additional Input may specify region, seasonality, channels, tone, legal, must-show features, no-go topics, props/surfaces, sustainability, positioning, competitor, message angle, casting, accessibility, constraints. Instruction: Parse and incorporate/override defaults. If conflicts arise, note them and choose the safest interpretation. Priority: Additional Input (highest) > Non-Negotiables (always enforce) > Defaults.',
    // Part 1 internal analysis
    'Part 1 — Visual & Business Inference (internal; DO NOT OUTPUT): What it is; Key visible features; Implied attributes; Usage contexts & human interactions; Target segments; Positioning angle; Assumptions with Confidence (High/Medium/Low) and mitigation.',
    // Part 2 deliverable format (simplified, short)
    'Part 2 — Three Campaign Concepts (deliverable): Create exactly 3 concepts with different Style selections across the set. Keep each concise yet concrete.',
    // Output schema and packing
    'Output ONLY minified JSON with exactly 3 items: {"ideas":[{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."}]} — no extra keys or text.',
    'Per idea, set title = Concept Title. Put ALL fields below into description as compact labeled sections using " | " between sections:',
    'Style: <Lifestyle|Aspirational|Testimonial> | Hook: <1-line> | Creative Description: <scene, setting, lighting, mood, palette, camera angle, composition with explicit negative space location, casting & wardrobe, human action/emotion> | Strategic Notes: Audience=<...>; Funnel=<Awareness|Consideration|Conversion>; Risk=<Safe|Bold|Edgy> | Image Generation Prompt: <concise descriptive prompt matching the creative description>',
    // Extra user input (highest priority overrides)
    extra,
  ]
    .filter(Boolean)
    .join('\n');
}

function extractImagePrompt(description) {
  if (!description) return '';
  // Try to extract after "Image Generation Prompt:" or "ImagePrompt:" up to end or next section delimiter
  const markers = [/Image\s*Generation\s*Prompt\s*:\s*(.*)$/i, /Image\s*Prompt\s*:\s*(.*)$/i];
  for (const rx of markers) {
    const m = description.match(rx);
    if (m && m[1]) return m[1].trim();
  }
  // Fallback: try to split by labeled sections and find the last
  const parts = description.split(/\s\|\s/);
  const last = parts[parts.length - 1] || '';
  return last.replace(/^.*?:\s*/, '').trim();
}

export function buildGenerationPrompt(idea, additionalInfo = '') {
  const title = idea?.title || '';
  const desc = idea?.description || '';
  const concise = extractImagePrompt(desc);
  const extra = additionalInfo?.trim()
    ? `\nAdditional Input (OVERRIDES): ${additionalInfo.trim()}`
    : '';
  return [
    'Create a production-grade advertising image for the campaign below. Interpret the labeled sections in the concept description; sections use " | ". If an "Image Generation Prompt" is provided, treat it as the primary rendering directive. Adhere strictly to Additional Input overrides.',
    `Campaign title: ${title}`,
    `Concept description (for art direction): ${desc}`,
    concise ? `Rendering directive (concise): ${concise}` : '',
    'Hard constraints: include humans using/enjoying the product (no sterile packshots). Reserve 20–35% clean negative space for copy; no embedded text or watermarks. Respect the specified negative space location and preserve product scale when adapting to 16:9 or 9:16. Do not invent product features or third-party logos.',
    'Framing: prioritize 4:5 as primary; adapt to 16:9/9:16 via crop/angle while maintaining the copy-safe area.',
    'Lighting & look: follow the lighting and colour/mood cues; maintain realism and natural skin tones.',
    extra,
  ]
    .filter(Boolean)
    .join('\n');
}
