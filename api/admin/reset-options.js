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
    const { password } = req.body;

    // Vérifier le mot de passe admin
    const adminPassword = process.env.ADMIN_PASSWORD || 'governorshouse2026';
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Réinitialiser les options avec les nouvelles valeurs
    const options = [
      {
        id: 'opt_transfert',
        label: 'Transfert',
        description: 'Prise en charge depuis votre hôtel jusqu\'au Sunset Café, Grand Baie, avec retour en fin de journée',
        price: 0,
        priceLabel: 'sur demande',
        enabled: true,
        locked: false
      },
      {
        id: 'opt_speedboat',
        label: 'Speedboat privé',
        description: 'Traversée exclusive, rien que pour vous — entre récifs et eaux cristallines du lagon',
        price: 0,
        priceLabel: 'sur demande',
        enabled: true,
        locked: false
      },
      {
        id: 'opt_champagne',
        label: 'Champagne',
        description: 'Une bouteille servie à l\'arrivée ou au coucher du soleil sur la terrasse, selon votre humeur',
        price: 0,
        priceLabel: 'sur demande',
        enabled: true,
        locked: false
      },
      {
        id: 'opt_photo',
        label: 'Photographe',
        description: 'Un photographe discret pour immortaliser la journée sans que vous ayez à y penser',
        price: 0,
        priceLabel: 'à confirmer',
        enabled: true,
        locked: false
      }
    ];

    // Forcer la mise à jour dans Redis
    await redis.set('reservation_options', options);

    return res.status(200).json({
      success: true,
      message: 'Options réinitialisées avec succès',
      options: options
    });
  } catch (error) {
    console.error('Error resetting options:', error);
    return res.status(500).json({ error: 'Erreur lors de la réinitialisation' });
  }
}
