import React, { useState, useEffect } from 'react';

function WebsiteEntrance() {
  const [tab, setTab] = useState('');
  const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [tabs, setTabs] = useState([
    "Pastas", "soepen", "bakken", "schotels", "overig", "italiaans", "hollandse pot",
    "smoothies", "cocktails", "aziatisch", "korte bereiding", "mexiaans",
    "gezonde recepten", "toetjes", "streetfood",
  ]);

  // Haal recepten op wanneer de tab verandert
  useEffect(() => {
    if (tab) {
      fetchRecipes();
    }   console.log('Tabs:', tabs);
  }
  , [tab]);

  async function saveRecipe() {
    if (!tab || !recipe) {
      alert('Tab en recept zijn verplicht.');
      return;
    }

    const response = await fetch('/api/saverecipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tab, recipe }),
    });

    if (response.ok) {
      alert('Recept opgeslagen!');
      fetchRecipes(); // Haal de nieuwste recepten op
      setRecipe(''); // Reset het invoerveld
    } else {
      alert('Er ging iets mis bij het opslaan.');
    }
  }

  async function fetchRecipes() {
    const response = await fetch(`/api/getRecipes?tab=${tab}`);
    if (response.ok) {
      const data = await response.json();
      setRecipes(data.recipes); // Update de state met de opgehaalde recepten
    } else {
      alert('Er ging iets mis bij het ophalen van recepten.');
    }
  }

  function addTab() {
      console.log('addTab functie wordt aangeroepen');
    const newTab = prompt('Naam van de nieuwe categorie?').trim();
    if (!newTab) return;
    if (tabs.includes(newTab)) {
      alert('Deze tab bestaat al.');
      return;
    }
    setTabs([...tabs, newTab]);
    setTab(newTab); // Stel de nieuwe tab in als actief
  }

  return (
    <div>
      <h1>Kookboek</h1>

      {/* Tabs */}
      <div>
        <h2>Categorieën</h2>
        <ul>
          {tabs.map((t) => (
            <li
              key={t}
              onClick={() => setTab(t)}
              style={{
                cursor: 'pointer',
                fontWeight: t === tab ? 'bold' : 'normal',
              }}
            >
              {t}
            </li>
          ))}
        </ul>
        <button onClick={addTab}>Nieuwe categorie toevoegen</button>
      </div>

      {/* Recept toevoegen */}
      <div>
        <h2>Recept toevoegen aan: {tab || 'Geen categorie geselecteerd'}</h2>
        <textarea
          placeholder="Voeg een recept toe"
          value={recipe}
          onChange={(e) => setRecipe(e.target.value)}
        />
        <button onClick={saveRecipe}>Opslaan</button>
      </div>

      {/* Recepten weergeven */}
      <div>
        <h2>Recepten in categorie: {tab}</h2>
        <ul>
          {recipes.length > 0 ? (
            recipes.map((r, index) => <li key={index}>{r}</li>)
          ) : (
            <li>Nog geen recepten in deze categorie.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default WebsiteEntrance;