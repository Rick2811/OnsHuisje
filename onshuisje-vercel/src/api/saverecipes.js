import redis from './redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tab, recipe } = req.body;

    if (!tab || !recipe) {
      return res.status(400).json({ error: 'Tab en recept zijn verplicht.' });
    }

    // Haal bestaande recepten op of maak een nieuwe lijst
    const key = `recipes:${tab}`;
    const existingRecipes = (await redis.get(key)) || [];
    existingRecipes.push(recipe);

    // Sla de nieuwe lijst op in Redis
    await redis.set(key, existingRecipes);

    return res.status(200).json({ message: 'Recept opgeslagen!' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}