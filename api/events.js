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
    // Récupérer les événements depuis Upstash Redis
    let events = await redis.get('carousel_events');

    // Si pas d'événements, initialiser avec des données par défaut
    if (!events) {
      events = [
        {
          id: 1,
          image: '/images/event-1.jpg',
          title: 'Soirée Beach Club',
          date: '2026-11-15',
          description: 'DJ set sur la plage au coucher du soleil',
          formules: ['sable'], // Formules disponibles pour cet événement
          reservationDate: '2026-11-15', // Date de réservation (peut être différente de date)
          preselectedOptions: ['opt_snorkeling'], // Options pré-cochées
          lockedOptions: ['opt_snorkeling'] // Options bloquées (non modifiables)
        },
        {
          id: 2,
          image: '/images/event-2.jpg',
          title: 'Menu Spécial Homard',
          date: '2026-11-20',
          description: 'Découvrez notre menu gastronomique',
          formules: ['gouverneur'],
          reservationDate: '2026-11-20',
          preselectedOptions: ['opt_snorkeling', 'opt_boissons'],
          lockedOptions: ['opt_snorkeling']
        },
        {
          id: 3,
          image: '/images/event-3.jpg',
          title: 'Privatisation Disponible',
          date: '2026-12-01',
          description: 'L\'île entière pour votre événement',
          formules: ['gouverneur', 'sable'], // Plusieurs formules disponibles
          reservationDate: '2026-12-01',
          preselectedOptions: ['opt_snorkeling'],
          lockedOptions: []
        }
      ];

      // Sauvegarder les données par défaut
      await redis.set('carousel_events', events);
    }

    return res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
}
