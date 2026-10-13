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
    // Récupérer les options depuis Upstash Redis
    let options = await redis.get('reservation_options');

    // Si pas d'options, initialiser avec des données par défaut
    if (!options) {
      options = [
        {
          id: 'opt_transfert',
          label: 'Transfert hôtel',
          description: 'Service de transfert depuis votre hôtel',
          price: 0,
          priceLabel: 'sur demande',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_speedboat',
          label: 'Speedboat privé',
          description: 'Traversée en speedboat privatif',
          price: 0,
          priceLabel: 'sur devis',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_chef',
          label: 'Cuisinier privé',
          description: 'Chef cuisinier dédié pour votre groupe',
          price: 0,
          priceLabel: 'sur demande',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_boissons',
          label: 'Carte des vins et cocktails',
          description: 'Sélection premium de vins et cocktails',
          price: 0,
          priceLabel: 'sur demande',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_champagne',
          label: 'Champagne',
          description: 'Bouteille de champagne',
          price: 0,
          priceLabel: 'sur demande',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_snorkeling',
          label: 'Snorkeling',
          description: 'Masques et tubas fournis',
          price: 0,
          priceLabel: 'inclus',
          enabled: true,
          locked: true
        },
        {
          id: 'opt_photo',
          label: 'Photographe',
          description: 'Photographe professionnel pour la journée',
          price: 0,
          priceLabel: 'sur demande',
          enabled: true,
          locked: false
        },
        {
          id: 'opt_massage',
          label: 'Massage',
          description: 'Massage bien-être sur la plage',
          price: 0,
          priceLabel: 'sur demande',
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
