// Eenvoudige tabs + recepten in vanilla JS – geen frameworks
const STORAGE_KEY = "kookboek_tabs_v2";

const DEFAULT_TABS = [
  "Pastas",
  "soepen",
  "bakken",
  "schotels",
  "overig",
  "italiaans",
  "hollandse pot",
  "smoothies",
  "cocktails",
  "aziatisch",
  "korte bereiding",
  "mexiaans",
  "gezonde recepten",
  "toetjes",
  "streetfood",
];

let tabs = [];
let active = "";
let recipes = {}; // { tabName: ["recept 1", "recept 2", ...] }

const $list = document.getElementById("tabList");
const $add = document.getElementById("addBtn");
const $search = document.getElementById("search");
const $title = document.getElementById("activeTitle");
const $name = document.getElementById("activeName");

// nieuw voor recepten
const $addRecipe = document.getElementById("addRecipeBtn");
const $recipeList = document.getElementById("recipeList");

// --- initial load
(function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    tabs = Array.isArray(saved?.tabs) && saved.tabs.length ? saved.tabs : DEFAULT_TABS.slice();
    active = saved?.active && tabs.includes(saved.active) ? saved.active : tabs[0];
    recipes = saved?.recipes || {};
  } catch (_) {
    tabs = DEFAULT_TABS.slice();
    active = tabs[0];
    recipes = {};
  }
  render();
})();

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, active, recipes }));
  } catch (_) {}
}

function render() {
  const q = ($search.value || "").trim().toLowerCase();
  $list.innerHTML = "";

  const visible = !q ? tabs : tabs.filter((t) => t.toLowerCase().includes(q));

  visible.forEach((name) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.className = "tab-btn" + (name === active ? " active" : "");
    btn.setAttribute("type", "button");
    btn.onclick = () => setActive(name);

    const label = document.createElement("span");
    label.textContent = name;
    label.style.flex = "1";
    label.style.overflow = "hidden";
    label.style.textOverflow = "ellipsis";
    label.style.whiteSpace = "nowrap";

    const actions = document.createElement("span");
    actions.className = "tab-actions";

    const del = document.createElement("button");
    del.className = "btn";
    del.style.height = "26px";
    del.style.width = "26px";
    del.style.fontSize = "16px";
    del.title = "Verwijder tab";
    del.setAttribute("aria-label", "Verwijder tab");
    del.textContent = "×";
    del.onclick = (e) => {
      e.stopPropagation();
      removeTab(name);
    };

    const rename = document.createElement("button");
    rename.className = "btn";
    rename.style.height = "26px";
    rename.style.width = "26px";
    rename.style.fontSize = "14px";
    rename.title = "Hernoem tab";
    rename.setAttribute("aria-label", "Hernoem tab");
    rename.textContent = "✎";
    rename.onclick = (e) => {
      e.stopPropagation();
      renameTab(name);
    };

    actions.append(rename, del);
    btn.append(label, actions);
    li.appendChild(btn);
    $list.appendChild(li);
  });

  if (visible.length === 0) {
    const li = document.createElement("li");
    li.className = "muted";
    li.style.padding = ".5rem .75rem";
    li.textContent = "Geen resultaten…";
    $list.appendChild(li);
  }

  $title.textContent = active || "Geen tab geselecteerd";
  $name.textContent = active || "—";

  renderRecipes(); // <- receptenlijst opnieuw tekenen
}

function renderRecipes() {
  if (!$recipeList) return;
  $recipeList.innerHTML = "";

  if (!active) return;

  const list = recipes[active] || [];
  list.forEach((r, idx) => {
    const li = document.createElement("li");
    li.style.padding = "0.25rem 0";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = ".5rem";
    row.style.justifyContent = "space-between";

    const name = document.createElement("span");
    name.textContent = r;

    const del = document.createElement("button");
    del.className = "btn";
    del.style.height = "26px";
    del.style.width = "26px";
    del.style.fontSize = "16px";
    del.title = "Verwijder recept";
    del.textContent = "×";
    del.onclick = () => {
      if (confirm(`Recept "${r}" verwijderen?`)) {
        recipes[active].splice(idx, 1);
        save();
        renderRecipes();
      }
    };

    row.append(name, del);
    li.appendChild(row);
    $recipeList.appendChild(li);
  });

  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "muted";
    li.textContent = "Nog geen recepten in deze categorie.";
    $recipeList.appendChild(li);
  }
}

function setActive(name) {
  active = name;
  save();
  render();
}

function addTab() {
  const name = (window.prompt("Naam van de nieuwe tab?") || "").trim();
  if (!name) return;
  if (tabs.some((t) => t.toLowerCase() === name.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  tabs.push(name);
  active = name;
  save();
  render();
}

function removeTab(name) {
  if (!window.confirm(`Tab "${name}" verwijderen?`)) return;
  tabs = tabs.filter((t) => t !== name);
  delete recipes[name];
  if (active === name) active = tabs[0] || "";
  save();
  render();
}

function renameTab(name) {
  const next = (window.prompt("Nieuwe naam voor deze tab:", name) || "").trim();
  if (!next || next === name) return;
  if (tabs.some((t) => t.toLowerCase() === next.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  // verplaats recepten mee naar de nieuwe naam
  if (recipes[name]) {
    recipes[next] = recipes[name];
    delete recipes[name];
  }
  tabs = tabs.map((t) => (t === name ? next : t));
  if (active === name) active = next;
  save();
  render();
}

// recepten toevoegen
function addRecipe() {
  if (!active) return;
  const recipename = (window.prompt(`Nieuw recept toevoegen in "${active}"?`) || "").trim();
  if (!recipename) return;
  recipes[active] = recipes[active] || [];
  recipes[active].push(recipename);
  save();
  renderRecipes();
}

// events
$add.addEventListener("click", addTab);
$search.addEventListener("input", render);
if ($addRecipe) $addRecipe.addEventListener("click", addRecipe);
