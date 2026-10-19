import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // { "texte FR d'origine": { fr, en } } — textes modifiés depuis le mode édition
    const texts = await redis.hgetall('site_texts');
    return res.status(200).json({ texts: texts || {} });
  } catch (error) {
    console.error('Error fetching texts:', error);
    return res.status(500).json({ error: 'Failed to fetch texts' });
  }
}
