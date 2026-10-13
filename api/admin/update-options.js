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
    const { password, options } = req.body;

    // Vérifier le mot de passe admin
    const adminPassword = process.env.ADMIN_PASSWORD || 'governorshouse2026';
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Valider les données
    if (!Array.isArray(options)) {
      return res.status(400).json({ error: 'Format de données invalide' });
    }

    // Sauvegarder dans Redis
    await redis.set('reservation_options', options);

    return res.status(200).json({
      success: true,
      message: 'Options mises à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating options:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
}
