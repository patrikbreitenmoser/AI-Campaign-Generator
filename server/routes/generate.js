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

    async function callModelOnce(responseMimeType = 'image/png') {
      const response = await genAI.models.generateContent({
        model: IMAGE_MODEL,
        contents,
        // Request inline image bytes; some models are sensitive to mime type
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

    // Retry strategy: try multiple mime types with backoff + jitter
    const mimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
    const baseDelays = [0, 300, 800];
    let images = [];
    for (const mime of mimeTypes) {
      for (let attempt = 0; attempt < baseDelays.length; attempt++) {
        try {
          const jitter = Math.floor(Math.random() * 120);
          const wait = baseDelays[attempt] + jitter;
          if (wait > 0) await new Promise(r => setTimeout(r, wait));
          images = await callModelOnce(mime);
          if (images.length) {
            // Found images, break out of both loops
            attempt = baseDelays.length; // escape inner
            break;
          }
        } catch (e) {
          // Log and continue to next attempt or mime type
          console.warn('[generate] retry', { mime, attempt: attempt + 1, error: e?.message || String(e) });
          if (attempt === baseDelays.length - 1) {
            // move to next mime type
          }
        }
      }
      if (images.length) break;
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
