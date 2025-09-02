// api/recipes.js  — Vercel Serverless Function (Node.js, CommonJS)
const { kv } = require('@vercel/kv');

const KEY = 'kookboek:data';

// body naar JSON lezen (Vercel Node functions geven geen parsed body)
function readJson(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch { resolve({}); }
    });
  });
}

module.exports = async (req, res) => {
  // eenvoudige CORS + cache uit
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const data = await kv.get(KEY);
      return res.status(200).json(data || null);
    }

    if (req.method === 'POST') {
      const body = await readJson(req);
      if (body?.type === 'set-all' && body?.data) {
        await kv.set(KEY, body.data);       // alles in één keer overschrijven
        return res.status(200).json({ ok: true });
      }
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    res.setHeader('Allow', 'GET,POST,OPTIONS');
    return res.status(405).end('Method Not Allowed');
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
