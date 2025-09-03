import redis from './redis';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { tab } = req.query;

    if (!tab) {
      return res.status(400).json({ error: 'Tab is verplicht.' });
    }

    // Haal recepten op uit Redis
    const key = `recipes:${tab}`;
    const recipes = (await redis.get(key)) || [];

    return res.status(200).json({ recipes });
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}