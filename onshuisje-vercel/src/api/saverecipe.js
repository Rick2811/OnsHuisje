import redis from './redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tab, recipe } = req.body;

    if (!tab || !recipe) {
      return res.status(400).json({ error: 'Tab en recept zijn verplicht.' });
    }

    // Voeg het recept toe aan de Redis-database
    const key = `recipes:${tab}`;
    const existingRecipes = (await redis.get(key)) || [];
    existingRecipes.push(recipe);

    await redis.set(key, existingRecipes);

    return res.status(200).json({ message: 'Recept opgeslagen!' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}