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
    const img = body?.image && typeof body.image === 'object' ? body.image : null;
    if (!title || !description) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Missing title or description' } }));
      return;
    }

    const prompt = buildGenerationPrompt({ title, description }, additionalInfo);
    const contents = [{ text: prompt }];
    if (img?.mimeType && img?.base64) {
      contents.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
    }

    const response = await genAI.models.generateContent({
      model: IMAGE_MODEL,
      contents,
    });

    // Collect inlineData parts from all candidates
    const images = [];
    const candidates = response?.candidates || [];
    for (const c of candidates) {
      const parts = c?.content?.parts || [];
      for (const p of parts) {
        if (p?.inlineData?.data && p?.inlineData?.mimeType) {
          images.push({ mimeType: p.inlineData.mimeType, base64: p.inlineData.data });
        }
      }
    }

    // Fallback: some SDK responses flatten parts at top-level
    if (!images.length && Array.isArray(response?.content?.parts)) {
      for (const p of response.content.parts) {
        if (p?.inlineData?.data && p?.inlineData?.mimeType) {
          images.push({ mimeType: p.inlineData.mimeType, base64: p.inlineData.data });
        }
      }
    }

    // Limit to 1 image (minimal iteration)
    const one = images.slice(0, 1).map((m, idx) => ({
      id: uuidv4(),
      url: `data:${m.mimeType};base64,${m.base64}`,
      alt: `${title} – variation ${idx + 1}`,
    }));

    if (!one.length) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'UPSTREAM_EMPTY', message: 'No image returned from model' } }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ images: one }));
  } catch (err) {
    console.error('[generate] error:', err);
    const status = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 502;
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Failed to generate image' } }));
  }
}

