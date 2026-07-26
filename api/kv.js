const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const response = await fetch(REDIS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { action, key, value, prefix } = req.body || {};

  try {
    if (action === 'get') {
      if (!key) throw new Error('key required');
      const result = await redis(['GET', key]);
      res.status(200).json({ value: result });
    } else if (action === 'set') {
      if (!key || value === undefined) throw new Error('key and value required');
      await redis(['SET', key, value]);
      res.status(200).json({ ok: true });
    } else if (action === 'delete') {
      if (!key) throw new Error('key required');
      await redis(['DEL', key]);
      res.status(200).json({ ok: true });
    } else if (action === 'list') {
      if (!prefix) throw new Error('prefix required');
      const keys = await redis(['KEYS', prefix + '*']);
      res.status(200).json({ keys: keys || [] });
    } else {
      res.status(400).json({ error: 'Unknown action' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
