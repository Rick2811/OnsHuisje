<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======

<<<<<<< HEAD
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

const STORAGE_KEY = "kookboek_tabs_v5";
>>>>>>> parent of eabc74e (s)

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
    }
  }, [tab]);

  async function saveRecipe() {
    if (!tab || !recipe) {
      alert('Tab en recept zijn verplicht.');
      return;
    }

    const response = await fetch('/api/saverecipes', {
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
    const response = await fetch(`/api/getrecipes?tab=${tab}`);
    if (response.ok) {
      const data = await response.json();
      setRecipes(data.recipes); // Update de state met de opgehaalde recepten
    } else {
      alert('Er ging iets mis bij het ophalen van recepten.');
    }
  }

  function addTab() {
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

<<<<<<< HEAD
export default WebsiteEntrance;
=======
// ---------- Mutaties ----------
function setActive(name) { active = name; save(); render(); }

function addTab() {
  const name = (prompt("Naam van de nieuwe categorie?") || "").trim();
  if (!name) return;
  if (tabs.some(t => t.toLowerCase() === name.toLowerCase())) { alert("Bestaat al."); return; }
  tabs.push(name); active = name; save(); render();
}

function removeTab(name) {
  tabs = tabs.filter(t => t !== name);
  delete recipes[name];
  if (active === name) active = tabs[0] || "";
  save(); render();
}

function renameTab(name) {
  const next = (prompt("Nieuwe naam voor deze categorie:", name) || "").trim();
  if (!next || next === name) return;
  if (tabs.some(t => t.toLowerCase() === next.toLowerCase())) { alert("Bestaat al."); return; }
  if (recipes[name]) { recipes[next] = recipes[name]; delete recipes[name]; }
  tabs = tabs.map(t => (t === name ? next : t));
  if (active === name) active = next;
  save(); render();
}

// ---------- Recepten ----------
$addRecipeBtn?.addEventListener("click", () => {
  if (!active) return;
  $fTitle.value = ""; $fPrep.value = ""; $fCook.value = "";
  $fIngr.value = ""; $fSteps.value = "";
  $dlg.showModal(); setTimeout(() => $fTitle.focus(), 0);
});

$form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const rec = {
    title: $fTitle.value.trim(),
    prep: Number($fPrep.value || 0),
    cook: Number($fCook.value || 0),
    ingredients: ($fIngr.value || "").split(/\r?\n/).map(s=>s.trim()).filter(Boolean),
    steps: $fSteps.value.trim(),
  };
  if (!rec.title) { $fTitle.focus(); return; }
  recipes[active] = recipes[active] || [];
  recipes[active].push(rec);
  save(); renderRecipes(); $dlg.close();
});

document.getElementById("cancelRecipe")?.addEventListener("click", () => $dlg.close());

// ---------- Helpers ----------
function mkSmallBtn(text, title) {
  const b = document.createElement("button");
  b.className = "btn"; b.style.height = "26px"; b.style.width = "26px"; b.style.padding = "0"; b.style.fontSize="16px";
  b.title = title; b.textContent = text; return b;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,(m)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));}

// Events
$add?.addEventListener("click", addTab);
$search?.addEventListener("input", render);
>>>>>>> parent of 3af1a47 (update databasse via vercel)
>>>>>>> parent of eabc74e (s)
