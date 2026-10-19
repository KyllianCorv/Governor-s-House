import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password, key, fr, en } = req.body;

    // Vérifier le mot de passe admin
    const adminPassword = process.env.ADMIN_PASSWORD || 'governorshouse2026';
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Valider les données
    const isText = (s, max) => typeof s === 'string' && s.length <= max;
    if (!isText(key, 2000) || !key.trim() || !isText(fr, 5000) || !isText(en, 5000)) {
      return res.status(400).json({ error: 'Format de données invalide' });
    }

    // Les deux champs vides = retour au texte d'origine du code
    if (!fr.trim() && !en.trim()) {
      await redis.hdel('site_texts', key);
    } else {
      await redis.hset('site_texts', { [key]: { fr: fr.trim(), en: en.trim() } });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating texts:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
}
