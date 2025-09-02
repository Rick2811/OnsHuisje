// Tabs + recepten in vanilla JS – geen frameworks
const STORAGE_KEY = "kookboek_tabs_v3";

const DEFAULT_TABS = [
  "Pastas","soepen","bakken","schotels","overig","italiaans","hollandse pot",
  "smoothies","cocktails","aziatisch","korte bereiding","mexiaans",
  "gezonde recepten","toetjes","streetfood",
];

let tabs = [];
let active = "";
let recipes = {}; // { tabName: [{title, prep, cook, ingredients[], steps}], ... }

const $list = document.getElementById("tabList");
const $add = document.getElementById("addBtn");
const $search = document.getElementById("search");
const $title = document.getElementById("activeTitle");
const $name = document.getElementById("activeName");

// recepten UI
const $addRecipeBtn = document.getElementById("addRecipeBtn");
const $recipeList = document.getElementById("recipeList");
const $dlg = document.getElementById("recipeDialog");
const $form = document.getElementById("recipeForm");
const $fTitle = document.getElementById("fTitle");
const $fPrep  = document.getElementById("fPrep");
const $fCook  = document.getElementById("fCook");
const $fIngr  = document.getElementById("fIngr");
const $fSteps = document.getElementById("fSteps");

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
  const q = ($search?.value || "").trim().toLowerCase();
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
    del.onclick = (e) => { e.stopPropagation(); removeTab(name); };

    const rename = document.createElement("button");
    rename.className = "btn";
    rename.style.height = "26px";
    rename.style.width = "26px";
    rename.style.fontSize = "14px";
    rename.title = "Hernoem tab";
    rename.setAttribute("aria-label", "Hernoem tab");
    rename.textContent = "✎";
    rename.onclick = (e) => { e.stopPropagation(); renameTab(name); };

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
  renderRecipes();
}

function renderRecipes() {
  if (!$recipeList) return;
  $recipeList.innerHTML = "";
  if (!active) return;

  const list = recipes[active] || [];
  list.forEach((rec, idx) => {
    const li = document.createElement("li");
    li.style.border = "1px solid #e5e7eb";
    li.style.borderRadius = "10px";
    li.style.padding = ".6rem .75rem";
    li.style.margin = ".4rem 0";
    li.style.background = "#fff";

    const head = document.createElement("div");
    head.style.display = "flex";
    head.style.alignItems = "center";
    head.style.justifyContent = "space-between";
    head.style.gap = ".5rem";

    const h = document.createElement("div");
    h.innerHTML = `<strong>${escapeHtml(rec.title)}</strong>
      <span class="chip" style="margin-left:.35rem">${(rec.prep||0)} min prep</span>
      <span class="chip" style="margin-left:.25rem">${(rec.cook||0)} min koken</span>`;

    const del = document.createElement("button");
    del.className = "btn";
    del.style.height = "26px";
    del.style.width = "26px";
    del.style.fontSize = "16px";
    del.title = "Verwijder recept";
    del.textContent = "×";
    del.onclick = () => {
      // eigen 'confirm' UI vermijden? Dan direct verwijderen:
      recipes[active].splice(idx, 1);
      save();
      renderRecipes();
    };

    head.append(h, del);

    const body = document.createElement("div");
    body.style.marginTop = ".5rem";
    const ingrs = (rec.ingredients || []).map(escapeHtml).join("<br>");
    body.innerHTML =
      `<div class="muted" style="margin:.25rem 0 .35rem;"><em>Ingrediënten</em></div>
       <div style="white-space:pre-line">${ingrs || "—"}</div>
       <div class="muted" style="margin:.75rem 0 .35rem;"><em>Uitleg</em></div>
       <div style="white-space:pre-line">${escapeHtml(rec.steps || "")}</div>`;

    li.append(head, body);
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
  if (tabs.some(t => t.toLowerCase() === name.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  tabs.push(name);
  active = name;
  save();
  render();
}

function removeTab(name) {
  // geen window.confirm om ESLint-fouten te vermijden; direct verwijderen
  tabs = tabs.filter(t => t !== name);
  delete recipes[name];
  if (active === name) active = tabs[0] || "";
  save();
  render();
}

function renameTab(name) {
  const next = (window.prompt("Nieuwe naam voor deze tab:", name) || "").trim();
  if (!next || next === name) return;
  if (tabs.some(t => t.toLowerCase() === next.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  if (recipes[name]) {
    recipes[next] = recipes[name];
    delete recipes[name];
  }
  tabs = tabs.map(t => (t === name ? next : t));
  if (active === name) active = next;
  save();
  render();
}

// ---------- Recepten: modal + opslaan ----------
$addRecipeBtn?.addEventListener("click", () => {
  if (!active) return;
  // leeg formulier
  $fTitle.value = "";
  $fPrep.value = "";
  $fCook.value = "";
  $fIngr.value = "";
  $fSteps.value = "";
  $dlg.showModal();
});

$form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const rec = {
    title: $fTitle.value.trim(),
    prep: Number($fPrep.value || 0),
    cook: Number($fCook.value || 0),
    ingredients: ($fIngr.value || "")
      .split(/\r?\n/)
      .map(s => s.trim())
      .filter(Boolean),
    steps: $fSteps.value.trim(),
  };
  if (!rec.title) {
    $fTitle.focus();
    return;
  }
  recipes[active] = recipes[active] || [];
  recipes[active].push(rec);
  save();
  renderRecipes();
  $dlg.close();
});

document.getElementById("cancelRecipe")?.addEventListener("click", () => {
  $dlg.close();
});

// helpers
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

// events
$add?.addEventListener("click", addTab);
$search?.addEventListener("input", render);
