import Busboy from 'busboy';
import { genAI } from '../gemini/client.js';
import { VISION_MODEL } from '../gemini/models.js';
import { buildAnalysisPrompt } from '../gemini/prompts.js';
import { v4 as uuidv4 } from 'uuid';

// Minimal, focused handler for POST /api/analyze
export async function handleAnalyze(req, res) {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Expected multipart/form-data' } }));
    return;
  }

  const busboy = Busboy({ headers: req.headers });
  let fileBuffer = Buffer.alloc(0);
  let fileMime = '';
  let additionalInfo = '';
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB
  let aborted = false;
  let responded = false;

  busboy.on('file', (_fieldname, file, info) => {
    fileMime = info.mimeType || info.mimetype || '';
    if (!fileMime.startsWith('image/')) {
      aborted = true;
      file.resume();
      if (!responded) {
        responded = true;
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Only image/* is allowed' } }));
      }
      return;
    }
    file.on('data', chunk => {
      fileBuffer = Buffer.concat([fileBuffer, chunk]);
      if (fileBuffer.length > MAX_BYTES && !aborted) {
        aborted = true;
        if (!responded) {
          responded = true;
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Image exceeds 5MB limit' } }));
        }
        file.resume();
      }
    });
  });

  busboy.on('field', (name, val) => {
    if (name === 'additionalInfo') {
      additionalInfo = String(val || '');
    }
  });

  busboy.on('error', err => {
    console.error('[analyze] busboy error:', err);
    if (!responded) {
      responded = true;
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { code: 'BAD_MULTIPART', message: 'Invalid upload' } }));
    }
  });

  busboy.on('finish', async () => {
    if (aborted) return;
    if (!fileBuffer.length || !fileMime) {
      if (!responded) {
        responded = true;
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { code: 'BAD_REQUEST', message: 'Missing image file' } }));
      }
      return;
    }

    try {
      const base64 = fileBuffer.toString('base64');
      const contents = [
        { inlineData: { mimeType: fileMime, data: base64 } },
        { text: buildAnalysisPrompt(additionalInfo) },
      ];

      const response = await genAI.models.generateContent({
        model: VISION_MODEL,
        contents,
        generationConfig: { responseMimeType: 'application/json' },
      });

      const raw = response.text;
      let ideasJson;
      try {
        ideasJson = JSON.parse(raw);
      } catch (_) {
        // Strip code fences and try to extract a JSON object containing "ideas"
        const cleaned = String(raw || '')
          .replace(/```(?:json)?/gi, '')
          .trim();
        let extracted = '';
        const ideasObjRegex = /\{[\s\S]*?"ideas"\s*:\s*\[[\s\S]*?\][\s\S]*?\}/m;
        const m = cleaned.match(ideasObjRegex);
        if (m) {
          extracted = m[0];
        } else {
          const start = cleaned.indexOf('{');
          const end = cleaned.lastIndexOf('}');
          if (start !== -1 && end !== -1 && end > start) extracted = cleaned.slice(start, end + 1);
        }
        if (!extracted) throw new Error('Model did not return valid JSON');
        ideasJson = JSON.parse(extracted);
      }

      let ideas = Array.isArray(ideasJson?.ideas) ? ideasJson.ideas : [];
      ideas = ideas
        .slice(0, 3)
        .map((it, idx) => ({
          id: uuidv4(),
          title: String(it?.title || `Idea ${idx + 1}`),
          description: String(it?.description || ''),
        }));
      while (ideas.length < 3) {
        ideas.push({ id: uuidv4(), title: `Idea ${ideas.length + 1}`, description: '' });
      }

      if (!responded) {
        responded = true;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ideas }));
      }
    } catch (err) {
      console.error('[analyze] error:', err);
      if (!responded) {
        responded = true;
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { code: 'UPSTREAM_ERROR', message: 'Failed to analyze image' } }));
      }
    }
  });

  req.pipe(busboy);
}
