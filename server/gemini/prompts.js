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
    'Core Instructions: Analyze the product image first. Develop three genuinely different concepts; each must feature a human interacting with or enjoying the product (Lifestyle OR Aspirational OR Testimonial) and must clearly show the product fully in frame and recognizable (no occlusion). Include precise product placement, scale, and visibility safeguards.',
    // Non-negotiables and defaults
    'Non-Negotiables: No embedded text. No hallucinated features/claims; clearly mark assumptions with confidence levels. Ensure concepts are visibly distinct. Always show the product prominently: fully in frame, unobstructed, and easily recognizable; product is the hero or co-hero in every concept.',
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
    'Style: <Lifestyle|Aspirational|Testimonial> | Hook: <1-line> | Creative Description: <scene, setting, lighting, mood, palette, camera angle, composition with explicit negative space location, product placement and scale (product fully in frame, unobstructed), casting & wardrobe, human action/emotion> | Strategic Notes: Audience=<...>; Funnel=<Awareness|Consideration|Conversion>; Risk=<Safe|Bold|Edgy> | Image Generation Prompt: <concise descriptive prompt matching the creative description>',
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

export function buildGenerationPrompt(idea, additionalInfo = '', opts = {}) {
  const title = idea?.title || '';
  const desc = idea?.description || '';
  const concise = extractImagePrompt(desc);
  const { hasInputImage = false, variantDirective = '' } = opts || {};
  const extra = additionalInfo?.trim()
    ? `\nAdditional Input (OVERRIDES; highest priority): ${additionalInfo.trim()}`
    : '';

  return [
    // Task + input mode
    'Task: Produce a photorealistic advertising image. Output an image, not text.',
    'Hard requirements: The product must be clearly visible, fully in frame, unobstructed, and recognizable; it is the primary subject (hero or co-hero). If any pose or prop would occlude the product, adjust pose, camera, or framing to reveal it.',
    hasInputImage
      ? 'Input mode: An input image is provided. Treat it as a reference for editing/extension. Preserve product identity, materials, and scene continuity. Do not remove, replace, or obscure the product. Remove any text/watermarks. Extend or refine the scene to fulfill the directive.'
      : 'Input mode: No reference image. Generate from scratch while staying faithful to the concept description and directive. Depict the product clearly with correct materials, proportions, and key features; avoid abstract interpretations that hide the product.',
    // Campaign + concept
    `Campaign: ${title}`,
    'Concept (art direction; sections are pipe-delimited " | "):',
    desc,
    concise ? `Primary rendering directive: ${concise}` : '',
    variantDirective ? `Variant directive: ${variantDirective}` : '',
    // Key constraints (compact and explicit)
    'Constraints: include humans using/enjoying the product; product is hero or co-hero, fully in frame, unobstructed, and undistorted. Reserve 20–35% clean negative space for copy (no overlaid text). Respect the specified negative-space location. No invented product features or third-party logos; no watermarks.',
    'Composition: center or rule-of-thirds placement that keeps the product dominant and readable; target roughly 25–40% frame occupancy for the product unless a wider establishing shot is explicitly requested, in which case keep the product clearly readable and still dominant in the scene.',
    'Focus: keep the product in sharp focus; use realistic depth of field to separate background; avoid motion blur on the product.',
    'Prohibited: frames where the product is cropped out, hidden behind hands/props, turned fully away, or only implied. If this happens, recompose to include the entire product clearly.',
    'Framing: primary aspect 4:5. When adapting to 16:9 or 9:16, crop/shift angle while preserving the copy-safe area and subject integrity.',
    'Look: follow lighting/mood/palette cues from the concept; maintain realism and natural skin tones; plausible anatomy and hands; realistic materials and reflections.',
    extra,
  ]
    .filter(Boolean)
    .join('\n');
}
