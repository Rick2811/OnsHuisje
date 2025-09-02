const STORAGE_KEY = "kookboek_tabs_v2";

const DEFAULT_TABS = [
  "Pastas", "soepen", "bakken", "schotels", "overig",
  "italiaans", "hollandse pot", "smoothies", "cocktails",
  "aziatisch", "korte bereiding", "mexiaans", "gezonde recepten",
  "toetjes", "streetfood",
];

let tabs = [];
let active = "";
let recipes = {}; // { tabName: ["recept1", "recept2", ...] }

const $list = document.getElementById("tabList");
const $addTab = document.getElementById("addBtn");
const $search = document.getElementById("search");
const $title = document.getElementById("activeTitle");
const $recipeList = document.getElementById("recipeList");
const $addRecipe = document.getElementById("addRecipeBtn");

(function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    tabs = saved?.tabs?.length ? saved.tabs : DEFAULT_TABS.slice();
    active = saved?.active && tabs.includes(saved.active) ? saved.active : tabs[0];
    recipes = saved?.recipes || {};
  } catch {
    tabs = DEFAULT_TABS.slice();
    active = tabs[0];
    recipes = {};
  }
  render();
})();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, active, recipes }));
}

function render() {
  const q = ($search.value || "").trim().toLowerCase();
  $list.innerHTML = "";

  const visible = !q ? tabs : tabs.filter(t => t.toLowerCase().includes(q));

  visible.forEach(name => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (name === active ? " active" : "");
    btn.type = "button";
    btn.onclick = () => setActive(name);

    const label = document.createElement("span");
    label.textContent = name;
    label.style.flex = "1";

    const actions = document.createElement("span");
    actions.className = "tab-actions";

    const del = document.createElement("button");
    del.className = "btn";
    del.style.cssText = "height:26px;width:26px;font-size:16px;";
    del.textContent = "×";
    del.title = "Verwijder tab";
    del.onclick = (e) => { e.stopPropagation(); removeTab(name); };

    actions.append(del);
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
  renderRecipes();
}

function renderRecipes() {
  $recipeList.innerHTML = "";
  if (!active) return;
  const list = recipes[active] || [];
  list.forEach((r, idx) => {
    const li = document.createElement("li");
    li.textContent = r;
    li.style.padding = "0.25rem 0";
    // klik om te verwijderen
    li.onclick = () => {
      if (confirm(`Recept "${r}" verwijderen?`)) {
        recipes[active].splice(idx, 1);
        save();
        renderRecipes();
      }
    };
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
  const name = (prompt("Naam van de nieuwe tab?") || "").trim();
  if (!name) return;
  if (tabs.some(t => t.toLowerCase() === name.toLowerCase())) {
    alert("Deze tab bestaat al.");
    return;
  }
  tabs.push(name);
  active = name;
  save();
  render();
}

function removeTab(name) {
  if (!confirm(`Tab "${name}" verwijderen?`)) return;
  tabs = tabs.filter(t => t !== name);
  delete recipes[name];
  if (active === name) active = tabs[0] || "";
  save();
  render();
}

function addRecipe() {
  if (!active) return;
  const name = (prompt(`Nieuw recept toevoegen in "${active}"?`) || "").trim();
  if (!name) return;
  recipes[active] = recipes[active] || [];
  recipes[active].push(name);
  save();
  renderRecipes();
}

// events
$addTab.addEventListener("click", addTab);
$search.addEventListener("input", render);
$addRecipe.addEventListener("click", addRecipe);
