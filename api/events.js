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
          formules: ['beachclub'], // Formule Beach Club avec traversée
          reservationDate: '2026-11-15',
          preselectedOptions: [], // Options pré-cochées
          lockedOptions: [] // Options bloquées (non modifiables)
        },
        {
          id: 2,
          image: '/images/event-2.jpg',
          title: 'Menu Spécial Homard',
          date: '2026-11-20',
          description: 'Découvrez notre menu gastronomique',
          formules: ['gouverneur'],
          reservationDate: '2026-11-20',
          preselectedOptions: ['opt_champagne'],
          lockedOptions: ['opt_champagne']
        },
        {
          id: 3,
          image: '/images/event-3.jpg',
          title: 'Privatisation Disponible',
          date: '2026-12-01',
          description: 'L\'île entière pour votre événement',
          formules: ['gouverneur', 'beachclub', 'sable'], // Plusieurs formules disponibles
          reservationDate: '2026-12-01',
          preselectedOptions: [],
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
