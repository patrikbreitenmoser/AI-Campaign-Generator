import { v4 as uuidv4 } from 'uuid';
import { generateOne } from './generate.js';

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

async function runWithConcurrency(items, worker, limit = 3) {
  const results = new Array(items.length);
  let idx = 0;
  const workers = new Array(Math.min(limit, items.length)).fill(null).map(async () => {
    while (true) {
      const myIndex = idx++;
      if (myIndex >= items.length) break;
      const item = items[myIndex];
      try {
        results[myIndex] = await worker(item, myIndex);
      } catch (e) {
        results[myIndex] = { id: item.id ?? `item-${myIndex + 1}`, error: { message: e?.message || String(e) } };
      }
    }
  });
  await Promise.all(workers);
  return results;
}

export async function handleGenerateBatch(req, res) {
  const contentType = (req.headers['content-type'] || '').split(';')[0];
  if (contentType !== 'application/json') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Expected application/json' } }));
    return;
  }

  try {
    const body = await readJson(req);
    const items = Array.isArray(body?.items) ? body.items : [];
    const additionalInfo = String(body?.additionalInfo || '').trim();
    const concurrency = Math.max(1, Math.min(3, Number(body?.concurrency) || 3));
    if (!items.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Missing items[]' } }));
      return;
    }

    const normalized = items.map((it, i) => ({
      id: String(it?.id || uuidv4()),
      title: String(it?.title || '').trim(),
      description: String(it?.description || '').trim(),
      // per-item override takes precedence over batch additionalInfo
      additionalInfo: String(it?.additionalInfo || additionalInfo || '').trim(),
      image: it?.image && typeof it.image === 'object' ? it.image : null,
      _index: i,
    }));

    const invalid = normalized.find(n => !n.title || !n.description);
    if (invalid) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Each item must include title and description' } })
      );
      return;
    }

    const results = await runWithConcurrency(
      normalized,
      async n => {
        const images = await generateOne({
          title: n.title,
          description: n.description,
          additionalInfo: n.additionalInfo,
          img: n.image,
          limit: 1,
        });
        return { id: n.id, images };
      },
      concurrency
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ results }));
  } catch (err) {
    console.error('[generate-batch] error:', err);
    const status = err?.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 502;
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Failed to generate images' } }));
  }
}

