import { genAI } from '../gemini/client.js';
import { IMAGE_MODEL } from '../gemini/models.js';
import { buildGenerationPrompt } from '../gemini/prompts.js';
import { v4 as uuidv4 } from 'uuid';

function readJson(req, limitBytes = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(Object.assign(new Error('Payload too large'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        const json = raw ? JSON.parse(raw) : {};
        resolve(json);
      } catch (e) {
        reject(Object.assign(new Error('Invalid JSON'), { statusCode: 400 }));
      }
    });
    req.on('error', err => reject(err));
  });
}

function getVariantDirective(index = 0) {
  const variants = [
    // Variant A: medium shot, soft natural light, modern indoor
    'Diversity: Medium shot at ~45°; modern indoor setting; soft natural window light; warm palette; emphasize human-product interaction; keep the product fully in frame, unobstructed, and hero-visible; maintain specified negative-space location.',
    // Variant B: wide environmental, dynamic angle, golden hour outdoor
    'Diversity: Wide environmental shot; slight low-angle for dynamism; outdoor urban scene at golden hour; cool-warm mixed palette; keep the product fully in frame, unobstructed, and hero-visible; preserve copy-safe area per concept.',
    // Variant C: close-up detail with human touch, studio rim light
    'Diversity: Close-up detail with human hands; overhead/top-down variation; crisp studio lighting with subtle rim; neutral palette; keep the product fully in frame, unobstructed, and hero-visible; keep product textures realistic and copy area clean.',
  ];
  return variants[index % variants.length];
}

export async function generateOne({ title, description, additionalInfo = '', img = null, limit = 1, variantIndex = null }) {
  const hasInputImage = Boolean(img?.mimeType && img?.base64);
  const prompt = buildGenerationPrompt(
    { title, description },
    additionalInfo,
    { hasInputImage, variantDirective: Number.isInteger(variantIndex) ? getVariantDirective(variantIndex) : '' }
  );
  const contents = [{ text: prompt }];
  if (hasInputImage) {
    contents.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
  }

  async function callModelOnce(responseMimeType = 'image/png') {
    const response = await genAI.models.generateContent({
      model: IMAGE_MODEL,
      contents,
      generationConfig: { responseMimeType },
    });
    const imgs = [];
    const candidates = response?.candidates || [];
    for (const c of candidates) {
      const parts = c?.content?.parts || [];
      for (const p of parts) {
        if (p?.inlineData?.data && p?.inlineData?.mimeType) {
          imgs.push({ mimeType: p.inlineData.mimeType, base64: p.inlineData.data });
        }
      }
    }
    if (!imgs.length && Array.isArray(response?.content?.parts)) {
      for (const p of response.content.parts) {
        if (p?.inlineData?.data && p?.inlineData?.mimeType) {
          imgs.push({ mimeType: p.inlineData.mimeType, base64: p.inlineData.data });
        }
      }
    }
    return imgs;
  }

  const baseDelays = [0, 300, 800];
  let images = [];
  // Single response format (PNG) with light backoff retries
  for (let attempt = 0; attempt < baseDelays.length; attempt++) {
    try {
      const jitter = Math.floor(Math.random() * 120);
      const wait = baseDelays[attempt] + jitter;
      if (wait > 0) await new Promise(r => setTimeout(r, wait));
      images = await callModelOnce('image/png');
      if (images.length) break;
    } catch (_) {
      // continue to next attempt
    }
  }

  const out = images.slice(0, Math.max(1, limit)).map((m, idx) => ({
    id: uuidv4(),
    url: `data:${m.mimeType};base64,${m.base64}`,
    alt: `${title} – variation ${idx + 1}`,
  }));
  return out;
}

async function runWithConcurrency(items, worker, limit = 3) {
  const results = new Array(items.length);
  let idx = 0;
  const n = Math.min(limit, items.length);
  const workers = Array.from({ length: n }, async () => {
    while (true) {
      const i = idx++;
      if (i >= items.length) break;
      const item = items[i];
      results[i] = await worker(item, i);
    }
  });
  await Promise.all(workers);
  return results;
}

export async function generateVariants({ title, description, additionalInfo = '', img = null, count = 3, concurrency = 3 }) {
  const n = Math.max(1, Math.min(3, Number(count) || 1));
  const tasks = Array.from({ length: n }, (_, i) => ({ variantIndex: i }));
  const results = await runWithConcurrency(
    tasks,
    async t => {
      const imgs = await generateOne({ title, description, additionalInfo, img, limit: 1, variantIndex: t.variantIndex });
      return imgs[0] || null;
    },
    Math.max(1, Math.min(3, Number(concurrency) || 3))
  );
  return results.filter(Boolean);
}

export async function handleGenerate(req, res) {
  const contentType = (req.headers['content-type'] || '').split(';')[0];
  if (contentType !== 'application/json') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Expected application/json' } }));
    return;
  }

  try {
    const body = await readJson(req);
    const title = String(body?.title || '').trim();
    const description = String(body?.description || '').trim();
    const additionalInfo = String(body?.additionalInfo || '').trim();
    const count = Number(body?.count) || 1;
    const variantIndex = Number.isInteger(body?.variantIndex) ? Number(body.variantIndex) : null;
    const img = body?.image && typeof body.image === 'object' ? body.image : null;
    if (!title || !description) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Missing title or description' } }));
      return;
    }

    let images;
    if ((Number(count) || 1) > 1) {
      images = await generateVariants({ title, description, additionalInfo, img, count: Math.min(3, count), concurrency: 3 });
    } else {
      images = await generateOne({ title, description, additionalInfo, img, limit: 1, variantIndex });
    }

    if (!images.length) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'UPSTREAM_EMPTY', message: 'No image returned from model' } }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ images }));
  } catch (err) {
    console.error('[generate] error:', err);
    const status = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 502;
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Failed to generate image' } }));
  }
}
