import { createServer } from 'node:http';
import { URL } from 'node:url';
import 'dotenv/config';
import { handleAnalyze } from './routes/analyze.js';
import { handleGenerate } from './routes/generate.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Fail fast if missing API key (we'll call Gemini in later tasks)
if (!process.env.GOOGLE_API_KEY) {
  console.error('[server] Missing GOOGLE_API_KEY in environment. Set it in a .env file or env var.');
  process.exit(1);
}

const server = createServer((req, res) => {
  try {
    setCors(res);

    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    const url = new URL(req.url || '/', `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/api/health') {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/analyze') {
      return handleAnalyze(req, res);
    }

    if (req.method === 'POST' && url.pathname === '/api/generate') {
      return handleGenerate(req, res);
    }

    // Not found
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Route not found' } }));
  } catch (err) {
    console.error('[server] request handler error:', err);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.end(JSON.stringify({ error: { code: 'INTERNAL_ERROR', message: 'Server error' } }));
  }
});

server.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
