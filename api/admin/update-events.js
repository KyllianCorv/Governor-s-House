import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Mot de passe admin (à changer!)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'governorshouse2026';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password, events } = req.body;

    // Vérifier le mot de passe
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Valider les données
    if (!Array.isArray(events)) {
      return res.status(400).json({ error: 'Format invalide' });
    }

    // Sauvegarder dans Upstash Redis
    await redis.set('carousel_events', events);

    return res.status(200).json({
      success: true,
      message: 'Événements mis à jour avec succès',
      events
    });
  } catch (error) {
    console.error('Error updating events:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
}
