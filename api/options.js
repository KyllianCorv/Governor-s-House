import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if force reset is requested
    const forceReset = req.query.force_reset === 'true';
    const password = req.query.password;
    const adminPassword = process.env.ADMIN_PASSWORD || 'governorshouse2026';

    // Récupérer les options depuis Upstash Redis
    let options = await redis.get('reservation_options');

    // Force reset if requested with correct password
    if (forceReset) {
      if (password !== adminPassword) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }
      options = null; // Force reinitialize
    }

    // Si pas d'options, initialiser avec des données par défaut
    if (!options) {
      options = [
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

      // Sauvegarder les données par défaut
      await redis.set('reservation_options', options);
    }

    // Filtrer pour ne retourner que les options activées
    const enabledOptions = options.filter(opt => opt.enabled);

    return res.status(200).json({ options: enabledOptions });
  } catch (error) {
    console.error('Error fetching options:', error);
    return res.status(500).json({ error: 'Failed to fetch options' });
  }
}
