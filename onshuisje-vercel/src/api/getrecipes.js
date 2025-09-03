import redis from './redis';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { tab } = req.query;

    if (!tab) {
      return res.status(400).json({ error: 'Tab is verplicht.' });
    }

    try {
      // Haal recepten op uit Redis
      const key = `recipes:${tab}`;
      const recipes = (await redis.get(key)) || [];

      return res.status(200).json({ recipes });
    } catch (error) {
      console.error('Fout bij het ophalen van recepten:', error);
      return res.status(500).json({ error: 'Er ging iets mis bij het ophalen.' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}